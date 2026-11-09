"use client";

import { useState, useEffect } from "react";
import { basics, type BasicItem } from "../data/basics";

const STORAGE_KEY = "basics-state-v2";
const OLD_STORAGE_KEY = "basics-state-v1";

// Only the user's changes are stored (keyed by the item's original name in basics.ts),
// so items and prices added to basics.ts still show up on devices that already used the page.
export type Saved = {
  edits: Record<string, Partial<BasicItem>>;
  deleted: string[];
  added: BasicItem[];
};

export const emptySaved: Saved = { edits: {}, deleted: [], added: [] };

function fileItems(saved: Saved) {
  return basics.filter((b) => !saved.deleted.includes(b.name));
}

export function buildItems(saved: Saved): BasicItem[] {
  return [...fileItems(saved).map((b) => ({ ...b, ...saved.edits[b.name] })), ...saved.added];
}

// v1 stored the whole list; keep only the statuses of items that still exist in basics.ts.
export function migrateV1(raw: string): Saved {
  const edits: Saved["edits"] = {};
  const old = JSON.parse(raw);
  if (Array.isArray(old)) {
    for (const item of old as BasicItem[]) {
      const original = basics.find((b) => b.name === item.name);
      if (original && item.status && item.status !== original.status) edits[item.name] = { status: item.status };
    }
  }
  return { ...emptySaved, edits };
}

// Indexes refer to buildItems() order: file items first, then user-added items.
export function updateSaved(prev: Saved, index: number, updates: Partial<BasicItem>): Saved {
  const files = fileItems(prev);
  if (index < files.length) {
    const name = files[index].name;
    return { ...prev, edits: { ...prev.edits, [name]: { ...prev.edits[name], ...updates } } };
  }
  const i = index - files.length;
  return { ...prev, added: prev.added.map((item, j) => (j === i ? { ...item, ...updates } : item)) };
}

export function deleteSaved(prev: Saved, index: number): Saved {
  const files = fileItems(prev);
  if (index < files.length) return { ...prev, deleted: [...prev.deleted, files[index].name] };
  const i = index - files.length;
  return { ...prev, added: prev.added.filter((_, j) => j !== i) };
}

export function useBasicsState() {
  const [saved, setSaved] = useState<Saved>(emptySaved);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const oldRaw = localStorage.getItem(OLD_STORAGE_KEY);
      if (raw) {
        setSaved({ ...emptySaved, ...JSON.parse(raw) });
      } else if (oldRaw) {
        setSaved(migrateV1(oldRaw));
        localStorage.removeItem(OLD_STORAGE_KEY);
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    } catch (e) {
      console.error("Failed to save basics to localStorage", e);
    }
  }, [saved, hydrated]);

  const items = buildItems(saved);

  const updateItem = (index: number, updates: Partial<BasicItem>) => {
    setSaved((prev) => updateSaved(prev, index, updates));
  };

  const deleteItem = (index: number) => {
    setSaved((prev) => deleteSaved(prev, index));
  };

  const addItem = (item: BasicItem) => {
    setSaved((prev) => ({ ...prev, added: [...prev.added, item] }));
  };

  const reset = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
    setSaved(emptySaved);
  };

  return { items, updateItem, deleteItem, addItem, reset, hydrated };
}

// Cycle through statuses on click
const STATUS_CYCLE: BasicItem["status"][] = ["pendiente", "comprado", "empacado", "opcional"];

export function cycleStatus(current: BasicItem["status"]): BasicItem["status"] {
  const idx = STATUS_CYCLE.indexOf(current ?? "pendiente");
  return STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
}
