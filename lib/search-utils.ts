import { DATA, hrefFor, type UnifiedKind } from "@/lib/data";
import type { Comparison, Collection, ModelUpdate, Prompt, Tool } from "@/lib/data-types";
import type { BestPage } from "@/lib/content/best-pages";

export type SearchContentType = "all" | UnifiedKind;
export type SearchFreshness = "all" | "new" | "week" | "recent" | "evergreen";
export type SearchSort = "relevance" | "newest";

type WeightedField = {
  label: string;
  text: string;
  weight: number;
};

export type SearchDocument = {
  kind: UnifiedKind;
  id: string;
  slug: string;
  href: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  typeTag: string;
  typeLabel: string;
  minutes: number;
  updatedAtISO: string;
  weightedFields: WeightedField[];
  normalizedTitle: string;
  normalizedSubtitle: string;
  normalizedDescription: string;
  normalizedTags: string[];
  normalizedTagText: string;
  normalizedAllText: string;
};

export type SearchMatch = {
  item: SearchDocument;
  score: number;
  matchedTokens: string[];
  matchedTags: string[];
};

const WHOLE_WORD_PAD = " ";

const TYPE_META: Record<UnifiedKind, { label: string; tag: string; minutes: number }> = {
  tool: { label: "Tool", tag: "TOOL", minutes: 6 },
  prompt: { label: "Prompt", tag: "PROMPT", minutes: 5 },
  update: { label: "Update", tag: "UPDATE", minutes: 4 },
  collection: { label: "Collection", tag: "COLLECTION", minutes: 7 },
  comparison: { label: "Comparison", tag: "VS", minutes: 6 },
  best: { label: "Best List", tag: "BEST", minutes: 8 },
};

function uniqueStrings(values: Array<string | undefined | null>) {
  return Array.from(
    new Set(
      values
        .map((value) => value?.trim())
        .filter((value): value is string => Boolean(value))
    )
  );
}

