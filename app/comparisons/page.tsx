import type { Metadata } from "next";
import Link from "next/link";
import { DATA } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Comparisons — ToolDrop AI",
  description:
    "Browse tool and prompt comparisons: X vs Y vs Z with clear verdicts.",
};

export default async function ComparisonsIndexPage() {
  const comparisons = [...DATA.comparisons].sort(
    (a, b) =>
      new Date(b.updatedAtISO).getTime() - new Date(a.updatedAtISO).getTime()
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Comparisons</h1>

      <p className="mt-2 text-muted-foreground">
        Side-by-side comparisons highlighting strengths, limitations, and ideal use cases.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {comparisons.map((c) => (
          <Link key={c.id} href={`/comparisons/${c.slug}`}>
            <Card className="rounded-2xl hover:bg-muted/40 transition">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 flex-wrap">
                  {c.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="rounded-full"
                    >
                      {tag}
                    </Badge>
                  ))}

                  <Badge variant="outline" className="rounded-full">
                    {c.contenders.length} contenders
                  </Badge>
                </div>

                <div className="mt-2 font-semibold">{c.title}</div>

                <div className="mt-1 text-sm text-muted-foreground">
                  {c.description}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}