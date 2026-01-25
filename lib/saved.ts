export type SavedKind = "tool" | "prompt" | "update" | "collection" | "comparison";

export type SavedItem = {
  kind: SavedKind;
  id: string;
};

export const STORAGE_KEY = "tooldrop_saved_v1";
export const SAVED_EVENT = "tooldrop:saved-changed";

function readRaw(): SavedItem[] {
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

function writeRaw(items: SavedItem[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent(SAVED_EVENT));
  } catch {
    // ignore
  }
}

// ✅ what app/saved/page.tsx imports
export function readSaved(): SavedItem[] {
  return readRaw();
}

// ✅ what app/saved/page.tsx imports
export function clearSaved() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(SAVED_EVENT));
}

// helpers you’ll reuse elsewhere
export function isSaved(kind: SavedKind, id: string) {
  return readRaw().some((x) => x.kind === kind && x.id === id);
}

export function toggleSaved(key: SavedItem, limit = 200) {
  const items = readRaw();
  const exists = items.some((x) => x.kind === key.kind && x.id === key.id);
  const next = exists
    ? items.filter((x) => !(x.kind === key.kind && x.id === key.id))
    : [key, ...items];

  writeRaw(next.slice(0, limit));
  return !exists;
}

// optional: used by badges
export function readSavedCount() {
  return readRaw().length;
}