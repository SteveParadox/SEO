import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JsonLd } from "@/components/json-ld";
import {
  getAlternativePageDataBySlug,
  getAlternativePageStaticSlugs,
} from "@/lib/alternatives";
import { INDEXABLE_ROBOTS, NOINDEX_NOFOLLOW_ROBOTS, absoluteUrl } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatRating(value?: number) {
  return typeof value === "number" ? `${value.toFixed(1)}/5` : null;
}

export function generateStaticParams() {
  return getAlternativePageStaticSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getAlternativePageDataBySlug(slug);

  if (!page) {
    return {
      title: "Alternatives page not found - Xavkit",
      robots: NOINDEX_NOFOLLOW_ROBOTS,
    };
  }

  const topNames = page.alternatives.slice(0, 3).map((item) => item.tool.name).join(", ");
  const title = `Best alternatives to ${page.source.name} (2026) - Xavkit`;
  const description = `Compare the best ${page.source.name} alternatives, including ${topNames}. See who should switch, who should stay, and which option fits your workflow.`;
  const url = absoluteUrl(`/alternatives/${page.source.slug}`);

  return {
    title,
    description: description.slice(0, 160),
    alternates: { canonical: url },
    robots: INDEXABLE_ROBOTS,
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

export default async function AlternativesPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getAlternativePageDataBySlug(slug);

  if (!page) return notFound();

  const pageUrl = absoluteUrl(`/alternatives/${page.source.slug}`);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: absoluteUrl("/tools"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.source.name,
        item: absoluteUrl(`/tools/${page.source.slug}`),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: `Alternatives to ${page.source.name}`,
        item: pageUrl,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best alternatives to ${page.source.name}`,
    description: `Ranked alternatives to ${page.source.name} with pricing, fit, and related editorial links.`,
    url: pageUrl,
    numberOfItems: page.alternatives.length,
    itemListElement: page.alternatives.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.tool.name,
      url: absoluteUrl(`/tools/${item.tool.slug}`),
      description: item.whyConsiderIt,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const decisionPicks = [page.beginnerPick, page.budgetPick, page.powerPick].filter(
    (pick): pick is NonNullable<typeof page.beginnerPick> => Boolean(pick)
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />
      <JsonLd data={faqSchema} />

      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="rounded-full">
          Alternatives
        </Badge>
        {page.source.tags.slice(0, 3).map((tag) => {
          const tagSlug = encodeURIComponent(tag.trim().toLowerCase());
          return (
            <Link key={tagSlug} href={`/tags/${tagSlug}`}>
              <Badge variant="secondary" className="rounded-full">
                {tag}
              </Badge>
            </Link>
          );
        })}
      </div>

      <h1 className="mt-4 text-3xl font-semibold">Best alternatives to {page.source.name}</h1>

      <div className="mt-4 max-w-4xl space-y-4 text-muted-foreground">
        {page.intro.map((paragraph, index) => (
          <p key={`${page.source.id}-intro-${index}`} className="text-base leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <Link
          href={`/tools/${page.source.slug}`}
          className="inline-flex items-center rounded-xl border px-4 py-2 transition hover:bg-muted/40"
        >
          View {page.source.name}
        </Link>
        <Link
          href="/comparisons"
          className="inline-flex items-center rounded-xl border px-4 py-2 transition hover:bg-muted/40"
        >
          Browse comparisons
        </Link>
        <Link
          href="/best"
          className="inline-flex items-center rounded-xl border px-4 py-2 transition hover:bg-muted/40"
        >
          Browse best lists
        </Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">What people are trying to replace</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div className="font-medium text-foreground">{page.source.name}</div>
            <p>{page.source.oneLiner}</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="rounded-full capitalize">
                {page.source.pricing.tier}
              </Badge>
              {formatRating(page.source.rating) ? (
                <Badge variant="outline" className="rounded-full">
                  Rated {formatRating(page.source.rating)}
                </Badge>
              ) : null}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">Top alternative right now</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <Link
              href={`/tools/${page.alternatives[0].tool.slug}`}
              className="font-medium text-foreground hover:underline"
            >
              {page.alternatives[0].tool.name}
            </Link>
            <p>{page.alternatives[0].whyConsiderIt}</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">Best next read</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            {page.relatedComparisons[0] ? (
              <Link
                href={`/comparisons/${page.relatedComparisons[0].slug}`}
                className="block rounded-xl border p-3 transition hover:bg-muted/40"
              >
                <div className="font-medium text-foreground">{page.relatedComparisons[0].title}</div>
                <div className="mt-1 line-clamp-2">{page.relatedComparisons[0].description}</div>
              </Link>
            ) : page.relatedBestPages[0] ? (
              <Link
                href={`/best/${page.relatedBestPages[0].slug}`}
                className="block rounded-xl border p-3 transition hover:bg-muted/40"
              >
                <div className="font-medium text-foreground">{page.relatedBestPages[0].title}</div>
                <div className="mt-1 line-clamp-2">
                  {page.relatedBestPages[0].intro?.[0] ?? page.relatedBestPages[0].description}
                </div>
              </Link>
            ) : (
              <p>Start with the shortlist below and jump into the closest tool pages for deeper pricing and tradeoff detail.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Alternatives shortlist</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {page.alternatives.map((item, index) => (
            <Card key={item.tool.id} className="rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex flex-wrap items-center gap-2 text-base">
                  <Badge variant="outline" className="rounded-full">
                    #{index + 1}
                  </Badge>
                  <Link href={`/tools/${item.tool.slug}`} className="hover:underline">
                    {item.tool.name}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-0 text-sm text-muted-foreground">
                <p>{item.tool.oneLiner}</p>
                <p>{item.whyConsiderIt}</p>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="rounded-full capitalize">
                    {item.tool.pricing.tier}
                  </Badge>
                  {formatRating(item.tool.rating) ? (
                    <Badge variant="outline" className="rounded-full">
                      Rated {formatRating(item.tool.rating)}
                    </Badge>
                  ) : null}
                  {item.tool.tags.slice(0, 3).map((tag) => {
                    const tagSlug = encodeURIComponent(tag.trim().toLowerCase());
                    return (
                      <Link key={`${item.tool.id}-${tagSlug}`} href={`/tags/${tagSlug}`}>
                        <Badge variant="secondary" className="rounded-full">
                          {tag}
                        </Badge>
                      </Link>
                    );
                  })}
                </div>

                <div className="space-y-2">
                  <div className="font-medium text-foreground">Why consider it</div>
                  <ul className="list-disc pl-5">
                    {item.tool.useCases.slice(0, 3).map((useCase) => (
                      <li key={`${item.tool.id}-${useCase}`}>{useCase}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/tools/${item.tool.slug}`}
                    className="underline underline-offset-4"
                  >
                    View {item.tool.name}
                  </Link>
                  {item.supportingComparisons[0] ? (
                    <Link
                      href={`/comparisons/${item.supportingComparisons[0].slug}`}
                      className="underline underline-offset-4"
                    >
                      Read comparison
                    </Link>
                  ) : null}
                  {item.supportingBestPages[0] ? (
                    <Link
                      href={`/best/${item.supportingBestPages[0].slug}`}
                      className="underline underline-offset-4"
                    >
                      See best list
                    </Link>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Side-by-side snapshot</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-muted/40 text-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Tool</th>
                <th className="px-4 py-3 font-medium">Best fit</th>
                <th className="px-4 py-3 font-medium">Pricing</th>
                <th className="px-4 py-3 font-medium">Rating</th>
              </tr>
            </thead>
            <tbody>
              {page.alternatives.map((item) => (
                <tr key={`row-${item.tool.id}`} className="border-t">
                  <td className="px-4 py-3 align-top">
                    <Link href={`/tools/${item.tool.slug}`} className="font-medium hover:underline">
                      {item.tool.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 align-top text-muted-foreground">
                    {item.tool.useCases.slice(0, 2).join(", ")}
                  </td>
                  <td className="px-4 py-3 align-top capitalize text-muted-foreground">
                    {item.tool.pricing.tier}
                  </td>
                  <td className="px-4 py-3 align-top text-muted-foreground">
                    {formatRating(item.tool.rating) ?? "Not listed"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Who should switch from {page.source.name}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <ul className="list-disc space-y-2 pl-5">
              {page.whoShouldSwitch.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Who should stay with {page.source.name}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <ul className="list-disc space-y-2 pl-5">
              {page.whoShouldStay.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {decisionPicks.map((pick) => (
          <Card key={pick.label} className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base">{pick.label}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <Link
                href={`/tools/${pick.alternative.tool.slug}`}
                className="font-medium text-foreground hover:underline"
              >
                {pick.alternative.tool.name}
              </Link>
              <p>{pick.reason}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {page.relatedComparisons.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Related comparisons</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {page.relatedComparisons.map((comparison) => (
              <Link key={comparison.id} href={`/comparisons/${comparison.slug}`}>
                <Card className="rounded-2xl transition hover:bg-muted/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{comparison.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 text-sm text-muted-foreground">
                    {comparison.description}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {page.relatedBestPages.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Related best lists</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {page.relatedBestPages.map((bestPage) => (
              <Link key={bestPage.id} href={`/best/${bestPage.slug}`}>
                <Card className="rounded-2xl transition hover:bg-muted/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{bestPage.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 text-sm text-muted-foreground">
                    {bestPage.intro?.[0] ?? bestPage.description}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-10 max-w-4xl">
        <h2 className="text-2xl font-semibold">FAQ</h2>
        <div className="mt-4 grid gap-3">
          {page.faq.map((item) => (
            <Card key={item.q} className="rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{item.q}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-muted-foreground">
                {item.a}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Keep exploring</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={`/tools/${page.source.slug}`}
            className="rounded-full border px-3 py-1 text-sm transition hover:bg-muted/40"
          >
            Back to {page.source.name}
          </Link>
          {page.relatedTags.map((tag) => {
            const tagSlug = encodeURIComponent(tag.trim().toLowerCase());
            return (
              <Link
                key={`explore-${tagSlug}`}
                href={`/tags/${tagSlug}`}
                className="rounded-full border px-3 py-1 text-sm transition hover:bg-muted/40"
              >
                More {tag}
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
