import {
  DATA,
  findBestPagesContainingTool,
  findComparisonsContainingTool,
  getRelatedTools,
  getToolBySlug,
  resolveBestPicks,
  resolveComparisonContenders,
  type Comparison,
  type PricingTier,
  type Tool,
} from "@/lib/data";
import type { BestPage } from "@/lib/content/best-pages";

type AlternativeOrigin =
  | "explicit"
  | "reverse"
  | "comparison"
  | "best-page"
  | "related";

type RankedAlternative = {
  tool: Tool;
  score: number;
  origins: AlternativeOrigin[];
  sharedTags: string[];
  sharedConcepts: string[];
  whyConsiderIt: string;
  supportingComparisons: Comparison[];
  supportingBestPages: BestPage[];
};

type DecisionPick = {
  label: string;
  alternative: RankedAlternative;
  reason: string;
};

export type AlternativeFaq = {
  q: string;
  a: string;
};

export type AlternativePageData = {
  source: Tool;
  alternatives: RankedAlternative[];
  intro: string[];
  whoShouldSwitch: string[];
  whoShouldStay: string[];
  beginnerPick: DecisionPick | null;
  budgetPick: DecisionPick | null;
  powerPick: DecisionPick | null;
  relatedComparisons: Comparison[];
  relatedBestPages: BestPage[];
  faq: AlternativeFaq[];
  relatedTags: string[];
};

const MIN_ALTERNATIVES = 2;
const MAX_ALTERNATIVES = 5;
const alternativePageCache = new Map<string, AlternativePageData | null>();
const STOP_WORDS = new Set([
  "about",
  "after",
  "also",
  "around",
  "because",
  "been",
  "being",
  "between",
  "does",
  "from",
  "have",
  "into",
  "more",
  "over",
  "still",
  "than",
  "that",
  "them",
  "their",
  "there",
  "these",
  "they",
  "this",
  "when",
  "where",
  "with",
  "without",
  "your",
]);

function normalize(text: string) {
  return text.trim().toLowerCase();
}

function titleCase(input: string) {
  return input
    .split(" ")
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");
}

function lowerFirst(input: string) {
  return input ? input[0].toLowerCase() + input.slice(1) : input;
}

function joinList(values: string[], conjunction = "and") {
  if (values.length === 0) return "";
  if (values.length === 1) return values[0];
  if (values.length === 2) return `${values[0]} ${conjunction} ${values[1]}`;
  return `${values.slice(0, -1).join(", ")}, ${conjunction} ${values.at(-1)}`;
}

function pricingRank(tier: PricingTier) {
  if (tier === "free") return 0;
  if (tier === "freemium") return 1;
  return 2;
}

function pricingLabel(tier: PricingTier) {
  if (tier === "free") return "free";
  if (tier === "freemium") return "freemium";
  return "paid";
}

function tokenize(...values: Array<string | string[] | undefined>) {
  const words = values
    .flatMap((value) => (Array.isArray(value) ? value : value ? [value] : []))
    .join(" ")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length >= 3 && !STOP_WORDS.has(word));

  return new Set(words);
}

function intersect(a: Iterable<string>, b: Iterable<string>) {
  const other = new Set(b);
  return Array.from(new Set(Array.from(a).filter((value) => other.has(value))));
}

