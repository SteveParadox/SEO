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

function getTopBestTags() {
  const counts = new Map<string, number>();

  for (const page of DATA.bestPages) {
    for (const tag of page.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 8)
    .map(([tag]) => tag);
}

function getBestBadges() {
  const counts = new Map<string, number>();

  for (const page of DATA.bestPages) {
    for (const pick of page.picks) {
      if (!pick.badge) continue;
      counts.set(pick.badge, (counts.get(pick.badge) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([badge]) => badge);
}

export default function BestIndexClient() {
  const [page, setPage] = React.useState(1);
  const [query, setQuery] = React.useState("");
  const [activeTag, setActiveTag] = React.useState<string>("all");
  const [activeBadge, setActiveBadge] = React.useState<string>("all");
  const [sortBy, setSortBy] = React.useState<"recent" | "title">("recent");
  const deferredQuery = React.useDeferredValue(query);

  const topTags = React.useMemo(() => getTopBestTags(), []);
  const badgeOptions = React.useMemo(() => getBestBadges(), []);
  const filteredPages = React.useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();

    const matches = DATA.bestPages.filter((bestPage) => {
      const haystack = [
        bestPage.title,
        bestPage.description,
        bestPage.primaryKeyword,
        bestPage.tags.join(" "),
        bestPage.intro.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
      const matchesTag = activeTag === "all" || bestPage.tags.includes(activeTag);
      const matchesBadge =
        activeBadge === "all" || bestPage.picks.some((pick) => pick.badge === activeBadge);

      return matchesQuery && matchesTag && matchesBadge;
    });

    return matches.sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }

      return new Date(b.updatedAtISO).getTime() - new Date(a.updatedAtISO).getTime();
    });
  }, [activeBadge, activeTag, deferredQuery, sortBy]);

  React.useEffect(() => {
    setPage(1);
  }, [activeBadge, activeTag, deferredQuery, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredPages.length / PAGE_SIZE));
  const current = filteredPages.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Best AI Tool Lists</h1>
      <p className="mt-3 max-w-3xl text-muted-foreground">
        Browse ranked tool pages built for decision-heavy searches. Filter by topic, pick
        type, or keyword to find the lists that match the job you are actually trying to do.
      </p>

      <div className="mt-6">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">Find the right shortlist faster</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by use case, audience, or keyword"
                className="rounded-2xl pl-9"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {(["recent", "title"] as const).map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant={sortBy === value ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setSortBy(value)}
                >
                  {value === "recent" ? "Newest first" : "Title A-Z"}
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
                All topics
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

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant={activeBadge === "all" ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setActiveBadge("all")}
              >
                All pick types
              </Button>

              {badgeOptions.map((badge) => (
                <Button
                  key={badge}
                  type="button"
                  variant={activeBadge === badge ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setActiveBadge(badge)}
                >
                  {badge}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Showing {current.length} of {filteredPages.length} matching rankings.
        </p>

        {query || activeTag !== "all" || activeBadge !== "all" || sortBy !== "recent" ? (
          <Button
            type="button"
            variant="outline"
            className="rounded-full"
            onClick={() => {
              setQuery("");
              setActiveTag("all");
              setActiveBadge("all");
              setSortBy("recent");
            }}
          >
            Clear filters
          </Button>
        ) : null}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {current.map((bestPage) => {
          const snippet = bestPage.intro[0] ?? bestPage.description;
          const visibleBadges = bestPage.picks
            .flatMap((pick) => (pick.badge ? [pick.badge] : []))
            .slice(0, 3);

          return (
            <Card
              key={bestPage.id}
              className="relative overflow-hidden rounded-2xl transition hover:bg-muted/40"
            >
              <Link
                href={`/best/${bestPage.slug}`}
                aria-label={bestPage.title}
                className="absolute inset-0 z-10 rounded-2xl"
              >
                <span className="sr-only">{bestPage.title}</span>
              </Link>

              <CardContent className="relative z-20 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs text-muted-foreground">
                    Updated {formatUpdated(bestPage.updatedAtISO)}
                  </div>
                  <div className="text-xs text-muted-foreground">{bestPage.picks.length} picks</div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {bestPage.tags.slice(0, 4).map((rawTag) => {
                    const tag = rawTag.trim();
                    const tagSlug = encodeURIComponent(tag.toLowerCase());

                    return (
                      <Link
                        key={`${bestPage.id}-${tagSlug}`}
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

                {visibleBadges.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {visibleBadges.map((badge) => (
                      <Badge key={`${bestPage.id}-${badge}`} variant="outline" className="rounded-full">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                ) : null}

                <div className="mt-3 font-semibold">{bestPage.title}</div>
                <div className="mt-2 text-sm text-muted-foreground line-clamp-3">{snippet}</div>

                <div className="mt-4 rounded-2xl border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
                  Primary keyword: {bestPage.primaryKeyword}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredPages.length === 0 ? (
        <Card className="mt-6 rounded-2xl">
          <CardContent className="p-8 text-center text-sm text-muted-foreground">
            No best pages matched that combination yet. Try a broader tag or remove the
            pick-type filter.
          </CardContent>
        </Card>
      ) : null}

      {filteredPages.length > PAGE_SIZE ? (
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
