export type RecentKind =
  | "tool"
  | "prompt"
  | "update"
  | "collection"
  | "comparison";

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

function safeParse(raw: string | null): unknown {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function normalize(items: unknown): RecentItem[] {
  if (!Array.isArray(items)) return [];
  return items
    .filter(
      (x: any) =>
        x &&
        typeof x.kind === "string" &&
        typeof x.id === "string" &&
        typeof x.slug === "string" &&
        typeof x.title === "string" &&
        typeof x.subtitle === "string" &&
        typeof x.viewedAtISO === "string"
    )
    .map((x: any) => ({
      kind: x.kind as RecentKind,
      id: x.id as string,
      slug: x.slug as string,
      title: x.title as string,
      subtitle: x.subtitle as string,
      viewedAtISO: x.viewedAtISO as string,
    }));
}

function readAll(): RecentItem[] {
  if (typeof window === "undefined") return [];
  const parsed = safeParse(window.localStorage.getItem(STORAGE_KEY));
  return normalize(parsed);
}

function writeAll(items: RecentItem[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent(RECENT_EVENT));
  } catch {
    // ignore
  }
}

/**
 * Add a recently viewed item.
 * - de-dupes by (kind,id)
 * - puts newest at top
 * - sets viewedAtISO to now
 * - keeps up to `limit`
 */
export function addRecent(
  input: Omit<RecentItem, "viewedAtISO">,
  limit = 30
) {
  const now = new Date().toISOString();
  const current = readAll();

  const next: RecentItem[] = [
    { ...input, viewedAtISO: now },
    ...current.filter((x) => !(x.kind === input.kind && x.id === input.id)),
  ].slice(0, limit);

  writeAll(next);
}

export function readRecent(): RecentItem[] {
  return readAll();
}

export function clearRecent() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(RECENT_EVENT));
}

/** Optional helper if you ever need it */
export function recentCount(): number {
  return readAll().length;
}