function uniqueById<T extends { id: string }>(items: T[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

function addCandidate(
  candidates: Map<
    string,
    {
      tool: Tool;
      origins: Set<AlternativeOrigin>;
      supportingComparisons: Map<string, Comparison>;
      supportingBestPages: Map<string, BestPage>;
    }
  >,
  tool: Tool,
  origin: AlternativeOrigin,
  comparison?: Comparison,
  bestPage?: BestPage
) {
  if (tool.id === "") return;

  const existing =
    candidates.get(tool.id) ??
    {
      tool,
      origins: new Set<AlternativeOrigin>(),
      supportingComparisons: new Map<string, Comparison>(),
      supportingBestPages: new Map<string, BestPage>(),
    };

  existing.origins.add(origin);

  if (comparison) {
    existing.supportingComparisons.set(comparison.id, comparison);
  }

  if (bestPage) {
    existing.supportingBestPages.set(bestPage.id, bestPage);
  }

  candidates.set(tool.id, existing);
}

function sourceConcepts(tool: Tool) {
  return tokenize(tool.oneLiner, tool.description, tool.useCases, tool.pros, tool.cons, tool.tags);
}

function sharedTags(source: Tool, candidate: Tool) {
  const sourceTags = new Set(source.tags.map(normalize));
  return candidate.tags.filter((tag) => sourceTags.has(normalize(tag)));
}

function sharedConcepts(source: Tool, candidate: Tool) {
  const sourceTokens = sourceConcepts(source);
  const candidateTokens = tokenize(
    candidate.oneLiner,
    candidate.description,
    candidate.useCases,
    candidate.pros,
    candidate.cons,
    candidate.tags
  );

  return intersect(sourceTokens, candidateTokens)
    .filter((token) => !source.tags.some((tag) => normalize(tag) === token))
    .slice(0, 4);
}

function scoreCandidate(
  source: Tool,
  candidate: Tool,
  origins: Set<AlternativeOrigin>,
  comparisons: Comparison[],
  bestPages: BestPage[]
) {
  const overlapTags = sharedTags(source, candidate);
  const overlapConcepts = sharedConcepts(source, candidate);
  const richerToolSignal =
    Math.min(candidate.useCases.length, 4) +
    Math.min(candidate.pros.length, 4) +
    Math.min(candidate.cons.length, 3);

  let score = 0;

  if (origins.has("explicit")) score += 60;
  if (origins.has("reverse")) score += 24;
  if (origins.has("comparison")) score += 14;
  if (origins.has("best-page")) score += 10;
  if (origins.has("related")) score += 6;

  score += overlapTags.length * 12;
  score += overlapConcepts.length * 4;
  score += comparisons.length * 5;
  score += bestPages.length * 4;
  score += richerToolSignal;
  score += Math.round((candidate.rating ?? 0) * 2);

  if (pricingRank(candidate.pricing.tier) < pricingRank(source.pricing.tier)) {
    score += 8;
  } else if (candidate.pricing.tier === source.pricing.tier) {
    score += 4;
  }

  if (candidate.users === "Popular") score += 2;
  if (candidate.users === "Growing") score += 1;

  return {
    score,
    overlapTags,
    overlapConcepts,
  };
}

function buildWhyConsiderIt(
  source: Tool,
  candidate: Tool,
  overlapTags: string[],
  overlapConcepts: string[],
  comparisons: Comparison[],
  bestPages: BestPage[]
) {
  const reasons = [candidate.oneLiner];

  if (overlapTags.length > 0) {
    reasons.push(`Strong overlap in ${joinList(overlapTags.slice(0, 2).map(titleCase))}.`);
  } else if (overlapConcepts.length > 0) {
    reasons.push(`A close fit for workflows around ${joinList(overlapConcepts.slice(0, 2))}.`);
  }

  if (pricingRank(candidate.pricing.tier) < pricingRank(source.pricing.tier)) {
    reasons.push(`${candidate.name} gives you a lower-cost entry point than ${source.name}.`);
  } else if (candidate.pricing.tier === source.pricing.tier) {
    reasons.push(`Pricing is in a similar ${pricingLabel(candidate.pricing.tier)} tier.`);
  }

  if (comparisons.length > 0) {
    reasons.push(`It already shows up in direct comparison coverage with ${source.name}.`);
  } else if (bestPages.length > 0) {
    reasons.push(`It also appears in editorial best lists tied to this category.`);
  }

  return reasons.join(" ");
}

function pickDecisionAlternative(
  alternatives: RankedAlternative[],
  scoreFn: (item: RankedAlternative) => number,
  usedIds: Set<string>
) {
  const sorted = [...alternatives].sort((a, b) => scoreFn(b) - scoreFn(a));
  return sorted.find((item) => !usedIds.has(item.tool.id)) ?? sorted[0] ?? null;
}

function buildDecisionPicks(source: Tool, alternatives: RankedAlternative[]) {
  const usedIds = new Set<string>();

  const beginner = pickDecisionAlternative(
    alternatives,
    (item) =>
      (item.tool.rating ?? 0) * 3 +
      (item.tool.pricing.tier === "free" ? 7 : item.tool.pricing.tier === "freemium" ? 4 : 1) +
      Math.min(item.tool.useCases.length, 4) -
      item.tool.cons.length * 0.5,
    usedIds
  );

  if (beginner) usedIds.add(beginner.tool.id);

  const budget = pickDecisionAlternative(
    alternatives,
    (item) =>
      (item.tool.pricing.tier === "free" ? 12 : item.tool.pricing.tier === "freemium" ? 8 : 1) +
      (pricingRank(source.pricing.tier) > pricingRank(item.tool.pricing.tier) ? 5 : 0) +
      (item.tool.rating ?? 0) * 2,
    usedIds
  );

  if (budget) usedIds.add(budget.tool.id);

  const power = pickDecisionAlternative(
    alternatives,
    (item) =>
      item.score +
      item.tool.useCases.length * 1.5 +
      item.tool.pros.length +
      (item.tool.pricing.tier === "paid" ? 3 : item.tool.pricing.tier === "freemium" ? 2 : 0),
    usedIds
  );

  const toDecisionPick = (
    label: string,
    alternative: RankedAlternative | null,
    reason: string
  ): DecisionPick | null => {
    if (!alternative) return null;
    return { label, alternative, reason };
  };

  return {
    beginnerPick: toDecisionPick(
      "Best alternative for beginners",
      beginner,
      beginner
        ? `${beginner.tool.name} is the easiest starting point here because it combines a ${pricingLabel(beginner.tool.pricing.tier)} path with broad use cases like ${joinList(beginner.tool.useCases.slice(0, 2))}.`
        : ""
    ),
    budgetPick: toDecisionPick(
      "Best alternative for budget-conscious users",
      budget,
      budget
        ? `${budget.tool.name} is the strongest value pick if price matters first. Its ${pricingLabel(budget.tool.pricing.tier)} model is easier to try without giving up category coverage.`
        : ""
    ),
    powerPick: toDecisionPick(
      "Best alternative for power users",
      power,
      power
        ? `${power.tool.name} stands out when breadth matters most, with strengths in ${joinList(power.tool.useCases.slice(0, 2))} and a deeper upside around ${joinList(power.tool.pros.slice(0, 2).map(lowerFirst))}.`
        : ""
    ),
  };
}

function buildRelatedComparisons(source: Tool, alternatives: RankedAlternative[]) {
  const relevantToolIds = new Set([source.id, ...alternatives.map((item) => item.tool.id)]);

  return DATA.comparisons
    .map((comparison) => {
      const contenders = resolveComparisonContenders(comparison).flatMap((entry) =>
        entry.kind === "tool" && entry.item ? [entry.item] : []
      );

      const overlapCount = contenders.reduce(
        (count, contender) => count + (relevantToolIds.has(contender.id) ? 1 : 0),
        0
      );
      const includesSource = contenders.some((contender) => contender.id === source.id);

      return {
        comparison,
        score:
          overlapCount * 10 +
          (includesSource ? 8 : 0) +
          new Date(comparison.updatedAtISO).getTime() / 1e12,
      };
    })
    .filter((entry) => entry.score >= 18)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.comparison)
    .slice(0, 6);
}

function buildRelatedBestPages(source: Tool, alternatives: RankedAlternative[]) {
  const relevantToolIds = new Set([source.id, ...alternatives.map((item) => item.tool.id)]);

  return DATA.bestPages
    .map((page) => {
      const picks = resolveBestPicks(page);
      const overlapCount = picks.reduce(
        (count, pick) => count + (relevantToolIds.has(pick.tool.id) ? 1 : 0),
        0
      );
      const includesSource = picks.some((pick) => pick.tool.id === source.id);

      return {
        page,
        score:
          overlapCount * 10 +
          (includesSource ? 6 : 0) +
          new Date(page.updatedAtISO).getTime() / 1e12,
      };
    })
    .filter((entry) => entry.score >= 12)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.page)
    .slice(0, 6);
}

