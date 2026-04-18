import {
  DATA,
  getBestPageBySlug,
  getComparisonBySlug,
  getPromptBySlug,
  getToolBySlug,
  hrefFor,
  type UnifiedKind,
} from "@/lib/data";
import type { BestPage } from "@/lib/content/best-pages";
import type { Comparison, PricingTier, Prompt, Tool } from "@/lib/data-types";

export type StackGoal = "writing" | "coding" | "research" | "studying" | "marketing";
export type StackBudget = PricingTier | "any";
export type StackSkillLevel = "beginner" | "intermediate" | "advanced";
export type StackPace = "speed" | "balanced" | "depth";

export type StackBuilderInput = {
  goal: StackGoal;
  budget: StackBudget;
  level: StackSkillLevel;
  pace: StackPace;
};

export type StackBuilderSignal = {
  kind: UnifiedKind;
  id: string;
};

type MatchDetail = {
  matchedGoalTags: string[];
  matchedGoalTerms: string[];
  matchedComplexityTerms: string[];
  matchedPaceTerms: string[];
  personalizationTags: string[];
  budgetScore: number;
  skillScore: number;
  paceScore: number;
  freshnessScore: number;
  personalizationScore: number;
  reinforcementScore: number;
};

export type StackRecommendationItem<T> = {
  item: T;
  href: string;
  score: number;
  reason: string;
  detail: MatchDetail;
};

export type StackSwapOption = {
  from: StackRecommendationItem<Tool>;
  to: StackRecommendationItem<Tool>;
  reason: string;
};

export type StackBuilderRecommendation = {
  input: StackBuilderInput;
  tools: StackRecommendationItem<Tool>[];
  prompts: StackRecommendationItem<Prompt>[];
  comparison: StackRecommendationItem<Comparison> | null;
  bestPage: StackRecommendationItem<BestPage> | null;
  howToUse: string[];
  whoItsFor: string;
  swapOptions: StackSwapOption[];
};

type GoalConfig = {
  value: StackGoal;
  label: string;
  intro: string;
  tags: string[];
  terms: string[];
  supportLinks: Array<{
    kind: "best" | "comparison" | "prompt";
    slug: string;
    label: string;
  }>;
};

type FilterOption<T extends string> = {
  value: T;
  label: string;
  description: string;
};

type PersonalizationProfile = {
  tagWeights: Map<string, number>;
};

const SCORE_CONFIG = {
  goalTagWeight: 8,
  goalTermWeight: 4,
  toolUseCaseBonus: 1.5,
  promptPurposeBonus: 2,
  comparisonContenderWeight: 14,
  bestPickWeight: 12,
  personalizationMultiplier: 0.9,
  maxPersonalizationBoost: 8,
  freshnessWindowDays: 120,
  freshnessWeight: 3,
} as const;

const BUDGET_SCORE_MATRIX: Record<StackBudget, Record<PricingTier, number>> = {
  free: {
    free: 22,
    freemium: 10,
    paid: -18,
  },
  freemium: {
    free: 8,
    freemium: 16,
    paid: -10,
  },
  paid: {
    free: 4,
    freemium: 8,
    paid: 14,
  },
  any: {
    free: 0,
    freemium: 0,
    paid: 0,
  },
};

const ACCESSIBILITY_TERMS = {
  beginner: [
    "beginner",
    "simple",
    "easy",
    "student",
    "step by step",
    "tutorial",
    "no-code",
    "friendly",
    "clear",
    "outline",
    "study",
    "learn",
  ],
  advanced: [
    "advanced",
    "enterprise",
    "self-host",
    "self hosted",
    "api",
    "sdk",
    "observability",
    "orchestration",
    "kubernetes",
    "infrastructure",
    "gpu",
    "ml",
    "refactor",
    "analytics",
    "sql",
    "type-safe",
  ],
} as const;

const PACE_TERMS = {
  speed: [
    "fast",
    "quick",
    "speed",
    "instantly",
    "low friction",
    "boilerplate",
    "summary",
    "summaries",
    "outline",
    "launch",
  ],
  depth: [
    "depth",
    "detailed",
    "comprehensive",
    "analysis",
    "citations",
    "research",
    "reasoning",
    "long-form",
    "long form",
    "framework",
    "strategy",
  ],
} as const;

export const STACK_GOALS: FilterOption<StackGoal>[] = [
  {
    value: "writing",
    label: "Writing",
    description: "Draft, rewrite, edit, and structure stronger writing workflows.",
  },
  {
    value: "coding",
    label: "Coding",
    description: "Ship code faster with better debugging, editing, and dev support.",
  },
  {
    value: "research",
    label: "Research",
    description: "Find sources, verify claims, and work through dense information faster.",
  },
  {
    value: "studying",
    label: "Studying",
    description: "Learn faster with tutor-style prompts, notes, and concept support.",
  },
  {
    value: "marketing",
    label: "Marketing",
    description: "Plan, research, and execute content, SEO, and campaign work more cleanly.",
  },
] as const;

