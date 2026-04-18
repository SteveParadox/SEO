"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Search, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  filterAndSortSearchMatches,
  getContentTypeOptions,
  getFreshnessBucket,
  getFreshnessOptions,
  getPopularSearchTags,
  getSearchDocuments,
  getSortOptions,
  normalizeSearchText,
  tokenizeSearchText,
  type SearchContentType,
  type SearchDocument,
  type SearchFreshness,
  type SearchSort,
} from "@/lib/search-utils";

const DEFAULT_TYPE: SearchContentType = "all";
const DEFAULT_FRESHNESS: SearchFreshness = "all";
const DEFAULT_SORT: SearchSort = "relevance";
const DEFAULT_TAG = "";

function getParamValue(param: string | string[] | null | undefined) {
  if (Array.isArray(param)) return param[0] ?? "";
  return param ?? "";
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function HighlightText({
  text,
  tokens,
}: {
  text: string;
  tokens: string[];
}) {
  if (!text || tokens.length === 0) return <>{text}</>;

  const filteredTokens = tokens
    .filter((token) => token.length > 1)
    .sort((left, right) => right.length - left.length);

  if (filteredTokens.length === 0) return <>{text}</>;

  const expression = new RegExp(`(${filteredTokens.map(escapeRegExp).join("|")})`, "gi");
  const parts = text.split(expression);

  return (
    <>
      {parts.map((part, index) => {
        const normalized = normalizeSearchText(part);
        const matched = filteredTokens.some((token) => normalized === token);

        return matched ? (
          <mark
            key={`${part}-${index}`}
            className="rounded bg-primary/15 px-0.5 text-foreground"
          >
            {part}
          </mark>
        ) : (
          <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>
        );
      })}
    </>
  );
}

function formatFreshnessLabel(document: SearchDocument) {
  const bucket = getFreshnessBucket(document.updatedAtISO);
  if (bucket === "new") return "New";
  if (bucket === "week") return "This week";
  if (bucket === "recent") return "Recent";
  return "Evergreen";
}

function SearchResultRow({
  document,
  tokens,
}: {
  document: SearchDocument;
  tokens: string[];
}) {
  return (
    <Link
      href={document.href}
      className="block rounded-2xl border p-4 transition hover:bg-muted/40"
      aria-label={`Open ${document.typeLabel}: ${document.title}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline" className="rounded-full">
              {document.typeLabel}
            </Badge>

            <Badge variant="secondary" className="rounded-full">
              {formatFreshnessLabel(document)}
            </Badge>

            <span className="inline-flex items-center gap-1">
              <Timer className="h-3.5 w-3.5" /> {document.minutes} min
            </span>
          </div>

          <div className="mt-2 line-clamp-2 font-medium leading-snug">
            <HighlightText text={document.title} tokens={tokens} />
          </div>

          <div className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            <HighlightText text={document.subtitle} tokens={tokens} />
          </div>

          {document.tags.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {document.tags.slice(0, 4).map((tag) => (
                <Badge key={`${document.id}-${tag}`} variant="secondary" className="rounded-full">
                  <HighlightText text={tag} tokens={tokens} />
                </Badge>
              ))}
            </div>
          ) : null}
        </div>

        <ArrowRight className="mt-1 h-4 w-4 text-muted-foreground" aria-hidden="true" />
      </div>
    </Link>
  );
}

export function SearchClient({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = React.useTransition();

  const documents = React.useMemo(() => getSearchDocuments(), []);
  const popularTags = React.useMemo(() => getPopularSearchTags(12), []);
  const typeOptions = React.useMemo(() => getContentTypeOptions(), []);
  const freshnessOptions = React.useMemo(() => getFreshnessOptions(), []);
  const sortOptions = React.useMemo(() => getSortOptions(), []);

  const urlState = React.useMemo(
    () => ({
      query: getParamValue(searchParams.get("q")) || initialQuery,
      type: (getParamValue(searchParams.get("type")) || DEFAULT_TYPE) as SearchContentType,
      freshness: (getParamValue(searchParams.get("freshness")) || DEFAULT_FRESHNESS) as SearchFreshness,
      tag: getParamValue(searchParams.get("tag")) || DEFAULT_TAG,
      sort: (getParamValue(searchParams.get("sort")) || DEFAULT_SORT) as SearchSort,
    }),
    [initialQuery, searchParams]
  );

  const [query, setQuery] = React.useState(urlState.query);
  const [contentType, setContentType] = React.useState<SearchContentType>(urlState.type);
  const [freshness, setFreshness] = React.useState<SearchFreshness>(urlState.freshness);
  const [tag, setTag] = React.useState(urlState.tag);
  const [sort, setSort] = React.useState<SearchSort>(urlState.sort);
  const deferredQuery = React.useDeferredValue(query);

  React.useEffect(() => {
    setQuery(urlState.query);
    setContentType(urlState.type);
    setFreshness(urlState.freshness);
    setTag(urlState.tag);
    setSort(urlState.sort);
  }, [urlState]);

  React.useEffect(() => {
    const next = new URLSearchParams(searchParams.toString());

    if (deferredQuery.trim()) next.set("q", deferredQuery.trim());
    else next.delete("q");

    if (contentType !== DEFAULT_TYPE) next.set("type", contentType);
    else next.delete("type");

    if (freshness !== DEFAULT_FRESHNESS) next.set("freshness", freshness);
    else next.delete("freshness");

    if (tag) next.set("tag", tag);
    else next.delete("tag");

    if (sort !== DEFAULT_SORT) next.set("sort", sort);
    else next.delete("sort");

    const currentQuery = searchParams.toString();
    const nextQuery = next.toString();
    if (currentQuery === nextQuery) return;

    startTransition(() => {
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
    });
  }, [contentType, deferredQuery, freshness, pathname, router, searchParams, sort, tag]);

  const matches = React.useMemo(
    () =>
      filterAndSortSearchMatches(documents, {
        query: deferredQuery,
        type: contentType,
        freshness,
        tag,
        sort,
      }),
    [contentType, deferredQuery, documents, freshness, sort, tag]
  );

  const visibleMatches = React.useMemo(
    () => matches.slice(0, deferredQuery.trim() ? 40 : 24),
    [deferredQuery, matches]
  );

  const queryTokens = React.useMemo(() => tokenizeSearchText(deferredQuery), [deferredQuery]);

  const availableTags = React.useMemo(() => {
    const counts = new Map<string, number>();
    const source = visibleMatches.length > 0 ? visibleMatches.map((match) => match.item) : documents;

    source.forEach((document) => {
      document.tags.forEach((entry) => {
        counts.set(entry, (counts.get(entry) ?? 0) + 1);
      });
    });

    return Array.from(counts.entries())
      .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
      .slice(0, 12)
      .map(([value]) => value);
  }, [documents, visibleMatches]);

  const relaxedMatches = React.useMemo(
    () =>
      deferredQuery.trim()
        ? filterAndSortSearchMatches(documents, {
            query: deferredQuery,
            type: DEFAULT_TYPE,
            freshness: DEFAULT_FRESHNESS,
            tag: DEFAULT_TAG,
            sort: "relevance",
          }).slice(0, 30)
        : [],
    [deferredQuery, documents]
  );

  const zeroResultSuggestions = React.useMemo(() => {
    if (visibleMatches.length > 0 || relaxedMatches.length === 0) {
      return { tags: [] as string[], types: [] as SearchContentType[] };
    }

    const tagCounts = new Map<string, number>();
    const typeCounts = new Map<SearchContentType, number>();

    relaxedMatches.forEach((match) => {
      typeCounts.set(match.item.kind, (typeCounts.get(match.item.kind) ?? 0) + 1);
      match.item.tags.forEach((entry) => {
        tagCounts.set(entry, (tagCounts.get(entry) ?? 0) + 1);
      });
    });

    const tags = Array.from(tagCounts.entries())
      .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
      .map(([value]) => value)
      .filter((value) => value !== tag)
      .slice(0, 6);

    const types = Array.from(typeCounts.entries())
      .sort((left, right) => right[1] - left[1])
      .map(([value]) => value)
      .filter((value) => value !== contentType)
      .slice(0, 4);

    return { tags, types };
  }, [contentType, relaxedMatches, tag, visibleMatches.length]);

  const clearFilters = () => {
    setQuery("");
    setContentType(DEFAULT_TYPE);
    setFreshness(DEFAULT_FRESHNESS);
    setTag(DEFAULT_TAG);
    setSort(DEFAULT_SORT);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border">
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
        <CardContent className="space-y-5 p-5">
          <div className="flex flex-col gap-3 lg:flex-row">
            <Input
              placeholder="Search by title, tag, problem, workflow, or criteria"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="flex-1 rounded-2xl"
            />

            <select
              value={contentType}
              onChange={(event) => setContentType(event.target.value as SearchContentType)}
              className="rounded-2xl border bg-background px-4 py-2 text-sm"
            >
              {typeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={freshness}
              onChange={(event) => setFreshness(event.target.value as SearchFreshness)}
              className="rounded-2xl border bg-background px-4 py-2 text-sm"
            >
              {freshnessOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SearchSort)}
              className="rounded-2xl border bg-background px-4 py-2 text-sm"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Filter by tag
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant={!tag ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setTag("")}
              >
                All tags
              </Button>

              {(availableTags.length > 0 ? availableTags : popularTags.map((entry) => entry.tag)).map((entry) => (
                <Button
                  key={entry}
                  type="button"
                  variant={tag === entry ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setTag(entry)}
                >
                  {entry}
                </Button>
              ))}
            </div>
          </div>

          {(query || contentType !== DEFAULT_TYPE || freshness !== DEFAULT_FRESHNESS || tag || sort !== DEFAULT_SORT) ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm text-muted-foreground">
                {isPending ? "Updating search..." : `Showing ${visibleMatches.length} of ${matches.length} results`}
              </div>
              <Button type="button" variant="outline" className="rounded-full" onClick={clearFilters}>
                Clear filters
              </Button>
            </div>
          ) : null}

          <div className="space-y-3">
            {visibleMatches.map((match) => (
              <SearchResultRow
                key={`${match.item.kind}-${match.item.id}`}
                document={match.item}
                tokens={queryTokens}
              />
            ))}

            {visibleMatches.length === 0 ? (
              <div className="rounded-2xl border p-5">
                <div className="text-base font-medium">No results matched that search.</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try broader keywords, remove a filter, or explore one of the suggestions below.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button type="button" variant="outline" className="rounded-full" onClick={clearFilters}>
                    Clear filters
                  </Button>
                </div>

                {zeroResultSuggestions.types.length > 0 ? (
                  <div className="mt-5">
                    <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Suggested content types
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {zeroResultSuggestions.types.map((value) => {
                        const label =
                          typeOptions.find((option) => option.value === value)?.label ?? value;
                        return (
                          <Button
                            key={value}
                            type="button"
                            variant="outline"
                            className="rounded-full"
                            onClick={() => setContentType(value)}
                          >
                            {label}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                {zeroResultSuggestions.tags.length > 0 ? (
                  <div className="mt-5">
                    <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Suggested tags
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {zeroResultSuggestions.tags.map((value) => (
                        <Button
                          key={value}
                          type="button"
                          variant="outline"
                          className="rounded-full"
                          onClick={() => setTag(value)}
                        >
                          {value}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
