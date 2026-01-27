import type { Metadata } from "next";
import Link from "next/link";
import { DATA } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Tools — ToolDrop AI",
  description: "Browse AI tools by category, use case, and latest updates.",
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
        {tools.map((t) => (
          <Link key={t.id} href={`/tools/${t.slug}`} className="block">
            <Card className="rounded-2xl hover:bg-muted/40 transition">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 flex-wrap">
                  {t.tags.slice(0, 3).map((rawTag) => {
                    const tag = rawTag.trim();
                    const tagSlug = encodeURIComponent(tag.toLowerCase());

                    return (
                      <Link
                        key={`${t.id}-${tagSlug}`}
                        href={`/tags/${tagSlug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex"
                      >
                        <Badge variant="secondary" className="rounded-full">
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
          </Link>
        ))}
      </div>
    </div>
  );
}
