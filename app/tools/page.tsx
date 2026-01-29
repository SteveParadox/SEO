import type { Metadata } from "next";
import Link from "next/link";
import { DATA } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Tools — ToolDrop AI",
  description: "Discover curated AI tools by real use cases, not marketing noise.",
  alternates: { canonical: absoluteUrl("/tools") },
};

export default function ToolsIndexPage() {
  const tools = [...DATA.tools].sort(
    (a, b) => new Date(b.updatedAtISO).getTime() - new Date(a.updatedAtISO).getTime()
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Tools</h1>
      <p className="mt-2 text-muted-foreground">
        Discover curated AI tools by real use cases, not marketing noise.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {tools.map((t) => {
          const href = `/tools/${t.slug}`;

          return (
            <Card
              key={t.id}
              className="rounded-2xl hover:bg-muted/40 transition relative"
            >
              {/* Whole card clickable (works on mobile too) */}
              <Link
                href={href}
                aria-label={t.name}
                className="absolute inset-0 rounded-2xl z-0"
              >
                <span className="sr-only">{t.name}</span>
              </Link>

              <CardContent className="p-5 relative z-10">
                <div className="flex items-center gap-2 flex-wrap">
                  {t.tags.slice(0, 3).map((rawTag) => {
                    const tag = rawTag.trim();
                    const tagSlug = encodeURIComponent(tag.toLowerCase());

                    return (
                      <Link
                        key={`${t.id}-${tagSlug}`}
                        href={`/tags/${tagSlug}`}
                        className="inline-flex"
                        aria-label={`Tag: ${tag}`}
                      >
                        <Badge
                          variant="secondary"
                          className="rounded-full relative z-20"
                        >
                          {tag}
                        </Badge>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-2 font-semibold">{t.name}</div>
                <div className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {t.oneLiner}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}