export const STACK_BUDGETS: FilterOption<StackBudget>[] = [
  {
    value: "free",
    label: "Free",
    description: "Bias toward tools that stay useful without paying upfront.",
  },
  {
    value: "freemium",
    label: "Freemium",
    description: "Prefer tools with a real entry tier and room to grow.",
  },
  {
    value: "paid",
    label: "Paid",
    description: "Optimize for stronger workflows, even if they require a subscription.",
  },
  {
    value: "any",
    label: "Any Budget",
    description: "Rank for fit first and let price stay flexible.",
  },
] as const;

export const STACK_LEVELS: FilterOption<StackSkillLevel>[] = [
  {
    value: "beginner",
    label: "Beginner",
    description: "Favor approachable tools and prompts with lower setup friction.",
  },
  {
    value: "intermediate",
    label: "Intermediate",
    description: "Balance accessibility with room for more capable workflows.",
  },
  {
    value: "advanced",
    label: "Advanced",
    description: "Lean into depth, flexibility, and more complex tools when they pay off.",
  },
] as const;

export const STACK_PACES: FilterOption<StackPace>[] = [
  {
    value: "speed",
    label: "Fast Results",
    description: "Prefer lower-friction picks that shorten the path to an output.",
  },
  {
    value: "balanced",
    label: "Balanced",
    description: "Mix quick wins with enough depth to stay useful over time.",
  },
  {
    value: "depth",
    label: "Deep Work",
    description: "Bias toward richer analysis, higher-signal research, and heavier workflows.",
  },
] as const;

const GOAL_CONFIG: Record<StackGoal, GoalConfig> = {
  writing: {
    value: "writing",
    label: "Writing",
    intro: "For drafting, rewriting, editing, and turning rough ideas into publishable copy.",
    tags: ["writing", "copywriting", "communication", "content", "documentation", "reviews"],
    terms: [
      "write",
      "rewrite",
      "draft",
      "clarity",
      "outline",
      "summary",
      "editing",
      "docs",
      "grammar",
      "voice",
    ],
    supportLinks: [
      { kind: "best", slug: "best-ai-tools-for-writing", label: "Best AI tools for writing" },
      { kind: "comparison", slug: "chatgpt-vs-claude-vs-gemini", label: "ChatGPT vs Claude vs Gemini" },
      { kind: "prompt", slug: "rewrite-for-clarity", label: "Rewrite for Clarity prompt" },
    ],
  },
  coding: {
    value: "coding",
    label: "Coding",
    intro: "For debugging, refactoring, documentation, and faster development loops.",
    tags: ["coding", "dev", "debug", "developer-tools", "editor", "documentation", "code-review"],
    terms: [
      "code",
      "coding",
      "refactor",
      "debug",
      "editor",
      "developer",
      "technical",
      "api",
      "review",
      "boilerplate",
    ],
    supportLinks: [
      { kind: "best", slug: "best-ai-coding-tools", label: "Best AI coding tools" },
      { kind: "comparison", slug: "cursor-vs-vscode-ai-vs-jetbrains-ai", label: "Cursor vs VS Code vs JetBrains AI" },
      { kind: "prompt", slug: "bug-hunter", label: "Bug Hunter prompt" },
    ],
  },
  research: {
    value: "research",
    label: "Research",
    intro: "For source discovery, citation-aware workflows, and turning information overload into signal.",
    tags: ["research", "search", "academic", "insights", "analysis", "citations"],
    terms: [
      "research",
      "source",
      "sources",
      "citation",
      "citations",
      "papers",
      "survey",
      "search",
      "analysis",
      "literature",
    ],
    supportLinks: [
      { kind: "best", slug: "best-ai-tools-for-research", label: "Best AI tools for research" },
      { kind: "comparison", slug: "perplexity-vs-kagi-vs-google", label: "Perplexity vs Kagi vs Google" },
      { kind: "prompt", slug: "user-research-synthesis", label: "User Research Synthesis prompt" },
    ],
  },
  studying: {
    value: "studying",
    label: "Studying",
    intro: "For learning concepts, reviewing material, and building a repeatable study system.",
    tags: ["study", "learning", "students", "education", "tutorial", "teaching", "curriculum"],
    terms: [
      "study",
      "student",
      "learn",
      "learning",
      "tutor",
      "quiz",
      "exam",
      "understand",
      "teach",
      "curriculum",
    ],
    supportLinks: [
      { kind: "best", slug: "best-ai-tools-for-students", label: "Best AI tools for students" },
      { kind: "best", slug: "best-ai-tools-for-learning", label: "Best AI tools for learning" },
      { kind: "prompt", slug: "explain-like-tutor", label: "Explain Like a Patient Tutor prompt" },
    ],
  },
  marketing: {
    value: "marketing",
    label: "Marketing",
    intro: "For content, SEO, messaging, research, and campaign execution that still needs human judgment.",
    tags: ["marketing", "seo", "content", "copywriting", "conversion", "audience", "strategy", "email", "social-media"],
    terms: [
      "marketing",
      "seo",
      "content",
      "campaign",
      "audience",
      "conversion",
      "landing page",
      "refresh",
      "comparison page",
      "email",
    ],
    supportLinks: [
      { kind: "best", slug: "best-ai-tools-for-marketing", label: "Best AI tools for marketing" },
      { kind: "best", slug: "best-ai-tools-for-seo", label: "Best AI tools for SEO" },
      { kind: "prompt", slug: "content-strategy-planner", label: "Content Strategy Planner prompt" },
    ],
  },
};

