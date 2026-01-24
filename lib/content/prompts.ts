// lib/content/prompts.ts
import type { Prompt } from "@/lib/data-types";

export const prompts: Prompt[] = [
  {
    id: "p1",
    slug: "explain-like-tutor",
    title: "Explain Like a Patient Tutor",
    purpose: "Turn confusing topics into something you can repeat in an exam without panic.",
    prompt:
      "Act as a patient tutor.\nExplain {TOPIC} step-by-step using simple language. Include 2 examples, 1 analogy, and a 5-question mini-quiz with answers.\nKeep it under 350 words.",
    variations: [
      "Make it visual with a tiny ASCII diagram.",
      "Explain for a 12-year-old, then an adult.",
      "Only give the quiz + answers.",
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["study", "learning"],
    updatedAtISO: "2026-01-21",
  },
  {
    id: "p2",
    slug: "bug-hunter",
    title: "Bug Hunter (Ranked Causes + Minimal Fixes)",
    purpose: "Debug code without random guessing disguised as confidence.",
    prompt: `You are a debugging assistant.
Given the code and error, do: 1) List 3–6 likely causes ranked by probability. 2) For each cause: the exact line/area, why it fails, and the smallest fix. 3) Provide a quick test plan (3 checks). Ask at most 2 clarifying questions only if essential.
CODE: {CODE}
ERROR: {ERROR}`,
    variations: [
      "Also propose a cleaner refactor after the minimal fix.",
      "Add logging suggestions (minimal).",
      "Explain the bug like I’m new to the language.",
    ],
    modelCompatibility: ["GPT", "Claude"],
    tags: ["dev", "debug"],
    updatedAtISO: "2026-01-20",
  },
  {
    id: "p3",
    slug: "rewrite-for-clarity",
    title: "Rewrite for Clarity (No Fluff)",
    purpose: "Make text sharper, shorter, and harder to misunderstand.",
    prompt:
      "Rewrite the text for clarity. Keep meaning the same.\nRemove filler, simplify sentences, and keep it friendly.\nProvide: (1) Clean version, (2) 5 key bullet points, (3) One-line summary.\n\nTEXT:\n{TEXT}",
    variations: ["Make it sound more confident.", "Make it more casual.", "Make it more formal."],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["writing", "communication"],
    updatedAtISO: "2026-01-18",
  },
  {
    id: "p4",
    slug: "youtube-script-fast",
    title: "YouTube Script Generator (Hook → Value → CTA)",
    purpose: "Generate scripts that feel watchable, not like a school presentation.",
    prompt:
      "Write a YouTube script about {TOPIC} for {AUDIENCE}.\nStructure: Hook (0–10s), Promise, 3 sections with examples, quick recap, CTA.\nKeep pacing fast, sentences short.",
    variations: ["Add 5 title options.", "Add B-roll suggestions per section.", "Make it 60 seconds only (Shorts)."],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["creator", "content", "video"],
    updatedAtISO: "2026-01-17",
  },
  {
    id: "p5",
    slug: "study-plan-7-days",
    title: "7-Day Study Plan (Realistic, Not Delusional)",
    purpose: "Build a study plan that assumes you’re human and get tired.",
    prompt:
      "Create a 7-day study plan for {SUBJECT}.\nInputs: daily time available = {HOURS}, goal = {GOAL}.\nInclude: daily tasks, checkpoints, revision blocks, and 10 practice questions at the end.",
    variations: ["Make it 14 days.", "Include breaks + motivation tips.", "Add a final mock test with marking scheme."],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["study", "planning"],
    updatedAtISO: "2026-01-16",
  },
  {
    id: "p6",
    slug: "product-review-brief",
    title: "Product Review Brief (Balanced + Credible)",
    purpose: "Write reviews that don’t sound like paid ads.",
    prompt:
      "Write a balanced product review for {PRODUCT}.\nInclude: who it’s for, who should avoid it, 5 pros, 5 cons, and a final verdict score out of 10.\nKeep it honest and specific.",
    variations: [
      "Make it 200 words max.",
      "Make it a long-form article (1200–1600 words).",
      "Add 3 alternatives.",
    ],
    modelCompatibility: ["GPT", "Claude"],
    tags: ["writing", "reviews", "seo"],
    updatedAtISO: "2026-01-15",
  },
];