function buildIntro(source: Tool, alternatives: RankedAlternative[]) {
  const names = alternatives.slice(0, 3).map((item) => item.tool.name);
  const keyUseCases = source.useCases.slice(0, 3).map(lowerFirst);
  const priceAngle =
    alternatives.some((item) => pricingRank(item.tool.pricing.tier) < pricingRank(source.pricing.tier))
      ? `a lower-cost option than ${source.name}`
      : `a different tradeoff from ${source.name}`;

  const paragraphOne = `People searching for ${source.name} alternatives usually like what ${source.name} already does for ${joinList(keyUseCases)} but want ${priceAngle}, a different workflow feel, or a better match for their current stack.`;
  const paragraphTwo = `This shortlist focuses on the closest substitutes we can support with existing Xavkit data, led by ${joinList(names)}. Each option below is ranked using explicit alternative refs, shared tags and workflow signals, comparison coverage, pricing, and overall data strength.`;

  return [paragraphOne, paragraphTwo];
}

function buildWhoShouldSwitch(source: Tool, alternatives: RankedAlternative[]) {
  const reasons = source.cons.slice(0, 2).map((reason) => `You keep running into ${lowerFirst(reason)}.`);

  if (
    alternatives.some((item) => pricingRank(item.tool.pricing.tier) < pricingRank(source.pricing.tier))
  ) {
    reasons.push(`You want to test similar workflows on a lower-cost tier before committing further.`);
  }

  reasons.push(
    `You need a different balance around ${joinList(source.tags.slice(0, 2).map(titleCase))} without leaving this category entirely.`
  );

  return reasons.slice(0, 3);
}

