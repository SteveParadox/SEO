// lib/data.ts
import type { DataBundle, Comparison, Collection } from "@/lib/data-types";
export type {
  PricingTier,
  Tool,
  Prompt,
  ModelUpdate,
  Collection,
  Comparison,
  DataBundle,
} from "@/lib/data-types";

import { tools } from "@/lib/content/tools";
import { prompts } from "@/lib/content/prompts";
import { updates } from "@/lib/content/updates";
import { collections } from "@/lib/content/collections";
import { comparisons } from "@/lib/content/comparisons";
import { BEST_PAGES, type BestPage } from "@/lib/content/best-pages";

export const DATA: DataBundle & { bestPages: BestPage[] } = {
  tools,
  prompts,
  updates,
  collections,
  comparisons,
  bestPages: BEST_PAGES,
} as const;

// ---- Slug lookups ----
function normalizeSlug(slug: string) {
  // decode URL encoding, trim junk, and normalize casing
  return decodeURIComponent(slug).trim().toLowerCase();
}

// ---- Slug lookups ----
export function getToolBySlug(slug: string) {
  const s = normalizeSlug(slug);
  return DATA.tools.find((x) => normalizeSlug(x.slug) === s);
}

export function getPromptBySlug(slug: string) {
  const s = normalizeSlug(slug);
  return DATA.prompts.find((x) => normalizeSlug(x.slug) === s);
}

export function getUpdateBySlug(slug: string) {
  const s = normalizeSlug(slug);
  return DATA.updates.find((x) => normalizeSlug(x.slug) === s);
}

export function getCollectionBySlug(slug: string) {
  const s = normalizeSlug(slug);
  return DATA.collections.find((x) => normalizeSlug(x.slug) === s);
}

export function getComparisonBySlug(slug: string) {
  const s = normalizeSlug(slug);
  return DATA.comparisons.find((x) => normalizeSlug(x.slug) === s);
}

// ---- Resolvers ----
export function resolveCollectionItems(col: { items: { kind: "tool" | "prompt" | "update"; id: string }[] }) {
  return col.items
    .map((ref) => {
      if (ref.kind === "tool") return { kind: "tool" as const, item: DATA.tools.find((t) => t.id === ref.id) };
      if (ref.kind === "prompt") return { kind: "prompt" as const, item: DATA.prompts.find((p) => p.id === ref.id) };
      return { kind: "update" as const, item: DATA.updates.find((u) => u.id === ref.id) };
    })
    .filter((x) => x.item);
}

export function resolveComparisonContenders(cmp: Comparison) {
  return cmp.contenders
    .map((ref) => {
      if (ref.kind === "tool") return { kind: "tool" as const, item: DATA.tools.find((t) => t.id === ref.id) };
      return { kind: "prompt" as const, item: DATA.prompts.find((p) => p.id === ref.id) };
    })
    .filter((x) => x.item);
}

