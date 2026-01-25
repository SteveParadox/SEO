export type SavedKind = "tool" | "prompt" | "update" | "collection" | "comparison";
export type SavedKey = { kind: SavedKind; id: string };

const STORAGE_KEY = "tooldrop_saved_v1";
export const SAVED_EVENT = "tooldrop:saved-changed";

function readRaw(): SavedKey[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x) => x?.kind && x?.id).map((x) => ({ kind: x.kind, id: x.id }));
  } catch {
    return [];
  }
}

function writeRaw(keys: SavedKey[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
  window.dispatchEvent(new CustomEvent(SAVED_EVENT));
}

export function isSaved(kind: SavedKind, id: string) {
  return readRaw().some((x) => x.kind === kind && x.id === id);
}

export function toggleSaved(key: SavedKey) {
  const keys = readRaw();
  const exists = keys.some((x) => x.kind === key.kind && x.id === key.id);
  const next = exists
    ? keys.filter((x) => !(x.kind === key.kind && x.id === key.id))
    : [key, ...keys];
  writeRaw(next);
  return !exists;
}

export function clearSaved() {
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(SAVED_EVENT));
}

export function readSavedCount() {
  return readRaw().length;
}