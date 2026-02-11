export type SavedKind = "tool" | "prompt" | "update" | "collection" | "comparison";

export type SavedItem = {
  kind: SavedKind;
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  savedAtISO: string;
};

const STORAGE_KEY = "tooldrop_saved_v1";
export const SAVED_EVENT = "tooldrop:saved-changed";

type SavedKey = { kind: SavedKind; id: string; savedAtISO?: string };

import { getUnifiedIndex, type UnifiedItem } from "@/lib/data";

function readRaw(): SavedKey[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((x) => x?.kind && x?.id)
      .map((x) => ({ 
        kind: x.kind as SavedKind, 
        id: String(x.id),
        savedAtISO: x.savedAtISO ? String(x.savedAtISO) : undefined
      }));
  } catch {
    return [];
  }
}

function writeRaw(keys: SavedKey[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
    window.dispatchEvent(new CustomEvent(SAVED_EVENT));
  } catch {
    // ignore
  }
}

export function readSaved(): SavedItem[] {
  const keys = readRaw();
  const all = getUnifiedIndex();
  const map = new Map(all.map((it) => [`${it.kind}:${it.id}`, it] as const));

  return keys
    .map((k) => map.get(`${k.kind}:${k.id}`) ? { ...k, item: map.get(`${k.kind}:${k.id}`)! } : null)
    .filter(Boolean)
    .map((matched) => {
      const item = matched!.item as UnifiedItem;
      return {
        kind: item.kind,
        id: item.id,
        slug: item.slug,
        title: item.title,
        subtitle: item.subtitle,
        savedAtISO: matched!.savedAtISO || new Date().toISOString(),
      };
    });
}

export function clearSaved() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(SAVED_EVENT));
  } catch {
    // ignore
  }
}

export function isSaved(kind: SavedKind, id: string) {
  return readRaw().some((x) => x.kind === kind && x.id === id);
}

export function toggleSaved(key: SavedKey, limit = 200) {
  const keys = readRaw();
  const exists = keys.some((x) => x.kind === key.kind && x.id === key.id);

  const now = new Date().toISOString();
  const next = exists
    ? keys.filter((x) => !(x.kind === key.kind && x.id === key.id))
    : [{ kind: key.kind, id: key.id, savedAtISO: now }, ...keys];

  writeRaw(next.slice(0, limit));
  return !exists;
}

export function readSavedCount() {
  return readRaw().length;
}