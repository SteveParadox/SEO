// lib/content/collections.ts
import type { Collection } from "@/lib/data-types";

export const collections: Collection[] = [
  {
    id: "c1",
    slug: "best-ai-tools-students-2026",
    title: "Best AI Tools for Students (2026)",
    description: "Research faster, write cleaner, and stop doom-scrolling ‘study tips’.",
    items: [
      { kind: "tool", id: "t2" },
      { kind: "tool", id: "t7" },
      { kind: "tool", id: "t9" },
      { kind: "prompt", id: "p1" },
      { kind: "prompt", id: "p5" },
    ],
    tags: ["students", "study", "productivity"],
    updatedAtISO: "2026-01-21",
  },
  {
    id: "c2",
    slug: "prompt-pack-most-reused",
    title: "Prompt Pack: The Only Ones You’ll Reuse",
    description: "A small set of prompts that actually improve output quality.",
    items: [
      { kind: "prompt", id: "p2" },
      { kind: "prompt", id: "p3" },
      { kind: "prompt", id: "p6" },
      { kind: "update", id: "u1" },
    ],
    tags: ["prompts", "templates", "workflow"],
    updatedAtISO: "2026-01-20",
  },
  {
    id: "c3",
    slug: "creator-starter-pack",
    title: "Creator Starter Pack (Script → Voice → Publish)",
    description: "A simple pipeline to go from idea to content without melting down.",
    items: [
      { kind: "prompt", id: "p4" },
      { kind: "tool", id: "t4" },
      { kind: "tool", id: "t10" },
      { kind: "update", id: "u5" },
    ],
    tags: ["creator", "content", "workflow"],
    updatedAtISO: "2026-01-19",
  },
  {
    id: "c4",
    slug: "dev-ai-stack-lite",
    title: "Developer AI Stack (Lite, Practical)",
    description: "Tools that help you ship without building a shrine to productivity.",
    items: [
      { kind: "tool", id: "t1" },
      { kind: "tool", id: "t6" },
      { kind: "prompt", id: "p2" },
      { kind: "update", id: "u3" },
    ],
    tags: ["dev", "llm", "agents"],
    updatedAtISO: "2026-01-18",
  },
  {
    id: "c5",
    slug: "seo-playbook-ai-directory",
    title: "SEO Playbook for AI Directories",
    description: "How to build pages Google can index and humans can share.",
    items: [
      { kind: "update", id: "u4" },
      { kind: "prompt", id: "p6" },
      { kind: "tool", id: "t10" },
      { kind: "tool", id: "t2" },
    ],
    tags: ["seo", "content", "growth"],
    updatedAtISO: "2026-01-17",
  },
];
