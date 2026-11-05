import type { Metadata } from "next";
import Link from "next/link";
import { DATA } from "@/lib/data";
import { PROMPT_TOPICS, promptsForTopic } from "@/lib/prompt-topics";
import { INDEXABLE_ROBOTS, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "AI Prompt Topics for Careers, Coding, SEO, Study and More",
  description:
    "Explore task-based AI prompt collections for job applications, programming, spreadsheets, SEO, business writing and education.",
  alternates: { canonical: absoluteUrl("/prompts/topics") },
  robots: INDEXABLE_ROBOTS,
  openGraph: {
    title: "Browse AI Prompt Topics | Xavkit",
    description: "Find focused AI prompt guides and templates grouped by the work you want to get done.",
    url: absoluteUrl("/prompts/topics"),
    siteName: "Xavkit",
    type: "website",
  },
};

export default function PromptTopicsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold sm:text-4xl">Browse AI prompts by topic</h1>
      <p className="mt-4 max-w-3xl text-muted-foreground">
        Start with a real task, not a generic prompt list. Each topic includes guidance for using
        AI responsibly, practical templates, and related workflows you can explore next.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {PROMPT_TOPICS.map((topic) => {
          const count = promptsForTopic(topic, DATA.prompts).length;
          return (
            <section key={topic.slug} className="rounded-2xl border p-6">
              <h2 className="text-xl font-semibold">
                <Link className="hover:underline" href={`/prompts/topics/${topic.slug}`}>
                  {topic.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">{topic.summary}</p>
              <p className="mt-3 text-sm">{count} prompt templates to explore</p>
              <Link className="mt-4 inline-block text-sm font-medium text-primary hover:underline" href={`/prompts/topics/${topic.slug}`}>
                Browse this topic
              </Link>
            </section>
          );
        })}
      </div>
      <p className="mt-10 text-sm text-muted-foreground">
        Not sure where to start? <Link className="underline" href="/prompts">Search the full prompt library.</Link>
      </p>
    </div>
  );
}
