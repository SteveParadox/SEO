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

export const DATA: DataBundle = { tools, prompts, updates, collections, comparisons };

// ---- Slug lookups ----
export function getToolBySlug(slug: string) {
  return DATA.tools.find((x) => x.slug === slug);
}
export function getPromptBySlug(slug: string) {
  return DATA.prompts.find((x) => x.slug === slug);
}
export function getUpdateBySlug(slug: string) {
  return DATA.updates.find((x) => x.slug === slug);
}
export function getCollectionBySlug(slug: string) {
  return DATA.collections.find((x) => x.slug === slug);
}
export function getComparisonBySlug(slug: string) {
  return DATA.comparisons.find((x) => x.slug === slug);
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