function buildWhoShouldStay(source: Tool) {
  const reasons = source.pros.slice(0, 2).map(
    (reason) => `Stay with ${source.name} if ${lowerFirst(reason)} is one of your top priorities.`
  );

  reasons.push(
    `${source.name} still makes sense when your day-to-day work is mostly ${joinList(
      source.useCases.slice(0, 2).map(lowerFirst)
    )}.`
  );

  return reasons;
}

function buildFaq(
  source: Tool,
  alternatives: RankedAlternative[],
  beginnerPick: DecisionPick | null,
  budgetPick: DecisionPick | null
) {
  const topAlternative = alternatives[0];
  const freeFriendly = alternatives.filter((item) => item.tool.pricing.tier !== "paid");

  return [
    {
      q: `What is the best alternative to ${source.name}?`,
      a: topAlternative
        ? `${topAlternative.tool.name} is the strongest overall alternative in Xavkit right now because it combines the closest category fit with the best mix of editorial support, pricing context, and tool depth.`
        : `There is no strong alternative page for ${source.name} without enough resolved substitute data.`,
    },
    {
      q: `Why do people look for alternatives to ${source.name}?`,
      a: `Most people start comparing options when they want a different tradeoff around ${joinList(
        source.cons.slice(0, 2).map(lowerFirst)
      )}, pricing, or workflow fit.`,
    },
    {
      q: `Which ${source.name} alternative is best for beginners?`,
      a: beginnerPick
        ? `${beginnerPick.alternative.tool.name} is the easiest place to start because it pairs a ${pricingLabel(
            beginnerPick.alternative.tool.pricing.tier
          )} entry point with broader everyday use cases.`
        : `The beginner-friendly answer depends on your workflow, but lower-friction pricing and broader use cases usually win.`,
    },
    {
      q: `Are there free alternatives to ${source.name}?`,
      a:
        freeFriendly.length > 0
          ? `Yes. ${joinList(
              freeFriendly.slice(0, 3).map((item) => item.tool.name)
            )} all offer a ${joinList(
              Array.from(new Set(freeFriendly.slice(0, 3).map((item) => pricingLabel(item.tool.pricing.tier))))
            )} path.`
          : `Not from the resolved shortlist on this page. The closest substitutes here are still mostly paid or freemium options.`,
    },
    {
      q: `Is ${source.name} still worth it?`,
      a: `${source.name} is still worth keeping if you mainly care about ${joinList(
        source.pros.slice(0, 2).map(lowerFirst)
      )} and those strengths matter more than the reasons pushing you to compare alternatives.`,
    },
    ...(budgetPick
      ? [
          {
            q: `Which ${source.name} alternative is best on a budget?`,
            a: `${budgetPick.alternative.tool.name} is the most practical budget pick here because its ${pricingLabel(
              budgetPick.alternative.tool.pricing.tier
            )} pricing is easier to try while still covering the core job people hire ${source.name} for.`,
          },
        ]
      : []),
  ];
}

