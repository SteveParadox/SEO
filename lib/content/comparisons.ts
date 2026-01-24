// lib/content/comparisons.ts
import type { Comparison } from "@/lib/data-types";

export const comparisons: Comparison[] = [
  {
    id: "cmp1",
    slug: "cursor-vs-vscode-ai-vs-jetbrains-ai",
    title: "Cursor vs VS Code + AI vs JetBrains AI",
    description: "Which editor setup actually speeds up shipping without turning code review into a horror movie?",
    contenders: [
      { kind: "tool", id: "t1" }, // Cursor (assuming)
      { kind: "tool", id: "t6" }, // VS Code + AI stack (Copilot/etc)
      { kind: "tool", id: "t11" }, // JetBrains AI (swap to your real id)
    ],
    criteria: [
      { name: "Codebase context", notes: "How well it understands your project structure, patterns, and intent." },
      { name: "Refactor reliability", notes: "How often it produces safe changes with minimal surprises." },
      { name: "Workflow speed", notes: "Does it remove steps or add more review overhead?" },
      { name: "Reviewability", notes: "Diff clarity, predictable edits, and how easy it is to verify changes." },
      { name: "Team fit", notes: "Works well with existing tooling and dev habits (or forces everyone to change)." },
    ],
    verdict:
      "Cursor is the most ‘AI-native’ flow for shipping quickly. JetBrains AI is best if you live in IntelliJ/WebStorm and want convenience. VS Code wins on flexibility and ecosystem, but you’ll need discipline to avoid a messy toolchain.",
    tags: ["dev", "coding", "comparison"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "cmp2",
    slug: "perplexity-vs-kagi-vs-google",
    title: "Perplexity vs Kagi vs Google",
    description: "AI answers, real search, and the classic chaos engine: who wins for research?",
    contenders: [
      { kind: "tool", id: "t2" }, // Perplexity (assuming)
      { kind: "tool", id: "t12" }, // Kagi (swap)
      { kind: "tool", id: "t13" }, // Google (swap)
    ],
    criteria: [
      { name: "Source quality", notes: "Does it lead you to useful primary sources and show citations clearly?" },
      { name: "Speed", notes: "How fast you get from question to a useful next action." },
      { name: "Control", notes: "Filters, personalization, focus modes, and noise reduction." },
      { name: "Freshness", notes: "How reliable it is for recent updates and fast-changing topics." },
    ],
    verdict:
      "Perplexity is great for quick research starts and summaries. Kagi is for people who want control and hate ads. Google is still unmatched for breadth, but it’s the messiest and requires the most effort to filter.",
    tags: ["search", "research", "comparison"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "cmp3",
    slug: "elevenlabs-vs-playht-vs-azure-tts",
    title: "ElevenLabs vs PlayHT vs Azure TTS",
    description: "Voice quality, pricing, and which one is easiest to use without drama.",
    contenders: [
      { kind: "tool", id: "t4" },  // ElevenLabs (assuming)
      { kind: "tool", id: "t14" }, // PlayHT (swap)
      { kind: "tool", id: "t15" }, // Azure TTS (swap)
    ],
    criteria: [
      { name: "Voice quality", notes: "Naturalness, emotion control, clarity, and consistency." },
      { name: "Latency", notes: "Real-time use, streaming support, and response speed." },
      { name: "Cost scaling", notes: "What happens when usage grows (and if pricing stays predictable)." },
      { name: "Dev friendliness", notes: "APIs, docs, SDKs, and integration pain." },
      { name: "Commercial safety", notes: "Licensing clarity and guardrails for brand use." },
    ],
    verdict:
      "ElevenLabs is usually the quality leader for creators. PlayHT is a strong alternative with good range. Azure TTS is the boring enterprise pick: stable, predictable, and integrates cleanly if you’re already in Microsoft land.",
    tags: ["audio", "voice", "comparison"],
    updatedAtISO: "2026-01-24",
  },

  // ---- Added: high-intent comparisons that match actual searches ----

  {
    id: "cmp4",
    slug: "chatgpt-vs-claude-vs-gemini",
    title: "ChatGPT vs Claude vs Gemini",
    description: "Which general AI assistant is best for writing, coding, and daily problem-solving?",
    contenders: [
      { kind: "tool", id: "t16" }, // ChatGPT (swap)
      { kind: "tool", id: "t17" }, // Claude (swap)
      { kind: "tool", id: "t18" }, // Gemini (swap)
    ],
    criteria: [
      { name: "Writing quality", notes: "Clarity, tone control, and coherence over long outputs." },
      { name: "Coding help", notes: "Debugging, refactors, and correctness under constraints." },
      { name: "Reasoning consistency", notes: "How often it stays logical and avoids confident nonsense." },
      { name: "Tooling + integrations", notes: "Files, browsing, plugins, workspace features." },
      { name: "Value", notes: "What you get for the price (and limits)." },
    ],
    verdict:
      "If you want the most flexible ‘do everything’ assistant, ChatGPT is usually the safest default. Claude often shines for clean writing and careful responses. Gemini is strong if you’re in Google’s ecosystem and want tight integration, especially for Docs/Workspace users.",
    tags: ["ai", "assistant", "comparison"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "cmp5",
    slug: "notion-ai-vs-obsidian-vs-evernote",
    title: "Notion AI vs Obsidian vs Evernote",
    description: "Notes, knowledge bases, and whether AI actually helps or just adds buttons.",
    contenders: [
      { kind: "tool", id: "t19" }, // Notion AI (swap)
      { kind: "tool", id: "t20" }, // Obsidian (swap)
      { kind: "tool", id: "t21" }, // Evernote (swap)
    ],
    criteria: [
      { name: "Capture speed", notes: "How fast you can store ideas without friction." },
      { name: "Organization", notes: "Tags, databases, backlinks, and retrieval." },
      { name: "Offline reliability", notes: "Works when the internet is doing its usual disappearing act." },
      { name: "AI usefulness", notes: "Summaries, rewriting, search, and whether it’s actually accurate." },
      { name: "Lock-in risk", notes: "Export options and how painful switching is." },
    ],
    verdict:
      "Notion AI is great if you want a structured workspace and team docs. Obsidian wins for power users who want control and local-first notes. Evernote is fine for traditional note capture, but it’s rarely the most exciting option now.",
    tags: ["productivity", "notes", "comparison"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "cmp6",
    slug: "midjourney-vs-dalle-vs-stable-diffusion",
    title: "Midjourney vs DALL·E vs Stable Diffusion",
    description: "Image quality, control, and how much time you’ll waste tuning prompts.",
    contenders: [
      { kind: "tool", id: "t22" }, // Midjourney (swap)
      { kind: "tool", id: "t23" }, // DALL·E (swap)
      { kind: "tool", id: "t24" }, // Stable Diffusion (swap)
    ],
    criteria: [
      { name: "Aesthetic quality", notes: "How good results look with average prompting." },
      { name: "Control", notes: "Editing, inpainting, style control, and repeatability." },
      { name: "Speed", notes: "From idea to usable image." },
      { name: "Cost", notes: "Pricing and compute requirements." },
      { name: "Workflow fit", notes: "Works well for creators/designers/devs." },
    ],
    verdict:
      "Midjourney often wins on aesthetics with minimal effort. DALL·E is strong for straightforward image generation and edits depending on workflow. Stable Diffusion wins on control and customization, but expects you to enjoy tweaking settings like it’s a hobby.",
    tags: ["image", "design", "comparison"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "cmp7",
    slug: "grammarly-vs-quillbot-vs-hemingway",
    title: "Grammarly vs QuillBot vs Hemingway",
    description: "Writing tools: fixing grammar, rewriting, and making text readable without killing your voice.",
    contenders: [
      { kind: "tool", id: "t25" }, // Grammarly (swap)
      { kind: "tool", id: "t26" }, // QuillBot (swap)
      { kind: "tool", id: "t27" }, // Hemingway (swap)
    ],
    criteria: [
      { name: "Clarity improvements", notes: "Does it actually make writing easier to understand?" },
      { name: "Tone control", notes: "Can you keep your voice while improving the text?" },
      { name: "Rewrite quality", notes: "How often it rewrites into something worse." },
      { name: "Speed", notes: "Quick fixes vs heavy editing." },
      { name: "Best use case", notes: "Where it shines most (school, work, blog, etc.)." },
    ],
    verdict:
      "Grammarly is the best all-rounder for clean writing. QuillBot is useful for rewrites and paraphrasing, but it can flatten tone. Hemingway is great for forcing clarity, especially if you write long, complicated sentences for fun.",
    tags: ["writing", "students", "comparison"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "cmp8",
    slug: "zapier-vs-make-vs-n8n",
    title: "Zapier vs Make vs n8n",
    description: "Automation tools: fastest setup, most power, and best value when you scale.",
    contenders: [
      { kind: "tool", id: "t28" }, // Zapier (swap)
      { kind: "tool", id: "t29" }, // Make (swap)
      { kind: "tool", id: "t30" }, // n8n (swap)
    ],
    criteria: [
      { name: "Ease of setup", notes: "How fast you can build a working automation." },
      { name: "Complex workflows", notes: "Branches, retries, error handling, and loops." },
      { name: "Cost at scale", notes: "How expensive it gets as usage grows." },
      { name: "Developer control", notes: "Webhooks, custom code, self-hosting." },
      { name: "Reliability", notes: "How often it breaks when APIs change." },
    ],
    verdict:
      "Zapier is the fastest for simple automations and popular integrations. Make gives more power and visual control for complex flows. n8n is for devs who want control and self-hosting, and don’t mind getting their hands dirty.",
    tags: ["automation", "workflow", "comparison"],
    updatedAtISO: "2026-01-24",
  },
];