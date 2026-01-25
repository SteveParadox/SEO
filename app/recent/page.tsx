"use client";

import * as React from "react";
import Link from "next/link";
import { History, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { readRecent, clearRecent, type RecentItem } from "@/lib/recent";
import { hrefFor, type UnifiedItem } from "@/lib/data";

function kindLabel(kind: RecentItem["kind"]) {
  if (kind === "tool") return "Tool";
  if (kind === "prompt") return "Prompt";
  if (kind === "update") return "Update";
  if (kind === "collection") return "Collection";
  return "Comparison";
}

export default function RecentPage() {
  const [items, setItems] = React.useState<RecentItem[]>([]);

  React.useEffect(() => {
    setItems(readRecent());

    function onStorage(e: StorageEvent) {
      if (e.key === "tooldrop_recent_v1") setItems(readRecent());
    }
    window.addEventListener("storage", onStorage);

    // Same-tab updates: cheap polling
    const t = window.setInterval(() => setItems(readRecent()), 800);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.clearInterval(t);
    };
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-2xl border flex items-center justify-center">
            <History className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold">Recently viewed</h1>
            <p className="mt-1 text-muted-foreground">
              Stuff you opened. Because human memory is a rumor.
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          className="rounded-2xl"
          disabled={items.length === 0}
          onClick={() => {
            clearRecent();
            setItems([]);
          }}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear
        </Button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((it) => (
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

        {items.length === 0 ? (
          <Card className="rounded-2xl md:col-span-2">
            <CardContent className="p-8 text-center">
              <div className="text-lg font-medium">No recent history yet.</div>
              <div className="mt-2 text-muted-foreground">
                Click around a bit. This page is shy.
              </div>
              <div className="mt-5 flex items-center justify-center gap-2">
                <Button asChild className="rounded-2xl">
                  <Link href="/tools">Browse tools</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-2xl">
                  <Link href="/prompts">Browse prompts</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}