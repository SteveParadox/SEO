import type { Metadata } from "next";
import Link from "next/link";
import PromptsIndexClient from "./prompts-index-client";
import { DATA, getPromptBySlug } from "@/lib/data";
import { toPromptListing } from "@/lib/prompt-listing";
import { INDEXABLE_ROBOTS, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free AI Prompts for Work, Coding, SEO and Study",
  description:
    "Explore practical, copy-and-paste AI prompts for resumes, programming, spreadsheets, marketing and studying. Each template includes use cases and tips.",
  alternates: { canonical: absoluteUrl("/prompts") },
  robots: INDEXABLE_ROBOTS,
  openGraph: {
    title: "Free AI Prompts for Work, Coding, SEO and Study | Xavkit",
    description:
      "Browse actionable AI prompt templates, learn when to use them, and customize them for real tasks.",
    url: absoluteUrl("/prompts"),
    siteName: "Xavkit",
    type: "website",
  },
};

const workflows = [
  {
    tag: "career",
    name: "Job applications and careers",
    description: "Tailor a real resume, prepare for interviews and negotiate an offer without inventing experience.",
    slugs: ["ats-resume-optimizer", "salary-negotiation-email-template", "mock-job-interview-questions-generator"],
  },
  {
    tag: "development",
    name: "Coding and debugging",
    description: "Investigate technical failures, write maintainable code and review implementation risks.",
    slugs: ["nextjs-error-debugging-prompt", "docker-compose-error-diagnostic", "github-actions-workflow-debugger"],
  },
  {
    tag: "spreadsheets",
    name: "Excel and Google Sheets",
    description: "Build formulas, check data quality and turn messy reports into clear decisions.",
    slugs: ["excel-formula-generator", "xlookup-vlookup-formula-builder", "google-sheets-dashboard-planner"],
  },
  {
    tag: "seo",
    name: "SEO and content research",
    description: "Audit technical issues, improve metadata and connect pages that help the same readers.",
    slugs: ["seo-meta-title-description-optimizer", "technical-seo-audit-checklist", "seo-internal-linking-opportunity-finder"],
  },
  {
    tag: "copywriting",
    name: "Marketing and business writing",
    description: "Communicate product value and write accurate customer-facing messages.",
    slugs: ["ecommerce-product-description-generator", "cold-email-outreach-generator", "product-launch-email-sequence-generator"],
  },
  {
    tag: "education",
    name: "Teaching and study",
    description: "Practice recall, create lesson plans and organize academic work around real material.",
    slugs: ["quiz-generator-from-study-notes", "anki-flashcard-generator-from-notes", "teacher-lesson-plan-generator"],
  },
] as const;

export default function PromptsIndexPage() {
  // The full content stays in the server bundle; the filter only receives compact summaries.
  const summaries = DATA.prompts.map(toPromptListing);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-10">
        <p className="text-sm font-medium text-primary">AI prompt library</p>
        <h1 className="mt-2 max-w-4xl text-3xl font-semibold sm:text-4xl">
          Practical AI prompts for tasks you need to finish
        </h1>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          Find prompts you can copy and adapt for real work. Start with a specific task,
          check the included examples and limitations, then replace the placeholders with
          accurate details before using the output.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">Explore by task</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workflows.map((group) => (
            <section key={group.tag} className="rounded-2xl border p-5">
              <h3 className="font-semibold">
                <Link className="hover:underline" href={`/tags/${group.tag}`}>
                  {group.name}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{group.description}</p>
              <ul className="mt-4 space-y-2">
                {group.slugs.map((slug) => {
                  const prompt = getPromptBySlug(slug);
                  if (!prompt) return null;
                  return (
                    <li key={slug}>
                      <Link className="text-sm font-medium text-primary hover:underline" href={`/prompts/${slug}`}>
                        {prompt.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link className="mt-4 inline-block text-sm font-medium underline underline-offset-4" href={`/tags/${group.tag}`}>
                More {group.name.toLowerCase()} resources
              </Link>
            </section>
          ))}
        </div>
      </section>
      <PromptsIndexClient items={summaries} />
    </>
  );
}
