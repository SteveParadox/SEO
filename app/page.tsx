import type { Metadata } from "next";
import ToolDropAI, { type IndexItem, type CategoryKey, type HomePageData } from "./home";
import { DATA } from "@/lib/data";
import { INDEXABLE_ROBOTS, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Find the Right AI Tools, Prompts and Comparisons",
  description:
    "Explore practical AI tool reviews, task-focused prompts, side-by-side comparisons and curated guides to choose tools that fit your work.",
  alternates: { canonical: absoluteUrl("/") },
  robots: INDEXABLE_ROBOTS,
};

const SORT_RECENT = (a: IndexItem, b: IndexItem) =>
  b.updatedAtISO.localeCompare(a.updatedAtISO) || a.title.localeCompare(b.title);

export default function Page() {
  // Keep the full content corpus in the server component. The interactive
  // homepage only needs 9 recent links per type, 9 global links and 4 collections.
  const rows: IndexItem[] = [
    ...DATA.tools.map((item) => ({
      kind: "tool" as const,
      id: item.id,
      slug: item.slug,
      title: item.name,
      subtitle: item.oneLiner,
      typeTag: (item.tags[0] || "tool").toUpperCase(),
      minutes: 6,
      updatedAtISO: item.updatedAtISO,
    })),
    ...DATA.prompts.map((item) => ({
      kind: "prompt" as const,
      id: item.id,
      slug: item.slug,
      title: item.title,
      subtitle: item.purpose,
      typeTag: (item.tags[0] || "prompt").toUpperCase(),
      minutes: 5,
      updatedAtISO: item.updatedAtISO,
    })),
    ...DATA.updates.map((item) => ({
      kind: "update" as const,
      id: item.id,
      slug: item.slug,
      title: item.headline,
      subtitle: item.tldr,
      typeTag: item.model.toUpperCase(),
      minutes: 4,
      updatedAtISO: item.updatedAtISO,
    })),
    ...DATA.collections.map((item) => ({
      kind: "collection" as const,
      id: item.id,
      slug: item.slug,
      title: item.title,
      subtitle: item.description,
      typeTag: "COLLECTION",
      minutes: 7,
      updatedAtISO: item.updatedAtISO,
    })),
    ...DATA.comparisons.map((item) => ({
      kind: "comparison" as const,
      id: item.id,
      slug: item.slug,
      title: item.title,
      subtitle: item.description,
      typeTag: "VS",
      minutes: 6,
      updatedAtISO: item.updatedAtISO,
    })),
  ].sort(SORT_RECENT);

  const kinds: Record<CategoryKey, IndexItem["kind"]> = {
    tools: "tool",
    prompts: "prompt",
    updates: "update",
    compare: "comparison",
  };

  const categoryItemsByKey = {} as HomePageData["categoryItemsByKey"];
  for (const category of Object.keys(kinds) as CategoryKey[]) {
    const entries = rows.filter((item) => item.kind === kinds[category]).slice(0, 9);
    categoryItemsByKey[category] = {
      cards: entries.slice(0, 3),
      rows: entries.slice(3),
    };
  }

  return (
    <ToolDropAI
      latestFeed={rows.slice(0, 9)}
      featuredCols={DATA.collections.slice(0, 4).map((item) => ({
        id: item.id,
        slug: item.slug,
        title: item.title,
        description: item.description,
        updatedAtISO: item.updatedAtISO,
      }))}
      categoryItemsByKey={categoryItemsByKey}
    />
  );
}