export function normalizeSearchText(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenizeSearchText(input: string) {
  return Array.from(
    new Set(
      normalizeSearchText(input)
        .split(" ")
        .map((token) => token.trim())
        .filter(Boolean)
    )
  );
}

function hasWholeWord(text: string, token: string) {
  const padded = `${WHOLE_WORD_PAD}${text}${WHOLE_WORD_PAD}`;
  return padded.includes(`${WHOLE_WORD_PAD}${token}${WHOLE_WORD_PAD}`);
}

function scoreFieldMatch(text: string, token: string, weight: number) {
  if (!text) return 0;
  if (text === token) return weight * 1.6;
  if (hasWholeWord(text, token)) return weight;
  if (text.startsWith(token)) return weight * 0.8;
  if (text.includes(token)) return weight * 0.55;
  return 0;
}

function buildToolDocument(tool: Tool): SearchDocument {
  const weightedFields: WeightedField[] = [
    { label: "title", text: tool.name, weight: 36 },
    { label: "subtitle", text: tool.oneLiner, weight: 18 },
    { label: "description", text: tool.description, weight: 16 },
    ...tool.tags.map((tag) => ({ label: "tag", text: tag, weight: 24 })),
    ...tool.useCases.map((value) => ({ label: "use-case", text: value, weight: 18 })),
    ...tool.pros.map((value) => ({ label: "pro", text: value, weight: 12 })),
    ...tool.cons.map((value) => ({ label: "con", text: value, weight: 10 })),
    { label: "pricing", text: tool.pricing.tier, weight: 8 },
    { label: "pricing-note", text: tool.pricing.note ?? "", weight: 6 },
  ];

  return createDocument({
    kind: "tool",
    id: tool.id,
    slug: tool.slug,
    title: tool.name,
    subtitle: tool.oneLiner,
    description: tool.description,
    tags: tool.tags,
    weightedFields,
    updatedAtISO: tool.updatedAtISO,
  });
}

function buildPromptDocument(prompt: Prompt): SearchDocument {
  const weightedFields: WeightedField[] = [
    { label: "title", text: prompt.title, weight: 36 },
    { label: "subtitle", text: prompt.purpose, weight: 18 },
    { label: "description", text: prompt.description ?? "", weight: 16 },
    ...prompt.tags.map((tag) => ({ label: "tag", text: tag, weight: 24 })),
    { label: "when-to-use", text: prompt.whenToUse ?? "", weight: 12 },
    { label: "how-it-works", text: prompt.howItWorks ?? "", weight: 10 },
    { label: "best-practices", text: prompt.bestPractices ?? "", weight: 8 },
    { label: "expected-output", text: prompt.expectedOutput ?? "", weight: 10 },
    { label: "variations", text: prompt.variations.join(" "), weight: 12 },
    { label: "models", text: prompt.modelCompatibility.join(" "), weight: 10 },
  ];

  return createDocument({
    kind: "prompt",
    id: prompt.id,
    slug: prompt.slug,
    title: prompt.title,
    subtitle: prompt.purpose,
    description: prompt.description ?? prompt.purpose,
    tags: prompt.tags,
    weightedFields,
    updatedAtISO: prompt.updatedAtISO,
  });
}

function buildUpdateDocument(update: ModelUpdate): SearchDocument {
  const weightedFields: WeightedField[] = [
    { label: "title", text: update.headline, weight: 36 },
    { label: "subtitle", text: update.tldr, weight: 18 },
    { label: "description", text: update.context ?? "", weight: 12 },
    { label: "model", text: update.model, weight: 16 },
    ...update.tags.map((tag) => ({ label: "tag", text: tag, weight: 22 })),
    ...update.whatChanged.map((value) => ({ label: "change", text: value, weight: 12 })),
    ...update.whoItAffects.map((value) => ({ label: "impact", text: value, weight: 10 })),
    ...update.whatToDoNow.map((value) => ({ label: "action", text: value, weight: 10 })),
  ];

  return createDocument({
    kind: "update",
    id: update.id,
    slug: update.slug,
    title: update.headline,
    subtitle: update.tldr,
    description: update.context ?? update.tldr,
    tags: update.tags,
    weightedFields,
    updatedAtISO: update.updatedAtISO,
  });
}

function buildCollectionDocument(collection: Collection): SearchDocument {
  const weightedFields: WeightedField[] = [
    { label: "title", text: collection.title, weight: 36 },
    { label: "subtitle", text: collection.description, weight: 18 },
    { label: "description", text: collection.longDescription ?? "", weight: 12 },
    { label: "who-its-for", text: collection.whoItsFor ?? "", weight: 10 },
    { label: "how-to-use", text: collection.howToUse ?? "", weight: 10 },
    ...collection.tags.map((tag) => ({ label: "tag", text: tag, weight: 22 })),
  ];

  return createDocument({
    kind: "collection",
    id: collection.id,
    slug: collection.slug,
    title: collection.title,
    subtitle: collection.description,
    description: collection.longDescription ?? collection.description,
    tags: collection.tags,
    weightedFields,
    updatedAtISO: collection.updatedAtISO,
  });
}

function buildComparisonDocument(comparison: Comparison): SearchDocument {
  const weightedFields: WeightedField[] = [
    { label: "title", text: comparison.title, weight: 36 },
    { label: "subtitle", text: comparison.description, weight: 18 },
    { label: "decision-context", text: comparison.decisionContext ?? "", weight: 14 },
    { label: "tradeoffs", text: comparison.keyTradeoffs ?? "", weight: 14 },
    { label: "verdict", text: comparison.verdict, weight: 18 },
    ...comparison.tags.map((tag) => ({ label: "tag", text: tag, weight: 22 })),
    ...comparison.criteria.flatMap((criterion) => [
      { label: "criterion", text: criterion.name, weight: 16 },
      { label: "criterion-notes", text: criterion.notes, weight: 10 },
    ]),
  ];

  return createDocument({
    kind: "comparison",
    id: comparison.id,
    slug: comparison.slug,
    title: comparison.title,
    subtitle: comparison.description,
    description: comparison.verdict,
    tags: comparison.tags,
    weightedFields,
    updatedAtISO: comparison.updatedAtISO,
  });
}

function buildBestDocument(page: BestPage): SearchDocument {
  const weightedFields: WeightedField[] = [
    { label: "title", text: page.title, weight: 36 },
    { label: "subtitle", text: page.description, weight: 18 },
    { label: "keyword", text: page.primaryKeyword, weight: 18 },
    ...page.tags.map((tag) => ({ label: "tag", text: tag, weight: 22 })),
    ...page.intro.map((paragraph) => ({ label: "intro", text: paragraph, weight: 8 })),
    ...page.faqs.flatMap((faq) => [
      { label: "faq-question", text: faq.q, weight: 8 },
      { label: "faq-answer", text: faq.a, weight: 6 },
    ]),
  ];

  return createDocument({
    kind: "best",
    id: page.id,
    slug: page.slug,
    title: page.title,
    subtitle: page.description,
    description: page.intro[0] ?? page.description,
    tags: page.tags,
    weightedFields,
    updatedAtISO: page.updatedAtISO,
  });
}

function createDocument(input: {
  kind: UnifiedKind;
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  weightedFields: WeightedField[];
  updatedAtISO: string;
}): SearchDocument {
  const meta = TYPE_META[input.kind];
  const normalizedTitle = normalizeSearchText(input.title);
  const normalizedSubtitle = normalizeSearchText(input.subtitle);
  const normalizedDescription = normalizeSearchText(input.description);
  const normalizedTags = input.tags.map((tag) => normalizeSearchText(tag)).filter(Boolean);
  const normalizedAllText = uniqueStrings(
    input.weightedFields.map((field) => normalizeSearchText(field.text))
  ).join(" ");

  return {
    kind: input.kind,
    id: input.id,
    slug: input.slug,
    href: hrefFor(input.kind, input.slug),
    title: input.title,
    subtitle: input.subtitle,
    description: input.description,
    tags: input.tags,
    typeTag: meta.tag,
    typeLabel: meta.label,
    minutes: meta.minutes,
    updatedAtISO: input.updatedAtISO,
    weightedFields: input.weightedFields.map((field) => ({
      ...field,
      text: normalizeSearchText(field.text),
    })),
    normalizedTitle,
    normalizedSubtitle,
    normalizedDescription,
    normalizedTags,
    normalizedTagText: normalizedTags.join(" "),
    normalizedAllText,
  };
}

const SEARCH_DOCUMENTS: SearchDocument[] = [
  ...DATA.tools.map(buildToolDocument),
  ...DATA.prompts.map(buildPromptDocument),
  ...DATA.updates.map(buildUpdateDocument),
  ...DATA.collections.map(buildCollectionDocument),
  ...DATA.comparisons.map(buildComparisonDocument),
  ...DATA.bestPages.map(buildBestDocument),
];

export function getSearchDocuments() {
  return SEARCH_DOCUMENTS;
}

export function getFreshnessBucket(updatedAtISO: string): Exclude<SearchFreshness, "all"> {
  const ageMs = Date.now() - new Date(`${updatedAtISO}T00:00:00`).getTime();
  const ageDays = Math.max(0, Math.floor(ageMs / (1000 * 60 * 60 * 24)));

  if (ageDays <= 1) return "new";
  if (ageDays <= 7) return "week";
  if (ageDays <= 21) return "recent";
  return "evergreen";
}

export function matchesFreshnessFilter(updatedAtISO: string, freshness: SearchFreshness) {
  return freshness === "all" || getFreshnessBucket(updatedAtISO) === freshness;
}

export function scoreSearchDocument(document: SearchDocument, query: string): SearchMatch | null {
  const normalizedQuery = normalizeSearchText(query);
  const tokens = tokenizeSearchText(normalizedQuery);

  if (!tokens.length) return null;

  let score = 0;
  const matchedTokens = new Set<string>();
  const matchedTags = new Set<string>();

  if (document.normalizedTitle === normalizedQuery) {
    score += 220;
  } else if (document.normalizedTitle.startsWith(normalizedQuery)) {
    score += 110;
  }

  if (document.normalizedSubtitle.includes(normalizedQuery)) {
    score += 30;
  }

  if (document.normalizedDescription.includes(normalizedQuery)) {
    score += 20;
  }

  for (const tag of document.normalizedTags) {
    if (tag === normalizedQuery) {
      score += 120;
      matchedTags.add(tag);
    }
  }

  for (const token of tokens) {
    let tokenScore = 0;

    for (const field of document.weightedFields) {
      const fieldScore = scoreFieldMatch(field.text, token, field.weight);
      tokenScore += fieldScore;

      if (fieldScore > 0 && field.label === "tag") {
        matchedTags.add(field.text);
      }
    }

    if (tokenScore > 0) {
      matchedTokens.add(token);
      score += tokenScore;
    }
  }

  const tokenMatchRatio = matchedTokens.size / tokens.length;
  if (matchedTokens.size === tokens.length) {
    score += 40;
  } else if (tokenMatchRatio >= 0.6) {
    score += 12;
  }

  if (
    tokens.length > 1 &&
    document.normalizedTitle.includes(normalizedQuery)
  ) {
    score += 28;
  }

  if (
    tokens.length > 1 &&
    document.normalizedTagText.includes(normalizedQuery)
  ) {
    score += 18;
  }

  if (score <= 0) return null;

  return {
    item: document,
    score,
    matchedTokens: Array.from(matchedTokens),
    matchedTags: Array.from(matchedTags),
  };
}

export function filterAndSortSearchMatches(
  documents: SearchDocument[],
  options: {
    query: string;
    type: SearchContentType;
    freshness: SearchFreshness;
    tag: string;
    sort: SearchSort;
  }
) {
  const normalizedTag = normalizeSearchText(options.tag);
  const normalizedQuery = normalizeSearchText(options.query);

  let matches = documents
    .filter((document) => {
      const typeMatches = options.type === "all" || document.kind === options.type;
      const freshnessMatches = matchesFreshnessFilter(document.updatedAtISO, options.freshness);
      const tagMatches =
        !normalizedTag || normalizedTag === "all" || document.normalizedTags.includes(normalizedTag);

      return typeMatches && freshnessMatches && tagMatches;
    })
    .map((document) => {
      if (!normalizedQuery) {
        return {
          item: document,
          score: 0,
          matchedTokens: [] as string[],
          matchedTags: [] as string[],
        };
      }

      return scoreSearchDocument(document, normalizedQuery);
    })
    .filter((match): match is SearchMatch => Boolean(match));

  if (options.sort === "newest" || !normalizedQuery) {
    matches = matches.sort(
      (left, right) =>
        new Date(right.item.updatedAtISO).getTime() - new Date(left.item.updatedAtISO).getTime() ||
        left.item.title.localeCompare(right.item.title)
    );
  } else {
    matches = matches.sort(
      (left, right) =>
        right.score - left.score ||
        new Date(right.item.updatedAtISO).getTime() - new Date(left.item.updatedAtISO).getTime() ||
        left.item.title.localeCompare(right.item.title)
    );
  }

  return matches;
}

export function getPopularSearchTags(limit = 12) {
  const counts = new Map<string, number>();

  for (const document of SEARCH_DOCUMENTS) {
    for (const tag of document.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .slice(0, limit)
    .map(([tag, count]) => ({ tag, count }));
}

export function getContentTypeOptions() {
  return [
    { value: "all" as const, label: "All types" },
    { value: "tool" as const, label: "Tools" },
    { value: "prompt" as const, label: "Prompts" },
    { value: "update" as const, label: "Updates" },
    { value: "collection" as const, label: "Collections" },
    { value: "comparison" as const, label: "Comparisons" },
    { value: "best" as const, label: "Best lists" },
  ];
}

export function getFreshnessOptions() {
  return [
    { value: "all" as const, label: "All freshness" },
    { value: "new" as const, label: "New" },
    { value: "week" as const, label: "This week" },
    { value: "recent" as const, label: "Recent" },
    { value: "evergreen" as const, label: "Evergreen" },
  ];
}

export function getSortOptions() {
  return [
    { value: "relevance" as const, label: "Relevance" },
    { value: "newest" as const, label: "Newest" },
  ];
}
