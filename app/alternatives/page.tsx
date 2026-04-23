import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getAlternativePageDataBySlug,
  getAlternativePageStaticSlugs,
} from "@/lib/alternatives";
import type { AlternativePageData } from "@/lib/alternatives";
import { INDEXABLE_ROBOTS, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Best AI Tool Alternatives - Xavkit",
  description:
    "Browse indexable alternatives pages for major AI tools. Compare substitutes, pricing tradeoffs, and the best picks for different workflows.",
  alternates: {
    canonical: absoluteUrl("/alternatives"),
  },
  robots: INDEXABLE_ROBOTS,
  openGraph: {
    title: "Best AI Tool Alternatives - Xavkit",
    description:
      "Browse indexable alternatives pages for major AI tools and compare the strongest substitute options.",
    url: absoluteUrl("/alternatives"),
    siteName: "Xavkit",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Tool Alternatives - Xavkit",
    description:
      "Browse indexable alternatives pages for major AI tools and compare the strongest substitute options.",
  },
};

function buildRows() {
  return getAlternativePageStaticSlugs()
    .map((slug) => getAlternativePageDataBySlug(slug))
    .filter((row): row is AlternativePageData => Boolean(row))
    .sort((a, b) => {
      const scoreDiff = b.alternatives[0].score - a.alternatives[0].score;
      if (scoreDiff !== 0) return scoreDiff;

      const countDiff = b.alternatives.length - a.alternatives.length;
      if (countDiff !== 0) return countDiff;

      return a.source.name.localeCompare(b.source.name);
    });
}

export default function AlternativesIndexPage() {
  const rows = buildRows();
  const featuredTags = Array.from(
    new Set(rows.flatMap((row) => row.relatedTags).slice(0, 30))
  ).slice(0, 10);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border">
          <ArrowRightLeft className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-semibold">AI tool alternatives</h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            Browse high-intent alternatives pages built from the existing tool graph. Each page
            focuses on one product, the closest substitutes we can support with real data, and the
            tradeoffs that matter when you are deciding whether to switch.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {featuredTags.map((tag) => {
          const tagSlug = encodeURIComponent(tag.trim().toLowerCase());
          return (
            <Link key={tagSlug} href={`/tags/${tagSlug}`}>
              <Badge variant="secondary" className="rounded-full">
                {tag}
              </Badge>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">What these pages answer</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Which tool is the strongest alternative, who should switch, who should stay, and where
            to go next for deeper comparisons.
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">Best for</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            People searching for phrases like &quot;ChatGPT alternatives&quot;, &quot;Cursor
            alternatives&quot;, or &quot;best alternative to Notion AI&quot;.
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">How to use them</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Open a source tool, compare the ranked shortlist, then jump into related comparison and
            best-list coverage when you need more context.
          </CardContent>
        </Card>
      </div>

      {rows.length > 0 ? (
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {rows.map((row) => (
            <Link key={row.source.id} href={`/alternatives/${row.source.slug}`}>
              <Card className="h-full rounded-2xl transition hover:bg-muted/40">
                <CardHeader className="pb-3">
                  <CardTitle className="flex flex-wrap items-center gap-2 text-base">
                    <Badge variant="outline" className="rounded-full">
                      {row.alternatives.length} options
                    </Badge>
                    <span>Best alternatives to {row.source.name}</span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4 pt-0 text-sm text-muted-foreground">
                  <p className="line-clamp-2">{row.source.description}</p>

                  <div className="space-y-2">
                    <div className="font-medium text-foreground">Top shortlist</div>
                    <div className="flex flex-wrap gap-2">
                      {row.alternatives.slice(0, 3).map((item) => (
                        <Badge
                          key={`${row.source.id}-${item.tool.id}`}
                          variant="secondary"
                          className="rounded-full"
                        >
                          {item.tool.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {row.beginnerPick ? (
                      <div className="rounded-xl border p-3">
                        <div className="font-medium text-foreground">Best for beginners</div>
                        <div className="mt-1">{row.beginnerPick.alternative.tool.name}</div>
                      </div>
                    ) : null}

                    {row.budgetPick ? (
                      <div className="rounded-xl border p-3">
                        <div className="font-medium text-foreground">Best on a budget</div>
                        <div className="mt-1">{row.budgetPick.alternative.tool.name}</div>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-center gap-2 text-foreground">
                    <span className="font-medium">Open alternatives page</span>
                    <ArrowRightLeft className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="mt-10 rounded-2xl">
          <CardContent className="p-6 text-sm text-muted-foreground">
            No alternatives hubs are available yet. Add more resolved alternative links in the tool
            data and this index will fill itself automatically.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