export function getAlternativePageDataBySlug(slug: string): AlternativePageData | null {
  const cacheKey = normalize(slug);
  const cached = alternativePageCache.get(cacheKey);
  if (cached !== undefined) return cached;

  const source = getToolBySlug(slug);
  if (!source) {
    alternativePageCache.set(cacheKey, null);
    return null;
  }

  const candidates = new Map<
    string,
    {
      tool: Tool;
      origins: Set<AlternativeOrigin>;
      supportingComparisons: Map<string, Comparison>;
      supportingBestPages: Map<string, BestPage>;
    }
  >();

  for (const ref of source.alternatives) {
    const tool = getToolBySlug(ref.slug);
    if (tool && tool.id !== source.id) {
      addCandidate(candidates, tool, "explicit");
    }
  }

  for (const tool of DATA.tools) {
    if (tool.id === source.id) continue;
    if (tool.alternatives.some((ref) => normalize(ref.slug) === normalize(source.slug))) {
      addCandidate(candidates, tool, "reverse");
    }
  }

  for (const comparison of findComparisonsContainingTool(source.id)) {
    const contenders = resolveComparisonContenders(comparison).flatMap((entry) =>
      entry.kind === "tool" && entry.item && entry.item.id !== source.id ? [entry.item] : []
    );

    for (const contender of contenders) {
      addCandidate(candidates, contender, "comparison", comparison);
    }
  }

  for (const page of findBestPagesContainingTool(source.id)) {
    const picks = resolveBestPicks(page).filter((pick) => pick.tool.id !== source.id);

    for (const pick of picks) {
      addCandidate(candidates, pick.tool, "best-page", undefined, page);
    }
  }

  for (const related of getRelatedTools(source.id, 8)) {
    if (related.id !== source.id) {
      addCandidate(candidates, related, "related");
    }
  }

  const alternatives = Array.from(candidates.values())
    .map((entry) => {
      const comparisons = uniqueById(Array.from(entry.supportingComparisons.values()));
      const bestPages = uniqueById(Array.from(entry.supportingBestPages.values()));
      const { score, overlapTags, overlapConcepts } = scoreCandidate(
        source,
        entry.tool,
        entry.origins,
        comparisons,
        bestPages
      );

      return {
        tool: entry.tool,
        score,
        origins: Array.from(entry.origins).sort(),
        sharedTags: overlapTags,
        sharedConcepts: overlapConcepts,
        whyConsiderIt: buildWhyConsiderIt(
          source,
          entry.tool,
          overlapTags,
          overlapConcepts,
          comparisons,
          bestPages
        ),
        supportingComparisons: comparisons,
        supportingBestPages: bestPages,
      } satisfies RankedAlternative;
    })
    .filter(
      (entry) =>
        entry.tool.id !== source.id &&
        (entry.origins.includes("explicit") ||
          entry.origins.includes("reverse") ||
          entry.supportingComparisons.length > 0 ||
          entry.sharedTags.length > 0 ||
          entry.score >= 38)
    )
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_ALTERNATIVES);

  if (alternatives.length < MIN_ALTERNATIVES) {
    alternativePageCache.set(cacheKey, null);
    return null;
  }

  const relatedComparisons = buildRelatedComparisons(source, alternatives);
  const relatedBestPages = buildRelatedBestPages(source, alternatives);
  const { beginnerPick, budgetPick, powerPick } = buildDecisionPicks(source, alternatives);
  const relatedTags = Array.from(
    new Set([
      ...source.tags,
      ...alternatives.flatMap((item) => item.sharedTags),
      ...alternatives.flatMap((item) => item.tool.tags.slice(0, 2)),
    ])
  ).slice(0, 6);

  const result = {
    source,
    alternatives,
    intro: buildIntro(source, alternatives),
    whoShouldSwitch: buildWhoShouldSwitch(source, alternatives),
    whoShouldStay: buildWhoShouldStay(source),
    beginnerPick,
    budgetPick,
    powerPick,
    relatedComparisons,
    relatedBestPages,
    faq: buildFaq(source, alternatives, beginnerPick, budgetPick),
    relatedTags,
  };

  alternativePageCache.set(cacheKey, result);
  return result;
}

export function getAlternativePageStaticSlugs() {
  return DATA.tools
    .map((tool) => tool.slug)
    .filter((slug) => Boolean(getAlternativePageDataBySlug(slug)));
}

export function hasAlternativePageForTool(slug: string) {
  return Boolean(getAlternativePageDataBySlug(slug));
}
