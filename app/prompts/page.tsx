import type { Metadata } from "next";
import Link from "next/link";
import { DATA } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Prompts — ToolDrop AI",
  description: "Browse copy-paste prompts that actually improve results.",
  alternates: { canonical: absoluteUrl("/prompts") },
  robots: { index: true, follow: true },
};

export default function PromptsIndexPage() {
  const prompts = [...DATA.prompts].sort(
    (a, b) => new Date(b.updatedAtISO).getTime() - new Date(a.updatedAtISO).getTime()
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Prompts</h1>
      <p className="mt-2 text-muted-foreground">
        Effective, ready-to-use prompts designed to improve your AI results.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {prompts.map((p) => (
          <Card
            key={p.id}
            className="relative overflow-hidden rounded-2xl hover:bg-muted/40 transition"
          >
            {/* Overlay link: captures clicks/taps anywhere on the card */}
            <Link
              href={`/prompts/${p.slug}`}
              aria-label={p.title}
              className="absolute inset-0 z-10 rounded-2xl"
            >
              <span className="sr-only">{p.title}</span>
            </Link>

            {/* Content: disable pointer events so overlay link works everywhere */}
            <CardContent className="relative z-20 pointer-events-none p-5">
              {/* Tags are not links here, so no need to re-enable pointer-events */}
              <div className="flex items-center gap-2 flex-wrap">
                {p.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="rounded-full">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-2 font-semibold">{p.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{p.purpose}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
