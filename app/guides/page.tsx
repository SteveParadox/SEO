import type { Metadata } from "next";
import Link from "next/link";
import { SEARCH_DEMAND_GUIDES } from "@/lib/content/search-demand-guides";
import { INDEXABLE_ROBOTS, NOINDEX_FOLLOW_ROBOTS, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Practical AI Tutorials and Guides",
  description: "Step-by-step AI guides for document research, data analysis, search-intent research, and creative work. Examples, checks, and limitations included.",
  alternates: { canonical: absoluteUrl("/guides") },
  robots: process.env.VERCEL_ENV === "preview" ? NOINDEX_FOLLOW_ROBOTS : INDEXABLE_ROBOTS,
  openGraph: {
    title: "Practical AI Tutorials and Guides | Xavkit",
    description: "Practical AI guides for real work, with verifiable examples and safety checks.",
    url: absoluteUrl("/guides"),
    type: "website",
    siteName: "Xavkit",
  },
};

export default function GuidesIndexPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Practical AI Tutorials and Guides",
    url: absoluteUrl("/guides"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: SEARCH_DEMAND_GUIDES.map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: guide.title,
        url: absoluteUrl("/guides/" + guide.slug),
      })),
    },
  };
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd data={schema} />
      <p className="text-sm font-medium text-primary">Practical workflows</p>
      <h1 className="mt-3 max-w-4xl text-3xl font-semibold sm:text-4xl">AI guides that help you finish the task</h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        Clear instructions for common research, data, SEO and creative tasks. Each guide includes a usable workflow, checks for common mistakes and links to relevant tools or templates.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {SEARCH_DEMAND_GUIDES.map((guide) => (
          <article key={guide.id} className="rounded-2xl border p-6">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{guide.category}</p>
            <h2 className="mt-2 text-xl font-semibold">
              <Link className="hover:underline" href={"/guides/" + guide.slug}>{guide.title}</Link>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{guide.description}</p>
            <Link className="mt-4 inline-block text-sm font-medium text-primary hover:underline" href={"/guides/" + guide.slug}>Read the guide</Link>
          </article>
        ))}
      </div>
      <section className="mt-12 max-w-3xl border-t pt-8">
        <h2 className="text-xl font-semibold">What these guides do not promise</h2>
        <p className="mt-3 text-muted-foreground">Search rankings, model outputs and product features change. These are editorial how-to guides, not a claim of live tool testing or a guaranteed search result. Check original sources and verify any consequential output.</p>
      </section>
    </div>
  );
}
