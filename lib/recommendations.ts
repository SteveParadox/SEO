import {
  getRelatedBestPages,
  getRelatedCollections,
  getRelatedComparisons,
  getRelatedPrompts,
  getRelatedTools,
  getRelatedUpdates,
  getUnifiedIndex,
  type UnifiedItem,
  type UnifiedKind,
} from "@/lib/data";
import { readRecent, type RecentItem } from "@/lib/recent";
import { readSaved } from "@/lib/saved";
import type { BestPage } from "@/lib/content/best-pages";
import type { Collection, Comparison, ModelUpdate, Prompt, Tool } from "@/lib/data-types";

export type PersonalizedItem = UnifiedItem & {
  reason: string;
  score: number;
  matchedTags?: string[];
};

function keyFor(kind: UnifiedKind, id: string) {
  return `${kind}:${id}`;
}

function toUnified(kind: UnifiedKind, item: Tool | Prompt | ModelUpdate | Collection | Comparison | BestPage): UnifiedItem {
  if (kind === "tool") {
    const tool = item as Tool;
    return {
      kind,
      id: tool.id,
      slug: tool.slug,
      title: tool.name,
      subtitle: tool.oneLiner,
      tags: tool.tags,
      updatedAtISO: tool.updatedAtISO,
    };
  }

  if (kind === "prompt") {
    const prompt = item as Prompt;
    return {
      kind,
      id: prompt.id,
      slug: prompt.slug,
      title: prompt.title,
      subtitle: prompt.purpose,
      tags: prompt.tags,
      updatedAtISO: prompt.updatedAtISO,
    };
  }

  if (kind === "update") {
    const update = item as ModelUpdate;
    return {
      kind,
      id: update.id,
      slug: update.slug,
      title: update.headline,
      subtitle: update.tldr,
      tags: update.tags,
      updatedAtISO: update.updatedAtISO,
    };
  }

  if (kind === "collection") {
    const collection = item as Collection;
    return {
      kind,
      id: collection.id,
      slug: collection.slug,
      title: collection.title,
      subtitle: collection.description,
      tags: collection.tags,
      updatedAtISO: collection.updatedAtISO,
    };
  }

  if (kind === "comparison") {
    const comparison = item as Comparison;
    return {
      kind,
      id: comparison.id,
      slug: comparison.slug,
      title: comparison.title,
      subtitle: comparison.description,
      tags: comparison.tags,
      updatedAtISO: comparison.updatedAtISO,
    };
  }

  const page = item as BestPage;
  return {
    kind,
    id: page.id,
    slug: page.slug,
    title: page.title,
    subtitle: page.description,
    tags: page.tags,
    updatedAtISO: page.updatedAtISO,
  };
}

function getRecentSeeds(limit = 6) {
  return readRecent().slice(0, limit);
}

function getSavedSeeds() {
  return readSaved();
}

function getBlockedKeys(recent: RecentItem[]) {
  const saved = getSavedSeeds();
  return new Set([
    ...recent.map((entry) => keyFor(entry.kind, entry.id)),
    ...saved.map((entry) => keyFor(entry.kind, entry.id)),
  ]);
}

function resolveRelatedItems(kind: UnifiedKind, id: string): UnifiedItem[] {
  if (kind === "tool") {
    return getRelatedTools(id, 6).map((item) => toUnified("tool", item));
  }

  if (kind === "prompt") {
    return getRelatedPrompts(id, 6).map((item) => toUnified("prompt", item));
  }

  if (kind === "update") {
    return getRelatedUpdates(id, 6).map((item) => toUnified("update", item));
  }

  if (kind === "collection") {
    return getRelatedCollections(id, 6).map((item) => toUnified("collection", item));
  }

  if (kind === "comparison") {
    return getRelatedComparisons(id, 6).map((item) => toUnified("comparison", item));
  }

  return getRelatedBestPages(id, 6).map((item) => toUnified("best", item));
}

function sharedTagCount(left: string[], right: string[]) {
  const rightSet = new Set(right.map((tag) => tag.toLowerCase()));
  return left.reduce((score, tag) => score + (rightSet.has(tag.toLowerCase()) ? 1 : 0), 0);
}

