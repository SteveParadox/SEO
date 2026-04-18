import { DATA, type Comparison, type Tool } from "@/lib/data";
import type { BestPage } from "@/lib/content/best-pages";

export type ComparisonPriority =
  | "balanced"
  | "cost"
  | "beginners"
  | "versatile"
  | "serious";

export type ComparisonPriorityOption = {
  value: ComparisonPriority;
  label: string;
  description: string;
};

export type ComparisonUiState = {
  priority: ComparisonPriority;
  toolSlugs: string[];
};

export type ToolScoreMetrics = {
  price: number;
  rating: number;
  versatility: number;
  beginner: number;
  serious: number;
  stability: number;
};

export type ToolComparisonRecommendation = {
  tool: Tool;
  score: number;
  metrics: ToolScoreMetrics;
  rationale: string;
  scenario: string;
  watchOut: string | null;
};

export type ToolComparisonResult = {
  winner: ToolComparisonRecommendation;
  ranked: ToolComparisonRecommendation[];
  closeCall: boolean;
  editorialComparisons: Comparison[];
  bestPages: BestPage[];
  confidenceNote: string;
};

export const COMPARISON_PRIORITY_OPTIONS: ComparisonPriorityOption[] = [
  {
    value: "balanced",
    label: "Best overall balance",
    description: "Blends value, breadth, approachability, and stronger long-term fit.",
  },
  {
    value: "cost",
    label: "Lowest cost",
    description: "Weights pricing most heavily while still checking quality and usability.",
  },
  {
    value: "beginners",
    label: "Easiest for beginners",
    description: "Prefers lower-friction tools with simpler workflows and fewer warnings.",
  },
  {
    value: "versatile",
    label: "Most versatile",
    description: "Rewards broader use cases, wider tag coverage, and more flexible fit.",
  },
  {
    value: "serious",
    label: "Strongest for serious work",
    description: "Leans toward higher-rated tools that look better suited to demanding workflows.",
  },
];

const DEFAULT_PRIORITY: ComparisonPriority = "balanced";
const MAX_TOOL_COUNT = 3;

const PRICING_SCORES: Record<Tool["pricing"]["tier"], number> = {
  free: 100,
  freemium: 78,
  paid: 42,
};

const BEGINNER_POSITIVE_CUES = [
  "easy",
  "easier",
  "beginner",
  "simple",
  "straightforward",
  "friendly",
  "fast",
  "low friction",
  "zero context switching",
  "browser extension",
  "works offline",
  "shareable",
  "good for brainstorming",
];

const BEGINNER_NEGATIVE_CUES = [
  "learning curve",
  "steep",
  "advanced",
  "devops",
  "self-host",
  "resource heavy",
  "setup overhead",
  "lock-in",
  "complex",
  "over-customize",
];

const SERIOUS_POSITIVE_CUES = [
  "large codebases",
  "team",
  "teams",
  "enterprise",
  "reviewable",
  "reliable",
  "refactor",
  "monitor",
  "observability",
  "type-safe",
  "production",
  "integration",
  "workflow",
  "infrastructure",
];

const SERIOUS_NEGATIVE_CUES = [
  "generic",
  "okay, not amazing",
  "casual",
  "hobby",
  "messy",
];

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function normalizeValue(value: string) {
  return value.trim().toLowerCase();
}

function normalizeList(values: string[]) {
  return values.map((value) => normalizeValue(value));
}

function countCueMatches(values: string[], cues: string[]) {
  const haystack = normalizeList(values);

  return cues.reduce((total, cue) => {
    const needle = normalizeValue(cue);
    const matched = haystack.some((value) => value.includes(needle));
    return matched ? total + 1 : total;
  }, 0);
}

function getScoringText(tool: Tool) {
  return [
    tool.oneLiner,
    tool.description,
    ...tool.useCases,
    ...tool.pros,
    ...tool.cons,
    ...tool.tags,
  ];
}

