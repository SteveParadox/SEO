"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Flame, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ENGAGEMENT_EVENT, getTrendingItems } from "@/lib/engagement";
import { RECENT_EVENT } from "@/lib/recent";
import { SAVED_EVENT } from "@/lib/saved";
import { hrefFor } from "@/lib/data";
import { getFreshnessBucket } from "@/lib/search-utils";

function freshnessLabel(updatedAtISO: string) {
  const bucket = getFreshnessBucket(updatedAtISO);
  if (bucket === "new") return "New";
  if (bucket === "week") return "This week";
  if (bucket === "recent") return "Recent";
  return "Evergreen";
}

function TrendingCard({
  item,
}: {
  item: ReturnType<typeof getTrendingItems>[number];
}) {
  return (
    <Card className="relative overflow-hidden rounded-2xl transition hover:bg-muted/40">
      <Link
        href={hrefFor(item.kind, item.slug)}
        aria-label={item.title}
        className="absolute inset-0 z-10 rounded-2xl"
      >
        <span className="sr-only">{item.title}</span>
      </Link>

      <CardContent className="relative z-20 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="rounded-full">
            {item.kind === "best" ? "Best List" : item.kind}
          </Badge>
          <Badge variant="secondary" className="rounded-full">
            {freshnessLabel(item.updatedAtISO)}
          </Badge>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Timer className="h-3.5 w-3.5" /> {item.kind === "update" ? 4 : item.kind === "prompt" ? 5 : item.kind === "collection" ? 7 : item.kind === "best" ? 8 : 6} min
          </span>
        </div>

        <div className="mt-3 text-lg font-semibold leading-snug">{item.title}</div>
        <div className="mt-2 line-clamp-2 text-sm text-muted-foreground">{item.subtitle}</div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span>{item.reason}</span>
          <span>Views {item.signals.views}</span>
          <span>Saves {item.signals.saves}</span>
          <span>Clicks {item.signals.outbounds}</span>
        </div>

        <div className="mt-4 inline-flex items-center gap-1 text-sm text-muted-foreground">
          Open <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function TrendingPage() {
  const [items, setItems] = React.useState(() => getTrendingItems(30));

  React.useEffect(() => {
    const refresh = () => setItems(getTrendingItems(30));

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
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border">
          <Flame className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-semibold">Trending</h1>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <TrendingCard key={`${item.kind}-${item.id}`} item={item} />
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button variant="outline" className="rounded-full" asChild>
          <Link href="/search">Search everything</Link>
        </Button>
        <Button variant="outline" className="rounded-full" asChild>
          <Link href="/saved">Open saved items</Link>
        </Button>
      </div>
    </div>
  );
}
