"use client";

import * as React from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { DATA } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 12;

function getTopTags() {
  const counts = new Map<string, number>();

  for (const tool of DATA.tools) {
    for (const tag of tool.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 8)
    .map(([tag]) => tag);
}

export default function ToolsIndexClient() {
  const [page, setPage] = React.useState(1);
  const [query, setQuery] = React.useState("");
  const [pricing, setPricing] = React.useState<"all" | "free" | "freemium" | "paid">("all");
  const [activeTag, setActiveTag] = React.useState<string>("all");
  const deferredQuery = React.useDeferredValue(query);

  const sortedTools = React.useMemo(
    () =>
      [...DATA.tools].sort(
        (a, b) =>
          new Date(b.updatedAtISO).getTime() -
          new Date(a.updatedAtISO).getTime()
      ),
    []
  );

  const featuredTags = React.useMemo(() => getTopTags(), []);

  const filteredTools = React.useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();

    return sortedTools.filter((tool) => {
      const matchesQuery =
        !normalizedQuery ||
        `${tool.name} ${tool.oneLiner} ${tool.description} ${tool.tags.join(" ")}`
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesPricing = pricing === "all" || tool.pricing.tier === pricing;
      const matchesTag = activeTag === "all" || tool.tags.includes(activeTag);

      return matchesQuery && matchesPricing && matchesTag;
    });
  }, [activeTag, deferredQuery, pricing, sortedTools]);

  React.useEffect(() => {
    setPage(1);
  }, [deferredQuery, pricing, activeTag]);

  const totalPages = Math.max(1, Math.ceil(filteredTools.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const current = filteredTools.slice(start, start + PAGE_SIZE);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">AI Tools</h1>
      <p className="mt-3 max-w-3xl text-muted-foreground">
        Browse AI tools by real use case, pricing fit, and workflow tag. This page is built
        to help people narrow options quickly instead of bouncing through generic directory
        pages.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.35fr_minmax(0,0.85fr)]">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">Find the right tool faster</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by tool, use case, or tag"
                className="rounded-2xl pl-9"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {(["all", "free", "freemium", "paid"] as const).map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant={pricing === value ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setPricing(value)}
                >
                  {value === "all" ? "All pricing" : value}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant={activeTag === "all" ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setActiveTag("all")}
              >
                All tags
              </Button>

              {featuredTags.map((tag) => (
                <Button
                  key={tag}
                  type="button"
                  variant={activeTag === tag ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setActiveTag(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          <Card className="rounded-2xl">
            <CardContent className="p-5">
              <div className="text-sm text-muted-foreground">Indexed tool pages</div>
              <div className="mt-2 text-3xl font-semibold">{DATA.tools.length}</div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-5">
              <div className="text-sm text-muted-foreground">Current matches</div>
              <div className="mt-2 text-3xl font-semibold">{filteredTools.length}</div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-5">
              <div className="text-sm text-muted-foreground">Suggested action</div>
              <div className="mt-2 text-sm font-medium">
                Open a tool page, then branch to comparisons or best lists from there.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Showing {current.length} of {filteredTools.length} matching tools.
        </p>

        {(query || pricing !== "all" || activeTag !== "all") ? (
          <Button
            type="button"
            variant="outline"
            className="rounded-full"
            onClick={() => {
              setQuery("");
              setPricing("all");
              setActiveTag("all");
            }}
          >
            Clear filters
          </Button>
        ) : null}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {current.map((tool) => (
          <Card
            key={tool.id}
            className="relative overflow-hidden rounded-2xl hover:bg-muted/40 transition"
          >
            <Link
              href={`/tools/${tool.slug}`}
              aria-label={tool.name}
              className="absolute inset-0 z-10 rounded-2xl"
            >
              <span className="sr-only">{tool.name}</span>
            </Link>

            <CardContent className="relative z-20 pointer-events-none p-5">
              <div className="flex items-center gap-2 flex-wrap pointer-events-auto">
                {tool.tags.slice(0, 4).map((rawTag) => {
                  const tag = rawTag.trim();
                  const tagSlug = encodeURIComponent(tag.toLowerCase());

                  return (
                    <Link
                      key={`${tool.id}-${tagSlug}`}
                      href={`/tags/${tagSlug}`}
                      onClick={(event) => event.stopPropagation()}
                      className="inline-flex"
                    >
                      <Badge variant="secondary" className="rounded-full">
                        {tag}
                      </Badge>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="outline" className="rounded-full capitalize">
                  {tool.pricing.tier}
                </Badge>
                {tool.rating ? <span>{tool.rating}/5</span> : null}
                {tool.users ? <span>{tool.users}</span> : null}
              </div>

              <div className="mt-3 font-semibold">{tool.name}</div>
              <div className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {tool.oneLiner}
              </div>
              <div className="mt-3 text-sm text-muted-foreground line-clamp-3">
                {tool.description}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTools.length === 0 ? (
        <Card className="mt-6 rounded-2xl">
          <CardContent className="p-8 text-center text-sm text-muted-foreground">
            No tools matched that combination yet. Try removing a tag or switching pricing.
          </CardContent>
        </Card>
      ) : null}

      {filteredTools.length > PAGE_SIZE ? (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((value) => Math.max(1, value - 1))}
            className="rounded-xl border px-3 py-1 text-sm disabled:opacity-40"
          >
            Prev
          </button>

          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
            className="rounded-xl border px-3 py-1 text-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}
