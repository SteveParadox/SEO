// lib/content/comparisons.ts
import type { Comparison } from "@/lib/data-types";

export const comparisons: Comparison[] = [
  {
    id: "cmp1",
    slug: "cursor-vs-vscode-ai-vs-jetbrains-ai",
    title: "Cursor vs VS Code + AI vs JetBrains AI",
    description: "Which editor setup actually speeds up shipping without breaking your brain?",
    contenders: [{ kind: "tool", id: "t1" }],
    criteria: [
      { name: "Codebase context", notes: "How well it understands your project structure and intent." },
      { name: "Refactor reliability", notes: "How often it produces safe changes with minimal surprises." },
      { name: "Workflow speed", notes: "Does it reduce steps or add more review overhead?" },
    ],
    verdict:
      "If you want the smoothest ‘AI-native’ editor flow, start with Cursor. JetBrains AI is convenient if you live there. VS Code wins for flexibility but needs setup discipline.",
    tags: ["dev", "coding", "comparison"],
    updatedAtISO: "2026-01-23",
  },
  {
    id: "cmp2",
    slug: "perplexity-vs-kagi-vs-google",
    title: "Perplexity vs Kagi vs Google",
    description: "AI answers, real search, and the classic chaos engine: who wins for research?",
    contenders: [{ kind: "tool", id: "t2" }],
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
    contenders: [{ kind: "tool", id: "t4" }],
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
];
