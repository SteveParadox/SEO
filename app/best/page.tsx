import type { Metadata } from "next";
import Link from "next/link";
import { DATA } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Best AI Tool Lists — ToolDrop AI",
  description: "High-intent tool lists: ranked picks, tradeoffs, and quick recommendations.",
  alternates: { canonical: absoluteUrl("/best") },
  robots: { index: true, follow: true },
};

function formatUpdated(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export default function BestIndexPage() {
  const pages = [...DATA.bestPages].sort(
    (a, b) => new Date(b.updatedAtISO).getTime() - new Date(a.updatedAtISO).getTime()
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Best AI Tool Lists</h1>
      <p className="mt-2 text-muted-foreground">
        Curated rankings to help you choose the right tools for your needs.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {pages.map((p) => {
          const href = `/best/${p.slug}`;
          const snippet = p.intro?.[0] ?? p.description;

          return (
            <Card
              key={p.id}
              className="rounded-2xl hover:bg-muted/40 transition relative overflow-hidden"
            >
              {/* Stretched link */}
              <Link href={href} aria-label={p.title} className="absolute inset-0 z-10" />

              <CardContent className="p-5 relative z-20">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {p.tags.slice(0, 4).map((t) => {
                      const label = t.trim();
                      const tagSlug = encodeURIComponent(label.toLowerCase());

                      return (
                        <Link
                          key={`${p.id}-${tagSlug}`}
                          href={`/tags/${tagSlug}`}
                          className="relative z-30 inline-flex"
                          aria-label={`Tag: ${label}`}
                        >
                          <Badge variant="secondary" className="rounded-full">
                            {label}
                          </Badge>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="text-xs text-muted-foreground shrink-0">
                    Updated {formatUpdated(p.updatedAtISO)}
                  </div>
                </div>

                <div className="mt-3 font-semibold">{p.title}</div>
                <div className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {snippet}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