const DEFAULT_STACK_INPUT: StackBuilderInput = {
  goal: "writing",
  budget: "any",
  level: "beginner",
  pace: "balanced",
};

const TOOL_BY_ID = new Map(DATA.tools.map((tool) => [tool.id, tool] as const));

function normalizeText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function buildCorpus(parts: Array<string | undefined | null>) {
  return normalizeText(parts.filter(Boolean).join(" "));
}

function uniqueMatches(source: string, terms: readonly string[]) {
  const matched = new Set<string>();

  for (const rawTerm of terms) {
    const term = normalizeText(rawTerm);
    if (!term) continue;
    if (source.includes(term)) matched.add(term);
  }

  return Array.from(matched);
}

function getFreshnessScore(updatedAtISO: string) {
  const ageDays = Math.max(
    0,
    (Date.now() - new Date(`${updatedAtISO}T00:00:00`).getTime()) / (1000 * 60 * 60 * 24)
  );

  return Number(
    Math.max(0, SCORE_CONFIG.freshnessWeight - ageDays / SCORE_CONFIG.freshnessWindowDays).toFixed(4)
  );
}

function getBudgetScore(tier: PricingTier, budget: StackBudget) {
  return BUDGET_SCORE_MATRIX[budget][tier];
}

function getSkillScore(corpus: string, level: StackSkillLevel) {
  const beginnerMatches = uniqueMatches(corpus, ACCESSIBILITY_TERMS.beginner);
  const advancedMatches = uniqueMatches(corpus, ACCESSIBILITY_TERMS.advanced);

  if (level === "beginner") {
    return {
      score: beginnerMatches.length * 5 - advancedMatches.length * 4,
      matchedTerms: beginnerMatches,
    };
  }

  if (level === "advanced") {
    return {
      score: advancedMatches.length * 5 - beginnerMatches.length * 1.5,
      matchedTerms: advancedMatches,
    };
  }

  const balanceScore =
    Math.min(beginnerMatches.length, 2) * 2 + Math.min(advancedMatches.length, 2) * 2;

  return {
    score: balanceScore,
    matchedTerms: [...beginnerMatches.slice(0, 1), ...advancedMatches.slice(0, 1)],
  };
}

function getPaceScore(corpus: string, pace: StackPace) {
  const speedMatches = uniqueMatches(corpus, PACE_TERMS.speed);
  const depthMatches = uniqueMatches(corpus, PACE_TERMS.depth);

  if (pace === "speed") {
    return {
      score: speedMatches.length * 4 - depthMatches.length,
      matchedTerms: speedMatches,
    };
  }

  if (pace === "depth") {
    return {
      score: depthMatches.length * 4 - speedMatches.length,
      matchedTerms: depthMatches,
    };
  }

  return {
    score: Math.min(speedMatches.length, 1) * 1.5 + Math.min(depthMatches.length, 1) * 1.5,
    matchedTerms: [...speedMatches.slice(0, 1), ...depthMatches.slice(0, 1)],
  };
}

function buildPersonalizationProfile(
  input: StackBuilderInput,
  signals?: { saved?: StackBuilderSignal[]; recent?: StackBuilderSignal[] }
): PersonalizationProfile {
  const profile = GOAL_CONFIG[input.goal];
  const tagWeights = new Map<string, number>();

  const addSignal = (signal: StackBuilderSignal, baseWeight: number) => {
    const item =
      DATA.tools.find((entry) => entry.id === signal.id) ??
      DATA.prompts.find((entry) => entry.id === signal.id) ??
      DATA.updates.find((entry) => entry.id === signal.id) ??
      DATA.collections.find((entry) => entry.id === signal.id) ??
      DATA.comparisons.find((entry) => entry.id === signal.id) ??
      DATA.bestPages.find((entry) => entry.id === signal.id);

    if (!item || !("tags" in item)) return;

    const overlap = item.tags.some(
      (tag) => profile.tags.includes(tag) || profile.terms.some((term) => normalizeText(tag).includes(normalizeText(term)))
    );

    if (!overlap) return;

    for (const tag of item.tags) {
      tagWeights.set(tag, (tagWeights.get(tag) ?? 0) + baseWeight);
    }
  };

  signals?.saved?.forEach((signal) => addSignal(signal, 1.6));
  signals?.recent?.forEach((signal) => addSignal(signal, 0.8));

  return { tagWeights };
}