function getToolMetrics(tool: Tool): ToolScoreMetrics {
  const scoringText = getScoringText(tool);
  // Missing ratings should not zero out a tool, so we use a neutral default.
  const ratingScore = clamp(((tool.rating ?? 3.8) / 5) * 100);
  const priceScore = PRICING_SCORES[tool.pricing.tier];
  const versatilityScore = clamp(
    tool.useCases.length * 14 + tool.tags.length * 6 + tool.alternatives.length * 5
  );
  const stabilityScore = clamp(52 + tool.pros.length * 8 - tool.cons.length * 5);
  // These keyword cues are intentionally light-touch. They only nudge the score using
  // wording already present in the content, rather than pretending we have hidden data.
  const beginnerScore = clamp(
    48 +
      (tool.pricing.tier === "free" ? 12 : tool.pricing.tier === "freemium" ? 8 : 0) +
      countCueMatches(scoringText, BEGINNER_POSITIVE_CUES) * 8 -
      countCueMatches(scoringText, BEGINNER_NEGATIVE_CUES) * 10 +
      (tool.cons.length <= 2 ? 6 : 0)
  );
  const seriousScore = clamp(
    ratingScore * 0.35 +
      stabilityScore * 0.25 +
      versatilityScore * 0.2 +
      countCueMatches(scoringText, SERIOUS_POSITIVE_CUES) * 7 -
      countCueMatches(scoringText, SERIOUS_NEGATIVE_CUES) * 9
  );

  return {
    price: priceScore,
    rating: ratingScore,
    versatility: versatilityScore,
    beginner: beginnerScore,
    serious: seriousScore,
    stability: stabilityScore,
  };
}

function scoreToolForPriority(metrics: ToolScoreMetrics, priority: ComparisonPriority) {
  // The weights stay intentionally simple so ranking is understandable and easy to tune.
  if (priority === "cost") {
    return (
      metrics.price * 0.6 +
      metrics.beginner * 0.15 +
      metrics.rating * 0.15 +
      metrics.stability * 0.1
    );
  }

  if (priority === "beginners") {
    return (
      metrics.beginner * 0.45 +
      metrics.price * 0.2 +
      metrics.rating * 0.2 +
      metrics.versatility * 0.15
    );
  }

  if (priority === "versatile") {
    return (
      metrics.versatility * 0.55 +
      metrics.rating * 0.2 +
      metrics.serious * 0.15 +
      metrics.beginner * 0.1
    );
  }

  if (priority === "serious") {
    return (
      metrics.serious * 0.45 +
      metrics.rating * 0.25 +
      metrics.stability * 0.15 +
      metrics.versatility * 0.15
    );
  }

  return (
    metrics.rating * 0.25 +
    metrics.price * 0.2 +
    metrics.versatility * 0.2 +
    metrics.beginner * 0.2 +
    metrics.serious * 0.15
  );
}

function formatMetricLabel(priority: ComparisonPriority) {
  if (priority === "cost") return "price";
  if (priority === "beginners") return "ease of use";
  if (priority === "versatile") return "coverage";
  if (priority === "serious") return "serious-work fit";
  return "overall balance";
}

function getStrengthPhrases(tool: Tool, metrics: ToolScoreMetrics, priority: ComparisonPriority) {
  const phrases: string[] = [];

  if (tool.pricing.tier === "free") {
    phrases.push("it keeps cost pressure low with a fully free tier");
  } else if (tool.pricing.tier === "freemium") {
    phrases.push("it offers a lower-friction freemium starting point");
  }

  if ((tool.rating ?? 0) >= 4.5) {
    phrases.push("its rating is one of the stronger signals in this set");
  }

  if (tool.useCases.length >= 5) {
    phrases.push(`it covers ${tool.useCases.length} clear use cases`);
  } else if (tool.useCases.length >= 4) {
    phrases.push("it covers several common workflows instead of just one narrow job");
  }

  if (metrics.beginner >= 70) {
    phrases.push("its copy and tradeoffs suggest a lower-friction learning curve");
  }

  if (metrics.serious >= 72) {
    phrases.push("the surrounding data points to a stronger fit for heavier workflows");
  }

  if (priority === "cost" && tool.pricing.tier !== "paid") {
    phrases.push("it stays friendlier to tighter budgets");
  }

  if (priority === "serious" && tool.pros.length >= tool.cons.length) {
    phrases.push("its strengths outweigh the listed tradeoffs more cleanly than most picks");
  }

  return phrases.slice(0, 2);
}

