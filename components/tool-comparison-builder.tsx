"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  RefreshCcw,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { SaveButton } from "@/components/save-button";
import { ToolComparisonTable } from "@/components/tool-comparison-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  COMPARISON_PRIORITY_OPTIONS,
  buildComparisonQueryString,
  getPickerMatches,
  getToolComparisonResult,
  getToolsBySlugs,
  readComparisonUiState,
  type ComparisonPriority,
} from "@/lib/tool-comparison";

const MIN_TOOL_COUNT = 2;
const MAX_TOOL_COUNT = 3;

function formatPricingTier(tier: "free" | "freemium" | "paid") {
  if (tier === "free") return "Free";
  if (tier === "freemium") return "Freemium";
  return "Paid";
}

export function ToolComparisonBuilder() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = React.useTransition();
  const searchParamsString = searchParams.toString();
  const urlState = React.useMemo(() => readComparisonUiState(searchParams), [searchParams]);
  const [selectedSlugs, setSelectedSlugs] = React.useState(urlState.toolSlugs);
  const [priority, setPriority] = React.useState<ComparisonPriority>(urlState.priority);
  const [query, setQuery] = React.useState("");
  const deferredQuery = React.useDeferredValue(query);
  const lastWrittenQueryStringRef = React.useRef(searchParamsString);

  React.useEffect(() => {
    if (searchParamsString === lastWrittenQueryStringRef.current) return;

    setSelectedSlugs(urlState.toolSlugs);
    setPriority(urlState.priority);
  }, [searchParamsString, urlState]);

  React.useEffect(() => {
    const nextQuery = buildComparisonQueryString({
      toolSlugs: selectedSlugs,
      priority,
    });

    if (nextQuery === searchParamsString) {
      lastWrittenQueryStringRef.current = nextQuery;
      return;
    }

    lastWrittenQueryStringRef.current = nextQuery;

    startTransition(() => {
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
        scroll: false,
      });
    });
  }, [pathname, priority, router, searchParamsString, selectedSlugs]);

  const selectedTools = React.useMemo(
    () => getToolsBySlugs(selectedSlugs),
    [selectedSlugs]
  );

  const comparisonResult = React.useMemo(
    () => getToolComparisonResult(selectedTools, priority),
    [priority, selectedTools]
  );

  const priorityLabel =
    COMPARISON_PRIORITY_OPTIONS.find((option) => option.value === priority)?.label ??
    "Best overall balance";

  const pickerMatches = React.useMemo(
    () => getPickerMatches(deferredQuery, selectedSlugs, 9),
    [deferredQuery, selectedSlugs]
  );

  const shareUrl = React.useMemo(() => {
    const queryString = buildComparisonQueryString({
      toolSlugs: selectedSlugs,
      priority,
    });
    const href = queryString ? `${pathname}?${queryString}` : pathname;

    if (typeof window === "undefined") {
      return href;
    }

    return `${window.location.origin}${href}`;
  }, [pathname, priority, selectedSlugs]);

  function addTool(slug: string) {
    setSelectedSlugs((current) => {
      if (current.includes(slug) || current.length >= MAX_TOOL_COUNT) {
        return current;
      }

      return [...current, slug];
    });
  }

  function removeTool(slug: string) {
    setSelectedSlugs((current) => current.filter((entry) => entry !== slug));
  }

  function moveTool(index: number, direction: -1 | 1) {
    setSelectedSlugs((current) => {
      const nextIndex = index + direction;

      if (nextIndex < 0 || nextIndex >= current.length) return current;

      const next = [...current];
      const [item] = next.splice(index, 1);
      next.splice(nextIndex, 0, item);
      return next;
    });
  }

  function resetBuilder() {
    setSelectedSlugs([]);
    setPriority("balanced");
    setQuery("");
  }

  return (
    <div className="space-y-8">
      <Card className="rounded-3xl border-border/70 shadow-sm">
        <CardHeader className="gap-4 border-b">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <CardTitle className="text-2xl">Build your side-by-side comparison</CardTitle>
              <CardDescription className="mt-2 text-sm leading-relaxed">
                Pick any two or three tools, then switch the priority to see which option
                looks strongest for your goals. The recommendation only uses existing
                tool-page data such as pricing, ratings, use cases, tags, pros, and cons.
              </CardDescription>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <CopyButton
                text={shareUrl}
                label="Copy share link"
                className="rounded-full"
              />
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={resetBuilder}
              >
                <RefreshCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 pt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="rounded-full">
                Step 1
              </Badge>
              <div className="text-sm font-medium">Choose 2 or 3 tools</div>
            </div>

            {selectedTools.length > 0 ? (
              <div className="grid gap-4 lg:grid-cols-3">
                {selectedTools.map((tool, index) => (
                  <Card key={tool.id} className="rounded-2xl border-border/70 bg-muted/15 py-0">
                    <CardContent className="space-y-4 p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                            Tool {index + 1}
                          </div>
                          <div className="mt-1 text-lg font-semibold">{tool.name}</div>
                          <p className="mt-2 text-sm text-muted-foreground">{tool.oneLiner}</p>
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          className="rounded-full"
                          onClick={() => removeTool(tool.slug)}
                          aria-label={`Remove ${tool.name}`}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="rounded-full">
                          {formatPricingTier(tool.pricing.tier)}
                        </Badge>
                        {tool.rating ? (
                          <Badge variant="outline" className="rounded-full">
                            {tool.rating.toFixed(1)} / 5
                          </Badge>
                        ) : null}
                        {tool.tags.slice(0, 2).map((tag) => (
                          <Badge key={`${tool.slug}-${tag}`} variant="secondary" className="rounded-full">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <Button asChild variant="outline" className="rounded-full">
                          <Link href={`/tools/${tool.slug}`}>View tool page</Link>
                        </Button>
                        <SaveButton kind="tool" id={tool.id} className="rounded-full" />
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="rounded-full"
                          disabled={index === 0}
                          onClick={() => moveTool(index, -1)}
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Move left
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="rounded-full"
                          disabled={index === selectedTools.length - 1}
                          onClick={() => moveTool(index, 1)}
                        >
                          Move right
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed p-5 text-sm text-muted-foreground">
                Start by choosing at least two tools. You can compare a straight head-to-head
                matchup or add a third option when you want a wider view.
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="rounded-full">
                Step 2
              </Badge>
              <div className="text-sm font-medium">Set your priority</div>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              {COMPARISON_PRIORITY_OPTIONS.map((option) => {
                const active = priority === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setPriority(option.value)}
                    aria-pressed={active}
                    className={`rounded-2xl border px-4 py-4 text-left transition ${
                      active
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border/70 hover:bg-muted/30"
                    }`}
                  >
                    <div className="text-sm font-semibold">{option.label}</div>
                    <div className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {option.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="rounded-full">
                Step 3
              </Badge>
              <div className="text-sm font-medium">
                {selectedTools.length >= MAX_TOOL_COUNT
                  ? "Remove one tool to add another"
                  : selectedTools.length === 2
                    ? "Optional: add a third tool"
                    : "Search and add tools"}
              </div>
            </div>

            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by tool name, tag, use case, or workflow"
                className="rounded-2xl pl-9"
              />
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {pickerMatches.map((tool) => {
                const disabled = selectedTools.length >= MAX_TOOL_COUNT;

                return (
                  <Card key={tool.id} className="rounded-2xl border-border/70 py-0">
                    <CardContent className="space-y-4 p-5">
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-base font-semibold">{tool.name}</div>
                            <p className="mt-1 text-sm text-muted-foreground">{tool.oneLiner}</p>
                          </div>

                          {tool.rating ? (
                            <Badge variant="outline" className="rounded-full">
                              {tool.rating.toFixed(1)}
                            </Badge>
                          ) : null}
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <Badge variant="secondary" className="rounded-full">
                            {formatPricingTier(tool.pricing.tier)}
                          </Badge>
                          {tool.tags.slice(0, 3).map((tag) => (
                            <Badge key={`${tool.slug}-${tag}`} variant="outline" className="rounded-full">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <Button
                          type="button"
                          className="rounded-full"
                          disabled={disabled}
                          onClick={() => addTool(tool.slug)}
                        >
                          Add to compare
                        </Button>
                        <Button asChild variant="outline" className="rounded-full">
                          <Link href={`/tools/${tool.slug}`}>Open page</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {pickerMatches.length === 0 ? (
              <div className="rounded-2xl border border-dashed p-5 text-sm text-muted-foreground">
                No tools matched that search. Try a broader use case like writing, coding,
                research, automation, or notes.
              </div>
            ) : null}

            {selectedTools.length >= MAX_TOOL_COUNT ? (
              <p className="text-sm text-muted-foreground">
                You already have three tools selected. Remove one if you want to swap in a
                different option.
              </p>
            ) : null}
          </div>
        </CardContent>
      </Card>

      {selectedTools.length < MIN_TOOL_COUNT ? (
        <Card className="rounded-3xl border-dashed">
          <CardContent className="flex flex-col gap-4 px-6 py-8">
            <div className="flex items-center gap-2 text-base font-semibold">
              <Sparkles className="h-5 w-5 text-primary" />
              Add two tools to unlock the full comparison
            </div>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Once you have at least two picks, this builder will recommend a winner for
              your selected priority, lay out the tradeoffs side by side, and surface any
              editorial comparisons or best lists that match the same decision.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/comparisons">Browse editorial comparisons</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/best">Browse best lists</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/tools">Browse all tools</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : comparisonResult ? (
        <div className="space-y-6">
          <Card className="rounded-3xl border-primary/20 bg-primary/5 shadow-sm">
            <CardHeader className="gap-3 border-b">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Best for me
                  </div>
                  <CardTitle className="mt-2 text-2xl">
                    {comparisonResult.winner.tool.name} is the current winner for {priorityLabel.toLowerCase()}
                  </CardTitle>
                  <CardDescription className="mt-2 text-sm leading-relaxed">
                    {comparisonResult.winner.rationale} {comparisonResult.confidenceNote}
                  </CardDescription>
                </div>

                <div className="rounded-2xl border bg-background/80 px-4 py-3 text-sm shadow-sm">
                  <div className="font-medium">What this is based on</div>
                  <div className="mt-2 text-muted-foreground">
                    Pricing, ratings, use-case breadth, tags, listed pros, and listed tradeoffs.
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="grid gap-4 pt-6 md:grid-cols-3">
              {comparisonResult.ranked.map((entry, index) => (
                <div
                  key={entry.tool.id}
                  className={`rounded-2xl border bg-background p-5 ${
                    index === 0 ? "border-primary/40" : "border-border/70"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        {index === 0 ? "Recommended" : `Option ${index + 1}`}
                      </div>
                      <div className="mt-1 text-lg font-semibold">{entry.tool.name}</div>
                    </div>

                    <Badge variant={index === 0 ? "default" : "secondary"} className="rounded-full">
                      Score {Math.round(entry.score)}
                    </Badge>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {entry.rationale}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button asChild variant="outline" className="rounded-full">
                      <Link href={`/tools/${entry.tool.slug}`}>Read tool review</Link>
                    </Button>
                    <SaveButton kind="tool" id={entry.tool.id} className="rounded-full" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-4 lg:grid-cols-3">
            {comparisonResult.ranked.map((entry) => (
              <Card key={`${entry.tool.id}-scenario`} className="rounded-3xl py-0">
                <CardContent className="space-y-3 p-5">
                  <div className="text-base font-semibold">Pick {entry.tool.name} if...</div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {entry.scenario}
                  </p>
                  {entry.watchOut ? (
                    <p className="text-xs text-muted-foreground">
                      Main tradeoff in the current data: {entry.watchOut}
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="rounded-3xl">
            <CardHeader className="border-b">
              <CardTitle className="text-xl">Detailed side-by-side comparison</CardTitle>
              <CardDescription>
                The table below keeps the comparison grounded in the fields already used on
                each tool page.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ToolComparisonTable
                tools={selectedTools}
                winnerSlug={comparisonResult.winner.tool.slug}
              />
            </CardContent>
          </Card>

          <div className="grid gap-4 xl:grid-cols-2">
            <Card className="rounded-3xl">
              <CardHeader className="border-b">
                <CardTitle className="text-xl">Want the full editorial breakdown?</CardTitle>
                <CardDescription>
                  When the site already has an editorial comparison close to your selected
                  tools, it appears here first.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-6">
                {comparisonResult.editorialComparisons.length > 0 ? (
                  comparisonResult.editorialComparisons.map((comparison) => (
                    <Link
                      key={comparison.id}
                      href={`/comparisons/${comparison.slug}`}
                      className="block rounded-2xl border p-4 transition hover:bg-muted/30"
                    >
                      <div className="font-medium">{comparison.title}</div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {comparison.description}
                      </p>
                    </Link>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed p-4 text-sm text-muted-foreground">
                    No tight editorial comparison exists for this exact set yet. You can still
                    browse the broader comparison library for category-level breakdowns.
                  </div>
                )}

                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/comparisons">Browse all comparisons</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-3xl">
              <CardHeader className="border-b">
                <CardTitle className="text-xl">Related best lists</CardTitle>
                <CardDescription>
                  These ranked pages are useful if you want a broader shortlist around the same
                  tools or intent.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-6">
                {comparisonResult.bestPages.length > 0 ? (
                  comparisonResult.bestPages.map((page) => (
                    <Link
                      key={page.id}
                      href={`/best/${page.slug}`}
                      className="block rounded-2xl border p-4 transition hover:bg-muted/30"
                    >
                      <div className="font-medium">{page.title}</div>
                      <p className="mt-2 text-sm text-muted-foreground">{page.description}</p>
                    </Link>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed p-4 text-sm text-muted-foreground">
                    There is no especially strong best-list match for this set right now, so
                    the main comparison above is the most direct view.
                  </div>
                )}

                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/best">Browse all best lists</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-2xl border bg-muted/15 p-5 text-sm text-muted-foreground">
            {isPending
              ? "Updating the shareable comparison URL..."
              : "The share link keeps your selected tools and priority in the URL. The base page stays canonical so shareable states do not become thin indexable pages."}
          </div>
        </div>
      ) : null}
    </div>
  );
}
