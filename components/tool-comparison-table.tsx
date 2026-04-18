"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SaveButton } from "@/components/save-button";
import { cn } from "@/lib/utils";
import type { Tool } from "@/lib/data";

type ToolComparisonTableProps = {
  tools: Tool[];
  winnerSlug?: string;
};

function formatPricingTier(tier: Tool["pricing"]["tier"]) {
  if (tier === "free") return "Free";
  if (tier === "freemium") return "Freemium";
  return "Paid";
}

function renderList(values: string[], emptyLabel: string) {
  if (values.length === 0) {
    return <span className="text-muted-foreground">{emptyLabel}</span>;
  }

  return (
    <ul className="space-y-2 text-sm">
      {values.map((value) => (
        <li key={value} className="leading-relaxed">
          {value}
        </li>
      ))}
    </ul>
  );
}

const ROWS: Array<{
  key: string;
  label: string;
  render: (tool: Tool) => ReactNode;
}> = [
  {
    key: "pricing",
    label: "Pricing",
    render: (tool) => (
      <div className="space-y-2 text-sm">
        <Badge variant="secondary" className="rounded-full">
          {formatPricingTier(tool.pricing.tier)}
        </Badge>
        <p className="text-muted-foreground">{tool.pricing.note ?? "Pricing note not available."}</p>
      </div>
    ),
  },
  {
    key: "rating",
    label: "Rating",
    render: (tool) => (
      <div className="space-y-1 text-sm">
        <div className="font-medium">{tool.rating ? `${tool.rating.toFixed(1)} / 5` : "No rating listed"}</div>
        {tool.users ? <p className="text-muted-foreground">{tool.users}</p> : null}
      </div>
    ),
  },
  {
    key: "one-liner",
    label: "Quick take",
    render: (tool) => <p className="text-sm leading-relaxed text-muted-foreground">{tool.oneLiner}</p>,
  },
  {
    key: "use-cases",
    label: "Use cases",
    render: (tool) => renderList(tool.useCases.slice(0, 4), "No use cases listed."),
  },
  {
    key: "pros",
    label: "Pros",
    render: (tool) => renderList(tool.pros.slice(0, 4), "No strengths listed."),
  },
  {
    key: "cons",
    label: "Cons",
    render: (tool) => renderList(tool.cons.slice(0, 4), "No tradeoffs listed."),
  },
  {
    key: "tags",
    label: "Tags",
    render: (tool) => (
      <div className="flex flex-wrap gap-2">
        {tool.tags.map((tag) => (
          <Badge key={`${tool.slug}-${tag}`} variant="outline" className="rounded-full">
            {tag}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    key: "alternatives",
    label: "Alternatives",
    render: (tool) =>
      renderList(tool.alternatives.slice(0, 3).map((entry) => entry.name), "No alternatives listed."),
  },
];

export function ToolComparisonTable({
  tools,
  winnerSlug,
}: ToolComparisonTableProps) {
  if (tools.length < 2) return null;

  return (
    <>
      <div className="hidden overflow-x-auto lg:block">
        <table className="min-w-full border-separate border-spacing-0 overflow-hidden rounded-3xl border bg-card">
          <thead>
            <tr className="align-top">
              <th className="w-52 border-b bg-muted/30 px-5 py-5 text-left text-sm font-semibold text-foreground">
                Compare
              </th>
              {tools.map((tool) => {
                const isWinner = tool.slug === winnerSlug;

                return (
                  <th
                    key={tool.id}
                    className={cn(
                      "min-w-[280px] border-b border-l px-5 py-5 text-left align-top",
                      isWinner && "bg-primary/5"
                    )}
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <Link
                              href={`/tools/${tool.slug}`}
                              className="text-lg font-semibold transition hover:text-primary"
                            >
                              {tool.name}
                            </Link>
                            {isWinner ? (
                              <Badge className="rounded-full">Current winner</Badge>
                            ) : null}
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {tool.description}
                          </p>
                        </div>

                        <SaveButton
                          kind="tool"
                          id={tool.id}
                          className="rounded-full"
                          labelSaved="Saved"
                          labelUnsaved="Save"
                        />
                      </div>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {ROWS.map((row, index) => (
              <tr key={row.key} className={index % 2 === 0 ? "bg-background" : "bg-muted/10"}>
                <th className="border-b bg-muted/20 px-5 py-4 text-left text-sm font-medium text-foreground">
                  {row.label}
                </th>
                {tools.map((tool) => (
                  <td
                    key={`${tool.id}-${row.key}`}
                    className={cn(
                      "border-b border-l px-5 py-4 align-top",
                      tool.slug === winnerSlug && "bg-primary/5"
                    )}
                  >
                    {row.render(tool)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 lg:hidden">
        {tools.map((tool) => {
          const isWinner = tool.slug === winnerSlug;

          return (
            <Card
              key={tool.id}
              className={cn(
                "rounded-3xl border-border/70",
                isWinner && "border-primary/40 bg-primary/5"
              )}
            >
              <CardHeader className="gap-3 border-b">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <CardTitle className="text-xl">
                        <Link href={`/tools/${tool.slug}`} className="transition hover:text-primary">
                          {tool.name}
                        </Link>
                      </CardTitle>
                      {isWinner ? <Badge className="rounded-full">Current winner</Badge> : null}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {tool.description}
                    </p>
                  </div>

                  <SaveButton kind="tool" id={tool.id} className="rounded-full" />
                </div>
              </CardHeader>

              <CardContent className="space-y-5 pt-6">
                {ROWS.map((row) => (
                  <div key={`${tool.id}-${row.key}`} className="space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      {row.label}
                    </div>
                    {row.render(tool)}
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
