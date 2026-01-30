import type { Metadata } from "next";
import Link from "next/link";
import { getAllTagsWithCounts } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Tags — ToolDrop AI",
  description:
    "Browse everything by tags: tools, prompts, updates, collections, and comparisons.",
  alternates: { canonical: absoluteUrl("/tags") },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Tags — ToolDrop AI",
    description:
      "Browse everything by tags: tools, prompts, updates, collections, and comparisons.",
    url: absoluteUrl("/tags"),
    siteName: "ToolDrop AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tags — ToolDrop AI",
    description:
      "Browse everything by tags: tools, prompts, updates, collections, and comparisons.",
  },
};

export default async function TagsIndexPage() {
  const tags = await getAllTagsWithCounts(); // works sync or async

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Tags</h1>
      <p className="mt-2 text-muted-foreground">
        Browse content by topic to quickly find what you need.
      </p>

      <Card className="mt-6 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base">All tags</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-wrap gap-2">
          {tags.map(({ tag, count }) => {
            const slug = encodeURIComponent(tag.toLowerCase());

            return (
              <Link key={slug} href={`/tags/${slug}`}>
                <Badge variant="secondary" className="rounded-full cursor-pointer">
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
