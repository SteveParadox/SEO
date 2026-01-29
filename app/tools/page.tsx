"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { DATA } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ToolsIndexPage() {
  const router = useRouter();

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
          <Card
            key={t.id}
            role="link"
            tabIndex={0}
            onClick={() => router.push(`/tools/${t.slug}`)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                router.push(`/tools/${t.slug}`);
              }
            }}
            className="rounded-2xl hover:bg-muted/40 transition cursor-pointer"
          >
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
                      aria-label={`Tag: ${tag}`}
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
        ))}
      </div>
    </div>
  );
}