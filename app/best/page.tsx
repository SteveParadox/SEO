import type { Metadata } from "next";
import Link from "next/link";
import { DATA } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Best AI Tool Lists — ToolDrop AI",
  description: "High-intent tool lists: ranked picks, tradeoffs, and quick recommendations.",
};

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
        {pages.map((p) => (
          <Link key={p.id} href={`/best/${p.slug}`}>
            <Card className="rounded-2xl hover:bg-muted/40 transition">
              <CardContent className="p-5">
                <div className="flex flex-wrap gap-2">
                  {p.tags.slice(0, 4).map((t) => (
                    <Badge key={t} variant="secondary" className="rounded-full">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="mt-2 font-semibold">{p.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{p.description}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}