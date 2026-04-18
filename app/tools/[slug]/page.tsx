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
import { TrackedExternalLink } from "@/components/tracked-external-link";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type ToolSection = {
  title: string;
  items: string[];
};

function buildDecisionSections(tool: NonNullable<ReturnType<typeof getToolBySlug>>): ToolSection[] {
  return [
    {
      title: `Choose ${tool.name} if you need`,
      items: tool.useCases.slice(0, 5),
    },
    {
      title: `What ${tool.name} does well`,
      items: tool.pros.slice(0, 5),
    },
    {
      title: "Where it can fall short",
      items: tool.cons.slice(0, 5),
    },
  ];
}

function buildFaq(tool: NonNullable<ReturnType<typeof getToolBySlug>>) {
  return [
    {
      q: `What is ${tool.name} best for?`,
      a: `${tool.name} is strongest for ${tool.useCases.slice(0, 3).join(", ")}.`,
    },
    {
      q: `Who should consider ${tool.name}?`,
      a: `${tool.name} fits teams that value ${tool.pros.slice(0, 2).join(" and ")} more than ${tool.cons.slice(0, 1).join("")}.`,
    },
    {
      q: `What should you watch before choosing ${tool.name}?`,
      a: tool.cons.join(". "),
    },
  ];
}

export function generateStaticParams() {
  return DATA.tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: "Tool not found - Xavkit",
      robots: { index: false, follow: false },
    };
  }

  const baseName = tool.name?.trim() || "Unnamed Tool";
  const baseDescription = (tool.description || tool.oneLiner)?.trim() || "AI tool information";
  const title = `${baseName} review - Xavkit`;
  const description = baseDescription.slice(0, 160);
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
      siteName: "Xavkit",
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
  const decisionSections = buildDecisionSections(tool);
  const faq = buildFaq(tool);
  const toolUrl = absoluteUrl(`/tools/${tool.slug}`);

  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description ?? tool.oneLiner,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    url: toolUrl,
    keywords: tool.tags?.join(", "),
    offers: {
      "@type": "Offer",
      category: tool.pricing?.tier ?? "paid",
      price: tool.pricing?.tier === "free" ? "0" : undefined,
      priceCurrency: tool.pricing?.tier === "free" ? "USD" : undefined,
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd data={toolSchema} />
      <JsonLd data={faqSchema} />

      <TrackRecent
        kind="tool"
        id={tool.id}
        slug={tool.slug}
        title={tool.name}
        subtitle={tool.oneLiner}
      />

      <div className="flex flex-wrap gap-2">
        {tool.tags.map((tag) => {
          const label = tag.trim();
          const tagSlug = encodeURIComponent(label.toLowerCase());
          return (
            <Link key={tagSlug} href={`/tags/${tagSlug}`}>
              <Badge variant="secondary" className="rounded-full">
                {label}
              </Badge>
            </Link>
          );
        })}
      </div>

      <h1 className="mt-4 text-3xl font-semibold">{tool.name}</h1>
      <p className="mt-3 max-w-3xl text-muted-foreground">{tool.description}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <SaveButton kind="tool" id={tool.id} className="rounded-xl" />
        <Badge variant="outline" className="rounded-full capitalize">
          {tool.pricing.tier}
        </Badge>
        {tool.rating ? (
          <Badge variant="outline" className="rounded-full">
            Rated {tool.rating}/5
          </Badge>
        ) : null}
        {tool.users ? (
          <Badge variant="outline" className="rounded-full">
            {tool.users}
          </Badge>
        ) : null}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">Why people pick it</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {tool.oneLiner}
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">Pricing snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div className="font-medium capitalize text-foreground">{tool.pricing.tier}</div>
            {tool.pricing.note ? <p>{tool.pricing.note}</p> : null}
            {tool.pricing.details ? <p>{tool.pricing.details}</p> : null}
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">Best fit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            {tool.useCases.slice(0, 3).map((item) => (
              <div key={item} className="rounded-xl border px-3 py-2">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {decisionSections.map((section) => (
          <Card key={section.title} className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base">{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {section.items.map((item) => (
                <div key={item} className="rounded-xl border px-3 py-2">
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {tool.officialUrl ? (
        <Card className="mt-8 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">Visit the product</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              Use the official site when you want current pricing, feature rollouts, or account
              setup details.
            </p>
            <div className="flex flex-wrap gap-3">
              <TrackedExternalLink
                href={tool.isAffiliate && tool.affiliateUrl ? tool.affiliateUrl : tool.officialUrl}
                kind="tool"
                id={tool.id}
                slug={tool.slug}
                title={tool.name}
                subtitle={tool.oneLiner}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="inline-flex items-center justify-center rounded-xl bg-foreground px-5 py-2 text-sm font-medium text-background transition hover:opacity-90"
              >
                Visit official site
              </TrackedExternalLink>
              <Link
                href="/tools"
                className="inline-flex items-center justify-center rounded-xl border px-5 py-2 text-sm font-medium transition hover:bg-muted/40"
              >
                Browse more tools
              </Link>
            </div>
            {tool.isAffiliate ? (
              <p className="text-xs">
                Some outbound links may be affiliate links. That does not change the price you pay.
              </p>
            ) : null}
          </CardContent>
        </Card>
      ) : null}

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Alternatives</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {tool.alternatives.map((alternative) => (
              <Link
                key={alternative.slug}
                href={`/tools/${alternative.slug}`}
                className="block rounded-xl border p-3 text-sm hover:bg-muted/40 transition"
              >
                {alternative.name}
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>FAQ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            {faq.map((item) => (
              <div key={item.q}>
                <div className="font-medium text-foreground">{item.q}</div>
                <p className="mt-1">{item.a}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {featured.length > 0 ? (
        <div className="mt-10">
          <h2 className="text-xl font-semibold">Featured in best lists</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {featured.map((page) => (
              <Link key={page.id} href={`/best/${page.slug}`}>
                <Card className="rounded-2xl hover:bg-muted/40 transition">
                  <CardContent className="p-4">
                    <div className="font-medium">{page.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-2">
                      {page.intro?.[0] ?? page.description}
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
            {inComparisons.slice(0, 6).map((comparison) => (
              <Link key={comparison.id} href={`/comparisons/${comparison.slug}`} className="block">
                <Card className="rounded-2xl hover:bg-muted/40 transition">
                  <CardContent className="p-4">
                    <div className="font-medium">{comparison.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-2">
                      {comparison.description}
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
              {inCollections.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.slug}`}
                  className="block rounded-xl border p-3 hover:bg-muted/40 transition"
                >
                  <div className="font-medium">{collection.title}</div>
                  <div className="text-sm text-muted-foreground">{collection.description}</div>
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
              {related.map((relatedTool) => (
                <Link
                  key={relatedTool.id}
                  href={`/tools/${relatedTool.slug}`}
                  className="block rounded-xl border p-3 hover:bg-muted/40 transition"
                >
                  <div className="font-medium">{relatedTool.name}</div>
                  <div className="text-sm text-muted-foreground">{relatedTool.oneLiner}</div>
                </Link>
              ))}
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