function getPersonalizationScore(tags: string[], profile: PersonalizationProfile) {
  const personalizationTags = tags.filter((tag) => profile.tagWeights.has(tag));
  const rawScore = personalizationTags.reduce(
    (score, tag) => score + (profile.tagWeights.get(tag) ?? 0),
    0
  );

  return {
    score: Math.min(
      SCORE_CONFIG.maxPersonalizationBoost,
      Number((rawScore * SCORE_CONFIG.personalizationMultiplier).toFixed(4))
    ),
    personalizationTags,
  };
}

function joinNaturalLanguage(values: string[]) {
  if (values.length === 0) return "";
  if (values.length === 1) return values[0];
  if (values.length === 2) return `${values[0]} and ${values[1]}`;
  return `${values.slice(0, -1).join(", ")}, and ${values.at(-1)}`;
}

function toolCorpus(tool: Tool) {
  return buildCorpus([
    tool.name,
    tool.oneLiner,
    tool.description,
    tool.tags.join(" "),
    tool.useCases.join(" "),
    tool.pros.join(" "),
    tool.cons.join(" "),
  ]);
}

function promptCorpus(prompt: Prompt) {
  return buildCorpus([
    prompt.title,
    prompt.purpose,
    prompt.description,
    prompt.tags.join(" "),
    prompt.expectedOutput,
    prompt.relatedPrompts,
  ]);
}

function comparisonCorpus(comparison: Comparison) {
  return buildCorpus([
    comparison.title,
    comparison.description,
    comparison.tags.join(" "),
    comparison.verdict,
    comparison.decisionContext,
    comparison.specificRecommendations,
    comparison.keyTradeoffs,
    comparison.criteria.map((criterion) => `${criterion.name} ${criterion.notes}`).join(" "),
  ]);
}

function bestPageCorpus(page: BestPage) {
  return buildCorpus([
    page.title,
    page.description,
    page.tags.join(" "),
    page.intro.join(" "),
    page.primaryKeyword,
    page.picks.map((pick) => `${pick.badge ?? ""} ${pick.why} ${pick.bestFor.join(" ")}`).join(" "),
  ]);
}

function scoreGoalFit(
  tags: string[],
  corpus: string,
  input: StackBuilderInput,
  extraCorpusBonus = 0
) {
  const goal = GOAL_CONFIG[input.goal];
  const normalizedTags = tags.map((tag) => normalizeText(tag));
  const matchedGoalTags = goal.tags.filter((tag) => normalizedTags.includes(normalizeText(tag)));
  const matchedGoalTerms = uniqueMatches(corpus, goal.terms);

  const score =
    matchedGoalTags.length * SCORE_CONFIG.goalTagWeight +
    matchedGoalTerms.length * (SCORE_CONFIG.goalTermWeight + extraCorpusBonus);

  return {
    score,
    matchedGoalTags,
    matchedGoalTerms,
  };
}

function buildCommonDetail(
  tags: string[],
  corpus: string,
  input: StackBuilderInput,
  personalizationProfile: PersonalizationProfile,
  budgetScore = 0
) {
  const goalFit = scoreGoalFit(tags, corpus, input);
  const skillFit = getSkillScore(corpus, input.level);
  const paceFit = getPaceScore(corpus, input.pace);
  const personalizationFit = getPersonalizationScore(tags, personalizationProfile);

  return {
    goalScore: goalFit.score,
    detail: {
      matchedGoalTags: goalFit.matchedGoalTags,
      matchedGoalTerms: goalFit.matchedGoalTerms,
      matchedComplexityTerms: skillFit.matchedTerms,
      matchedPaceTerms: paceFit.matchedTerms,
      personalizationTags: personalizationFit.personalizationTags,
      budgetScore,
      skillScore: skillFit.score,
      paceScore: paceFit.score,
      freshnessScore: 0,
      personalizationScore: personalizationFit.score,
      reinforcementScore: 0,
    } satisfies MatchDetail,
  };
}

function budgetReason(budget: StackBudget, tier: PricingTier) {
  if (budget === "any") return null;
  if (budget === "free" && tier === "free") return "It keeps the stack fully free.";
  if (budget === "free" && tier === "freemium") return "You can start without paying, then upgrade only if it proves useful.";
  if (budget === "freemium" && tier === "freemium") return "It has a practical entry tier with room to grow.";
  if (budget === "paid" && tier === "paid") return "It earns its place when you want the strongest paid workflow.";
  if (budget === "paid" && tier === "freemium") return "It stays flexible even if you move into a paid setup later.";
  return null;
}

function levelReason(level: StackSkillLevel, detail: MatchDetail) {
  if (level === "beginner" && detail.skillScore > 0) return "It stays approachable for beginners.";
  if (level === "advanced" && detail.skillScore > 0) return "It has enough depth for more advanced users.";
  if (level === "intermediate" && detail.skillScore > 0) return "It balances guidance with flexibility.";
  return null;
}

