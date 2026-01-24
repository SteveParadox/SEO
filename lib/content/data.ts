// lib/data.ts
export type PricingTier = "free" | "freemium" | "paid";

export type Tool = {
  id: string;
  slug: string;
  name: string;
  oneLiner: string;
  useCases: string[];
  pros: string[];
  cons: string[];
  pricing: { tier: PricingTier; note?: string };
  alternatives: { name: string; slug: string }[];
  tags: string[];
  updatedAtISO: string;
};

export type Prompt = {
  id: string;
  slug: string;
  title: string;
  purpose: string;
  prompt: string;
  variations: string[];
  modelCompatibility: string[];
  tags: string[];
  updatedAtISO: string;
};

export type ModelUpdate = {
  id: string;
  slug: string;
  model: string;
  headline: string;
  whatChanged: string[];
  whoItAffects: string[];
  whatToDoNow: string[];
  tldr: string;
  tags: string[];
  updatedAtISO: string;
};

export type Collection = {
  id: string;
  slug: string;
  title: string;
  description: string;
  items: { kind: "tool" | "prompt" | "update"; id: string }[];
  tags: string[];
  updatedAtISO: string;
};

export type DataBundle = {
  tools: Tool[];
  prompts: Prompt[];
  updates: ModelUpdate[];
  collections: Collection[];
  comparisons: Comparison[];
};


