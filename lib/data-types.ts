// lib/data-types.ts

// ---------- Shared primitives ----------

export type ISODateString = string;

export type Tag = string;

export type PricingTier = "free" | "freemium" | "paid";

export type ModelCompatibility = "GPT" | "Claude" | "Gemini";

export type ContentKind = "tool" | "prompt" | "update" | "comparison" | "collection";

export type ContentRef<K extends ContentKind = ContentKind> = {
  kind: K;
  id: string;
};

export type AlternativeRef = {
  name: string;
  slug: string;
};

// Standard long-form “guidance” fields you’re using across content pages.
// Make them optional so every page can be rich without forcing all keys.
export type GuidanceSections = Partial<{
  description: string;

  whenToUse: string;
  decisionContext: string;
  howItWorks: string;

  bestPractices: string;
  commonMistakes: string;

  expectedOutput: string;
  limitations: string;
  technicalRequirements: string;

  realWorldApplications: string;
  realWorldImpact: string;
  performanceProfile: string;
  realWorldScenarios: string;
  commonPitfalls: string;

  costConsiderations: string;
  migrationPath: string;
  teamImpact: string;
  keyTradeoffs: string;

  successMetrics: string;
  specificRecommendations: string;

  relatedPrompts: string;
  additionalResources: string;
  whenToIgnore: string;

  // Collection-specific extras you showed
  longDescription: string;
  whoItsFor: string;
  howToUse: string;

  // Update-specific extras you showed
  context: string;
  why: string;
}>;

// Base shape shared by most content entities
export type BaseContent = {
  id: string;
  slug: string;
  tags: Tag[];
  updatedAtISO: ISODateString;
};

// ---------- Tools ----------

export type Pricing = {
  tier: PricingTier;
  note?: string;
  details?: string;
};

export type Tool = BaseContent & {
  name: string;
  oneLiner: string;

  description: string;
  useCases: string[];
  pros: string[];
  cons: string[];

  pricing: Pricing;
  alternatives: AlternativeRef[];

  rating?: number;
  users?: string;
};

// ---------- Prompts ----------

export type Prompt = BaseContent & {
  title: string;
  purpose: string;

  // Long-form guidance content (now aligned via shared sections)
  // Note: your prompt pages can include any of these keys.
  // If you want to force certain ones, remove Partial and make required.
  // This approach matches your real data: not all prompts will have all sections.
  // (But your "p1" example does, so it still fits.)
  // We "spread" it in type via intersection:
} & GuidanceSections & {
  prompt: string;

  variations: string[];
  modelCompatibility: ModelCompatibility[];
};

// ---------- Updates ----------

export type ModelUpdate = BaseContent & {
  model: string;
  headline: string;

  // Expanded update structure to match your example
} & GuidanceSections & {
  whatChanged: string[];
  whoItAffects: string[];
  whatToDoNow: string[];

  // You showed these too
  tldr: string;
  relatedUpdates?: string[];
};

// ---------- Collections ----------

export type Collection = BaseContent & {
  title: string;
  description: string;

  // Your example includes richer fields, so we allow them via sections too
} & GuidanceSections & {
  items: ContentRef<"tool" | "prompt" | "update">[];
};

// ---------- Comparisons ----------

export type ComparisonCriterion = {
  name: string;
  notes: string;
};

export type Comparison = BaseContent & {
  title: string;
  description: string;

  // Extra comparison-specific narrative fields (you provided these)
} & GuidanceSections & {
  contenders: ContentRef<"tool" | "prompt">[];
  criteria: ComparisonCriterion[];
  verdict: string;
};

// ---------- Bundle ----------

export type DataBundle = {
  tools: Tool[];
  prompts: Prompt[];
  updates: ModelUpdate[];
  collections: Collection[];
  comparisons: Comparison[];
};
