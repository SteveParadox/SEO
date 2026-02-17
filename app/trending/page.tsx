"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { Flame, Timer, ArrowRight, Copy, Wrench, TrendingUp, BadgeCheck, Trophy } from "lucide-react";
import { Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/lib/data";

const itemTypeMeta = {
  tool: { label: "Tool", icon: Wrench },
  prompt: { label: "Prompt", icon: Copy },
  update: { label: "Update", icon: TrendingUp },
  collection: { label: "Collection", icon: BadgeCheck },
  comparison: { label: "Comparison", icon: Scale },
  best: { label: "Best List", icon: Trophy },
} as const;

type Kind = keyof typeof itemTypeMeta;

function daysAgo(iso: string) {
  const ms = Date.now() - new Date(iso + "T00:00:00").getTime();
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
}
function freshnessLabel(iso: string) {
  const d = daysAgo(iso);
  if (d <= 1) return "New";
  if (d <= 7) return "This week";
  if (d <= 21) return "Recent";
  return "Evergreen";
}
function hrefFor(kind: Kind, slug: string) {
  if (kind === "tool") return `/tools/${slug}`;
  if (kind === "prompt") return `/prompts/${slug}`;
  if (kind === "update") return `/updates/${slug}`;
  if (kind === "collection") return `/collections/${slug}`;
  if (kind === "best") return `/best/${slug}`;
  return `/comparisons/${slug}`;
}

type IndexItem = {
  kind: Kind;
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  minutes: number;
  updatedAtISO: string;
};

function TrendingCard({ item }: { item: IndexItem }) {
  const meta = itemTypeMeta[item.kind];

  return (
    <Card className="relative overflow-hidden rounded-2xl hover:bg-muted/40 transition">
      <Link href={hrefFor(item.kind, item.slug)} aria-label={item.title} className="absolute inset-0 z-10 rounded-2xl">
        <span className="sr-only">{item.title}</span>
      </Link>

      <CardContent className="relative z-20 pointer-events-none p-5">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="rounded-full">{meta.label}</Badge>
          <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
            <Timer className="h-3.5 w-3.5" /> {item.minutes} min
          </span>
          <Badge variant="secondary" className="rounded-full">{freshnessLabel(item.updatedAtISO)}</Badge>
        </div>

        <div className="mt-2 text-lg font-semibold leading-snug">{item.title}</div>
        <div className="mt-2 text-sm text-muted-foreground line-clamp-2">{item.subtitle}</div>

        <div className="mt-3 text-sm text-muted-foreground inline-flex items-center gap-1">
          Open <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function TrendingPage() {
  const trending = useMemo<IndexItem[]>(() => {
    const idx: IndexItem[] = [];

    DATA.tools.forEach((t) => idx.push({ kind: "tool", id: t.id, slug: t.slug, title: t.name, subtitle: t.oneLiner, minutes: 6, updatedAtISO: t.updatedAtISO }));
    DATA.prompts.forEach((p) => idx.push({ kind: "prompt", id: p.id, slug: p.slug, title: p.title, subtitle: p.purpose, minutes: 5, updatedAtISO: p.updatedAtISO }));
    DATA.updates.forEach((u) => idx.push({ kind: "update", id: u.id, slug: u.slug, title: u.headline, subtitle: u.tldr, minutes: 4, updatedAtISO: u.updatedAtISO }));
    DATA.collections.forEach((c) => idx.push({ kind: "collection", id: c.id, slug: c.slug, title: c.title, subtitle: c.description, minutes: 7, updatedAtISO: c.updatedAtISO }));
    DATA.comparisons.forEach((c) => idx.push({ kind: "comparison", id: c.id, slug: c.slug, title: c.title, subtitle: c.description, minutes: 6, updatedAtISO: c.updatedAtISO }));
    DATA.bestPages?.forEach?.((b: any) => idx.push({ kind: "best", id: b.id, slug: b.slug, title: b.title, subtitle: b.description, minutes: 8, updatedAtISO: b.updatedAtISO }));

    // For now "trending" = newest. Later replace with analytics.
    idx.sort((a, b) => new Date(b.updatedAtISO).getTime() - new Date(a.updatedAtISO).getTime());
    return idx.slice(0, 30);
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-2xl border flex items-center justify-center">
          <Flame className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-semibold">Trending</h1>
          <p className="mt-1 text-muted-foreground">
            Popular and fresh resources. Today it’s “newest”, later it can be real engagement.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {trending.map((it) => (
          <TrendingCard key={`${it.kind}-${it.id}`} item={it} />
        ))}
      </div>
    </div>
  );
}