function paceReason(pace: StackPace, detail: MatchDetail) {
  if (pace === "speed" && detail.paceScore > 0) return "It supports a faster workflow with lower friction.";
  if (pace === "depth" && detail.paceScore > 0) return "It leans toward deeper analysis and stronger signal.";
  if (pace === "balanced" && detail.paceScore > 0) return "It fits a balanced stack without feeling too light or too heavy.";
  return null;
}

function createToolReason(tool: Tool, input: StackBuilderInput, detail: MatchDetail) {
  const reasons: string[] = [];

  if (detail.matchedGoalTags.length > 0) {
    reasons.push(
      `Picked for ${GOAL_CONFIG[input.goal].label.toLowerCase()} because it clearly matches ${joinNaturalLanguage(
        detail.matchedGoalTags.slice(0, 2)
      )} workflows.`
    );
  } else if (tool.useCases.length > 0) {
    reasons.push(`Picked because it supports ${joinNaturalLanguage(tool.useCases.slice(0, 2)).toLowerCase()}.`);
  }

  const priceReason = budgetReason(input.budget, tool.pricing.tier);
  if (priceReason) reasons.push(priceReason);

  const accessibilityReason = levelReason(input.level, detail);
  if (accessibilityReason) reasons.push(accessibilityReason);

  const workflowReason = paceReason(input.pace, detail);
  if (workflowReason) reasons.push(workflowReason);

  return reasons.slice(0, 2).join(" ");
}

function createPromptReason(prompt: Prompt, input: StackBuilderInput, detail: MatchDetail) {
  const reasons: string[] = [];

  if (detail.matchedGoalTags.length > 0) {
    reasons.push(
      `Chosen because it lines up with ${joinNaturalLanguage(detail.matchedGoalTags.slice(0, 2))} work.`
    );
  } else {
    reasons.push(`Chosen because its core job is ${prompt.purpose.toLowerCase()}.`);
  }

  const accessibilityReason = levelReason(input.level, detail);
  if (accessibilityReason) reasons.push(accessibilityReason);

  const workflowReason = paceReason(input.pace, detail);
  if (workflowReason) reasons.push(workflowReason);

  return reasons.slice(0, 2).join(" ");
}

function createComparisonReason(
  comparison: Comparison,
  input: StackBuilderInput,
  detail: MatchDetail,
  matchedToolNames: string[]
) {
  const reasons: string[] = [];

  if (matchedToolNames.length > 0) {
    reasons.push(`It reinforces the stack by comparing ${joinNaturalLanguage(matchedToolNames)} directly.`);
  } else if (detail.matchedGoalTags.length > 0) {
    reasons.push(`It helps on the decision side of ${GOAL_CONFIG[input.goal].label.toLowerCase()} work.`);
  } else {
    reasons.push(`It gives a stronger decision framework than picking tools in isolation.`);
  }

  const workflowReason = paceReason(input.pace, detail);
  if (workflowReason) reasons.push(workflowReason);

  return reasons.slice(0, 2).join(" ");
}

function createBestPageReason(
  page: BestPage,
  input: StackBuilderInput,
  detail: MatchDetail,
  matchedToolNames: string[]
) {
  const reasons: string[] = [];

  if (matchedToolNames.length > 0) {
    reasons.push(`It backs up the stack with a ranked list that already features ${joinNaturalLanguage(matchedToolNames)}.`);
  } else if (detail.matchedGoalTags.length > 0) {
    reasons.push(`It is one of the strongest internal hubs for ${GOAL_CONFIG[input.goal].label.toLowerCase()} intent.`);
  } else {
    reasons.push(`It gives you a higher-level shortlist if you want to keep exploring after the first stack.`);
  }

  if (input.budget === "free" && normalizeText(page.slug).includes("free")) {
    reasons.push(`It is especially helpful when you want a stack that stays budget-conscious.`);
  }

  return reasons.slice(0, 2).join(" ");
}

function buildToolRecommendations(
  input: StackBuilderInput,
  personalizationProfile: PersonalizationProfile
) {
  return DATA.tools
    .map((tool) => {
      const corpus = toolCorpus(tool);
      const common = buildCommonDetail(
        tool.tags,
        corpus,
        input,
        personalizationProfile,
        getBudgetScore(tool.pricing.tier, input.budget)
      );

      const useCaseMatches = uniqueMatches(
        normalizeText(tool.useCases.join(" ")),
        GOAL_CONFIG[input.goal].terms
      );

      const freshnessScore = getFreshnessScore(tool.updatedAtISO);
      const score =
        common.goalScore +
        common.detail.budgetScore +
        common.detail.skillScore +
        common.detail.paceScore +
        common.detail.personalizationScore +
        freshnessScore +
        useCaseMatches.length * SCORE_CONFIG.toolUseCaseBonus;

      const detail: MatchDetail = {
        ...common.detail,
        matchedGoalTerms: [...common.detail.matchedGoalTerms, ...useCaseMatches],
        freshnessScore,
      };

      return {
        item: tool,
        href: hrefFor("tool", tool.slug),
        score: Number(score.toFixed(4)),
        reason: createToolReason(tool, input, detail),
        detail,
      } satisfies StackRecommendationItem<Tool>;
    })
    .sort(
      (left, right) =>
        right.score - left.score ||
        new Date(right.item.updatedAtISO).getTime() - new Date(left.item.updatedAtISO).getTime() ||
        left.item.name.localeCompare(right.item.name)
    );
}

