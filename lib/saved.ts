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

type SavedKey = { kind: SavedKind; id: string };

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
      .map((x) => ({ kind: x.kind as SavedKind, id: String(x.id) }));
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
    .map((k) => map.get(`${k.kind}:${k.id}`))
    .filter(Boolean)
    .map((it) => {
      const x = it as UnifiedItem;
      return {
        kind: x.kind,
        id: x.id,
        slug: x.slug,
        title: x.title,
        subtitle: x.subtitle,
        savedAtISO: new Date().toISOString(),
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

  const next = exists
    ? keys.filter((x) => !(x.kind === key.kind && x.id === key.id))
    : [{ kind: key.kind, id: key.id }, ...keys];

  writeRaw(next.slice(0, limit));
  return !exists;
}

export function readSavedCount() {
  return readRaw().length;
}