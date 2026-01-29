import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getBestPageBySlug, resolveBestPicks, getRelatedBestPages } from "@/lib/data";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getBestPageBySlug(slug);
  if (!page) return { title: "Not found" };

  const url = absoluteUrl(`/best/${page.slug}`);

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: "ToolDrop AI",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

function titleCase(s: string) {
  return s
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
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

  const faqSchema =
    page.faqs?.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.a,
            },
          })),
        }
      : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd data={itemListSchema} />
      {faqSchema ? <JsonLd data={faqSchema} /> : null}

      {/* Title */}
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="rounded-full">
          Best
        </Badge>
        <h1 className="text-3xl font-semibold">{page.title}</h1>
      </div>

      {/* Tags (cross-entity linking) */}
      {page.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {page.tags.map((t) => {
            const label = t.trim();
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

      {/* Intro */}
      <div className="mt-4 max-w-3xl space-y-3 text-muted-foreground">
        {page.intro.map((p, i) => (
          <p key={`${page.id}-intro-${i}`}>{p}</p>
        ))}
      </div>

      {/* Picks */}
      <div className="mt-8 grid gap-4">
        {picks.map(({ pick, tool }, idx) => (
          <Card key={`${tool.id}-${idx}`} className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2 flex-wrap">
                {pick.badge ? (
                  <Badge variant="secondary" className="rounded-full">
                    {pick.badge}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="rounded-full">
                    #{idx + 1}
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
                    {pick.bestFor.map((x) => (
                      <li key={`${tool.id}-bestfor-${x}`}>{x}</li>
                    ))}
                  </ul>
                </div>

                {pick.watchOutFor?.length ? (
                  <div>
                    <div className="text-sm font-medium">Watch out for</div>
                    <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                      {pick.watchOutFor.map((x) => (
                        <li key={`${tool.id}-watch-${x}`}>{x}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>

              {/* Links row (internal money block helpers) */}
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <Link className="underline" href={`/tools/${tool.slug}`}>
                  View {tool.name}
                </Link>

                {tool.tags?.slice(0, 2).map((t) => {
                  const label = t.trim();
                  const tagSlug = encodeURIComponent(label.toLowerCase());
                  return (
                    <Link key={`${tool.id}-tag-${tagSlug}`} className="underline" href={`/tags/${tagSlug}`}>
                      More {titleCase(label)}
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Money block / recommendation */}
      <Card className="mt-10 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base">Quick recommendation</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-3">
          <p>
            If you want the safest “works for most people” choice, start with the <span className="font-medium">Best Overall</span>.
            If budget matters, pick the <span className="font-medium">Best Budget</span> option. If you’re buying for a team,
            prioritize collaboration and admin controls over random flashy features.
          </p>

          <div className="flex flex-wrap gap-3">
            {picks[0]?.tool ? (
              <Link className="underline" href={`/tools/${picks[0].tool.slug}`}>
                View top pick
              </Link>
            ) : null}

            {picks[1]?.tool ? (
              <Link className="underline" href={`/tools/${picks[1].tool.slug}`}>
                View runner-up
              </Link>
            ) : null}

            <Link className="underline" href="/tools">
              Browse all tools
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* FAQs */}
      {page.faqs?.length ? (
        <div className="mt-10 max-w-3xl">
          <h2 className="text-xl font-semibold">FAQ</h2>
          <div className="mt-4 grid gap-3">
            {page.faqs.map((f, i) => (
              <Card key={`${page.id}-faq-${i}`} className="rounded-2xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{f.q}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-sm text-muted-foreground">
                  {f.a}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : null}

      {/* Related */}
      {related.length ? (
        <div className="mt-10">
          <h2 className="text-xl font-semibold">Related best lists</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {related.map((r) => (
              <Link key={r.id} href={`/best/${r.slug}`}>
                <Card className="rounded-2xl hover:bg-muted/40 transition">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{r.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-sm text-muted-foreground line-clamp-2">
                      {r.intro?.[0] ?? r.description}
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