function buildPromptRecommendations(
  input: StackBuilderInput,
  personalizationProfile: PersonalizationProfile
) {
  return DATA.prompts
    .map((prompt) => {
      const corpus = promptCorpus(prompt);
      const common = buildCommonDetail(prompt.tags, corpus, input, personalizationProfile);
      const purposeMatches = uniqueMatches(normalizeText(prompt.purpose), GOAL_CONFIG[input.goal].terms);
      const freshnessScore = getFreshnessScore(prompt.updatedAtISO);
      const score =
        common.goalScore +
        common.detail.skillScore +
        common.detail.paceScore +
        common.detail.personalizationScore +
        freshnessScore +
        purposeMatches.length * SCORE_CONFIG.promptPurposeBonus;

      const detail: MatchDetail = {
        ...common.detail,
        matchedGoalTerms: [...common.detail.matchedGoalTerms, ...purposeMatches],
        freshnessScore,
      };

      return {
        item: prompt,
        href: hrefFor("prompt", prompt.slug),
        score: Number(score.toFixed(4)),
        reason: createPromptReason(prompt, input, detail),
        detail,
      } satisfies StackRecommendationItem<Prompt>;
    })
    .sort(
      (left, right) =>
        right.score - left.score ||
        new Date(right.item.updatedAtISO).getTime() - new Date(left.item.updatedAtISO).getTime() ||
        left.item.title.localeCompare(right.item.title)
    );
}

function buildComparisonRecommendations(
  input: StackBuilderInput,
  topTools: StackRecommendationItem<Tool>[],
  personalizationProfile: PersonalizationProfile
) {
  const topToolIds = new Set(topTools.map((entry) => entry.item.id));
  const topToolNames = new Map(topTools.map((entry) => [entry.item.id, entry.item.name] as const));

  return DATA.comparisons
    .map((comparison) => {
      const corpus = comparisonCorpus(comparison);
      const common = buildCommonDetail(comparison.tags, corpus, input, personalizationProfile);
      const matchedToolNames = comparison.contenders
        .filter((contender) => contender.kind === "tool" && topToolIds.has(contender.id))
        .map((contender) => topToolNames.get(contender.id))
        .filter((value): value is string => Boolean(value));

      const contenderBudgetScore = comparison.contenders.reduce((score, contender) => {
        if (contender.kind !== "tool") return score;
        const tool = TOOL_BY_ID.get(contender.id);
        if (!tool) return score;
        return score + getBudgetScore(tool.pricing.tier, input.budget) * 0.15;
      }, 0);

      const freshnessScore = getFreshnessScore(comparison.updatedAtISO);
      const reinforcementScore = matchedToolNames.length * SCORE_CONFIG.comparisonContenderWeight;
      const score =
        common.goalScore +
        common.detail.skillScore +
        common.detail.paceScore +
        common.detail.personalizationScore +
        contenderBudgetScore +
        freshnessScore +
        reinforcementScore;

      const detail: MatchDetail = {
        ...common.detail,
        budgetScore: Number(contenderBudgetScore.toFixed(4)),
        freshnessScore,
        reinforcementScore,
      };

      return {
        item: comparison,
        href: hrefFor("comparison", comparison.slug),
        score: Number(score.toFixed(4)),
        reason: createComparisonReason(comparison, input, detail, matchedToolNames),
        detail,
      } satisfies StackRecommendationItem<Comparison>;
    })
    .sort(
      (left, right) =>
        right.score - left.score ||
        new Date(right.item.updatedAtISO).getTime() - new Date(left.item.updatedAtISO).getTime() ||
        left.item.title.localeCompare(right.item.title)
    );
}

