import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ToolComparisonBuilder } from "@/components/tool-comparison-builder";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { INDEXABLE_ROBOTS, absoluteUrl } from "@/lib/seo";

const PAGE_TITLE = "Compare AI Tools Side by Side | Interactive Comparison Builder | XavKit";
const PAGE_DESCRIPTION =
  "Compare 2 or 3 AI tools side by side using real site data. Check pricing, ratings, use cases, pros, cons, and get a grounded 'best for me' recommendation.";
const PAGE_URL = absoluteUrl("/compare-tools");

const FAQS = [
  {
    q: "How does the comparison builder choose a winner?",
    a: "The recommendation is a deterministic score built from the fields already used on each tool page: pricing tier, rating, use-case breadth, tags, listed pros, and listed cons. The selected priority changes which of those signals matter most.",
  },
  {
    q: "Can I compare 3 tools at once?",
    a: "Yes. The builder supports two-way comparisons and three-tool matchups, with the same shareable URL behavior for both.",
  },
  {
    q: "Are these recommendations based on real page data?",
    a: "Yes. The builder reuses the repo's existing structured content instead of calling an external API or inventing new ratings behind the scenes.",
  },
  {
    q: "What if I want a deeper comparison than the table?",
    a: "Use the related editorial comparison links shown in the results. Those pages add longer written context, tradeoffs, and decision framing.",
  },
  {
    q: "Why do some tools win for one priority and lose for another?",
    a: "Because the builder changes the weighting. A cheaper or easier tool can win for beginners, while a broader or higher-rated tool might win when you care more about serious long-term work.",
  },
];

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
  },
  robots: INDEXABLE_ROBOTS,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    type: "website",
    siteName: "XavKit",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

export default function CompareToolsPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((entry) => ({
      "@type": "Question",
      name: entry.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.a,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl">
        <Badge variant="secondary" className="rounded-full">
          Interactive decision tool
        </Badge>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Compare AI tools side by side before you commit
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          This comparison builder helps you put two or three AI tools next to each other,
          check the tradeoffs quickly, and see which option looks strongest for your
          priority. It is built for real decision-making, not just a thin price table.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Use it when you are weighing a writing assistant, coding tool, research app,
          note-taking platform, or another workflow product and want a cleaner answer than
          opening ten tabs at once.
        </p>
      </div>

      <div className="mt-10">
        <Suspense fallback={<div className="text-muted-foreground">Loading comparison builder...</div>}>
          <ToolComparisonBuilder />
        </Suspense>
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold">How the builder works</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle className="text-lg">1. Pick the tools</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              Start with any two tools for a direct head-to-head comparison, then add a
              third when you want a wider shortlist.
            </CardContent>
          </Card>

          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle className="text-lg">2. Change the priority</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              Switch between cost, beginner-friendliness, versatility, serious-work fit,
              or overall balance to reflect what matters most to you.
            </CardContent>
          </Card>

          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle className="text-lg">3. Go deeper from the result</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              The result links out to tool reviews, editorial comparison pages, and best
              lists so you can keep researching without restarting your search.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="text-2xl font-semibold">What each priority actually means</h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
            The winner is not fixed. A free tool can be the best value for someone just
            starting out, while a more specialized option can make more sense when you care
            about depth, workflow coverage, or long-term team fit.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border p-4">
              <div className="font-medium">Lowest cost</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Heavily favors free and freemium options, but still checks quality so the
                cheapest pick does not win by default.
              </p>
            </div>

            <div className="rounded-2xl border p-4">
              <div className="font-medium">Easiest for beginners</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Looks for lower-friction tools, clearer use cases, and fewer obvious setup
                or learning-curve warnings.
              </p>
            </div>

            <div className="rounded-2xl border p-4">
              <div className="font-medium">Most versatile</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Rewards broader use-case coverage and tools that appear useful across more
                than one narrow task.
              </p>
            </div>

            <div className="rounded-2xl border p-4">
              <div className="font-medium">Strongest for serious work</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Leans toward stronger ratings, deeper workflow fit, and tools that look more
                comfortable in demanding or team-oriented use.
              </p>
            </div>
          </div>
        </div>

        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle className="text-xl">Helpful comparison paths</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Link
              href="/comparisons"
              className="block rounded-2xl border p-4 transition hover:bg-muted/30"
            >
              Browse the editorial comparison library
            </Link>
            <Link
              href="/best/best-ai-tools-for-writing"
              className="block rounded-2xl border p-4 transition hover:bg-muted/30"
            >
              Best AI tools for writing
            </Link>
            <Link
              href="/best/best-ai-coding-tools"
              className="block rounded-2xl border p-4 transition hover:bg-muted/30"
            >
              Best AI coding tools
            </Link>
            <Link
              href="/best/best-ai-tools-for-research"
              className="block rounded-2xl border p-4 transition hover:bg-muted/30"
            >
              Best AI tools for research
            </Link>
            <Link
              href="/search"
              className="block rounded-2xl border p-4 transition hover:bg-muted/30"
            >
              Search the full site by tool, tag, or workflow
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold">Why this page exists</h2>
        <div className="mt-4 max-w-4xl space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            Comparing AI tools is usually messy because the useful details are scattered:
            pricing on one page, use cases on another, honest tradeoffs buried in long
            reviews, and editorial comparisons hidden a few clicks away. This page pulls
            those structured signals together into one cleaner decision flow.
          </p>
          <p>
            The goal is not to pretend a scoring model can replace judgment. The goal is to
            give you a faster starting point, make the tradeoffs visible, and point you
            toward the deeper tool pages and comparison content that already exist across the
            site.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold">FAQ</h2>
        <div className="mt-6 space-y-4">
          {FAQS.map((entry) => (
            <Card key={entry.q} className="rounded-3xl">
              <CardHeader>
                <CardTitle className="text-lg">{entry.q}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                {entry.a}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
