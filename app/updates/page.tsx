import type { Metadata } from "next";
import Link from "next/link";
import { DATA } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Model Updates — ToolDrop AI",
  description: "Browse model and ecosystem updates translated into plain English.",
  alternates: { canonical: absoluteUrl("/updates") },
  robots: { index: true, follow: true },
};

export default function UpdatesIndexPage() {
  const updates = [...DATA.updates].sort(
    (a, b) => new Date(b.updatedAtISO).getTime() - new Date(a.updatedAtISO).getTime()
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Model Updates</h1>
      <p className="mt-2 text-muted-foreground">
        Track the latest changes and improvements to leading AI models.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {updates.map((u) => (
          <Card
            key={u.id}
            className="rounded-2xl hover:bg-muted/40 transition relative overflow-hidden"
          >
            {/* Stretched link for whole card */}
            <Link
              href={`/updates/${u.slug}`}
              aria-label={u.headline}
              className="absolute inset-0 z-10"
            />

            <CardContent className="p-5 relative z-20">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="rounded-full">
                  {u.model}
                </Badge>

                {u.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="rounded-full">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-2 font-semibold">{u.headline}</div>

              <div className="mt-1 text-sm text-muted-foreground">
                {u.tldr}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
