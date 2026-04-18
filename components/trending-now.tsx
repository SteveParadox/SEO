"use client";

import * as React from "react";
import Link from "next/link";
import { Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTrendingItems, ENGAGEMENT_EVENT } from "@/lib/engagement";
import { hrefFor } from "@/lib/data";
import { RECENT_EVENT } from "@/lib/recent";
import { SAVED_EVENT } from "@/lib/saved";

export function TrendingNow({ limit = 4 }: { limit?: number }) {
  const [items, setItems] = React.useState(() => getTrendingItems(limit));

  React.useEffect(() => {
    const refresh = () => setItems(getTrendingItems(limit));

    refresh();
    window.addEventListener(ENGAGEMENT_EVENT, refresh as EventListener);
    window.addEventListener(RECENT_EVENT, refresh as EventListener);
    window.addEventListener(SAVED_EVENT, refresh as EventListener);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener(ENGAGEMENT_EVENT, refresh as EventListener);
      window.removeEventListener(RECENT_EVENT, refresh as EventListener);
      window.removeEventListener(SAVED_EVENT, refresh as EventListener);
      window.removeEventListener("storage", refresh);
    };
  }, [limit]);

  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10" aria-label="Trending now">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight md:text-3xl">
            <Flame className="h-5 w-5" /> Trending now
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Popular picks gaining momentum across tools, prompts, updates, and rankings.
          </p>
        </div>
        <Link href="/trending" className="text-sm text-muted-foreground hover:text-foreground">
          Open full trending &gt;
        </Link>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <Link key={`${item.kind}-${item.id}`} href={hrefFor(item.kind, item.slug)}>
            <Card className="rounded-2xl transition hover:bg-muted/40">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Badge variant="outline" className="rounded-full capitalize">
                    {item.kind === "best" ? "Best List" : item.kind}
                  </Badge>
                  <span className="line-clamp-1">{item.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="line-clamp-2 text-sm text-muted-foreground">{item.subtitle}</div>
                <div className="mt-3 text-xs text-muted-foreground">
                  {item.reason} | Views {item.signals.views} | Saves {item.signals.saves}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
