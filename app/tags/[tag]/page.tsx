import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JsonLd } from "@/components/json-ld";
import {
  DATA,
  getItemsByTag,
  getRelatedTags,
  getTagKindCounts,
  hrefFor,
  getLatestUpdatedForTag,
} from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

type PageProps = {
  params: Promise<{ tag: string }>;
};

type TagItem = ReturnType<typeof getItemsByTag>[number];

const KIND_LABELS: Record<TagItem["kind"], string> = {
  tool: "Tool",
  prompt: "Prompt",
  update: "Update",
  collection: "Collection",
  comparison: "Comparison",
  best: "Best List",
};

const TAG_EDITORIAL: Record<string, { intro: string }> = {
  diagrams: {
    intro:
      "Diagram tools on Xavkit cover a few different jobs: quick hand-drawn thinking, collaborative whiteboarding, and more structured visual planning. The useful distinction is not whether a tool can draw boxes and arrows, but whether it helps you think faster alone, explain systems clearly to a team, or run workshops without canvas chaos.",
  },
};

function titleCase(input: string) {
  return input
    .split("-")
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(" ");
}

function normalizeTag(raw: string) {
  return decodeURIComponent(raw).trim().toLowerCase();
}

function buildTagIntro(displayTag: string, count: number) {
  return `Browse ${count} Xavkit page${count === 1 ? "" : "s"} related to ${displayTag}. This hub connects tools, prompts, comparisons, and guides so visitors can move from discovery to a more specific page without backtracking.`;
}

function sortTagItems(items: TagItem[]) {
  const order: Record<TagItem["kind"], number> = {
    best: 0,
    comparison: 1,
    collection: 2,
    tool: 3,
    prompt: 4,
    update: 5,
  };

  return [...items].sort((a, b) => {
    const byKind = order[a.kind] - order[b.kind];
    if (byKind !== 0) return byKind;
    return a.title.localeCompare(b.title);
  });
}

export function generateStaticParams() {
  const set = new Set<string>();

  for (const t of DATA.tools) for (const tag of t.tags ?? []) set.add(tag.trim().toLowerCase());
  for (const p of DATA.prompts) for (const tag of p.tags ?? []) set.add(tag.trim().toLowerCase());
  for (const u of DATA.updates) for (const tag of u.tags ?? []) set.add(tag.trim().toLowerCase());
  for (const c of DATA.collections) for (const tag of c.tags ?? []) set.add(tag.trim().toLowerCase());
  for (const c of DATA.comparisons) for (const tag of c.tags ?? []) set.add(tag.trim().toLowerCase());
  for (const b of DATA.bestPages) for (const tag of b.tags ?? []) set.add(tag.trim().toLowerCase());

  return Array.from(set).map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag: rawTag } = await params;
  const tag = normalizeTag(rawTag);

  if (!tag) {
    return {
      title: "Tag not found - Xavkit",
      robots: { index: false, follow: false },
    };
  }

  const items = getItemsByTag(tag);
  if (!items.length) {
    return {
      title: "Tag not found - Xavkit",
      robots: { index: false, follow: false },
    };
  }

  const displayTag = titleCase(tag).trim();
  const title = `${displayTag} AI Resources - Xavkit`;
  const description = buildTagIntro(displayTag, items.length).slice(0, 160);
  const url = absoluteUrl(`/tags/${encodeURIComponent(tag)}`);
  const shouldIndex = items.length >= 2;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: shouldIndex ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: "Xavkit",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag: rawTag } = await params;

  const tag = normalizeTag(rawTag);
  if (!tag) return notFound();

  const items = getItemsByTag(tag);
  if (!items.length) return notFound();

  const displayTag = titleCase(tag);
  const sortedItems = sortTagItems(items);
  const kindCounts = getTagKindCounts(tag);
  const relatedTags = getRelatedTags(tag, 8);
  const latestUpdate = getLatestUpdatedForTag(tag);
  const pageUrl = absoluteUrl(`/tags/${encodeURIComponent(tag)}`);
  const shouldIndex = items.length >= 2;
  const editorial = TAG_EDITORIAL[tag];

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${displayTag} resources`,
    description: buildTagIntro(displayTag, items.length),
    url: pageUrl,
    dateModified: latestUpdate ?? undefined,
    isPartOf: absoluteUrl("/tags"),
    about: displayTag,
    mainEntity: sortedItems.map((item) => ({
      "@type": "ListItem",
      name: item.title,
      url: absoluteUrl(hrefFor(item.kind, item.slug)),
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd data={collectionSchema} />

      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="secondary" className="rounded-full">
          Tag
        </Badge>
        {!shouldIndex ? (
          <Badge variant="outline" className="rounded-full">
            Focused archive
          </Badge>
        ) : null}
      </div>

      <h1 className="mt-4 text-3xl font-semibold">{displayTag}</h1>
      {editorial?.intro ? (
        <p className="mt-3 max-w-3xl text-muted-foreground">{editorial.intro}</p>
      ) : null}

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-2xl">
          <CardContent className="p-5">
            <div className="text-sm text-muted-foreground">Matched pages</div>
            <div className="mt-2 text-3xl font-semibold">{items.length}</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-5">
            <div className="text-sm text-muted-foreground">Content types</div>
            <div className="mt-2 text-3xl font-semibold">{kindCounts.length}</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-5">
            <div className="text-sm text-muted-foreground">Latest update</div>
            <div className="mt-2 text-lg font-semibold">
              {latestUpdate
                ? new Date(`${latestUpdate}T00:00:00`).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "N/A"}
            </div>
          </CardContent>
        </Card>

      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.6fr_minmax(0,0.9fr)]">
        <div className="grid gap-4 md:grid-cols-2">
          {sortedItems.map((item) => (
            <Link key={`${item.kind}-${item.id}`} href={hrefFor(item.kind, item.slug)} className="block">
              <Card className="h-full rounded-2xl hover:bg-muted/40 transition">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Badge variant="outline" className="rounded-full capitalize">
                      {KIND_LABELS[item.kind]}
                    </Badge>
                    <span className="line-clamp-1">{item.title}</span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-3">{item.subtitle}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid gap-4 self-start">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base">Content mix</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {kindCounts.map(({ kind, count }) => (
                <div key={kind} className="flex items-center justify-between rounded-xl border px-3 py-2 text-sm">
                  <span>{KIND_LABELS[kind]}</span>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {relatedTags.length > 0 ? (
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base">Related tags</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {relatedTags.map(({ tag: relatedTag, count }) => {
                  const slug = encodeURIComponent(relatedTag);
                  return (
                    <Link key={slug} href={`/tags/${slug}`}>
                      <Badge variant="secondary" className="rounded-full">
                        {titleCase(relatedTag)} {count > 1 ? `(${count})` : ""}
                      </Badge>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          ) : null}

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base">Explore further</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <Link href="/tags" className="rounded-full border px-3 py-1 hover:bg-muted/40 transition">
                All tags
              </Link>
              <Link href="/tools" className="rounded-full border px-3 py-1 hover:bg-muted/40 transition">
                Tools
              </Link>
              <Link href="/prompts" className="rounded-full border px-3 py-1 hover:bg-muted/40 transition">
                Prompts
              </Link>
              <Link href="/best" className="rounded-full border px-3 py-1 hover:bg-muted/40 transition">
                Best lists
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
