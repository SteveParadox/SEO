import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  DATA,
  getComparisonBySlug,
  resolveComparisonContenders,
  getRelatedComparisons,
} from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SaveButton } from "@/components/save-button";
import { TrackRecent } from "@/components/track-recent";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return DATA.comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cmp = getComparisonBySlug(slug);

  if (!cmp) return { title: "Comparison not found" };

  const title = `${cmp.title} — Comparison`;
  const description = cmp.description;
  const url = absoluteUrl(`/comparisons/${cmp.slug}`);

  return {
    title: `${title} — ToolDrop AI`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — ToolDrop AI`,
      description,
      url,
      siteName: "ToolDrop AI",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ToolDrop AI`,
      description,
    },
  };
}

function hrefFor(kind: "tool" | "prompt", slug: string) {
  return kind === "tool" ? `/tools/${slug}` : `/prompts/${slug}`;
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const cmp = getComparisonBySlug(slug);

  if (!cmp) return notFound();

  const contenders = resolveComparisonContenders(cmp);
  const related = getRelatedComparisons(cmp.id, 6);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
<TrackRecent
  kind="comparison"
  id={cmp.id}
  slug={cmp.slug}
  title={cmp.title}
  subtitle={cmp.description}
/>
      <div className="flex flex-wrap gap-2">
        {cmp.tags.map((t) => (
          <Badge key={t} variant="secondary" className="rounded-full">
            {t}
          </Badge>
        ))}
      </div>

      <h1 className="mt-4 text-3xl font-semibold">{cmp.title}</h1>
      <p className="mt-2 text-muted-foreground">{cmp.description}</p>

      <div className="mt-4 flex items-center gap-2">
        <SaveButton kind="comparison" id={cmp.id} className="rounded-xl" />
      </div>

      <Card className="mt-6 rounded-2xl">
        <CardHeader>
          <CardTitle>Contenders</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {contenders.length ? (
            contenders.map((x: any) => (
              <Link
                key={`${x.kind}-${x.item.id}`}
                href={hrefFor(x.kind, x.item.slug)}
                className="block rounded-xl border p-3 hover:bg-muted/40 transition"
              >
                <div className="font-medium">
                  {x.kind === "tool" ? x.item.name : x.item.title}
                </div>
                <div className="text-sm text-muted-foreground">
                  {"oneLiner" in x.item ? x.item.oneLiner : x.item.purpose}
                </div>
              </Link>
            ))
          ) : (
            <div className="text-sm text-muted-foreground">
              No contenders resolved. Add valid tool/prompt IDs to this comparison.
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>What we’re judging</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {cmp.criteria.map((c) => (
              <div key={c.name} className="rounded-xl border p-3">
                <div className="font-medium">{c.name}</div>
                <div className="text-muted-foreground mt-1">{c.notes}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Verdict</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed">
            {cmp.verdict}
          </CardContent>
        </Card>
      </div>

      {related.length > 0 ? (
        <Card className="mt-8 rounded-2xl">
          <CardHeader>
            <CardTitle>Related comparisons</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {related.map((rc) => (
              <Link
                key={rc.id}
                href={`/comparisons/${rc.slug}`}
                className="block rounded-xl border p-3 hover:bg-muted/40 transition"
              >
                <div className="font-medium">{rc.title}</div>
                <div className="text-sm text-muted-foreground">
                  {rc.description}
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}