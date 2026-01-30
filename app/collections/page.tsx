import type { Metadata } from "next";
import Link from "next/link";
import { DATA } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Collections — ToolDrop AI",
  description: "Browse curated collections: ranked picks for specific goals and audiences.",
  alternates: { canonical: absoluteUrl("/collections") },
  robots: { index: true, follow: true },
};

export default function CollectionsIndexPage() {
  const collections = [...DATA.collections].sort(
    (a, b) => new Date(b.updatedAtISO).getTime() - new Date(a.updatedAtISO).getTime()
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Collections</h1>
      <p className="mt-2 text-muted-foreground">
        Hand-picked collections organized by use case and goal.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {collections.map((c) => (
          <Card
            key={c.id}
            className="rounded-2xl hover:bg-muted/40 transition relative overflow-hidden"
          >
            {/* Stretched link for the whole card */}
            <Link
              href={`/collections/${c.slug}`}
              aria-label={c.title}
              className="absolute inset-0 z-10"
            />

            <CardContent className="p-5 relative z-20">
              <div className="flex items-center gap-2 flex-wrap">
                {c.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="rounded-full">
                    {tag}
                  </Badge>
                ))}

                <Badge variant="outline" className="rounded-full">
                  {c.items.length} items
                </Badge>
              </div>

              <div className="mt-2 font-semibold">{c.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">
                {c.description}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
