"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Timer, ArrowRight, Copy, Wrench, TrendingUp, BadgeCheck, Trophy } from "lucide-react";
import { Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

type IndexItem = {
  kind: Kind;
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  typeTag: string;
  minutes: number;
  updatedAtISO: string;
};

function daysAgo(iso: string) {
  const ms = Date.now() - new Date(`${iso}T00:00:00`).getTime();
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

function ItemRow({ item }: { item: IndexItem }) {
  const meta = itemTypeMeta[item.kind];
  const Icon = meta.icon;

  return (
    <Link
      href={hrefFor(item.kind, item.slug)}
      className="block rounded-2xl border p-4 hover:bg-muted/40 transition"
      aria-label={`Open ${meta.label}: ${item.title}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline" className="rounded-full">
              {meta.label}
            </Badge>

            <span className="inline-flex items-center gap-1">
              <Icon className="h-3.5 w-3.5" /> {item.typeTag}
            </span>

            <Badge variant="secondary" className="rounded-full">
              {freshnessLabel(item.updatedAtISO)}
            </Badge>

            <span className="inline-flex items-center gap-1">
              <Timer className="h-3.5 w-3.5" /> {item.minutes} min
            </span>
          </div>

          <div className="mt-2 font-medium leading-snug">{item.title}</div>
          <div className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {item.subtitle}
          </div>
        </div>

        <ArrowRight className="mt-1 h-4 w-4 text-muted-foreground" aria-hidden="true" />
      </div>
    </Link>
  );
}

export function SearchClient({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [filterFreshness, setFilterFreshness] = useState<string>("all");

  const unifiedIndex = useMemo<IndexItem[]>(() => {
    const idx: IndexItem[] = [];

    DATA.tools.forEach((t) =>
      idx.push({
        kind: "tool",
        id: t.id,
        slug: t.slug,
        title: t.name,
        subtitle: t.oneLiner,
        typeTag: (t.tags[0] || "tool").toUpperCase(),
        minutes: 6,
        updatedAtISO: t.updatedAtISO,
      })
    );

    DATA.prompts.forEach((p) =>
      idx.push({
        kind: "prompt",
        id: p.id,
        slug: p.slug,
        title: p.title,
        subtitle: p.purpose,
        typeTag: (p.tags[0] || "prompt").toUpperCase(),
        minutes: 5,
        updatedAtISO: p.updatedAtISO,
      })
    );

    DATA.updates.forEach((u) =>
      idx.push({
        kind: "update",
        id: u.id,
        slug: u.slug,
        title: u.headline,
        subtitle: u.tldr,
        typeTag: u.model.toUpperCase(),
        minutes: 4,
        updatedAtISO: u.updatedAtISO,
      })
    );

    DATA.collections.forEach((c) =>
      idx.push({
        kind: "collection",
        id: c.id,
        slug: c.slug,
        title: c.title,
        subtitle: c.description,
        typeTag: "COLLECTION",
        minutes: 7,
        updatedAtISO: c.updatedAtISO,
      })
    );

    DATA.comparisons.forEach((c) =>
      idx.push({
        kind: "comparison",
        id: c.id,
        slug: c.slug,
        title: c.title,
        subtitle: c.description,
        typeTag: "VS",
        minutes: 6,
        updatedAtISO: c.updatedAtISO,
      })
    );

    DATA.bestPages.forEach((b) =>
      idx.push({
        kind: "best",
        id: b.id,
        slug: b.slug,
        title: b.title,
        subtitle: b.description,
        typeTag: "BEST",
        minutes: 8,
        updatedAtISO: b.updatedAtISO,
      })
    );

    idx.sort((a, b) => new Date(b.updatedAtISO).getTime() - new Date(a.updatedAtISO).getTime());
    return idx;
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = unifiedIndex;

    if (q) {
      list = list.filter((x) =>
        `${x.title} ${x.subtitle} ${x.typeTag}`.toLowerCase().includes(q)
      );
    }

    if (filterFreshness !== "all") {
      list = list.filter((x) => freshnessLabel(x.updatedAtISO) === filterFreshness);
    }

    return q ? list.slice(0, 40) : list.slice(0, 24);
  }, [filterFreshness, query, unifiedIndex]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-2xl border flex items-center justify-center">
          <Search className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-semibold">Search</h1>
          <p className="mt-1 text-muted-foreground">
            Search tools, prompts, updates, collections, comparisons, and best lists.
          </p>
        </div>
      </div>

      <Card className="mt-6 rounded-2xl">
        <CardHeader className="border-b">
          <CardTitle className="text-base">Find what you need</CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              placeholder="Search anything..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 rounded-2xl"
            />

            <select
              value={filterFreshness}
              onChange={(e) => setFilterFreshness(e.target.value)}
              className="rounded-2xl border bg-background px-4 py-2 text-sm"
            >
              <option value="all">All freshness</option>
              <option value="New">New</option>
              <option value="This week">This week</option>
              <option value="Recent">Recent</option>
              <option value="Evergreen">Evergreen</option>
            </select>

            {(query || filterFreshness !== "all") ? (
              <Button
                variant="outline"
                className="rounded-2xl"
                onClick={() => {
                  setQuery("");
                  setFilterFreshness("all");
                }}
              >
                Clear
              </Button>
            ) : null}
          </div>

          <div className="mt-5 space-y-3">
            {results.map((it) => (
              <ItemRow key={`${it.kind}-${it.id}`} item={it} />
            ))}

            {results.length === 0 ? (
              <div className="rounded-2xl border p-4 text-center text-sm text-muted-foreground">
                No results. Try different keywords.
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
