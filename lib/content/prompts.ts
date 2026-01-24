// lib/content/prompts.ts
import type { Prompt } from "@/lib/data-types";

export const prompts: Prompt[] = [
  {
    id: "p1",
    slug: "explain-like-tutor",
    title: "Explain Like a Patient Tutor (Step-by-step + Quiz)",
    purpose:
      "Turn confusing topics into something you can explain back clearly, under pressure.",
    prompt: `You are a patient tutor.
Teach {TOPIC} step-by-step in plain language.

Rules:
- If {TOPIC} is vague, ask 1 clarifying question first. Otherwise proceed.
- Keep it under 350 words total.
- Avoid jargon. If you must use a term, define it in 8 words or less.

Output format:
1) Simple explanation (steps)
2) Tiny analogy (1–2 sentences)
3) Two examples (labeled Example A and Example B)
4) Mini-quiz (5 questions)
5) Answer key

Topic: {TOPIC}`,
    variations: [
      "Add a tiny ASCII diagram in section 1.",
      "Explain for a 12-year-old, then for an adult (same structure).",
      "Only output the mini-quiz + answer key.",
      "Make the examples exam-style (short, tricky, realistic).",
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["study", "learning"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "p2",
    slug: "bug-hunter",
    title: "Bug Hunter (Ranked Causes + Minimal Fixes)",
    purpose: "Debug code without random guessing disguised as confidence.",
    prompt: `You are a debugging assistant. Be precise, not dramatic.

Input:
CODE: {CODE}
ERROR: {ERROR}

Rules:
- Ask at most 2 clarifying questions only if you truly cannot proceed.
- Prefer minimal fixes first. Refactor is optional and must be separated.
- If you cite a line number, quote that exact line/section from CODE.

Output format:
A) Quick read (1–2 sentences): what the error *likely* means.
B) Likely causes (ranked 1–6):
   For each cause:
   - Where: file/line/area
   - Why it fails (short)
   - Smallest fix (exact change)
C) Patch snippet(s) (only the changed lines)
D) Quick test plan (3 checks)
E) Optional cleanup refactor (if it improves clarity without changing behavior)`,
    variations: [
      "Also propose a cleaner refactor after the minimal fix (clearly labeled).",
      "Add minimal logging suggestions to confirm the hypothesis.",
      "Explain the bug like I’m new to the language, but keep the fixes the same.",
      "Prioritize root-cause over symptom-fix (still keep minimal patch).",
    ],
    modelCompatibility: ["GPT", "Claude"],
    tags: ["dev", "debug"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "p3",
    slug: "rewrite-for-clarity",
    title: "Rewrite for Clarity (No Fluff, Same Meaning)",
    purpose: "Make text sharper, shorter, and harder to misunderstand.",
    prompt: `Rewrite the text for clarity while keeping the meaning the same.

Rules:
- Remove filler and repetition.
- Short sentences. Active voice.
- Keep the tone friendly.
- If the text is missing key context, add a brief [Assumption] line (max 1).

Output format:
1) Clean version
2) 5 key bullet points
3) One-line summary

TEXT:
{TEXT}`,
    variations: [
      "Make it more confident (but not arrogant).",
      "Make it more casual (still clear).",
      "Make it more formal (still simple).",
      "Make it skimmable for mobile (short lines, punchy bullets).",
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["writing", "communication"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "p4",
    slug: "youtube-script-fast",
    title: "YouTube Script Generator (Hook → Value → CTA)",
    purpose: "Generate scripts that feel watchable, not like a school presentation.",
    prompt: `Write a YouTube script about {TOPIC} for {AUDIENCE}.

Rules:
- Fast pacing, short sentences.
- Use simple transitions. Avoid “in conclusion”.
- Add light audience cues like (pause), (show screen), (cut).

Structure (use these exact headings):
HOOK (0–10s)
PROMISE (what they’ll get)
SECTION 1 (with an example)
SECTION 2 (with an example)
SECTION 3 (with an example)
QUICK RECAP (3 bullets)
CTA (1 sentence)

Topic: {TOPIC}
Audience: {AUDIENCE}`,
    variations: [
      "Add 5 click-worthy title options (no cringe).",
      "Add B-roll suggestions per section.",
      "Make it 60 seconds only (Shorts).",
      "Add a pinned comment text + 3 hashtag suggestions.",
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["creator", "content", "video"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "p5",
    slug: "study-plan-7-days",
    title: "7-Day Study Plan (Realistic, Not Delusional)",
    purpose: "Build a study plan that assumes you’re human and get tired.",
    prompt: `Create a 7-day study plan for {SUBJECT}.

Inputs:
- Daily time available (hours): {HOURS}
- Goal (exam/project/outcome): {GOAL}

Rules:
- Make it realistic: include at least 1 lighter day and daily short revision.
- Every day must have: tasks, time split, and a checkpoint question.
- End with 10 practice questions (mixed difficulty). Include answers.

Output format:
DAY 1 … DAY 7 (each: Time Split, Tasks, Checkpoint)
FINAL: Practice Questions (10) + Answer Key

Subject: {SUBJECT}
Hours/day: {HOURS}
Goal: {GOAL}`,
    variations: [
      "Make it 14 days with spaced repetition.",
      "Include breaks + motivation tips (short, non-cringe).",
      "Add a final mock test with marking scheme.",
      "Make it for someone who procrastinates (tighter tasks, more checkpoints).",
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["study", "planning"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "p6",
    slug: "product-review-brief",
    title: "Product Review Brief (Balanced + Credible)",
    purpose: "Write reviews that don’t sound like paid ads.",
    prompt: `Write a balanced product review for {PRODUCT}.

Rules:
- Be specific. Avoid generic praise.
- If you lack concrete specs, state what you are assuming in 1 line.
- Include who it’s for and who should avoid it.

Output format:
1) Summary (2–3 sentences)
2) Best for / Avoid if (bullets)
3) Pros (5 bullets)
4) Cons (5 bullets)
5) Verdict: score /10 + 1-sentence justification

Product: {PRODUCT}`,
    variations: [
      "Make it 200 words max.",
      "Make it long-form (1200–1600 words) with headings.",
      "Add 3 alternatives with one-liner reasons.",
      "Make it SEO-friendly without sounding robotic (use natural headings).",
    ],
    modelCompatibility: ["GPT", "Claude"],
    tags: ["writing", "reviews", "seo"],
    updatedAtISO: "2026-01-24",
  },

  // ---- Added: high-utility, high-conversion prompts for a prompt library ----

  {
    id: "p7",
    slug: "compare-and-pick",
    title: "Compare Options + Pick a Winner (With Criteria)",
    purpose:
      "Turn ‘which is better?’ into a clear decision with tradeoffs and a final pick.",
    prompt: `Compare {OPTION_A} vs {OPTION_B} for {USE_CASE}.

Rules:
- If USE_CASE is vague, ask 1 clarifying question first.
- Score each criterion 1–10 with 1-line justification.
- End with a clear recommendation and who should pick the other option.

Output format:
1) Assumptions (if any)
2) Criteria table (Criterion | A score | B score | Why)
3) Key tradeoffs (bullets)
4) Recommendation (winner + why)
5) If you choose the other one (when that makes sense)

Option A: {OPTION_A}
Option B: {OPTION_B}
Use case: {USE_CASE}`,
    variations: [
      "Add a ‘budget pick’ and ‘power-user pick’ if relevant.",
      "Make it one-screen short (no table, just bullets).",
      "Add a 30-second summary I can read out loud.",
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["decision", "productivity", "tools"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "p8",
    slug: "sql-query-builder",
    title: "SQL Query Builder (Ask → Build → Explain)",
    purpose:
      "Generate correct SQL from requirements, with explanations and edge cases.",
    prompt: `You are a SQL assistant.

Given:
- Database: {DB_TYPE} (e.g., MySQL/Postgres/SQLite)
- Tables/schema: {SCHEMA}
- Goal: {GOAL}

Rules:
- Ask at most 2 questions only if the schema/goal is ambiguous.
- Output a single final query first, then explanation.
- Use safe defaults (explicit JOINs, qualified columns).

Output format:
QUERY:
<final SQL>

EXPLANATION:
- What it does (bullets)
- Why key clauses exist (bullets)
- 2 edge cases to watch for

DB: {DB_TYPE}
SCHEMA: {SCHEMA}
GOAL: {GOAL}`,
    variations: [
      "Also output an optimized version and explain the difference.",
      "Add a version using CTEs (if supported).",
      "Add sample test inputs + expected result shape.",
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["sql", "dev", "database"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "p9",
    slug: "frontend-copy-audit",
    title: "Landing Page Copy Audit (Fix Confusing Text)",
    purpose:
      "Improve website copy so users understand it in 5 seconds instead of leaving.",
    prompt: `Audit and improve this landing page copy.

Rules:
- Keep it honest. No fake hype.
- Reduce cognitive load: short lines, clear headings.
- Rewrite with a clear value prop + who it’s for.
- Add one call-to-action that sounds natural.

Output format:
1) Problems found (bullets)
2) Improved copy (Hero, Sub-hero, 3 benefits, 1 CTA)
3) 3 alternative hero headlines
4) One sentence: what this site is in plain English

COPY:
{TEXT}`,
    variations: [
      "Make it more playful but still clear.",
      "Make it more premium/serious.",
      "Make it more direct and short (mobile-first).",
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["copywriting", "seo", "product"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "p10",
    slug: "interview-prep-coach",
    title: "Interview Prep Coach (Questions + Answers + Follow-ups)",
    purpose:
      "Practice interviews with realistic questions and strong, structured answers.",
    prompt: `Act as an interview coach for the role: {ROLE}.

Input:
- Role: {ROLE}
- My experience level: {LEVEL}
- Focus areas: {FOCUS} (e.g., backend, ML, system design)

Output format:
1) 8 interview questions (mix: technical, behavioral, scenario)
2) For each question:
   - What a strong answer includes (bullets)
   - A sample answer (150–250 words)
   - 1 follow-up question interviewers ask
3) Final: 5 common mistakes candidates make for this role

Rules:
- Keep answers concrete, not motivational posters.

ROLE: {ROLE}
LEVEL: {LEVEL}
FOCUS: {FOCUS}`,
    variations: [
      "Make it for junior candidates (simpler).",
      "Make it for senior candidates (harder, deeper tradeoffs).",
      "Include a 30-second ‘tell me about yourself’ script.",
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["career", "interview", "practice"],
    updatedAtISO: "2026-01-24",
  },
];