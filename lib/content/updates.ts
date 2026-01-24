// lib/content/updates.ts
import type { ModelUpdate } from "@/lib/data-types";

export const updates: ModelUpdate[] = [
  {
    id: "u1",
    slug: "prompt-structure-winning",
    model: "Prompting",
    headline: "Structured prompts outperform vibes (again).",
    whatChanged: [
      "Checklists and constraints produce more reliable outputs",
      "Long rambling prompts increase drift and contradictions",
      "Explicit output formats reduce “creative” misinterpretation",
    ],
    whoItAffects: ["Anyone who types a paragraph and hopes for the best", "People building repeatable prompt packs", "Agent workflow builders"],
    whatToDoNow: [
      "Put constraints at the top",
      "Add headings + numbered requirements",
      "Demand an output format (and keep it stable)",
      "Add a “If info is missing, ask 1 question” rule",
    ],
    tldr: "Structure beats storytelling when you want consistent results.",
    tags: ["prompts", "workflow"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "u2",
    slug: "image-consistency-2026",
    model: "Image Tools",
    headline: "Style consistency is improving, but text is still a liar.",
    whatChanged: [
      "More consistent characters across generations (better ‘same person’ continuity)",
      "Better style adherence when prompts are short and specific",
      "Text-in-image remains unreliable for anything important",
    ],
    whoItAffects: ["Creators", "Brand pages", "Design workflows", "Anyone making posters/logos via AI"],
    whatToDoNow: [
      "Use reference images when possible",
      "Keep style descriptions short (avoid prompt novels)",
      "Don’t put important text inside images (add text later in a real editor)",
      "Create 2–3 approved style presets and reuse them",
    ],
    tldr: "Consistency up. Text still messy. Plan accordingly.",
    tags: ["image", "design"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "u3",
    slug: "agents-debugging",
    model: "Agents",
    headline: "Agent failures are mostly tool wiring, not model ‘intelligence’.",
    whatChanged: [
      "Most agent bugs come from tool permissions, parsing, retries, and state handling",
      "Observability beats “add one more prompt” in real systems",
      "Edge cases multiply when tools return partial or inconsistent data",
    ],
    whoItAffects: ["Builders", "Automation enthusiasts", "Anyone shipping agent products"],
    whatToDoNow: [
      "Add tracing (inputs, tool calls, outputs, errors)",
      "Validate tool outputs with schemas",
      "Implement retries + backoff + timeouts",
      "Write evals for edge cases (empty results, malformed JSON, rate limits)",
    ],
    tldr: "Your agent isn’t dumb. Your glue code is.",
    tags: ["agents", "dev"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "u4",
    slug: "seo-ai-sites",
    model: "SEO",
    headline: "AI content sites that win are ‘useful databases’, not blogs.",
    whatChanged: [
      "Structured pages with internal linking beat random posting",
      "Thin posts with no unique value get ignored",
      "Collections + comparisons improve navigation and indexability",
    ],
    whoItAffects: ["Content site builders", "Affiliate + tool directory owners", "SEO-driven projects"],
    whatToDoNow: [
      "Ship indexable pages per item (tool/prompt/comparison)",
      "Add collections and comparisons (then interlink them)",
      "Add FAQ blocks and glossary snippets",
      "Standardize templates (same sections across pages)",
    ],
    tldr: "Databases + structure beat random posting.",
    tags: ["seo", "content"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "u5",
    slug: "copy-paste-prompts-fatigue",
    model: "Usage",
    headline: "People are fatigued by ‘prompt dumps’. They want packs with purpose.",
    whatChanged: [
      "Prompt libraries with context + examples get saved more",
      "Generic prompt lists get skimmed then forgotten",
      "Users prefer ‘workflows’ (steps) over ‘collections’ (lists)",
    ],
    whoItAffects: ["Prompt creators", "Tool directories", "Newsletter writers", "Course builders"],
    whatToDoNow: [
      "Bundle prompts by outcome (debugging, studying, SEO writing, etc.)",
      "Add best-use scenarios + example inputs",
      "Keep variations short and meaningful",
      "Add compatibility notes per model/tool",
    ],
    tldr: "Stop dumping prompts. Curate them like a sane person.",
    tags: ["prompts", "creator"],
    updatedAtISO: "2026-01-24",
  },

  // ---- Added: recent, actually-real platform updates ----

  {
    id: "u6",
    slug: "gpt-5-2-better-tool-work",
    model: "OpenAI",
    headline: "GPT-5.2 pushes harder on real work: code, tools, long context.",
    whatChanged: [
      "Improved performance on multi-step projects (tool use + longer context)",
      "Better at generating spreadsheets/presentations and handling structured tasks",
      "More reliable code generation and iterative edits",
    ],
    whoItAffects: ["Builders", "Analysts", "People using AI for real deliverables (not chatting)"],
    whatToDoNow: [
      "Give the model structured inputs (tables, bullet requirements, acceptance criteria)",
      "Ask for a plan first, then execution (reduces mistakes)",
      "Request output as JSON/Markdown tables when you need consistency",
    ],
    tldr: "More useful for shipping work, especially with structure.",
    tags: ["models", "dev", "productivity"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "u7",
    slug: "chatgpt-voice-follow-instructions",
    model: "OpenAI",
    headline: "ChatGPT Voice follows instructions better (and repeats less).",
    whatChanged: [
      "Voice mode improved instruction-following for paid users",
      "Fixed a bug where Voice could repeat custom instructions back to you",
    ],
    whoItAffects: ["Voice users", "People using voice for study, planning, and daily tasks"],
    whatToDoNow: [
      "Give short, direct voice instructions (1 request at a time)",
      "Use explicit constraints: ‘keep it under 30 seconds’, ‘give 3 bullets’",
      "If it goes off track, restate the goal in one sentence",
    ],
    tldr: "Voice is less goofy and more obedient now.",
    tags: ["voice", "productivity"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "u8",
    slug: "chatgpt-age-prediction-safety",
    model: "OpenAI",
    headline: "Age prediction is rolling out to apply stronger teen safety defaults.",
    whatChanged: [
      "Chat experiences can be adjusted based on estimated age to reduce exposure to sensitive content",
      "Users incorrectly flagged can restore access via age verification",
    ],
    whoItAffects: ["Teen users", "Parents/educators", "Apps and communities that rely on ChatGPT for learning"],
    whatToDoNow: [
      "Design youth-facing prompts with safer defaults (no edgy content by default)",
      "Avoid relying on one-shot prompts for sensitive topics; use structured, educational framing",
      "If a feature seems missing, it may be age-gated or safety-filtered",
    ],
    tldr: "More guardrails for teens, more consistency for youth-safe experiences.",
    tags: ["safety", "policy", "education"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "u9",
    slug: "claude-opus-4-5-coding-agents",
    model: "Anthropic",
    headline: "Claude Opus 4.5 leans into coding + agents, with stronger robustness.",
    whatChanged: [
      "Opus 4.5 targets stronger real-world coding and agent performance",
      "Improved robustness against prompt injection attempts",
      "More efficient token usage and updated pricing for Opus-level capability",
    ],
    whoItAffects: ["Developers", "Agent builders", "Teams using Claude for code review and tooling"],
    whatToDoNow: [
      "Use structured outputs / schemas when integrating into apps",
      "Add prompt-injection defenses in your app (separate instructions from retrieved content)",
      "Treat ‘tool results’ as untrusted input and validate them",
    ],
    tldr: "Better for serious coding + agent work, especially when you wire it properly.",
    tags: ["models", "agents", "dev"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "u10",
    slug: "gemini-3-reasoning-multimodal",
    model: "Google",
    headline: "Gemini 3 expands reasoning + multimodal capability across Google products.",
    whatChanged: [
      "Gemini 3 rolls out across Gemini app, AI Studio, and Vertex AI",
      "Improved reasoning, multimodality, and coding performance vs prior Gemini versions",
      "‘Deep Think’ mode teased for higher-tier subscribers",
    ],
    whoItAffects: ["Google ecosystem users", "Teams building on Vertex AI", "Multimodal app builders"],
    whatToDoNow: [
      "Use multimodal inputs where helpful (images/screenshots for UI bugs, diagrams for learning)",
      "Separate fast tasks vs deep tasks (don’t overpay/over-wait for simple work)",
      "For product work, standardize prompt templates to reduce output variance",
    ],
    tldr: "Gemini’s getting more capable, especially inside Google’s own stack.",
    tags: ["models", "multimodal", "productivity"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "u11",
    slug: "claude-api-structured-outputs-and-deprecations",
    model: "Anthropic",
    headline: "Claude API: structured outputs support expands, and older models keep getting retired.",
    whatChanged: [
      "Structured outputs support expanded to additional Claude variants",
      "Model deprecations continue (older models retired or scheduled to retire)",
      "Docs + console experience is being consolidated for developers",
    ],
    whoItAffects: ["API users", "Anyone shipping Claude in production", "RAG/agents teams"],
    whatToDoNow: [
      "Pin model versions in production (avoid surprise changes)",
      "Track deprecation notices and set upgrade windows",
      "Prefer structured outputs for tool-calling and pipelines",
    ],
    tldr: "Production users: pin versions and stop ignoring deprecation notes.",
    tags: ["dev", "api", "reliability"],
    updatedAtISO: "2026-01-24",
  },
];