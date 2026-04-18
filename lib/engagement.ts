import { getUnifiedIndex, getUnifiedItem, type UnifiedItem, type UnifiedKind } from "@/lib/data";
import { readRecent } from "@/lib/recent";
import { readSaved } from "@/lib/saved";

export type EngagementAction = "view" | "save" | "outbound";

export type EngagementRecord = {
  kind: UnifiedKind;
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  viewCount: number;
  saveCount: number;
  outboundCount: number;
  lastViewedAtISO?: string;
  lastSavedAtISO?: string;
  lastOutboundAtISO?: string;
  lastEventAtISO: string;
};

export type TrendingItem = UnifiedItem & {
  score: number;
  reason: string;
  signals: {
    views: number;
    saves: number;
    outbounds: number;
  };
};

export const ENGAGEMENT_STORAGE_KEY = "xavkit_engagement_v1";
export const ENGAGEMENT_EVENT = "xavkit:engagement-changed";

type EngagementInput = {
  kind: UnifiedKind;
  id: string;
  slug?: string;
  title?: string;
  subtitle?: string;
};

function keyFor(kind: UnifiedKind, id: string) {
  return `${kind}:${id}`;
}

function readRaw() {
  if (typeof window === "undefined") return [] as EngagementRecord[];

  try {
    const raw = window.localStorage.getItem(ENGAGEMENT_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (entry) =>
          entry &&
          typeof entry.kind === "string" &&
          typeof entry.id === "string" &&
          typeof entry.slug === "string" &&
          typeof entry.title === "string" &&
          typeof entry.subtitle === "string"
      )
      .map(
        (entry): EngagementRecord => ({
          kind: entry.kind as UnifiedKind,
          id: String(entry.id),
          slug: String(entry.slug),
          title: String(entry.title),
          subtitle: String(entry.subtitle),
          viewCount: Number(entry.viewCount ?? 0),
          saveCount: Number(entry.saveCount ?? 0),
          outboundCount: Number(entry.outboundCount ?? 0),
          lastViewedAtISO: entry.lastViewedAtISO ? String(entry.lastViewedAtISO) : undefined,
          lastSavedAtISO: entry.lastSavedAtISO ? String(entry.lastSavedAtISO) : undefined,
          lastOutboundAtISO: entry.lastOutboundAtISO ? String(entry.lastOutboundAtISO) : undefined,
          lastEventAtISO: String(entry.lastEventAtISO ?? new Date().toISOString()),
        })
      );
  } catch {
    return [];
  }
}

function writeRaw(records: EngagementRecord[]) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(ENGAGEMENT_STORAGE_KEY, JSON.stringify(records));
    window.dispatchEvent(new CustomEvent(ENGAGEMENT_EVENT));
  } catch {
    // ignore storage failures
  }
}

function withResolvedMeta(input: EngagementInput) {
  const resolved = getUnifiedItem(input.kind, input.id);

  return {
    kind: input.kind,
    id: input.id,
    slug: input.slug ?? resolved?.slug ?? input.id,
    title: input.title ?? resolved?.title ?? input.id,
    subtitle: input.subtitle ?? resolved?.subtitle ?? "",
  };
}

export function readEngagementRecords() {
  return readRaw();
}

export function trackEngagement(input: EngagementInput, action: EngagementAction) {
  const now = new Date().toISOString();
  const meta = withResolvedMeta(input);
  const current = readRaw();
  const currentByKey = new Map(current.map((record) => [keyFor(record.kind, record.id), record] as const));
  const key = keyFor(meta.kind, meta.id);

  const base = currentByKey.get(key) ?? {
    kind: meta.kind,
    id: meta.id,
    slug: meta.slug,
    title: meta.title,
    subtitle: meta.subtitle,
    viewCount: 0,
    saveCount: 0,
    outboundCount: 0,
    lastEventAtISO: now,
  };

  const next: EngagementRecord = {
    ...base,
    slug: meta.slug,
    title: meta.title,
    subtitle: meta.subtitle,
    lastEventAtISO: now,
  };

  if (action === "view") {
    next.viewCount += 1;
    next.lastViewedAtISO = now;
  }

  if (action === "save") {
    next.saveCount += 1;
    next.lastSavedAtISO = now;
  }

  if (action === "outbound") {
    next.outboundCount += 1;
    next.lastOutboundAtISO = now;
  }

  currentByKey.set(key, next);
  writeRaw(Array.from(currentByKey.values()));
  return next;
}

