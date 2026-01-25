"use client";

import * as React from "react";
import Link from "next/link";
import { History } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { readRecent, type RecentItem, RECENT_EVENT } from "@/lib/recent";
import { hrefFor, type UnifiedItem } from "@/lib/data";

function kindLabel(kind: RecentItem["kind"]) {
  if (kind === "tool") return "Tool";
  if (kind === "prompt") return "Prompt";
  if (kind === "update") return "Update";
  if (kind === "collection") return "Collection";
  return "Comparison";
}

export function RecentlyViewed({ limit = 6 }: { limit?: number }) {
  const [items, setItems] = React.useState<RecentItem[]>([]);

  React.useEffect(() => {
    const refresh = () => setItems(readRecent());

    refresh();

    function onStorage(e: StorageEvent) {
      if (e.key === "tooldrop_recent_v1") refresh();
    }

    function onRecentChanged() {
      refresh(); // ✅ same-tab updates
    }

    window.addEventListener("storage", onStorage);
    window.addEventListener(RECENT_EVENT, onRecentChanged as EventListener);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(RECENT_EVENT, onRecentChanged as EventListener);
    };
  }, []);

  const shown = items.slice(0, limit);

  if (shown.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10" aria-label="Recently viewed">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-2">
            <History className="h-5 w-5" /> Recently viewed
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Your click history, but make it useful.
          </p>
        </div>
        <Link href="/recent" className="text-sm text-muted-foreground hover:text-foreground">
          View all →
        </Link>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {shown.map((it) => (
          <Link
            key={`${it.kind}-${it.id}`}
            href={hrefFor(it.kind as UnifiedItem["kind"], it.slug)}
          >
            <Card className="rounded-2xl hover:bg-muted/40 transition">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Badge variant="outline" className="rounded-full">
                    {kindLabel(it.kind)}
                  </Badge>
                  <span className="line-clamp-1">{it.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-sm text-muted-foreground line-clamp-2">
                  {it.subtitle}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}