export type RecentKind = "tool" | "prompt" | "update" | "collection" | "comparison";

export type RecentItem = {
  kind: RecentKind;
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  viewedAtISO: string;
};

const STORAGE_KEY = "tooldrop_recent_v1";
export const RECENT_EVENT = "tooldrop:recent-changed";

type RecentKey = { kind: RecentKind; id: string };

function readRaw(): RecentKey[] {
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

function writeRaw(keys: RecentKey[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
    window.dispatchEvent(new CustomEvent(RECENT_EVENT));
  } catch {
    // ignore
  }
}

export function pushRecent(key: RecentKey, limit = 30) {
  const keys = readRaw();
  const next = [{ kind: key.kind, id: key.id }, ...keys.filter((k) => !(k.kind === key.kind && k.id === key.id))].slice(
    0,
    limit
  );
  writeRaw(next);
}

export function readRecentKeys(): RecentKey[] {
  return readRaw();
}

export function clearRecent() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(RECENT_EVENT));
}