function buildBestPageRecommendations(
  input: StackBuilderInput,
  topTools: StackRecommendationItem<Tool>[],
  personalizationProfile: PersonalizationProfile
) {
  const topToolIds = new Set(topTools.map((entry) => entry.item.id));
  const topToolNames = new Map(topTools.map((entry) => [entry.item.id, entry.item.name] as const));

  return DATA.bestPages
    .map((page) => {
      const corpus = bestPageCorpus(page);
      const common = buildCommonDetail(page.tags, corpus, input, personalizationProfile);
      const matchedToolNames = page.picks
        .filter((pick) => topToolIds.has(pick.toolId))
        .map((pick) => topToolNames.get(pick.toolId))
        .filter((value): value is string => Boolean(value));
      const freshnessScore = getFreshnessScore(page.updatedAtISO);
      const reinforcementScore = matchedToolNames.length * SCORE_CONFIG.bestPickWeight;
      const budgetBias =
        input.budget === "free" && normalizeText(page.slug).includes("free")
          ? 10
          : input.goal === "studying" && normalizeText(page.slug).includes("students")
          ? 8
          : 0;
      const score =
        common.goalScore +
        common.detail.skillScore +
        common.detail.paceScore +
        common.detail.personalizationScore +
        freshnessScore +
        reinforcementScore +
        budgetBias;

      const detail: MatchDetail = {
        ...common.detail,
        budgetScore: budgetBias,
        freshnessScore,
        reinforcementScore,
      };

      return {
        item: page,
        href: hrefFor("best", page.slug),
        score: Number(score.toFixed(4)),
        reason: createBestPageReason(page, input, detail, matchedToolNames),
        detail,
      } satisfies StackRecommendationItem<BestPage>;
    })
    .sort(
      (left, right) =>
        right.score - left.score ||
        new Date(right.item.updatedAtISO).getTime() - new Date(left.item.updatedAtISO).getTime() ||
        left.item.title.localeCompare(right.item.title)
    );
}

function buildHowToUse(
  tools: StackRecommendationItem<Tool>[],
  prompts: StackRecommendationItem<Prompt>[],
  comparison: StackRecommendationItem<Comparison> | null,
  bestPage: StackRecommendationItem<BestPage> | null
) {
  const firstTool = tools[0];
  const secondTool = tools[1];
  const firstPrompt = prompts[0];
  const secondPrompt = prompts[1];

  const steps: string[] = [];

  if (firstTool && firstPrompt) {
    steps.push(
      `Start in ${firstTool.item.name} to handle the main workflow, then run ${firstPrompt.item.title} whenever you need a sharper first pass.`
    );
  }

  if (secondTool && secondPrompt) {
    steps.push(
      `Use ${secondTool.item.name} as your supporting tool and keep ${secondPrompt.item.title} nearby for cleanup, structure, or follow-through.`
    );
  }

  if (comparison) {
    steps.push(`Read ${comparison.item.title} before you commit to one long-term workflow so you understand the tradeoffs.`);
  }

  if (bestPage) {
    steps.push(`Use ${bestPage.item.title} as the broader shortlist if you want a second round of options after trying the first stack.`);
  }

  return steps.slice(0, 4);
}

function buildWhoItsFor(input: StackBuilderInput) {
  const goal = GOAL_CONFIG[input.goal];
  const budgetLabel = STACK_BUDGETS.find((option) => option.value === input.budget)?.label ?? input.budget;
  const levelLabel = STACK_LEVELS.find((option) => option.value === input.level)?.label ?? input.level;
  const paceLabel = STACK_PACES.find((option) => option.value === input.pace)?.label ?? input.pace;

  return `This stack is best for ${levelLabel.toLowerCase()} users focused on ${goal.label.toLowerCase()} who want a ${paceLabel.toLowerCase()} setup and ${budgetLabel.toLowerCase() === "any budget" ? "care more about fit than price" : `prefer a ${budgetLabel.toLowerCase()}-friendly workflow`}.`;
}

function buildSwapReason(
  input: StackBuilderInput,
  currentTool: Tool,
  currentDetail: MatchDetail,
  alternativeTool: Tool,
  alternativeDetail: MatchDetail
) {
  if (input.budget === "free" && alternativeTool.pricing.tier === "free" && currentTool.pricing.tier !== "free") {
    return `Swap if you want to keep the stack fully free without changing the goal too much.`;
  }

  if (input.pace === "depth" && alternativeDetail.paceScore > currentDetail.paceScore) {
    return `Swap if you want a deeper workflow and are willing to trade some speed for stronger signal.`;
  }

  if (input.pace === "speed" && alternativeDetail.paceScore > currentDetail.paceScore) {
    return `Swap if you want a lighter, faster workflow even if it means giving up some depth.`;
  }

  if (input.level === "advanced" && alternativeDetail.skillScore > currentDetail.skillScore) {
    return `Swap if you want a more advanced setup with more control or complexity.`;
  }

  return `Swap if ${alternativeTool.useCases[0]?.toLowerCase() ?? "its workflow"} matters more to you than ${currentTool.useCases[0]?.toLowerCase() ?? "the default fit"}.`;
}

