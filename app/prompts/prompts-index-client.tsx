"use client";

import * as React from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { DATA } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  const [query, setQuery] = React.useState("");
  const [model, setModel] = React.useState<"all" | "GPT" | "Claude" | "Gemini">("all");
  const [activeTag, setActiveTag] = React.useState<string>("all");
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

    return prompts.filter((prompt) => {
      const matchesQuery =
        !normalizedQuery ||
        `${prompt.title} ${prompt.purpose} ${prompt.description ?? ""} ${prompt.tags.join(" ")}`
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesModel = model === "all" || prompt.modelCompatibility.includes(model);
      const matchesTag = activeTag === "all" || prompt.tags.includes(activeTag);

      return matchesQuery && matchesModel && matchesTag;
    });
  }, [activeTag, deferredQuery, model, prompts]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">AI Prompts</h1>
      <p className="mt-3 max-w-3xl text-muted-foreground">
        Browse reusable prompts with context, limitations, and follow-up guidance. These
        pages are designed to be landing pages you can actually learn from, not just a copy
        box.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.35fr_minmax(0,0.85fr)]">
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
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          <Card className="rounded-2xl">
            <CardContent className="p-5">
              <div className="text-sm text-muted-foreground">Prompt pages</div>
              <div className="mt-2 text-3xl font-semibold">{DATA.prompts.length}</div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-5">
              <div className="text-sm text-muted-foreground">Current matches</div>
              <div className="mt-2 text-3xl font-semibold">{filteredPrompts.length}</div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-5">
              <div className="text-sm text-muted-foreground">Best next step</div>
              <div className="mt-2 text-sm font-medium">
                Open a prompt page to get usage notes, variables, and related prompts.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Showing {filteredPrompts.length} prompt{filteredPrompts.length === 1 ? "" : "s"}.
        </p>

        {(query || model !== "all" || activeTag !== "all") ? (
          <Button
            type="button"
            variant="outline"
            className="rounded-full"
            onClick={() => {
              setQuery("");
              setModel("all");
              setActiveTag("all");
            }}
          >
            Clear filters
          </Button>
        ) : null}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {filteredPrompts.map((prompt) => (
          <Card
            key={prompt.id}
            className="relative overflow-hidden rounded-2xl hover:bg-muted/40 transition"
          >
            <Link
              href={`/prompts/${prompt.slug}`}
              aria-label={prompt.title}
              className="absolute inset-0 z-10 rounded-2xl"
            >
              <span className="sr-only">{prompt.title}</span>
            </Link>

            <CardContent className="relative z-20 pointer-events-none p-5">
              <div className="flex items-center gap-2 flex-wrap">
                {prompt.tags.slice(0, 4).map((tag) => (
                  <Badge key={tag} variant="secondary" className="rounded-full">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                {prompt.modelCompatibility.map((value) => (
                  <Badge key={value} variant="outline" className="rounded-full">
                    {value}
                  </Badge>
                ))}
              </div>

              <div className="mt-3 font-semibold">{prompt.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{prompt.purpose}</div>
              {prompt.description ? (
                <div className="mt-3 text-sm text-muted-foreground line-clamp-3">
                  {prompt.description}
                </div>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPrompts.length === 0 ? (
        <Card className="mt-6 rounded-2xl">
          <CardContent className="p-8 text-center text-sm text-muted-foreground">
            No prompts matched that combination yet. Try a broader tag or a different model.
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