export function clearEngagement() {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(ENGAGEMENT_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(ENGAGEMENT_EVENT));
  } catch {
    // ignore storage failures
  }
}

function daysSince(iso?: string) {
  if (!iso) return Number.POSITIVE_INFINITY;
  const ageMs = Date.now() - new Date(iso).getTime();
  return Math.max(0, ageMs / (1000 * 60 * 60 * 24));
}

function daysSinceContentUpdate(updatedAtISO: string) {
  const ageMs = Date.now() - new Date(`${updatedAtISO}T00:00:00`).getTime();
  return Math.max(0, ageMs / (1000 * 60 * 60 * 24));
}

function buildReason(record: EngagementRecord | undefined, saved: boolean, recentRank: number | undefined) {
  if (saved) return "Saved";
  if (!record) return "Freshly updated";
  if (record.saveCount > 0) {
    return record.saveCount === 1 ? "Saved locally" : `${record.saveCount} save signals`;
  }
  if (record.outboundCount > 0) {
    return record.outboundCount === 1 ? "Clicked through once" : `${record.outboundCount} outbound clicks`;
  }
  if (recentRank !== undefined) {
    return `Viewed recently (#${recentRank + 1})`;
  }
  if (record.viewCount > 0) {
    return record.viewCount === 1 ? "Viewed once" : `${record.viewCount} local views`;
  }
  return "Freshly updated";
}

export function scoreTrendingItem(
  item: UnifiedItem,
  context?: {
    records?: EngagementRecord[];
    savedKeys?: Set<string>;
    recentRank?: Map<string, number>;
  }
) {
  const records = context?.records ?? readEngagementRecords();
  const savedKeys =
    context?.savedKeys ??
    new Set(readSaved().map((entry) => keyFor(entry.kind, entry.id)));
  const recentRank =
    context?.recentRank ??
    new Map(readRecent().map((entry, index) => [keyFor(entry.kind, entry.id), index] as const));

  const key = keyFor(item.kind, item.id);
  const record = records.find((entry) => entry.kind === item.kind && entry.id === item.id);
  const recentIndex = recentRank.get(key);
  const saved = savedKeys.has(key);

  const baseInteractions =
    (record?.viewCount ?? 0) * 1.2 +
    (record?.saveCount ?? 0) * 6 +
    (record?.outboundCount ?? 0) * 3.5;

  const interactionDecay =
    baseInteractions > 0 ? Math.exp(-daysSince(record?.lastEventAtISO) / 7) : 0;
  const interactionScore = baseInteractions * interactionDecay;

  const savedBonus = saved ? 4 : 0;
  const recentBonus =
    recentIndex !== undefined ? Math.max(0, 3 - recentIndex * 0.35) : 0;
  const freshnessBoost = Math.max(0, 2.5 - daysSinceContentUpdate(item.updatedAtISO) / 10);
  const typeBoost = item.kind === "update" ? 0.4 : item.kind === "tool" ? 0.2 : 0;

  const score = Number(
    (interactionScore + savedBonus + recentBonus + freshnessBoost + typeBoost).toFixed(4)
  );

  return {
    ...item,
    score,
    reason: buildReason(record, saved, recentIndex),
    signals: {
      views: record?.viewCount ?? 0,
      saves: record?.saveCount ?? 0,
      outbounds: record?.outboundCount ?? 0,
    },
  };
}

export function getTrendingItems(limit = 30) {
  const records = readEngagementRecords();
  const savedKeys = new Set(readSaved().map((entry) => keyFor(entry.kind, entry.id)));
  const recentRank = new Map(
    readRecent().map((entry, index) => [keyFor(entry.kind, entry.id), index] as const)
  );

  return getUnifiedIndex()
    .map((item) => scoreTrendingItem(item, { records, savedKeys, recentRank }))
    .sort(
      (left, right) =>
        right.score - left.score ||
        new Date(right.updatedAtISO).getTime() - new Date(left.updatedAtISO).getTime() ||
        left.title.localeCompare(right.title)
    )
    .slice(0, limit);
}
