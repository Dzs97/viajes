"use client";

import { useState, useEffect } from "react";
import { basics, type BasicItem } from "../data/basics";

const STORAGE_KEY = "basics-state-v1";

export function useBasicsState() {
  const [items, setItems] = useState<BasicItem[]>(() => basics);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch (e) {
      console.error("Failed to load basics from localStorage", e);
    }
    setHydrated(true);
  }, []);

  // Save on every change
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save basics to localStorage", e);
    }
  }, [items, hydrated]);

  const updateItem = (index: number, updates: Partial<BasicItem>) => {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, ...updates } : item)));
  };

  const deleteItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const addItem = (item: BasicItem) => {
    setItems((prev) => [...prev, item]);
  };

  const reset = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
    setItems(basics);
  };

  return { items, updateItem, deleteItem, addItem, reset, hydrated };
}

// Cycle through statuses on click
const STATUS_CYCLE: BasicItem["status"][] = ["pendiente", "comprado", "empacado", "opcional"];

export function cycleStatus(current: BasicItem["status"]): BasicItem["status"] {
  const idx = STATUS_CYCLE.indexOf(current ?? "pendiente");
  return STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
}
