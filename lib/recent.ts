export type RecentKind = "tool" | "prompt" | "update" | "collection" | "comparison";

export type RecentItem = {
  kind: RecentKind;
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  viewedAt: number;
};

const KEY = "tooldrop_recent_v1";
const MAX = 20;

export function addRecent(item: Omit<RecentItem, "viewedAt">) {
  if (typeof window === "undefined") return;

  const next: RecentItem = { ...item, viewedAt: Date.now() };

  try {
    const raw = window.localStorage.getItem(KEY);
    const list: RecentItem[] = raw ? JSON.parse(raw) : [];

    const filtered = Array.isArray(list)
      ? list.filter((x) => !(x.kind === next.kind && x.id === next.id))
      : [];

    const merged = [next, ...filtered].slice(0, MAX);
    window.localStorage.setItem(KEY, JSON.stringify(merged));
  } catch {
    // ignore storage errors
  }
}

export function readRecent(): RecentItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const list: RecentItem[] = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function clearRecent() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}