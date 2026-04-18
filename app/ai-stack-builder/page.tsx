import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { AiStackBuilder } from "@/components/ai-stack-builder";
import { JsonLd } from "@/components/json-ld";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { absoluteUrl } from "@/lib/seo";
import { STACK_GOALS, getGoalSpotlights } from "@/lib/stack-builder";

const PAGE_URL = absoluteUrl("/ai-stack-builder");

const faqItems = [
  {
    q: "What is an AI stack?",
    a: "An AI stack is the small set of tools, prompts, and decision pages you rely on for one workflow. A good stack removes friction without forcing you into five disconnected subscriptions.",
  },
  {
    q: "How are these recommendations chosen?",
    a: "The builder scores existing site content against your selected goal, budget, skill level, and workflow pace. It uses content tags, prompt purpose, tool use cases, pricing tier, comparisons, and best-list context instead of random picks.",
  },
  {
    q: "Can beginners use this?",
    a: "Yes. Beginner mode biases toward lower-friction tools and prompts with clearer guidance, while advanced mode gives more room to complex or deeper workflows.",
  },
  {
    q: "What if I only want free tools?",
    a: "Set the budget filter to free. That meaningfully boosts free tools and downranks paid-only picks, while still trying to preserve a coherent workflow for the goal you chose.",
  },
  {
    q: "Why am I seeing prompts and comparisons along with tools?",
    a: "A useful stack is not only software. Prompts improve execution, comparisons help you commit with more confidence, and best lists give you a broader shortlist if the first stack is close but not perfect.",
  },
] as const;

const strategyPoints = [
  {
    title: "Goal-first ranking",
    description:
      "The goal filter carries the most weight. A coding stack should not drift toward generic productivity tools just because they are popular.",
  },
  {
    title: "Budget-aware picks",
    description:
      "Free and freemium choices get materially different scores. Budget is not cosmetic in the logic, so the tool list changes when price matters.",
  },
  {
    title: "Personalization stays mild",
    description:
      "Saved and recently viewed items can nudge ranking when they match your chosen goal, but they never overpower the filters you picked on purpose.",
  },
] as const;

const supportingSections = [
  {
    title: "Why this page exists",
    copy:
      "Most AI tool roundups stop at generic lists. Real users need a tighter answer: what should I actually open first for my workflow, what prompt should I pair with it, and what page should I read before I commit? This builder turns the site's tools, prompts, comparisons, and best lists into a more practical entry point.",
  },
  {
    title: "How to use the builder well",
    copy:
      "Treat the stack as a starting workflow, not a forever contract. Pick the goal that matches the job you are trying to finish this week, not the identity you want to have next quarter. Then use the linked comparison and best list to pressure-test the top picks before you settle on a long-term setup.",
  },
  {
    title: "What each input changes",
    copy:
      "Goal controls topical fit across every content type. Budget pushes tools toward free, freemium, or paid options. Skill level changes how much setup complexity the stack tolerates. Workflow pace helps separate quick wins from deeper, more research-heavy stacks.",
  },
] as const;

export const metadata: Metadata = {
  title: "Personal AI Stack Builder",
  description:
    "Build a practical AI stack for writing, coding, research, studying, or marketing with ranked tools, prompts, comparisons, and best-list links.",
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Personal AI Stack Builder",
    description:
      "Find the right AI stack for your goal, budget, and skill level using the site's existing tools, prompts, comparisons, and best pages.",
    url: PAGE_URL,
    siteName: "Xavkit",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal AI Stack Builder",
    description:
      "Generate a practical AI stack for writing, coding, research, studying, or marketing.",
  },
};

export default function AiStackBuilderPage() {
  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Personal AI Stack Builder",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: PAGE_URL,
    description:
      "Interactive builder that recommends AI tools, prompts, comparisons, and best lists based on use case, budget, skill level, and workflow pace.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Goal-based AI stack recommendations",
      "Budget-aware tool ranking",
      "Internal links to prompts, comparisons, and best lists",
      "Shareable URL state",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <JsonLd data={webApplicationSchema} />
      <JsonLd data={faqSchema} />

      <section className="max-w-4xl">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="rounded-full">
            Interactive guide
          </Badge>
          <Badge variant="outline" className="rounded-full">
            SEO-friendly
          </Badge>
          <Badge variant="outline" className="rounded-full">
            Local-first
          </Badge>
        </div>

        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
          Personal AI Stack Builder
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
          Build a practical AI stack for writing, coding, research, studying, or marketing. Pick
          a goal, budget, skill level, and workflow pace, then get a ranked mix of tools, prompts,
          comparisons, and best lists pulled from the site&apos;s existing content library.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
          This page is useful before you click anything: it explains how the rankings work, links
          into the strongest hub pages for each goal, and gives you a cleaner starting point than
          jumping between generic AI roundups.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {[
            { href: "/tools", label: "Browse tools" },
            { href: "/prompts", label: "Browse prompts" },
            { href: "/comparisons", label: "Compare tools" },
            { href: "/best", label: "See best lists" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition hover:bg-muted/40"
            >
              {link.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <AiStackBuilder />
      </section>

      <section className="mt-14 grid gap-4 lg:grid-cols-3">
        {supportingSections.map((section) => (
          <Card key={section.title} className="rounded-2xl border-border/70">
            <CardHeader className="border-b">
              <CardTitle className="text-lg">{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 text-sm leading-6 text-muted-foreground">
              {section.copy}
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-14">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight">How recommendations are selected</h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            The builder uses the same content model already powering this site. It scores tools,
            prompts, comparisons, and best pages against the choices you make, then assembles a
            stack that feels internally consistent instead of stitched together.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {strategyPoints.map((point) => (
            <Card key={point.title} className="rounded-2xl border-border/70">
              <CardHeader className="border-b">
                <CardTitle className="text-lg">{point.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 text-sm leading-6 text-muted-foreground">
                {point.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight">Goal-specific starting points</h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            If you want to explore before using the builder, these are the strongest internal pages
            to open next for each major use case.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {STACK_GOALS.map((goal) => {
            const links = getGoalSpotlights(goal.value);

            return (
              <Card key={goal.value} className="rounded-2xl border-border/70">
                <CardHeader className="border-b">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="rounded-full">
                      {goal.label}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{goal.label}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <p className="text-sm leading-6 text-muted-foreground">{goal.description}</p>

                  <div className="space-y-3">
                    {links.map((link) => (
                      <Link
                        key={`${goal.value}-${link.href}`}
                        href={link.href}
                        className="block rounded-2xl border p-4 transition hover:bg-muted/40"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                              {link.label}
                            </div>
                            <div className="mt-2 font-medium leading-snug">{link.title}</div>
                            <div className="mt-2 text-sm text-muted-foreground line-clamp-2">
                              {link.description}
                            </div>
                          </div>
                          <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mt-14 max-w-4xl">
        <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
        <div className="mt-6 grid gap-4">
          {faqItems.map((item) => (
            <Card key={item.q} className="rounded-2xl border-border/70">
              <CardHeader className="border-b">
                <CardTitle className="text-lg">{item.q}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 text-sm leading-6 text-muted-foreground">
                {item.a}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