export function getContinueExploring(limit = 6): PersonalizedItem[] {
  const recent = getRecentSeeds(6);
  const blocked = getBlockedKeys(recent);
  const unifiedByKey = new Map(
    getUnifiedIndex().map((item) => [keyFor(item.kind, item.id), item] as const)
  );
  const suggestions = new Map<string, PersonalizedItem>();

  recent.forEach((entry, index) => {
    const relatedItems = resolveRelatedItems(entry.kind, entry.id);
    const seedWeight = Math.max(1, 6 - index);
    const source = unifiedByKey.get(keyFor(entry.kind, entry.id));

    relatedItems.forEach((item, relatedIndex) => {
      const key = keyFor(item.kind, item.id);
      if (blocked.has(key)) return;

      const score =
        seedWeight * 4 +
        sharedTagCount(item.tags, source?.tags ?? []) * 1.5 -
        relatedIndex * 0.75;

      const existing = suggestions.get(key);
      if (existing && existing.score >= score) return;

      suggestions.set(key, {
        ...item,
        score,
        reason: `Because you viewed ${entry.title}`,
      });
    });
  });

  return Array.from(suggestions.values())
    .sort(
      (left, right) =>
        right.score - left.score ||
        new Date(right.updatedAtISO).getTime() - new Date(left.updatedAtISO).getTime()
    )
    .slice(0, limit);
}

export function getRecommendedForYou(limit = 6): PersonalizedItem[] {
  const recent = getRecentSeeds(8);
  const saved = getSavedSeeds();
  const blocked = getBlockedKeys(recent);
  const tagWeights = new Map<string, number>();
  const kindWeights = new Map<UnifiedKind, number>();

  const unifiedByKey = new Map(
    getUnifiedIndex().map((item) => [keyFor(item.kind, item.id), item] as const)
  );

  saved.forEach((entry) => {
    const key = keyFor(entry.kind, entry.id);
    const item = unifiedByKey.get(key);
    if (!item) return;

    item.tags.forEach((tag) => tagWeights.set(tag, (tagWeights.get(tag) ?? 0) + 5));
    kindWeights.set(item.kind, (kindWeights.get(item.kind) ?? 0) + 2);
  });

  recent.forEach((entry, index) => {
    const key = keyFor(entry.kind, entry.id);
    const item = unifiedByKey.get(key);
    if (!item) return;

    const weight = Math.max(1, 4 - index * 0.4);
    item.tags.forEach((tag) => tagWeights.set(tag, (tagWeights.get(tag) ?? 0) + weight));
    kindWeights.set(item.kind, (kindWeights.get(item.kind) ?? 0) + 1);
  });

  const recommendations = getUnifiedIndex()
    .filter((item) => !blocked.has(keyFor(item.kind, item.id)))
    .map((item) => {
      const matchedTags = item.tags.filter((tag) => tagWeights.has(tag));
      const tagScore = matchedTags.reduce((score, tag) => score + (tagWeights.get(tag) ?? 0), 0);
      const kindScore = (kindWeights.get(item.kind) ?? 0) * 0.8;
      const freshnessBoost = Math.max(
        0,
        1.5 - (Date.now() - new Date(`${item.updatedAtISO}T00:00:00`).getTime()) / (1000 * 60 * 60 * 24 * 30)
      );

      return {
        ...item,
        score: Number((tagScore * 1.8 + kindScore + freshnessBoost).toFixed(4)),
        matchedTags: matchedTags.slice(0, 3),
      };
    })
    .filter((item) => item.score > 0)
    .sort(
      (left, right) =>
        right.score - left.score ||
        new Date(right.updatedAtISO).getTime() - new Date(left.updatedAtISO).getTime()
    )
    .slice(0, limit)
    .map((item) => ({
      ...item,
      reason:
        item.matchedTags && item.matchedTags.length > 0
          ? `Based on your interest in ${item.matchedTags.join(", ")}`
          : "Based on what you saved and viewed",
    }));

  return recommendations;
}
