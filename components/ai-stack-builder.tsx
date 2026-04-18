"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ListRestart,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SaveButton } from "@/components/save-button";
import { RECENT_EVENT, readRecent } from "@/lib/recent";
import { SAVED_EVENT, readSaved } from "@/lib/saved";
import {
  STACK_BUDGETS,
  STACK_GOALS,
  STACK_LEVELS,
  STACK_PACES,
  buildStackQueryString,
  buildStackRecommendation,
  getDefaultStackInput,
  readStackInputFromSearchParams,
  type StackBuilderInput,
  type StackBuilderSignal,
} from "@/lib/stack-builder";

type BuilderSignals = {
  saved: StackBuilderSignal[];
  recent: StackBuilderSignal[];
};

function FilterGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: Array<{ value: T; label: string; description: string }>;
  onChange: (next: T) => void;
}) {
  return (
    <div className="space-y-3">
      <div>
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="mt-1 text-sm text-muted-foreground">
          Choose the option that should matter most in the ranking.
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Button
            key={option.value}
            type="button"
            variant={value === option.value ? "default" : "outline"}
            className="rounded-full"
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
            title={option.description}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

function ToolResultCard({
  entry,
}: {
  entry: ReturnType<typeof buildStackRecommendation>["tools"][number];
}) {
  const tool = entry.item;

  return (
    <Card className="rounded-2xl border-border/70">
      <CardHeader className="space-y-3 border-b">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Badge variant="secondary" className="rounded-full">
              Tool
            </Badge>
            <CardTitle className="mt-3 text-lg leading-snug">
              <Link href={entry.href} className="hover:text-primary">
                {tool.name}
              </Link>
            </CardTitle>
          </div>

          <SaveButton kind="tool" id={tool.id} className="rounded-full" />
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="rounded-full capitalize">
            {tool.pricing.tier}
          </Badge>
          {tool.rating ? (
            <Badge variant="outline" className="rounded-full">
              Rated {tool.rating}/5
            </Badge>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-6">
        <p className="text-sm text-muted-foreground">{tool.oneLiner}</p>
        <p className="text-sm text-muted-foreground">{entry.reason}</p>

        <div className="space-y-2">
          <div className="text-sm font-medium">Best use cases</div>
          <div className="flex flex-wrap gap-2">
            {tool.useCases.slice(0, 3).map((useCase) => (
              <Badge key={`${tool.id}-${useCase}`} variant="outline" className="rounded-full">
                {useCase}
              </Badge>
            ))}
          </div>
        </div>

        <Link
          href={entry.href}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          Open tool page
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}

function PromptResultCard({
  entry,
}: {
  entry: ReturnType<typeof buildStackRecommendation>["prompts"][number];
}) {
  const prompt = entry.item;

  return (
    <Card className="rounded-2xl border-border/70">
      <CardHeader className="space-y-3 border-b">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Badge variant="secondary" className="rounded-full">
              Prompt
            </Badge>
            <CardTitle className="mt-3 text-lg leading-snug">
              <Link href={entry.href} className="hover:text-primary">
                {prompt.title}
              </Link>
            </CardTitle>
          </div>

          <SaveButton kind="prompt" id={prompt.id} className="rounded-full" />
        </div>

        <div className="flex flex-wrap gap-2">
          {prompt.modelCompatibility.map((model) => (
            <Badge key={`${prompt.id}-${model}`} variant="outline" className="rounded-full">
              {model}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-6">
        <p className="text-sm text-muted-foreground">{prompt.purpose}</p>
        <p className="text-sm text-muted-foreground">{entry.reason}</p>

        <div className="flex flex-wrap gap-2">
          {prompt.tags.slice(0, 4).map((tag) => (
            <Badge key={`${prompt.id}-${tag}`} variant="outline" className="rounded-full">
              {tag}
            </Badge>
          ))}
        </div>

        <Link
          href={entry.href}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          Open prompt page
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}

function SupportingResultCard({
  kind,
  entry,
}: {
  kind: "comparison" | "best";
  entry: NonNullable<ReturnType<typeof buildStackRecommendation>["comparison"]> | NonNullable<ReturnType<typeof buildStackRecommendation>["bestPage"]>;
}) {
  const title = kind === "comparison" ? "Comparison" : "Best List";
  const description = entry.item.description;

  return (
    <Card className="rounded-2xl border-border/70">
      <CardHeader className="space-y-3 border-b">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Badge variant="secondary" className="rounded-full">
              {title}
            </Badge>
            <CardTitle className="mt-3 text-lg leading-snug">
              <Link href={entry.href} className="hover:text-primary">
                {entry.item.title}
              </Link>
            </CardTitle>
          </div>

          <SaveButton
            kind={kind}
            id={entry.item.id}
            className="rounded-full"
            labelUnsaved="Save"
            labelSaved="Saved"
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-6">
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-sm text-muted-foreground">{entry.reason}</p>

        <Link
          href={entry.href}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          Open {title.toLowerCase()}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}

export function AiStackBuilder() {
  const [input, setInput] = React.useState<StackBuilderInput>(getDefaultStackInput());
  const [signals, setSignals] = React.useState<BuilderSignals>({ saved: [], recent: [] });
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    const nextInput = readStackInputFromSearchParams(new URLSearchParams(window.location.search));
    setInput(nextInput);
    setIsHydrated(true);
  }, []);

  React.useEffect(() => {
    const syncSignals = () => {
      setSignals({
        saved: readSaved().map((entry) => ({ kind: entry.kind, id: entry.id })),
        recent: readRecent().map((entry) => ({ kind: entry.kind, id: entry.id })),
      });
    };
    const handleStorage = (event: StorageEvent) => {
      if (!event.key || event.key === "xavkit_saved_v1" || event.key === "xavkit_recent_v1") {
        syncSignals();
      }
    };

    syncSignals();
    window.addEventListener(SAVED_EVENT, syncSignals as EventListener);
    window.addEventListener(RECENT_EVENT, syncSignals as EventListener);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(SAVED_EVENT, syncSignals as EventListener);
      window.removeEventListener(RECENT_EVENT, syncSignals as EventListener);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  React.useEffect(() => {
    if (!isHydrated) return;

    const queryString = buildStackQueryString(input);
    const nextUrl = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;

    if (`${window.location.pathname}${window.location.search}` === nextUrl) return;
    window.history.replaceState(window.history.state, "", nextUrl);
  }, [input, isHydrated]);

  React.useEffect(() => {
    const handlePopState = () => {
      setInput(readStackInputFromSearchParams(new URLSearchParams(window.location.search)));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const recommendation = React.useMemo(
    () => buildStackRecommendation(input, signals),
    [input, signals]
  );

  const resetBuilder = () => setInput(getDefaultStackInput());
  const isDefaultState = buildStackQueryString(input) === "";

  return (
    <section aria-labelledby="stack-builder-heading" className="space-y-8">
      <Card className="rounded-3xl border-border/70 shadow-sm">
        <CardHeader className="space-y-4 border-b">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5" />
                Personalized builder
              </div>
              <CardTitle id="stack-builder-heading" className="mt-4 text-2xl sm:text-3xl">
                Build an AI stack that matches the way you actually work
              </CardTitle>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
                Pick a goal, budget, skill level, and workflow pace. The builder ranks existing
                tools, prompts, comparisons, and best lists from this site so you get something
                usable, not a random mashup.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={resetBuilder}
              >
                <ListRestart className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <FilterGroup
              label="Goal"
              value={input.goal}
              options={STACK_GOALS}
              onChange={(goal) => setInput((current) => ({ ...current, goal }))}
            />

            <FilterGroup
              label="Budget"
              value={input.budget}
              options={STACK_BUDGETS}
              onChange={(budget) => setInput((current) => ({ ...current, budget }))}
            />

            <FilterGroup
              label="Skill level"
              value={input.level}
              options={STACK_LEVELS}
              onChange={(level) => setInput((current) => ({ ...current, level }))}
            />

            <FilterGroup
              label="Workflow pace"
              value={input.pace}
              options={STACK_PACES}
              onChange={(pace) => setInput((current) => ({ ...current, pace }))}
            />
          </div>

          <div className="rounded-2xl border bg-muted/20 p-4">
            <div className="flex items-start gap-3">
              <WandSparkles className="mt-0.5 h-5 w-5 text-primary" />
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  URL state updates automatically, so you can share this exact stack setup with
                  teammates or revisit it later.
                </p>
                {!isDefaultState ? (
                  <p>
                    Current filters:{" "}
                    <span className="font-medium text-foreground">
                      {STACK_GOALS.find((option) => option.value === input.goal)?.label}
                    </span>
                    ,{" "}
                    <span className="font-medium text-foreground">
                      {STACK_BUDGETS.find((option) => option.value === input.budget)?.label}
                    </span>
                    ,{" "}
                    <span className="font-medium text-foreground">
                      {STACK_LEVELS.find((option) => option.value === input.level)?.label}
                    </span>
                    ,{" "}
                    <span className="font-medium text-foreground">
                      {STACK_PACES.find((option) => option.value === input.pace)?.label}
                    </span>
                    .
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6" aria-live="polite">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Your recommended AI stack</h2>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground sm:text-base">
              Three tools, two prompts, and supporting pages ranked from the site&apos;s existing
              content model using goal fit, pricing, accessibility, workflow depth, and light
              local personalization.
            </p>
          </div>

          <Badge variant="outline" className="rounded-full self-start sm:self-auto">
            {recommendation.tools.length} tools / {recommendation.prompts.length} prompts
          </Badge>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {recommendation.tools.map((entry) => (
            <ToolResultCard key={entry.item.id} entry={entry} />
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {recommendation.prompts.map((entry) => (
            <PromptResultCard key={entry.item.id} entry={entry} />
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {recommendation.comparison ? (
            <SupportingResultCard kind="comparison" entry={recommendation.comparison} />
          ) : null}

          {recommendation.bestPage ? (
            <SupportingResultCard kind="best" entry={recommendation.bestPage} />
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="rounded-2xl border-border/70">
          <CardHeader className="border-b">
            <CardTitle className="text-lg">How to use this stack</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-6 text-sm text-muted-foreground">
            {recommendation.howToUse.map((step) => (
              <div key={step} className="rounded-2xl border p-3">
                {step}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/70">
          <CardHeader className="border-b">
            <CardTitle className="text-lg">Who this stack is best for</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 text-sm leading-6 text-muted-foreground">
            {recommendation.whoItsFor}
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/70">
          <CardHeader className="border-b">
            <CardTitle className="text-lg">Swap this for that</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6 text-sm text-muted-foreground">
            {recommendation.swapOptions.length > 0 ? (
              recommendation.swapOptions.map((swap) => (
                <div key={`${swap.from.item.id}-${swap.to.item.id}`} className="rounded-2xl border p-4">
                  <div className="font-medium text-foreground">
                    {swap.from.item.name} -&gt; {swap.to.item.name}
                  </div>
                  <p className="mt-2">{swap.reason}</p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <Link
                      href={swap.to.href}
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      View {swap.to.item.name}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No strong swaps surfaced for this mix, which usually means the top three tools are already tightly aligned with your filters.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