// ---- Related helpers (tag overlap) ----
function relatedByTags<T extends { slug: string; id: string; tags: string[] }>(all: T[], current: T, limit = 6) {
  const cur = new Set((current.tags ?? []).map((t) => t.toLowerCase()));
  if (!cur.size) return [];
  return all
    .filter((x) => x.slug !== current.slug)
    .map((x) => ({
      x,
      score: (x.tags ?? []).reduce((acc, t) => acc + (cur.has(t.toLowerCase()) ? 1 : 0), 0),
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.x);
}

// NOTE: Your project has used BOTH "id" and "slug" in different places.
// These accept either, so you don’t get pointless 404s because humans.
function findByIdOrSlug<T extends { id: string; slug: string }>(arr: T[], idOrSlug: string) {
  return arr.find((x) => x.id === idOrSlug || x.slug === idOrSlug);
}

export function getRelatedPrompts(idOrSlug: string, limit = 6) {
  const p = findByIdOrSlug(DATA.prompts, idOrSlug);
  if (!p) return [];
  return relatedByTags(DATA.prompts, p, limit);
}
export function getRelatedTools(idOrSlug: string, limit = 6) {
  const t = findByIdOrSlug(DATA.tools, idOrSlug);
  if (!t) return [];
  return relatedByTags(DATA.tools, t, limit);
}
export function getRelatedUpdates(idOrSlug: string, limit = 6) {
  const u = findByIdOrSlug(DATA.updates, idOrSlug);
  if (!u) return [];
  return relatedByTags(DATA.updates, u, limit);
}

export function getRelatedCollections(collectionId: string, limit = 6): Collection[] {
  const current = DATA.collections.find((c) => c.id === collectionId);
  if (!current) return [];
  const curTags = new Set((current.tags ?? []).map((t) => t.toLowerCase()));
  if (!curTags.size) return [];
  return DATA.collections
    .filter((c) => c.id !== collectionId)
    .map((c) => ({
      c,
      score: (c.tags ?? []).reduce((acc, t) => acc + (curTags.has(t.toLowerCase()) ? 1 : 0), 0),
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.c);
}

export function getRelatedComparisons(comparisonId: string, limit = 6) {
  const base = DATA.comparisons.find((c) => c.id === comparisonId);
  if (!base) return [];
  const candidates = DATA.comparisons.filter((c) => c.id !== comparisonId);

  const overlap = (a: string[], b: string[]) => {
    const sb = new Set(b.map((x) => x.toLowerCase()));
    return a.reduce((acc, x) => acc + (sb.has(x.toLowerCase()) ? 1 : 0), 0);
  };

  return [...candidates]
    .map((c) => ({ c, score: overlap(base.tags, c.tags) * 10 + new Date(c.updatedAtISO).getTime() / 1e12 }))
    .sort((a, b) => b.score - a.score)
    .map((x) => x.c)
    .slice(0, limit);
}

// ---- Collections containing item ----
export function findCollectionsContaining(
  arg: string | { kind: "tool" | "prompt" | "update"; id: string },
  id?: string
) {
  let kind: "tool" | "prompt" | "update" | null = null;
  let targetId: string | null = null;

  if (typeof arg === "object" && arg) {
    kind = arg.kind;
    targetId = arg.id;
  } else if (id) {
    kind = arg as any;
    targetId = id;
  } else {
    const slug = arg;
    const tool = DATA.tools.find((x) => x.slug === slug);
    const prompt = DATA.prompts.find((x) => x.slug === slug);
    const update = DATA.updates.find((x) => x.slug === slug);

    if (tool) {
      kind = "tool";
      targetId = tool.id;
    } else if (prompt) {
      kind = "prompt";
      targetId = prompt.id;
    } else if (update) {
      kind = "update";
      targetId = update.id;
    }
  }

  if (!kind || !targetId) return [];
  return DATA.collections.filter((c) => c.items.some((it) => it.kind === kind && it.id === targetId));
}

export type UnifiedKind = "tool" | "prompt" | "update" | "collection" | "comparison";

export type UnifiedItem = {
  kind: UnifiedKind;
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  tags: string[];
  updatedAtISO: string;
};

export function hrefFor(kind: UnifiedKind, slug: string) {
  if (kind === "tool") return `/tools/${slug}`;
  if (kind === "prompt") return `/prompts/${slug}`;
  if (kind === "update") return `/updates/${slug}`;
  if (kind === "collection") return `/collections/${slug}`;
  return `/comparisons/${slug}`;
}

export function getUnifiedIndex(): UnifiedItem[] {
  const idx: UnifiedItem[] = [];

  DATA.tools.forEach((t) =>
    idx.push({
      kind: "tool",
      id: t.id,
      slug: t.slug,
      title: t.name,
      subtitle: t.oneLiner,
      tags: t.tags ?? [],
      updatedAtISO: t.updatedAtISO,
    })
  );

  DATA.prompts.forEach((p) =>
    idx.push({
      kind: "prompt",
      id: p.id,
      slug: p.slug,
      title: p.title,
      subtitle: p.purpose,
      tags: p.tags ?? [],
      updatedAtISO: p.updatedAtISO,
    })
  );

  DATA.updates.forEach((u) =>
    idx.push({
      kind: "update",
      id: u.id,
      slug: u.slug,
      title: u.headline,
      subtitle: u.tldr,
      tags: u.tags ?? [],
      updatedAtISO: u.updatedAtISO,
    })
  );

  DATA.collections.forEach((c) =>
    idx.push({
      kind: "collection",
      id: c.id,
      slug: c.slug,
      title: c.title,
      subtitle: c.description,
      tags: c.tags ?? [],
      updatedAtISO: c.updatedAtISO,
    })
  );

  DATA.comparisons.forEach((c) =>
    idx.push({
      kind: "comparison",
      id: c.id,
      slug: c.slug,
      title: c.title,
      subtitle: c.description,
      tags: c.tags ?? [],
      updatedAtISO: c.updatedAtISO,
    })
  );

  idx.sort((a, b) => new Date(b.updatedAtISO).getTime() - new Date(a.updatedAtISO).getTime());
  return idx;
}



export function normalizeTag(s: string) {
  try {
    return decodeURIComponent(s).trim().toLowerCase();
  } catch {
    return String(s).trim().toLowerCase();
  }
}
export function getItemsByTag(tagRaw: string) {
  const tag = normalizeTag(tagRaw);

  const out: Array<{
    kind: "tool" | "prompt" | "update" | "collection" | "comparison";
    id: string;
    slug: string;
    title: string;
    subtitle: string;
  }> = [];

  for (const t of DATA.tools) {
    if (t.tags?.some((x) => normalizeTag(x) === tag)) {
      out.push({ kind: "tool", id: t.id, slug: t.slug, title: t.name, subtitle: t.oneLiner });
    }
  }

  for (const p of DATA.prompts) {
    if (p.tags?.some((x) => normalizeTag(x) === tag)) {
      out.push({ kind: "prompt", id: p.id, slug: p.slug, title: p.title, subtitle: p.purpose });
    }
  }

  for (const u of DATA.updates) {
    if (u.tags?.some((x) => normalizeTag(x) === tag)) {
      out.push({ kind: "update", id: u.id, slug: u.slug, title: u.headline, subtitle: u.tldr });
    }
  }

  for (const c of DATA.collections) {
    if (c.tags?.some((x) => normalizeTag(x) === tag)) {
      out.push({ kind: "collection", id: c.id, slug: c.slug, title: c.title, subtitle: c.description });
    }
  }

  for (const cmp of DATA.comparisons) {
    if (cmp.tags?.some((x) => normalizeTag(x) === tag)) {
      out.push({ kind: "comparison", id: cmp.id, slug: cmp.slug, title: cmp.title, subtitle: cmp.description });
    }
  }

  return out;
}
export function getAllTagsWithCounts() {
  const map = new Map<string, number>();

  const add = (raw: string) => {
    const key = normalizeTag(raw);
    if (!key) return;
    map.set(key, (map.get(key) ?? 0) + 1);
  };

  for (const t of DATA.tools) t.tags?.forEach(add);
  for (const p of DATA.prompts) p.tags?.forEach(add);
  for (const u of DATA.updates) u.tags?.forEach(add);
  for (const c of DATA.collections) c.tags?.forEach(add);
  for (const cmp of DATA.comparisons) cmp.tags?.forEach(add);

  return Array.from(map.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

export function getBestPageBySlug(slug: string) {
  return DATA.bestPages.find((p) => p.slug === slug);
}

export function getRelatedBestPages(id: string, limit = 6) {
  const page = DATA.bestPages.find((p) => p.id === id);
  if (!page) return [];
  const tags = new Set(page.tags);
  return DATA.bestPages
    .filter((x) => x.id !== id)
    .map((x) => ({ x, score: x.tags.reduce((s, t) => s + (tags.has(t) ? 1 : 0), 0) }))
    .sort((a, b) => b.score - a.score)
    .map((r) => r.x)
    .slice(0, limit);
}

export function resolveBestPicks(page: BestPage) {
  const toolsById = new Map(DATA.tools.map((t) => [t.id, t] as const));
  return page.picks
    .map((p) => ({ pick: p, tool: toolsById.get(p.toolId) }))
    .filter((x): x is { pick: (typeof page.picks)[number]; tool: (typeof DATA.tools)[number] } => Boolean(x.tool));
}

export function findBestPagesContainingTool(toolId: string) {
  return DATA.bestPages.filter((p) => p.picks.some((x) => x.toolId === toolId));
}
export function findComparisonsContainingTool(toolId: string) {
  return DATA.comparisons.filter((cmp) =>
    cmp.contenders.some((x) => x.kind === "tool" && x.id === toolId)
  );
}