function lowerCaseFirst(value: string) {
  return value.length ? value[0].toLowerCase() + value.slice(1) : value;
}

function buildScenario(tool: Tool) {
  const useCases = tool.useCases.slice(0, 2).map(lowerCaseFirst);
  const useCaseText =
    useCases.length === 2 ? `${useCases[0]} or ${useCases[1]}` : useCases[0] ?? "solve a specific workflow";
  const budgetText =
    tool.pricing.tier === "free"
      ? "want to stay on a free plan"
      : tool.pricing.tier === "freemium"
        ? "want a free entry point before paying"
        : "are comfortable paying for a more specialized setup";
  const watchOut = tool.cons[0] ? ` Watch out for ${lowerCaseFirst(tool.cons[0])}.` : "";

  return `Pick ${tool.name} if you mainly need to ${useCaseText} and ${budgetText}.${watchOut}`;
}

function buildRationale(tool: Tool, metrics: ToolScoreMetrics, priority: ComparisonPriority) {
  const phrases = getStrengthPhrases(tool, metrics, priority);

  if (phrases.length === 0) {
    return `${tool.name} edges ahead on ${formatMetricLabel(priority)} based on the current tool data.`;
  }

  if (phrases.length === 1) {
    return `${tool.name} stands out because ${phrases[0]}.`;
  }

  return `${tool.name} stands out because ${phrases[0]}, and ${phrases[1]}.`;
}

function getToolBySlugMap() {
  return new Map(DATA.tools.map((tool) => [tool.slug, tool] as const));
}

function getTagOverlapScore(left: string[], right: string[]) {
  const rightSet = new Set(right.map((value) => normalizeValue(value)));
  return left.reduce(
    (total, value) => total + (rightSet.has(normalizeValue(value)) ? 1 : 0),
    0
  );
}

function getComparisonToolIds(comparison: Comparison) {
  return comparison.contenders
    .filter((entry) => entry.kind === "tool")
    .map((entry) => entry.id);
}

export function parseComparisonPriority(
  value: string | null | undefined
): ComparisonPriority {
  const normalized = normalizeValue(value ?? "");
  return COMPARISON_PRIORITY_OPTIONS.some((option) => option.value === normalized)
    ? (normalized as ComparisonPriority)
    : DEFAULT_PRIORITY;
}

export function parseSelectedToolSlugs(
  value: string | null | undefined
): string[] {
  const toolBySlug = getToolBySlugMap();
  const seen = new Set<string>();

  return (value ?? "")
    .split(",")
    .map((entry) => normalizeValue(entry))
    .filter((entry) => {
      if (!entry || seen.has(entry) || !toolBySlug.has(entry)) return false;
      seen.add(entry);
      return true;
    })
    .slice(0, MAX_TOOL_COUNT);
}

export function readComparisonUiState(searchParams: {
  get(name: string): string | null;
}): ComparisonUiState {
  return {
    priority: parseComparisonPriority(searchParams.get("priority")),
    toolSlugs: parseSelectedToolSlugs(searchParams.get("tools")),
  };
}

export function buildComparisonQueryString(state: ComparisonUiState) {
  const next = new URLSearchParams();

  if (state.toolSlugs.length > 0) {
    next.set("tools", state.toolSlugs.join(","));
  }

  if (state.priority !== DEFAULT_PRIORITY) {
    next.set("priority", state.priority);
  }

  return next.toString();
}

export function getToolsBySlugs(slugs: string[]) {
  const toolBySlug = getToolBySlugMap();

  return slugs
    .map((slug) => toolBySlug.get(slug))
    .filter((tool): tool is Tool => Boolean(tool));
}

