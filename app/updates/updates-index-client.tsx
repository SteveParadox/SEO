"use client";

import * as React from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { DATA } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const PAGE_SIZE = 15;

function formatUpdated(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function getTopUpdateTags() {
  const counts = new Map<string, number>();

  for (const update of DATA.updates) {
    for (const tag of update.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 8)
    .map(([tag]) => tag);
}

function getTopModels() {
  const counts = new Map<string, number>();

  for (const update of DATA.updates) {
    counts.set(update.model, (counts.get(update.model) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 6)
    .map(([model]) => model);
}

export default function UpdatesIndexClient() {
  const [page, setPage] = React.useState(1);
  const [query, setQuery] = React.useState("");
  const [activeModel, setActiveModel] = React.useState<string>("all");
  const [activeTag, setActiveTag] = React.useState<string>("all");
  const [sortBy, setSortBy] = React.useState<"recent" | "headline">("recent");
  const deferredQuery = React.useDeferredValue(query);

  const topTags = React.useMemo(() => getTopUpdateTags(), []);
  const topModels = React.useMemo(() => getTopModels(), []);

  const filteredUpdates = React.useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();

    const matches = DATA.updates.filter((update) => {
      const haystack = [
        update.model,
        update.headline,
        update.tldr,
        update.context ?? "",
        update.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
      const matchesModel = activeModel === "all" || update.model === activeModel;
      const matchesTag = activeTag === "all" || update.tags.includes(activeTag);

      return matchesQuery && matchesModel && matchesTag;
    });

    return matches.sort((a, b) => {
      if (sortBy === "headline") {
        return a.headline.localeCompare(b.headline);
      }

      return new Date(b.updatedAtISO).getTime() - new Date(a.updatedAtISO).getTime();
    });
  }, [activeModel, activeTag, deferredQuery, sortBy]);

  React.useEffect(() => {
    setPage(1);
  }, [activeModel, activeTag, deferredQuery, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredUpdates.length / PAGE_SIZE));
  const current = filteredUpdates.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Model Updates</h1>

      <div className="mt-6">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">Browse by provider or theme</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by model, headline, or topic"
                className="rounded-2xl pl-9"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {(["recent", "headline"] as const).map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant={sortBy === value ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setSortBy(value)}
                >
                  {value === "recent" ? "Newest first" : "Headline A-Z"}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant={activeModel === "all" ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setActiveModel("all")}
              >
                All models
              </Button>

              {topModels.map((model) => (
                <Button
                  key={model}
                  type="button"
                  variant={activeModel === model ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setActiveModel(model)}
                >
                  {model}
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
                All themes
              </Button>

              {topTags.map((tag) => (
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
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Showing {current.length} of {filteredUpdates.length} matching updates.
        </p>

        {query || activeModel !== "all" || activeTag !== "all" || sortBy !== "recent" ? (
          <Button
            type="button"
            variant="outline"
            className="rounded-full"
            onClick={() => {
              setQuery("");
              setActiveModel("all");
              setActiveTag("all");
              setSortBy("recent");
            }}
          >
            Clear filters
          </Button>
        ) : null}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {current.map((update) => (
          <Card
            key={update.id}
            className="relative overflow-hidden rounded-2xl transition hover:bg-muted/40"
          >
            <Link
              href={`/updates/${update.slug}`}
              aria-label={update.headline}
              className="absolute inset-0 z-10 rounded-2xl"
            >
              <span className="sr-only">{update.headline}</span>
            </Link>

            <CardContent className="relative z-20 p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="rounded-full">
                  {update.model}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Updated {formatUpdated(update.updatedAtISO)}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {update.tags.slice(0, 4).map((rawTag) => {
                  const tag = rawTag.trim();
                  const tagSlug = encodeURIComponent(tag.toLowerCase());

                  return (
                    <Link
                      key={`${update.id}-${tagSlug}`}
                      href={`/tags/${tagSlug}`}
                      onClick={(event) => event.stopPropagation()}
                      className="relative z-30 inline-flex"
                    >
                      <Badge variant="secondary" className="rounded-full">
                        {tag}
                      </Badge>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-3 font-semibold">{update.headline}</div>
              <div className="mt-2 text-sm text-muted-foreground line-clamp-3">
                {update.tldr}
              </div>

              {update.whatToDoNow[0] ? (
                <div className="mt-4 rounded-2xl border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
                  Next move: {update.whatToDoNow[0]}
                </div>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUpdates.length === 0 ? (
        <Card className="mt-6 rounded-2xl">
          <CardContent className="p-8 text-center text-sm text-muted-foreground">
            No updates matched that combination yet. Try removing a tag or switching the
            model filter.
          </CardContent>
        </Card>
      ) : null}

      {filteredUpdates.length > PAGE_SIZE ? (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            type="button"
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
            type="button"
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
