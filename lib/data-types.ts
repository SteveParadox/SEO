// lib/data-types.ts

export type PricingTier = "free" | "freemium" | "paid";

export type Tool = {
  id: string;
  slug: string;
  name: string;
  oneLiner: string;
  useCases: string[];
  pros: string[];
  cons: string[];
  description: string;
  pricing: { tier: PricingTier; note?: string; details?: string };
  alternatives: { name: string; slug: string }[];
  tags: string[];
  updatedAtISO: string;
  rating?: number;      
  users?: string;   
};

export type ModelCompatibility = "GPT" | "Claude" | "Gemini";

export type Prompt = {
  id: string;
  slug: string;

  // Display
  title: string;
  purpose: string;

  // Long-form guidance content
  description: string;
  whenToUse: string;
  howItWorks: string;
  bestPractices: string;
  commonMistakes: string;
  expectedOutput: string;
  limitations: string;
  technicalRequirements: string;
  realWorldApplications: string;
  successMetrics: string;
  relatedPrompts: string;

  // The actual prompt template
  prompt: string;

  // Metadata
  variations: string[];
  modelCompatibility: ModelCompatibility[];
  tags: string[];
  updatedAtISO: string; // ISO date string e.g. "2026-01-24"
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

export type Comparison = {
  id: string;
  slug: string;
  title: string;
  description: string;
  contenders: { kind: "tool" | "prompt"; id: string }[];
  criteria: { name: string; notes: string }[];
  verdict: string;
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