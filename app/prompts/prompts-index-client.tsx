"use client";

import * as React from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { DATA } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 15;

function formatUpdated(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function getVariableCount(input: string) {
  const matches = input.match(/{{\s*[\w.-]+\s*}}/g) ?? [];
  return new Set(matches.map((match) => match.toLowerCase())).size;
}

function getTopPromptTags() {
  const counts = new Map<string, number>();

  for (const prompt of DATA.prompts) {
    for (const tag of prompt.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 8)
    .map(([tag]) => tag);
}

export default function PromptsIndexClient() {
  const [page, setPage] = React.useState(1);
  const [query, setQuery] = React.useState("");
  const [model, setModel] = React.useState<"all" | "GPT" | "Claude" | "Gemini">("all");
  const [activeTag, setActiveTag] = React.useState<string>("all");
  const [templateMode, setTemplateMode] = React.useState<
    "all" | "with-variables" | "ready-to-run"
  >("all");
  const [sortBy, setSortBy] = React.useState<"recent" | "title" | "variables">("recent");
  const deferredQuery = React.useDeferredValue(query);

  const prompts = React.useMemo(
    () =>
      [...DATA.prompts].sort(
        (a, b) => new Date(b.updatedAtISO).getTime() - new Date(a.updatedAtISO).getTime()
      ),
    []
  );

  const topTags = React.useMemo(() => getTopPromptTags(), []);

  const filteredPrompts = React.useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();

    const matches = prompts.filter((prompt) => {
      const variableCount = getVariableCount(prompt.prompt);
      const matchesQuery =
        !normalizedQuery ||
        `${prompt.title} ${prompt.purpose} ${prompt.description ?? ""} ${prompt.tags.join(" ")}`
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesModel = model === "all" || prompt.modelCompatibility.includes(model);
      const matchesTag = activeTag === "all" || prompt.tags.includes(activeTag);
      const matchesTemplateMode =
        templateMode === "all" ||
        (templateMode === "with-variables" ? variableCount > 0 : variableCount === 0);

      return matchesQuery && matchesModel && matchesTag && matchesTemplateMode;
    });

    return matches.sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === "variables") {
        return getVariableCount(b.prompt) - getVariableCount(a.prompt) || a.title.localeCompare(b.title);
      }

      return new Date(b.updatedAtISO).getTime() - new Date(a.updatedAtISO).getTime();
    });
  }, [activeTag, deferredQuery, model, prompts, sortBy, templateMode]);

  React.useEffect(() => {
    setPage(1);
  }, [activeTag, deferredQuery, model, sortBy, templateMode]);

  const totalPages = Math.max(1, Math.ceil(filteredPrompts.length / PAGE_SIZE));
  const current = filteredPrompts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">AI Prompts</h1>
      <p className="mt-3 max-w-3xl text-muted-foreground">
        Browse reusable prompts with context, limitations, and follow-up guidance. These
        pages are designed to be landing pages you can actually learn from, not just a copy
        box.
      </p>

      <div className="mt-6">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">Filter by workflow</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by task, role, or output"
                className="rounded-2xl pl-9"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {(["recent", "title", "variables"] as const).map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant={sortBy === value ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setSortBy(value)}
                >
                  {value === "recent"
                    ? "Newest first"
                    : value === "title"
                      ? "Title A-Z"
                      : "Most variables"}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {(["all", "GPT", "Claude", "Gemini"] as const).map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant={model === value ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setModel(value)}
                >
                  {value === "all" ? "All models" : value}
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
              {([
                ["all", "All formats"],
                ["with-variables", "With variables"],
                ["ready-to-run", "Ready to run"],
              ] as const).map(([value, label]) => (
                <Button
                  key={value}
                  type="button"
                  variant={templateMode === value ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setTemplateMode(value)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Showing {current.length} of {filteredPrompts.length} prompt
          {filteredPrompts.length === 1 ? "" : "s"}.
        </p>

        {query || model !== "all" || activeTag !== "all" || templateMode !== "all" || sortBy !== "recent" ? (
          <Button
            type="button"
            variant="outline"
            className="rounded-full"
            onClick={() => {
              setQuery("");
              setModel("all");
              setActiveTag("all");
              setTemplateMode("all");
              setSortBy("recent");
            }}
          >
            Clear filters
          </Button>
        ) : null}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {current.map((prompt) => {
          const variableCount = getVariableCount(prompt.prompt);

          return (
            <Card
              key={prompt.id}
              className="relative overflow-hidden rounded-2xl transition hover:bg-muted/40"
            >
              <Link
                href={`/prompts/${prompt.slug}`}
                aria-label={prompt.title}
                className="absolute inset-0 z-10 rounded-2xl"
              >
                <span className="sr-only">{prompt.title}</span>
              </Link>

              <CardContent className="relative z-20 pointer-events-none p-5">
                <div className="flex flex-wrap gap-2 pointer-events-auto">
                  {prompt.tags.slice(0, 4).map((rawTag) => {
                    const tag = rawTag.trim();
                    const tagSlug = encodeURIComponent(tag.toLowerCase());

                    return (
                      <Link
                        key={`${prompt.id}-${tagSlug}`}
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

                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  {prompt.modelCompatibility.map((value) => (
                    <Badge key={value} variant="outline" className="rounded-full">
                      {value}
                    </Badge>
                  ))}
                  <span>
                    {prompt.variations.length} variation{prompt.variations.length === 1 ? "" : "s"}
                  </span>
                  <span>Updated {formatUpdated(prompt.updatedAtISO)}</span>
                </div>

                <div className="mt-3 font-semibold">{prompt.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{prompt.purpose}</div>

                {prompt.description ? (
                  <div className="mt-3 text-sm text-muted-foreground line-clamp-3">
                    {prompt.description}
                  </div>
                ) : null}

                <div className="mt-4 rounded-2xl border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
                  {variableCount > 0
                    ? `${variableCount} variable placeholder${variableCount === 1 ? "" : "s"} to customize`
                    : "Ready-to-run prompt with no variable placeholders"}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredPrompts.length === 0 ? (
        <Card className="mt-6 rounded-2xl">
          <CardContent className="p-8 text-center text-sm text-muted-foreground">
            No prompts matched that combination yet. Try a broader tag or a different model.
          </CardContent>
        </Card>
      ) : null}

      {filteredPrompts.length > PAGE_SIZE ? (
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
