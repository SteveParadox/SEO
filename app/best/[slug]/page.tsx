import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  getBestPageBySlug,
  resolveBestPicks,
  getRelatedBestPages,
} from "@/lib/data";

import { JsonLd } from "@/components/json-ld";
import { absoluteUrl } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getBestPageBySlug(slug);
  if (!page) return { title: "Not found" };

  const url = `/best/${page.slug}`;

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
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
    itemListOrder: "https://schema.org/ItemListOrderDescending",
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

      <div className="flex items-center gap-2">
        <Badge variant="outline" className="rounded-full">
          Best
        </Badge>
        <h1 className="text-3xl font-semibold">{page.title}</h1>
      </div>

      <div className="mt-3 max-w-3xl space-y-3 text-muted-foreground">
        {page.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="mt-8 grid gap-4">
        {picks.map(({ pick, tool }) => (
          <Card key={tool.id} className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                {pick.badge ? (
                  <Badge variant="secondary" className="rounded-full">
                    {pick.badge}
                  </Badge>
                ) : null}

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
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>

                {pick.watchOutFor?.length ? (
                  <div>
                    <div className="text-sm font-medium">Watch out for</div>
                    <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                      {pick.watchOutFor.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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
                      {r.intro[0] ?? r.description}
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
