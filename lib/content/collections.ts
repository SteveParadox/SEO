// lib/content/collections.ts
import type { Collection } from "@/lib/data-types";

export const collections: Collection[] = [
  {
    id: "c1",
    slug: "best-ai-tools-students-2026",
    title: "Best AI Tools for Students (2026)",
    description:
      "A practical stack for studying: understand faster, write cleaner, revise smarter. Minimal fluff, maximum grades.",
    items: [
      // Start with “how to use AI for learning”, not random tools
      { kind: "prompt", id: "p1" }, // Explain like a tutor
      { kind: "prompt", id: "p5" }, // 7-day study plan
      { kind: "tool", id: "t2" },
      { kind: "tool", id: "t7" },
      { kind: "tool", id: "t9" },
    ],
    tags: ["students", "study", "productivity"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c2",
    slug: "prompt-pack-most-reused",
    title: "Prompt Pack: The Ones You’ll Actually Reuse",
    description:
      "A small set of prompts for better output quality in real workflows: debugging, rewriting, and writing honestly.",
    items: [
      { kind: "prompt", id: "p2" }, // Bug hunter
      { kind: "prompt", id: "p3" }, // Rewrite for clarity
      { kind: "prompt", id: "p6" }, // Product review brief
      { kind: "update", id: "u1" },
    ],
    tags: ["prompts", "templates", "workflow"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c3",
    slug: "creator-starter-pack",
    title: "Creator Starter Pack (Script → Voice → Publish)",
    description:
      "A simple, repeatable content pipeline: turn an idea into a script, polish it, and publish without overthinking.",
    items: [
      { kind: "prompt", id: "p4" }, // YouTube script
      { kind: "tool", id: "t4" },
      { kind: "tool", id: "t10" },
      { kind: "update", id: "u5" },
    ],
    tags: ["creator", "content", "workflow"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c4",
    slug: "dev-ai-stack-lite",
    title: "Developer AI Stack (Lite, Practical)",
    description:
      "A focused set of tools and prompts that reduce time-to-fix and time-to-ship, without turning your brain into a checklist.",
    items: [
      { kind: "prompt", id: "p2" }, // Start with debugging workflow
      { kind: "tool", id: "t1" },
      { kind: "tool", id: "t6" },
      { kind: "update", id: "u3" },
    ],
    tags: ["dev", "llm", "agents"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c5",
    slug: "seo-playbook-ai-directory",
    title: "SEO Playbook for AI Directories",
    description:
      "How to build pages Google can index and humans actually share: structure, content patterns, and basic growth loops.",
    items: [
      { kind: "update", id: "u4" },
      { kind: "prompt", id: "p6" }, // Reviews that don’t sound paid
      { kind: "tool", id: "t10" },
      { kind: "tool", id: "t2" },
    ],
    tags: ["seo", "content", "growth"],
    updatedAtISO: "2026-01-24",
  },

  // ---- Added: collections that match common intent + improve internal linking ----

  {
    id: "c6",
    slug: "ai-tools-for-writing-work",
    title: "AI for Writing at Work (Clear, Professional, Fast)",
    description:
      "Prompts and tools to write emails, docs, and updates that sound competent instead of generated.",
    items: [
      { kind: "prompt", id: "p3" }, // Rewrite for clarity
      { kind: "prompt", id: "p6" }, // Balanced reviews (also useful for proposals/briefs)
      { kind: "tool", id: "t2" },
      { kind: "update", id: "u1" },
    ],
    tags: ["writing", "productivity", "work"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c7",
    slug: "exam-cram-kit",
    title: "Exam Cram Kit (Learn → Practice → Recall)",
    description:
      "A short loop that works: learn the concept, test yourself, then repeat until it sticks.",
    items: [
      { kind: "prompt", id: "p1" },
      { kind: "prompt", id: "p5" },
      { kind: "tool", id: "t7" },
      { kind: "tool", id: "t9" },
    ],
    tags: ["study", "students", "revision"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c8",
    slug: "build-content-consistently",
    title: "Post Consistently (Without Burning Out)",
    description:
      "A content workflow for creators who want output, not motivational quotes: idea → script → publish → improve.",
    items: [
      { kind: "prompt", id: "p4" },
      { kind: "prompt", id: "p5" }, // planning applies to content too
      { kind: "tool", id: "t10" },
      { kind: "update", id: "u5" },
    ],
    tags: ["creator", "workflow", "planning"],
    updatedAtISO: "2026-01-24",
  },
];