export function getToolComparisonResult(
  tools: Tool[],
  priority: ComparisonPriority
): ToolComparisonResult | null {
  if (tools.length < 2) return null;

  const ranked = tools
    .map((tool) => {
      const metrics = getToolMetrics(tool);
      const score = scoreToolForPriority(metrics, priority);

      return {
        tool,
        score,
        metrics,
        rationale: buildRationale(tool, metrics, priority),
        scenario: buildScenario(tool),
        watchOut: tool.cons[0] ?? null,
      } satisfies ToolComparisonRecommendation;
    })
    .sort((left, right) => right.score - left.score);

  const winner = ranked[0];
  const runnerUp = ranked[1];
  const scoreGap = winner.score - runnerUp.score;
  const closeCall = scoreGap < 6;
  const confidenceNote = closeCall
    ? "This is a close call. The builder sees a small edge, not a blowout."
    : "The builder sees a clearer gap based on the current structured data.";

  return {
    winner,
    ranked,
    closeCall,
    editorialComparisons: getEditorialComparisonMatches(tools),
    bestPages: getRelevantBestPages(tools),
    confidenceNote,
  };
}

export function getEditorialComparisonMatches(tools: Tool[], limit = 3) {
  if (tools.length < 2) return [];

  const selectedIds = new Set(tools.map((tool) => tool.id));
  const selectedTags = tools.flatMap((tool) => tool.tags);
  const minOverlap = Math.min(2, selectedIds.size);

  return [...DATA.comparisons]
    .map((comparison) => {
      const comparisonToolIds = getComparisonToolIds(comparison);
      const overlap = comparisonToolIds.filter((id) => selectedIds.has(id)).length;

      if (overlap < minOverlap) return null;

      const exactMatch =
        overlap === selectedIds.size && comparisonToolIds.length === selectedIds.size;
      const tagOverlap = getTagOverlapScore(selectedTags, comparison.tags);

      return {
        comparison,
        score:
          overlap * 12 +
          (overlap === selectedIds.size ? 8 : 0) +
          (exactMatch ? 4 : 0) +
          tagOverlap,
      };
    })
    .filter((entry): entry is { comparison: Comparison; score: number } => Boolean(entry))
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .map((entry) => entry.comparison);
}

export function getRelevantBestPages(tools: Tool[], limit = 3) {
  if (tools.length === 0) return [];

  const selectedIds = new Set(tools.map((tool) => tool.id));
  const selectedTags = tools.flatMap((tool) => tool.tags);

  return [...DATA.bestPages]
    .map((page) => {
      const toolCoverage = page.picks.filter((pick) => selectedIds.has(pick.toolId)).length;
      const tagOverlap = getTagOverlapScore(selectedTags, page.tags);

      if (toolCoverage === 0 && tagOverlap < 2) return null;

      return {
        page,
        score: toolCoverage * 10 + tagOverlap * 3,
      };
    })
    .filter((entry): entry is { page: BestPage; score: number } => Boolean(entry))
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .map((entry) => entry.page);
}

export function getPickerMatches(query: string, selectedSlugs: string[], limit = 9) {
  const normalizedQuery = normalizeValue(query);
  const selectedSet = new Set(selectedSlugs);

  const candidates = DATA.tools.filter((tool) => !selectedSet.has(tool.slug));

  if (!normalizedQuery) {
    return [...candidates]
      .sort((left, right) => (right.rating ?? 0) - (left.rating ?? 0))
      .slice(0, limit);
  }

  return candidates
    .map((tool) => {
      const haystack = normalizeList([
        tool.name,
        tool.oneLiner,
        tool.description,
        ...tool.useCases,
        ...tool.tags,
      ]);

      const score = haystack.reduce((total, value) => {
        if (value === normalizedQuery) return total + 6;
        if (value.includes(normalizedQuery)) return total + 3;
        return total;
      }, 0);

      return { tool, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score || (right.tool.rating ?? 0) - (left.tool.rating ?? 0))
    .slice(0, limit)
    .map((entry) => entry.tool);
}
