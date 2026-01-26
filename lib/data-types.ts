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