export const DATA: DataBundle = {
  tools: [
    {
      id: "t1",
      slug: "cursor",
      name: "Cursor",
      oneLiner: "AI-first editor that makes refactors feel less like punishment.",
      useCases: ["Refactor safely", "Generate scaffolds", "Navigate large codebases"],
      pros: ["Great codebase context UX", "Fast iteration loop", "Useful diffs/edits workflow"],
      cons: ["Still hallucinates", "Can encourage sloppy review habits"],
      pricing: { tier: "freemium", note: "Free tier + paid plans" },
      alternatives: [
        { name: "VS Code + AI", slug: "vscode-ai" },
        { name: "JetBrains AI", slug: "jetbrains-ai" },
      ],
      tags: ["dev", "coding", "editor"],
      updatedAtISO: "2026-01-21",
    },
    {
      id: "t2",
      slug: "perplexity",
      name: "Perplexity",
      oneLiner: "Search + answers that can cite sources when you demand it politely.",
      useCases: ["Research fast", "Compare viewpoints", "Find starting sources"],
      pros: ["Quick scanning", "Good for discovery", "Useful summaries"],
      cons: ["Citations can be messy", "Not a substitute for reading"],
      pricing: { tier: "freemium" },
      alternatives: [
        { name: "Kagi", slug: "kagi" },
        { name: "Google", slug: "google" },
      ],
      tags: ["search", "research", "productivity"],
      updatedAtISO: "2026-01-20",
    },
    {
      id: "t3",
      slug: "notion-ai",
      name: "Notion AI",
      oneLiner: "Draft, summarize, and clean up docs without leaving your workspace.",
      useCases: ["Summarize notes", "Draft docs", "Rewrite text"],
      pros: ["Lives where your docs are", "Good for drafting", "Team-friendly"],
      cons: ["Can be generic", "Costs scale with usage"],
      pricing: { tier: "paid", note: "Add-on pricing varies" },
      alternatives: [
        { name: "Google Docs AI", slug: "google-docs-ai" },
        { name: "Craft", slug: "craft" },
      ],
      tags: ["writing", "notes", "team"],
      updatedAtISO: "2026-01-19",
    },
    {
      id: "t4",
      slug: "elevenlabs",
      name: "ElevenLabs",
      oneLiner: "Voice generation for creators, narration, and apps (use responsibly).",
      useCases: ["Voiceovers", "Dubbing", "Character voices"],
      pros: ["High quality voices", "Lots of languages", "Creator-friendly workflow"],
      cons: ["Costs scale", "Voice ethics/legal risk if abused"],
      pricing: { tier: "freemium" },
      alternatives: [
        { name: "PlayHT", slug: "playht" },
        { name: "Azure TTS", slug: "azure-tts" },
      ],
      tags: ["audio", "voice", "creator"],
      updatedAtISO: "2026-01-18",
    },
    {
      id: "t5",
      slug: "runpod",
      name: "RunPod",
      oneLiner: "Rent GPUs without selling a kidney. Useful for ML experiments.",
      useCases: ["GPU notebooks", "Model inference", "Training bursts"],
      pros: ["Simple GPU access", "Good for experiments", "Pay-as-you-go vibe"],
      cons: ["Costs can spike", "You still need DevOps brain cells"],
      pricing: { tier: "paid", note: "Usage-based compute" },
      alternatives: [
        { name: "Paperspace", slug: "paperspace" },
        { name: "Vast.ai", slug: "vast-ai" },
      ],
      tags: ["gpu", "ml", "infra"],
      updatedAtISO: "2026-01-17",
    },
    {
      id: "t6",
      slug: "langfuse",
      name: "Langfuse",
      oneLiner: "LLM observability: traces, evals, and why your agent went rogue.",
      useCases: ["Trace LLM calls", "Evaluate outputs", "Debug agents"],
      pros: ["Great visibility", "Team workflows", "Makes issues reproducible"],
      cons: ["Setup overhead", "You still need good eval design"],
      pricing: { tier: "freemium", note: "Self-host + cloud options" },
      alternatives: [
        { name: "Helicone", slug: "helicone" },
        { name: "LangSmith", slug: "langsmith" },
      ],
      tags: ["llm", "observability", "agents"],
      updatedAtISO: "2026-01-16",
    },
    {
      id: "t7",
      slug: "zotero",
      name: "Zotero",
      oneLiner: "Reference manager for research that doesn’t hate you back.",
      useCases: ["Manage citations", "Organize papers", "Collaborate on reading lists"],
      pros: ["Solid ecosystem", "Works offline", "Good citation support"],
      cons: ["Sync limits on free", "UI feels academic"],
      pricing: { tier: "freemium" },
      alternatives: [
        { name: "Mendeley", slug: "mendeley" },
        { name: "Paperpile", slug: "paperpile" },
      ],
      tags: ["research", "citations", "writing"],
      updatedAtISO: "2026-01-15",
    },
    {
      id: "t8",
      slug: "excalidraw",
      name: "Excalidraw",
      oneLiner: "Sketch diagrams that look handmade, not corporate.",
      useCases: ["System diagrams", "Quick wireframes", "Explain ideas visually"],
      pros: ["Fast", "Shareable", "Low friction"],
      cons: ["Not for pixel-perfect design", "Can get messy on huge boards"],
      pricing: { tier: "freemium" },
      alternatives: [
        { name: "FigJam", slug: "figjam" },
        { name: "Miro", slug: "miro" },
      ],
      tags: ["diagrams", "design", "productivity"],
      updatedAtISO: "2026-01-14",
    },
    {
      id: "t9",
      slug: "obsidian",
      name: "Obsidian",
      oneLiner: "Local-first knowledge base for people who hoard ideas.",
      useCases: ["Second brain", "Study notes", "Personal wiki"],
      pros: ["Offline-first", "Plugin ecosystem", "Fast search"],
      cons: ["Can turn into a hobby", "Sync is extra"],
      pricing: { tier: "freemium", note: "Optional paid sync" },
      alternatives: [
        { name: "Notion", slug: "notion" },
        { name: "Logseq", slug: "logseq" },
      ],
      tags: ["notes", "productivity", "knowledge"],
      updatedAtISO: "2026-01-13",
    },
    {
      id: "t10",
      slug: "framer",
      name: "Framer",
      oneLiner: "Ship landing pages fast with animations that don’t look tragic.",
      useCases: ["Landing pages", "Prototypes", "Marketing sites"],
      pros: ["Fast publishing", "Great templates", "Smooth interactions"],
      cons: ["Can be pricey", "Less flexible than custom code"],
      pricing: { tier: "freemium" },
      alternatives: [
        { name: "Webflow", slug: "webflow" },
        { name: "Carrd", slug: "carrd" },
      ],
      tags: ["design", "marketing", "website"],
      updatedAtISO: "2026-01-12",
    },
  ],

  prompts: [
    {
      id: "p1",
      slug: "explain-like-tutor",
      title: "Explain Like a Patient Tutor",
      purpose: "Turn confusing topics into something you can repeat in an exam without panic.",
      prompt:
        "Act as a patient tutor. Explain {TOPIC} step-by-step using simple language. Include 2 examples, 1 analogy, and a 5-question mini-quiz with answers. Keep it under 350 words.",
      variations: ["Make it visual with a tiny ASCII diagram.", "Explain for a 12-year-old, then an adult.", "Only give the quiz + answers."],
      modelCompatibility: ["GPT", "Claude", "Gemini"],
      tags: ["study", "learning"],
      updatedAtISO: "2026-01-21",
    },
    {
      id: "p2",
      slug: "bug-hunter",
      title: "Bug Hunter (Ranked Causes + Minimal Fixes)",
      purpose: "Debug code without random guessing disguised as confidence.",
      prompt: `You are a debugging assistant. Given the code and error, do:
1) List 3–6 likely causes ranked by probability.
2) For each cause: the exact line/area, why it fails, and the smallest fix.
3) Provide a quick test plan (3 checks).
Ask at most 2 clarifying questions only if essential.

CODE:
{CODE}

ERROR:
{ERROR}`,
      variations: ["Also propose a cleaner refactor after the minimal fix.", "Add logging suggestions (minimal).", "Explain the bug like I’m new to the language."],
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
        "Rewrite the text for clarity. Keep meaning the same. Remove filler, simplify sentences, and keep it friendly. Provide: (1) Clean version, (2) 5 key bullet points, (3) One-line summary.\n\nTEXT:\n{TEXT}",
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
        "Write a YouTube script about {TOPIC} for {AUDIENCE}. Structure: Hook (0–10s), Promise, 3 sections with examples, quick recap, CTA. Keep pacing fast, sentences short.",
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
        "Create a 7-day study plan for {SUBJECT}. Inputs: daily time available = {HOURS}, goal = {GOAL}. Include: daily tasks, checkpoints, revision blocks, and 10 practice questions at the end.",
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
        "Write a balanced product review for {PRODUCT}. Include: who it’s for, who should avoid it, 5 pros, 5 cons, and a final verdict score out of 10. Keep it honest and specific.",
      variations: ["Make it 200 words max.", "Make it a long-form article (1200–1600 words).", "Add 3 alternatives."],
      modelCompatibility: ["GPT", "Claude"],
      tags: ["writing", "reviews", "seo"],
      updatedAtISO: "2026-01-15",
    },
  ],

  updates: [
    {
      id: "u1",
      slug: "prompt-structure-winning",
      model: "Prompting",
      headline: "Structured prompts outperform vibes (again).",
      whatChanged: ["Checklists and constraints lead to more reliable outputs", "Long rambling prompts increase confusion and drift"],
      whoItAffects: ["Everyone who ‘just types thoughts’ into chat", "People building agent workflows"],
      whatToDoNow: ["Move constraints to the top", "Use headings + numbered requirements", "Ask for output format explicitly"],
      tldr: "Structure beats storytelling when you want consistent results.",
      tags: ["prompts", "workflow"],
      updatedAtISO: "2026-01-21",
    },
    {
      id: "u2",
      slug: "image-consistency-2026",
      model: "Image Tools",
      headline: "Style consistency is improving, but text is still a liar.",
      whatChanged: ["More consistent characters across generations", "Better style adherence", "Text in images still unreliable"],
      whoItAffects: ["Creators", "Brand pages", "Design workflows"],
      whatToDoNow: ["Use reference images when possible", "Keep style description short", "Don’t put important text inside images"],
      tldr: "Consistency up. Text still messy. Plan accordingly.",
      tags: ["image", "design"],
      updatedAtISO: "2026-01-20",
    },
    {
      id: "u3",
      slug: "agents-debugging",
      model: "Agents",
      headline: "Agent failures are mostly tool wiring, not model ‘intelligence’.",
      whatChanged: ["Most agent bugs traced to tool permissions, parsing, and retry logic", "Observability matters more than extra prompts"],
      whoItAffects: ["Builders", "Automation enthusiasts", "Anyone shipping agent products"],
      whatToDoNow: ["Add tracing", "Validate tool outputs", "Implement retries + backoff", "Write evals for edge cases"],
      tldr: "Your agent isn’t dumb. Your glue code is.",
      tags: ["agents", "dev"],
      updatedAtISO: "2026-01-19",
    },
    {
      id: "u4",
      slug: "seo-ai-sites",
      model: "SEO",
      headline: "AI content sites that win are ‘useful databases’, not blogs.",
      whatChanged: ["Sites with structured pages and internal linking perform better", "Thin posts with no unique value get ignored"],
      whoItAffects: ["Content site builders", "Affiliate + tool directory owners"],
      whatToDoNow: ["Build indexable pages per item", "Add collections and comparisons", "Add FAQ blocks", "Link everything internally"],
      tldr: "Databases + structure beat random posting.",
      tags: ["seo", "content"],
      updatedAtISO: "2026-01-18",
    },
    {
      id: "u5",
      slug: "copy-paste-prompts-fatigue",
      model: "Usage",
      headline: "People are fatigued by ‘prompt dumps’. They want packs with purpose.",
      whatChanged: ["Prompt libraries that add context + examples get saved more", "Generic prompt lists get skimmed then forgotten"],
      whoItAffects: ["Prompt creators", "Tool directories", "Newsletter writers"],
      whatToDoNow: ["Bundle prompts by outcome", "Add best-use scenarios", "Add variations and compatibility notes"],
      tldr: "Stop dumping prompts. Curate them like a sane person.",
      tags: ["prompts", "creator"],
      updatedAtISO: "2026-01-17",
    },
  ],

  collections: [
    {
      id: "c1",
      slug: "best-ai-tools-students-2026",
      title: "Best AI Tools for Students (2026)",
      description: "Research faster, write cleaner, and stop doom-scrolling ‘study tips’.",
      items: [
        { kind: "tool", id: "t2" }, // Perplexity
        { kind: "tool", id: "t7" }, // Zotero
        { kind: "tool", id: "t9" }, // Obsidian
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
  ],
  comparisons: [
  {
    id: "cmp1",
    slug: "cursor-vs-vscode-ai-vs-jetbrains-ai",
    title: "Cursor vs VS Code + AI vs JetBrains AI",
    description: "Which editor setup actually speeds up shipping without breaking your brain?",
    contenders: [
      { kind: "tool", id: "t1" }, // Cursor
      // You may not have these tools yet. Add them or remove them.
      // If you don’t have them, keep only the ones that exist in DATA.tools.
    ],
    criteria: [
      { name: "Codebase context", notes: "How well it understands your project structure and intent." },
      { name: "Refactor reliability", notes: "How often it produces safe changes with minimal surprises." },
      { name: "Workflow speed", notes: "Does it reduce steps or add more review overhead?" },
    ],
    verdict:
      "If you want the smoothest ‘AI-native’ editor flow, start with Cursor. If you’re already deep in JetBrains, JetBrains AI is convenient. VS Code wins for flexibility, but needs setup discipline.",
    tags: ["dev", "coding", "comparison"],
    updatedAtISO: "2026-01-23",
  },
  {
    id: "cmp2",
    slug: "perplexity-vs-kagi-vs-google",
    title: "Perplexity vs Kagi vs Google",
    description: "AI answers, real search, and the classic chaos engine: who wins for research?",
    contenders: [
      { kind: "tool", id: "t2" }, // Perplexity
      // add Kagi/Google tools later if you want; page still works with 1 contender but it’s silly.
    ],
    criteria: [
      { name: "Source quality", notes: "Does it lead you to useful primary sources?" },
      { name: "Speed", notes: "How fast you get to a useful answer." },
      { name: "Control", notes: "Filters, personalization, focus modes, and noise reduction." },
    ],
    verdict:
      "Perplexity is great for fast research starts. Kagi is for people who hate ads and like control. Google is still necessary for breadth, but it’s the messiest experience.",
    tags: ["search", "research", "comparison"],
    updatedAtISO: "2026-01-22",
  },
  {
    id: "cmp3",
    slug: "elevenlabs-vs-playht-vs-azure-tts",
    title: "ElevenLabs vs PlayHT vs Azure TTS",
    description: "Voice quality, pricing, and which one is easiest to use without drama.",
    contenders: [
      { kind: "tool", id: "t4" }, // ElevenLabs
    ],
    criteria: [
      { name: "Voice quality", notes: "Naturalness, emotion control, and clarity." },
      { name: "Cost scaling", notes: "What happens when usage grows." },
      { name: "Dev friendliness", notes: "APIs, docs, and integration pain." },
    ],
    verdict:
      "ElevenLabs is usually the quality leader. PlayHT is a strong alternative. Azure TTS is solid for enterprise stacks and predictable billing.",
    tags: ["audio", "voice", "comparison"],
    updatedAtISO: "2026-01-21",
  },
],

};
// ---- Slug lookups (used by Next.js route pages) ----
export function getToolBySlug(slug: string) {
  return DATA.tools.find((x) => x.slug === slug);
}

export function getPromptBySlug(slug: string) {
  return DATA.prompts.find((x) => x.slug === slug);
}

export function getUpdateBySlug(slug: string) {
  return DATA.updates.find((x) => x.slug === slug);
}

export function getCollectionBySlug(slug: string) {
  return DATA.collections.find((x) => x.slug === slug);
}

// ---- Collection resolver (optional but recommended) ----
export function resolveCollectionItems(col: { items: { kind: "tool" | "prompt" | "update"; id: string }[] }) {
  return col.items
    .map((ref) => {
      if (ref.kind === "tool") return { kind: "tool" as const, item: DATA.tools.find((t) => t.id === ref.id) };
      if (ref.kind === "prompt") return { kind: "prompt" as const, item: DATA.prompts.find((p) => p.id === ref.id) };
      return { kind: "update" as const, item: DATA.updates.find((u) => u.id === ref.id) };
    })
    .filter((x) => x.item);
}

// =====================
// Graph helpers (Step 5)
// =====================

function overlapCount(a: string[], b: string[]) {
  const setB = new Set(b.map((x) => x.toLowerCase()));
  let c = 0;
  for (const x of a) if (setB.has(x.toLowerCase())) c++;
  return c;
}

function sortByTagOverlap<T extends { tags: string[]; updatedAtISO: string }>(
  baseTags: string[],
  items: T[]
) {
  return [...items]
    .map((it) => ({
      it,
      score: overlapCount(baseTags, it.tags) * 10 + new Date(it.updatedAtISO).getTime() / 1e12,
    }))
    .sort((a, b) => b.score - a.score)
    .map((x) => x.it);
}

export function findCollectionsContaining(ref: { kind: "tool" | "prompt" | "update"; id: string }) {
  return DATA.collections.filter((c) => c.items.some((x) => x.kind === ref.kind && x.id === ref.id));
}

export function getRelatedTools(toolId: string, limit = 6) {
  const base = DATA.tools.find((t) => t.id === toolId);
  if (!base) return [];
  const candidates = DATA.tools.filter((t) => t.id !== toolId);
  return sortByTagOverlap(base.tags, candidates).slice(0, limit);
}

export function getRelatedPrompts(promptId: string, limit = 6) {
  const base = DATA.prompts.find((p) => p.id === promptId);
  if (!base) return [];
  const candidates = DATA.prompts.filter((p) => p.id !== promptId);
  return sortByTagOverlap(base.tags, candidates).slice(0, limit);
}

export function getRelatedUpdates(updateId: string, limit = 6) {
  const base = DATA.updates.find((u) => u.id === updateId);
  if (!base) return [];
  const candidates = DATA.updates.filter((u) => u.id !== updateId);
  return sortByTagOverlap(base.tags, candidates).slice(0, limit);
}

export function getRelatedCollections(collectionId: string, limit = 6) {
  const base = DATA.collections.find((c) => c.id === collectionId);
  if (!base) return [];
  const candidates = DATA.collections.filter((c) => c.id !== collectionId);
  return sortByTagOverlap(base.tags, candidates).slice(0, limit);
}

export function getComparisonBySlug(slug: string) {
  return DATA.comparisons.find((x) => x.slug === slug);
}

export function resolveComparisonContenders(cmp: Comparison) {
  return cmp.contenders
    .map((ref) => {
      if (ref.kind === "tool") return { kind: "tool" as const, item: DATA.tools.find((t) => t.id === ref.id) };
      return { kind: "prompt" as const, item: DATA.prompts.find((p) => p.id === ref.id) };
    })
    .filter((x) => x.item);
}

export function getRelatedComparisons(comparisonId: string, limit = 6) {
  const base = DATA.comparisons.find((c) => c.id === comparisonId);
  if (!base) return [];
  const candidates = DATA.comparisons.filter((c) => c.id !== comparisonId);
  // reuse your tag overlap sorter if you added it in step 5, otherwise simple overlap:
  const overlap = (a: string[], b: string[]) => {
    const sb = new Set(b.map((x) => x.toLowerCase()));
    return a.reduce((acc, x) => acc + (sb.has(x.toLowerCase()) ? 1 : 0), 0);
  };
  return [...candidates]
    .map((c) => ({ c, score: overlap(base.tags, c.tags) * 10 + new Date(c.updatedAtISO).getTime() / 1e12 }))
    .sort((a, b) => b.score - a.score)
    .map((x) => x.c)
    .slice(0, limit);
}

export type Comparison = {
  id: string;
  slug: string;
  title: string;
  description: string;
  contenders: { kind: "tool" | "prompt"; id: string }[];
  verdict: string;
  criteria: { name: string; notes: string }[];
  tags: string[];
  updatedAtISO: string;
};
