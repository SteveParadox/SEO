import type { Metadata } from "next";
import Link from "next/link";
import { getAllTagsWithCounts } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { INDEXABLE_ROBOTS, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Tags - Xavkit",
  description:
    "Browse Xavkit topics by tag to discover related tools, prompts, comparisons, and best lists.",
  alternates: { canonical: absoluteUrl("/tags") },
  robots: INDEXABLE_ROBOTS,
  openGraph: {
    title: "Tags - Xavkit",
    description:
      "Browse Xavkit topics by tag to discover related tools, prompts, comparisons, and best lists.",
    url: absoluteUrl("/tags"),
    siteName: "Xavkit",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tags - Xavkit",
    description:
      "Browse Xavkit topics by tag to discover related tools, prompts, comparisons, and best lists.",
  },
};

export default async function TagsIndexPage() {
  const tags = await getAllTagsWithCounts();
  const highSignalTags = tags.filter(({ count }) => count >= 2);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Browse by Tag</h1>
      <p className="mt-3 max-w-3xl text-muted-foreground">
        Tags connect related pages across the site so visitors can jump between tools,
        prompts, comparisons, and best lists without starting a new search.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Card className="rounded-2xl">
          <CardContent className="p-5">
            <div className="text-sm text-muted-foreground">All tags</div>
            <div className="mt-2 text-3xl font-semibold">{tags.length}</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-5">
            <div className="text-sm text-muted-foreground">High-signal tags</div>
            <div className="mt-2 text-3xl font-semibold">{highSignalTags.length}</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-5">
            <div className="text-sm text-muted-foreground">Suggested path</div>
            <div className="mt-2 text-sm font-medium">
              Start with a tag, then open the best list or comparison linked from it.
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base">Popular tags</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-wrap gap-2">
          {highSignalTags.map(({ tag, count }) => {
            const slug = encodeURIComponent(tag.toLowerCase());

            return (
              <Link key={slug} href={`/tags/${slug}`}>
                <Badge variant="secondary" className="cursor-pointer rounded-full">
                  {tag}
                  <span className="ml-2 opacity-70">{count}</span>
                </Badge>
              </Link>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