function buildSwapOptions(
  input: StackBuilderInput,
  tools: StackRecommendationItem<Tool>[],
  rankedTools: StackRecommendationItem<Tool>[]
) {
  const selectedIds = new Set(tools.map((entry) => entry.item.id));
  const swaps: StackSwapOption[] = [];
  const usedAlternativeIds = new Set<string>();

  for (const toolEntry of tools) {
    const alternatives = toolEntry.item.alternatives
      .map((alternative) => getToolBySlug(alternative.slug))
      .filter((tool): tool is Tool => Boolean(tool))
      .map((tool) => rankedTools.find((entry) => entry.item.id === tool.id))
      .filter((entry): entry is StackRecommendationItem<Tool> => Boolean(entry))
      .filter((entry) => !selectedIds.has(entry.item.id))
      .filter((entry) => !usedAlternativeIds.has(entry.item.id))
      .filter((entry) => entry.score >= toolEntry.score - 12)
      .sort((left, right) => right.score - left.score);

    const nextAlternative = alternatives[0];
    if (!nextAlternative) continue;

    swaps.push({
      from: toolEntry,
      to: nextAlternative,
      reason: buildSwapReason(
        input,
        toolEntry.item,
        toolEntry.detail,
        nextAlternative.item,
        nextAlternative.detail
      ),
    });
    usedAlternativeIds.add(nextAlternative.item.id);

    if (swaps.length >= 2) break;
  }

  return swaps;
}

export function sanitizeStackInput(
  value: Partial<StackBuilderInput> | null | undefined
): StackBuilderInput {
  const goal = STACK_GOALS.some((option) => option.value === value?.goal)
    ? (value?.goal as StackGoal)
    : DEFAULT_STACK_INPUT.goal;
  const budget = STACK_BUDGETS.some((option) => option.value === value?.budget)
    ? (value?.budget as StackBudget)
    : DEFAULT_STACK_INPUT.budget;
  const level = STACK_LEVELS.some((option) => option.value === value?.level)
    ? (value?.level as StackSkillLevel)
    : DEFAULT_STACK_INPUT.level;
  const pace = STACK_PACES.some((option) => option.value === value?.pace)
    ? (value?.pace as StackPace)
    : DEFAULT_STACK_INPUT.pace;

  return { goal, budget, level, pace };
}

export function readStackInputFromSearchParams(searchParams: URLSearchParams) {
  return sanitizeStackInput({
    goal: (searchParams.get("goal") ?? undefined) as StackGoal | undefined,
    budget: (searchParams.get("budget") ?? undefined) as StackBudget | undefined,
    level: (searchParams.get("level") ?? undefined) as StackSkillLevel | undefined,
    pace: (searchParams.get("pace") ?? undefined) as StackPace | undefined,
  });
}

export function buildStackQueryString(input: StackBuilderInput) {
  const params = new URLSearchParams();

  if (input.goal !== DEFAULT_STACK_INPUT.goal) params.set("goal", input.goal);
  if (input.budget !== DEFAULT_STACK_INPUT.budget) params.set("budget", input.budget);
  if (input.level !== DEFAULT_STACK_INPUT.level) params.set("level", input.level);
  if (input.pace !== DEFAULT_STACK_INPUT.pace) params.set("pace", input.pace);

  return params.toString();
}

export function getGoalSpotlights(goal: StackGoal) {
  return GOAL_CONFIG[goal].supportLinks
    .map((link) => {
      if (link.kind === "best") {
        const item = getBestPageBySlug(link.slug);
        if (!item) return null;

        return {
          kind: "best" as const,
          href: hrefFor("best", item.slug),
          title: item.title,
          description: item.description,
          label: link.label,
        };
      }

      if (link.kind === "comparison") {
        const item = getComparisonBySlug(link.slug);
        if (!item) return null;

        return {
          kind: "comparison" as const,
          href: hrefFor("comparison", item.slug),
          title: item.title,
          description: item.description,
          label: link.label,
        };
      }

      const item = getPromptBySlug(link.slug);
      if (!item) return null;

      return {
        kind: "prompt" as const,
        href: hrefFor("prompt", item.slug),
        title: item.title,
        description: item.purpose,
        label: link.label,
      };
    })
    .filter(
      (
        item
      ): item is {
        kind: "best" | "comparison" | "prompt";
        href: string;
        title: string;
        description: string;
        label: string;
      } => Boolean(item)
    );
}

export function buildStackRecommendation(
  rawInput: Partial<StackBuilderInput> | undefined,
  signals?: { saved?: StackBuilderSignal[]; recent?: StackBuilderSignal[] }
): StackBuilderRecommendation {
  const input = sanitizeStackInput(rawInput);
  const personalizationProfile = buildPersonalizationProfile(input, signals);

  const rankedTools = buildToolRecommendations(input, personalizationProfile);
  const tools = rankedTools.slice(0, 3);

  const prompts = buildPromptRecommendations(input, personalizationProfile).slice(0, 2);

  const comparison = buildComparisonRecommendations(input, tools, personalizationProfile)[0] ?? null;
  const bestPage = buildBestPageRecommendations(input, tools, personalizationProfile)[0] ?? null;

  return {
    input,
    tools,
    prompts,
    comparison,
    bestPage,
    howToUse: buildHowToUse(tools, prompts, comparison, bestPage),
    whoItsFor: buildWhoItsFor(input),
    swapOptions: buildSwapOptions(input, tools, rankedTools),
  };
}

export function getDefaultStackInput() {
  return { ...DEFAULT_STACK_INPUT };
}
