import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  DATA,
  getToolBySlug,
  getRelatedTools,
  findCollectionsContaining,
  findBestPagesContainingTool,
  findComparisonsContainingTool,
} from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { absoluteUrl } from "@/lib/seo";
import { SaveButton } from "@/components/save-button";
import { TrackRecent } from "@/components/track-recent";
import { JsonLd } from "@/components/json-ld";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return DATA.tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: "Tool not found — ToolDrop AI",
      robots: { index: false, follow: false },
    };
  }

  const title = `${tool.name} — ToolDrop AI`;
  const description = tool.oneLiner;
  const url = absoluteUrl(`/tools/${tool.slug}`);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: "ToolDrop AI",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return notFound();

  const related = getRelatedTools(tool.id, 6);
  const inCollections = findCollectionsContaining({ kind: "tool", id: tool.id });
  const inComparisons = findComparisonsContainingTool(tool.id);
  const featured = findBestPagesContainingTool(tool.id);

  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description ?? tool.oneLiner,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    url: absoluteUrl(`/tools/${tool.slug}`),
    keywords: tool.tags?.join(", "),
    offers: {
      "@type": "Offer",
      price: tool.pricing?.tier === "free" ? "0" : undefined,
      priceCurrency: tool.pricing?.tier === "free" ? "USD" : undefined,
      category: tool.pricing?.tier ?? "paid",
    },
    aggregateRating: tool.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: tool.rating,
          bestRating: 5,
          worstRating: 1,
          ratingCount: 1,
        }
      : undefined,
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={toolSchema} />

      <TrackRecent
        kind="tool"
        id={tool.id}
        slug={tool.slug}
        title={tool.name}
        subtitle={tool.oneLiner}
      />

      <div className="flex flex-wrap gap-2">
        {tool.tags.map((t) => {
          const tag = t.trim();
          const tagSlug = encodeURIComponent(tag.toLowerCase());
          return (
            <Link key={tagSlug} href={`/tags/${tagSlug}`}>
              <Badge variant="secondary" className="rounded-full">
                {tag}
              </Badge>
            </Link>
          );
        })}
      </div>

      <h1 className="mt-4 text-3xl font-semibold">{tool.name}</h1>
      <p className="mt-2 text-muted-foreground">{tool.oneLiner}</p>

      <div className="mt-4 flex items-center gap-2">
        <SaveButton kind="tool" id={tool.id} className="rounded-xl" />
      </div>

      <div className="mt-6 grid gap-4">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Best use cases</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {tool.useCases.map((x) => (
              <div key={x}>• {x}</div>
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Pros</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {tool.pros.map((x) => (
                <div key={x}>• {x}</div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Cons</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {tool.cons.map((x) => (
                <div key={x}>• {x}</div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="capitalize">{tool.pricing.tier}</div>
            {tool.pricing.note ? (
              <div className="text-sm text-muted-foreground mt-1">
                {tool.pricing.note}
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Alternatives</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {tool.alternatives.map((a) => (
              <div key={a.slug}>
                •{" "}
                <Link className="hover:underline" href={`/tools/${a.slug}`}>
                  {a.name}
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>

        {featured.length > 0 ? (
          <div className="mt-10">
            <h2 className="text-xl font-semibold">Featured in best lists</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {featured.map((p) => (
                <Link key={p.id} href={`/best/${p.slug}`}>
                  <Card className="rounded-2xl hover:bg-muted/40 transition">
                    <CardContent className="p-4">
                      <div className="font-medium">{p.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-2">
                        {p.intro?.[0] ?? p.description}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        {inComparisons.length > 0 ? (
          <div className="mt-10">
            <h2 className="text-xl font-semibold">Compared in</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {inComparisons.slice(0, 6).map((cmp) => (
                <Link key={cmp.id} href={`/comparisons/${cmp.slug}`} className="block">
                  <Card className="rounded-2xl hover:bg-muted/40 transition">
                    <CardContent className="p-4">
                      <div className="font-medium">{cmp.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-2">
                        {cmp.description}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-8 grid gap-4">
          {inCollections.length > 0 ? (
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Appears in collections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {inCollections.map((c) => (
                  <Link
                    key={c.id}
                    href={`/collections/${c.slug}`}
                    className="block rounded-xl border p-3 hover:bg-muted/40 transition"
                  >
                    <div className="font-medium">{c.title}</div>
                    <div className="text-sm text-muted-foreground">{c.description}</div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          ) : null}

          {related.length > 0 ? (
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Related tools</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-2">
                {related.map((t) => (
                  <Link
                    key={t.id}
                    href={`/tools/${t.slug}`}
                    className="block rounded-xl border p-3 hover:bg-muted/40 transition"
                  >
                    <div className="font-medium">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.oneLiner}</div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}
