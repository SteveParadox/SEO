// content/best-pages.ts
export type BestPick = {
  toolId: string; // references DATA.tools[].id
  badge?: "Best Overall" | "Best Budget" | "Best for Teams" | "Best for Beginners" | "Best for Pros";
  why: string;           // short reason
  bestFor: string[];     // bullets
  watchOutFor?: string[]; // bullets
};

export type BestFaq = { q: string; a: string };

export type BestPage = {
  id: string;
  slug: string;          // /best/[slug]
  title: string;         // H1 + SEO title
  description: string;   // meta description
  primaryKeyword: string;
  intro: string[];       // paragraphs
  picks: BestPick[];
  faqs: BestFaq[];
  updatedAtISO: string;
  tags: string[];
};

export const BEST_PAGES: BestPage[] = [
  {
    id: "b1",
    slug: "best-ai-tools-for-students",
    title: "Best AI Tools for Students (2026)",
    description:
      "Top AI tools for studying, writing, research, and note-taking. Ranked picks with best-for, tradeoffs, and quick recommendations.",
    primaryKeyword: "best ai tools for students",
    intro: [
      "Students don’t need 400 AI tools. They need a few that actually help with essays, research, flashcards, and staying organized.",
      "This list ranks tools based on usefulness, learning value, and how likely they are to cause academic disaster if misused.",
    ],
    picks: [
      {
        toolId: "t2",
        badge: "Best Overall",
        why: "Fast research + summaries. Great for finding starting points and sources.",
        bestFor: ["Research outlines", "Quick topic overviews", "Finding sources to read"],
        watchOutFor: ["Always verify citations", "Don’t outsource thinking"],
      },
      {
        toolId: "t1",
        badge: "Best for Teams",
        why: "If your class group project lives in Notion, this makes writing and summaries painless.",
        bestFor: ["Shared notes", "Drafting docs", "Cleaning messy writing"],
        watchOutFor: ["Quality varies", "Paywall for heavy usage"],
      },
      {
        toolId: "t3",
        badge: "Best for Pros",
        why: "For CS students: real productivity when you’re working in actual codebases.",
        bestFor: ["Refactors", "Understanding unfamiliar code", "Shipping projects faster"],
        watchOutFor: ["Review changes carefully", "Can hallucinate"],
      },
    ],
    faqs: [
      { q: "Can I use AI tools for assignments?", a: "Depends on your school rules. Use tools for learning, outlining, and editing, not for cheating." },
      { q: "What’s the best tool for research?", a: "Use a research-focused assistant, but always read the actual sources before trusting conclusions." },
      { q: "What’s the safest way to use AI?", a: "Use it to explain concepts, test your understanding, and improve drafts. Keep your own voice and reasoning." },
    ],
    tags: ["students", "study", "writing", "research"],
    updatedAtISO: "2026-01-25",
  },

  {
    id: "b2",
    slug: "best-ai-tools-for-writing",
    title: "Best AI Tools for Writing (2026)",
    description:
      "Best AI writing tools for drafting, rewriting, and summarizing. Ranked picks with strengths, weaknesses, and best use cases.",
    primaryKeyword: "best ai tools for writing",
    intro: [
      "Writing tools are everywhere. Most are the same thing with different branding and a loud landing page.",
      "These picks are the ones people actually keep open in tabs.",
    ],
    picks: [
      {
        toolId: "t1",
        badge: "Best Overall",
        why: "It’s inside the workspace where writing happens. Low friction wins.",
        bestFor: ["Docs", "Summaries", "Rewrites"],
        watchOutFor: ["Generic tone sometimes"],
      },
      {
        toolId: "t2",
        badge: "Best for Beginners",
        why: "Good for turning a messy topic into a clean outline and references to follow.",
        bestFor: ["Outlines", "Research-to-draft workflows", "Quick summaries"],
      },
    ],
    faqs: [
      { q: "Do AI writing tools hurt your writing skills?", a: "They can if you let them write everything. Use them as an editor and tutor, not a ghostwriter." },
      { q: "What should I avoid?", a: "Avoid copying outputs blindly. Always rewrite and fact-check anything important." },
    ],
    tags: ["writing", "productivity"],
    updatedAtISO: "2026-01-25",
  },
];