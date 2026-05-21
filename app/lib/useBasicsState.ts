"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { basics, type BasicItem } from "../data/basics";

const LOCAL_CACHE_KEY = "basics-state-v1";
const PIN_KEY = "basics-edit-pin-v1";

export type SyncStatus = "idle" | "loading" | "syncing" | "synced" | "error" | "offline";

export function useBasicsState() {
  const [items, setItems] = useState<BasicItem[]>(() => basics);
  const [hydrated, setHydrated] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("idle");
  const [lastError, setLastError] = useState<string | null>(null);
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. On mount: load from cache first (instant), then fetch from API (canonical)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Try localStorage first for fast render
    try {
      const cached = localStorage.getItem(LOCAL_CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch (e) {
      // ignore cache errors
    }

    // Then fetch from API to get canonical state
    setSyncStatus("loading");
    fetch("/api/basics")
      .then((r) => {
        if (!r.ok) throw new Error(`API error ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (Array.isArray(data.items)) {
          setItems(data.items);
          // Update cache
          try {
            localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(data.items));
          } catch (e) { /* ignore */ }
        }
        setSyncStatus("synced");
      })
      .catch((err) => {
        console.warn("Could not fetch from API, using cached/seed data:", err);
        setSyncStatus("offline");
        setLastError("Sin sync. Cambios solo locales.");
      })
      .finally(() => setHydrated(true));
  }, []);

  // 2. Debounced save to API + localStorage on every change
  const saveToBackend = useCallback((newItems: BasicItem[]) => {
    // Cancel any pending save
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);

    // Always update cache immediately
    try {
      localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(newItems));
    } catch (e) { /* ignore */ }

    // Debounce API call by 800ms (avoid spamming on rapid edits)
    saveTimerRef.current = setTimeout(async () => {
      setSyncStatus("syncing");
      const pin = typeof window !== "undefined" ? localStorage.getItem(PIN_KEY) : null;
      try {
        const res = await fetch("/api/basics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(pin ? { "x-edit-pin": pin } : {}),
          },
          body: JSON.stringify({ items: newItems }),
        });
        if (!res.ok) {
          if (res.status === 401) {
            setSyncStatus("error");
            setLastError("PIN incorrecto o falta de PIN. Edita el PIN para guardar en la nube.");
            return;
          }
          throw new Error(`API error ${res.status}`);
        }
        setSyncStatus("synced");
        setLastError(null);
      } catch (err: any) {
        console.error("Sync error:", err);
        setSyncStatus("error");
        setLastError(err?.message || "Error al sincronizar");
      }
    }, 800);
  }, []);

  // Wrap mutations to save automatically
  const updateItem = (index: number, updates: Partial<BasicItem>) => {
    setItems((prev) => {
      const next = prev.map((item, i) => (i === index ? { ...item, ...updates } : item));
      saveToBackend(next);
      return next;
    });
  };

  const deleteItem = (index: number) => {
    setItems((prev) => {
      const next = prev.filter((_, i) => i !== index);
      saveToBackend(next);
      return next;
    });
  };

  const addItem = (item: BasicItem) => {
    setItems((prev) => {
      const next = [...prev, item];
      saveToBackend(next);
      return next;
    });
  };

  const reset = async () => {
    setItems(basics);
    if (typeof window !== "undefined") {
      localStorage.removeItem(LOCAL_CACHE_KEY);
    }
    const pin = typeof window !== "undefined" ? localStorage.getItem(PIN_KEY) : null;
    try {
      setSyncStatus("syncing");
      await fetch("/api/basics", {
        method: "DELETE",
        headers: pin ? { "x-edit-pin": pin } : {},
      });
      setSyncStatus("synced");
    } catch (err) {
      console.error("Reset error:", err);
      setSyncStatus("error");
    }
  };

  // PIN management
  const setPin = (pin: string) => {
    if (typeof window === "undefined") return;
    if (pin) {
      localStorage.setItem(PIN_KEY, pin);
    } else {
      localStorage.removeItem(PIN_KEY);
    }
  };

  const getPin = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(PIN_KEY);
  };

  return {
    items,
    updateItem,
    deleteItem,
    addItem,
    reset,
    hydrated,
    syncStatus,
    lastError,
    setPin,
    getPin,
  };
}

// Cycle through statuses on click
const STATUS_CYCLE: BasicItem["status"][] = ["pendiente", "comprado", "empacado", "opcional"];

export function cycleStatus(current: BasicItem["status"]): BasicItem["status"] {
  const idx = STATUS_CYCLE.indexOf(current ?? "pendiente");
  return STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
}
