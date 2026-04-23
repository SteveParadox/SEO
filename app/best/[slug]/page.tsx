import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DATA,
  getBestPageBySlug,
  resolveBestPicks,
  getRelatedBestPages,
} from "@/lib/data";
import { JsonLd } from "@/components/json-ld";
import { INDEXABLE_ROBOTS, NOINDEX_NOFOLLOW_ROBOTS, absoluteUrl } from "@/lib/seo";
import { TrackedExternalLink } from "@/components/tracked-external-link";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return DATA.bestPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getBestPageBySlug(slug);

  if (!page) {
    return {
      title: "Best list not found - Xavkit",
      robots: NOINDEX_NOFOLLOW_ROBOTS,
    };
  }

  const baseTitle = page.title?.trim() || "Best List";
  const baseDescription = page.description?.trim() || "Curated AI tool list";

  const url = absoluteUrl(`/best/${page.slug}`);
  const title = `${baseTitle} - Xavkit`;
  const description = baseDescription.slice(0, 160);

  return {
    title,
    description,
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

function titleCase(input: string) {
  return input
    .split("-")
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");
}

export default async function BestPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getBestPageBySlug(slug);
  if (!page) return notFound();

  const picks = resolveBestPicks(page);
  const related = getRelatedBestPages(page.id, 6);
  const pageUrl = absoluteUrl(`/best/${page.slug}`);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: page.title,
    description: page.description,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    dateModified: page.updatedAtISO,
    itemListOrder: "Descending",
    numberOfItems: picks.length,
    itemListElement: picks.map(({ pick, tool }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: absoluteUrl(`/tools/${tool.slug}`),
      description: pick.why,
    })),
  };

  const faqSchema = page.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      }
    : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd data={itemListSchema} />
      {faqSchema ? <JsonLd data={faqSchema} /> : null}

      <div className="flex items-center gap-2">
        <Badge variant="outline" className="rounded-full">
          Best
        </Badge>
        <h1 className="text-3xl font-semibold">{page.title}</h1>
      </div>

      {page.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {page.tags.map((tag) => {
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
      ) : null}

      <div className="mt-6 max-w-3xl space-y-4 text-muted-foreground">
        {page.intro.map((paragraph, index) => (
          <p
            key={`${page.id}-intro-${index}`}
            className="text-base leading-relaxed"
          >
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-8 grid gap-4">
        <h2 className="text-2xl font-semibold">Ranked picks</h2>

        <div className="grid gap-4">
          {picks.map(({ pick, tool }, index) => (
            <Card key={`${tool.id}-${index}`} className="rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="flex flex-wrap items-center gap-2 text-base">
                  {pick.badge ? (
                    <Badge variant="secondary" className="rounded-full">
                      {pick.badge}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="rounded-full">
                      #{index + 1}
                    </Badge>
                  )}

                  <Link className="hover:underline" href={`/tools/${tool.slug}`}>
                    {tool.name}
                  </Link>
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="text-sm text-muted-foreground">{pick.why}</div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <div className="text-sm font-medium">Best for</div>
                    <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                      {pick.bestFor.map((value) => (
                        <li key={`${tool.id}-bestfor-${value}`}>{value}</li>
                      ))}
                    </ul>
                  </div>

                  {pick.watchOutFor?.length ? (
                    <div>
                      <div className="text-sm font-medium">Watch out for</div>
                      <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                        {pick.watchOutFor.map((value) => (
                          <li key={`${tool.id}-watch-${value}`}>{value}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>

                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <Link className="underline" href={`/tools/${tool.slug}`}>
                    View {tool.name}
                  </Link>

                  {tool.officialUrl ? (
                    <TrackedExternalLink
                      href={tool.isAffiliate && tool.affiliateUrl ? tool.affiliateUrl : tool.officialUrl}
                      kind="tool"
                      id={tool.id}
                      slug={tool.slug}
                      title={tool.name}
                      subtitle={tool.oneLiner}
                      target="_blank"
                      rel="nofollow sponsored noopener"
                      className="underline underline-offset-4"
                    >
                      Visit site
                    </TrackedExternalLink>
                  ) : null}

                  {tool.tags?.slice(0, 2).map((tag) => {
                    const label = tag.trim();
                    const tagSlug = encodeURIComponent(label.toLowerCase());

                    return (
                      <Link
                        key={`${tool.id}-tag-${tagSlug}`}
                        className="underline"
                        href={`/tags/${tagSlug}`}
                      >
                        More {titleCase(label)}
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {page.faqs?.length ? (
        <div className="mt-10 max-w-3xl">
          <h2 className="text-xl font-semibold">FAQ</h2>
          <div className="mt-4 grid gap-3">
            {page.faqs.map((faq, index) => (
              <Card key={`${page.id}-faq-${index}`} className="rounded-2xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-sm text-muted-foreground">
                  {faq.a}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : null}

      {related.length ? (
        <div className="mt-10">
          <h2 className="text-xl font-semibold">Related best lists</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {related.map((item) => (
              <Link key={item.id} href={`/best/${item.slug}`}>
                <Card className="rounded-2xl transition hover:bg-muted/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="line-clamp-2 text-sm text-muted-foreground">
                      {item.intro?.[0] ?? item.description}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
