import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SEARCH_DEMAND_GUIDES, getSearchDemandGuide } from "@/lib/content/search-demand-guides";
import { INDEXABLE_ROBOTS, NOINDEX_FOLLOW_ROBOTS, NOINDEX_NOFOLLOW_ROBOTS, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SEARCH_DEMAND_GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getSearchDemandGuide(slug);
  if (!guide) return { title: "Guide not found", robots: NOINDEX_NOFOLLOW_ROBOTS };
  const url = absoluteUrl("/guides/" + guide.slug);
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: url },
    robots: process.env.VERCEL_ENV === "preview" ? NOINDEX_FOLLOW_ROBOTS : INDEXABLE_ROBOTS,
    openGraph: { title: guide.title + " | Xavkit", description: guide.description, url, type: "article", siteName: "Xavkit" },
    twitter: { card: "summary_large_image", title: guide.title, description: guide.description },
  };
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const guide = getSearchDemandGuide(slug);
  if (!guide) return notFound();
  const url = absoluteUrl("/guides/" + guide.slug);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    dateModified: guide.updatedAtISO,
    // Publication dates are added only after the first live publication is verified.
    // An editorial revision date must not be misrepresented as the original publication date.
    ...(guide.publishedAtISO ? { datePublished: guide.publishedAtISO } : {}),
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: "Xavkit" },
    publisher: { "@type": "Organization", name: "Xavkit" },
  };
  // FAQ is presented visibly; do not add FAQPage rich-result markup here:
  // Google's FAQ rich results have restricted eligibility.
  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <JsonLd data={articleSchema} />
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link href="/guides" className="hover:underline">Guides</Link> / {guide.category}
      </nav>
      <h1 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">{guide.title}</h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{guide.description}</p>
      <p className="mt-4 text-sm text-muted-foreground">Content version: {guide.updatedAtISO} · {guide.category}</p>
      <section className="mt-9 rounded-2xl border p-6" aria-labelledby="quick-answer">
        <h2 className="text-lg font-semibold" id="quick-answer">Quick answer</h2>
        <p className="mt-3 leading-relaxed">{guide.answer}</p>
      </section>
      <div className="mt-9 space-y-4 leading-relaxed">
        {guide.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <section className="mt-12" aria-labelledby="steps-heading">
        <h2 id="steps-heading" className="text-2xl font-semibold">Step-by-step workflow</h2>
        <ol className="mt-5 space-y-6">
          {guide.steps.map((step, index) => (
            <li key={step.title} className="rounded-2xl border p-5">
              <h3 className="text-lg font-semibold">{index + 1}. {step.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{step.body}</p>
              <div className="mt-4 rounded-xl bg-muted/50 p-4 text-sm leading-relaxed">
                <strong>Example:</strong> {step.example}
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="mt-12" aria-labelledby="mistakes-heading">
        <h2 id="mistakes-heading" className="text-2xl font-semibold">Mistakes to avoid</h2>
        <ul className="mt-4 list-disc space-y-3 pl-6 leading-relaxed">
          {guide.pitfalls.map((pitfall) => <li key={pitfall}>{pitfall}</li>)}
        </ul>
      </section>
      <section className="mt-12" aria-labelledby="questions-heading">
        <h2 id="questions-heading" className="text-2xl font-semibold">Common questions</h2>
        <div className="mt-5 space-y-5">
          {guide.faqs.map((faq) => (
            <div key={faq.q} className="border-b pb-5">
              <h3 className="font-semibold">{faq.q}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-10" aria-labelledby="more-heading">
        <h2 id="more-heading" className="text-xl font-semibold">Continue with related resources</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5">
          {guide.relatedLinks.map((link) => (
            <li key={link.href}><Link className="text-primary hover:underline" href={link.href}>{link.label}</Link></li>
          ))}
        </ul>
      </section>
      <section className="mt-10 border-t pt-6" aria-labelledby="sources-heading">
        <h2 id="sources-heading" className="text-xl font-semibold">Further reading</h2>
        <p className="mt-2 text-sm text-muted-foreground">Explore the official documentation for more details about the tools and methods discussed.</p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          {guide.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{source.label}</a>
            </li>
          ))}
        </ul>
      </section>
      <Link href="/guides" className="mt-8 inline-block text-sm font-medium text-primary hover:underline">Browse all practical guides</Link>
    </article>
  );
}
