import type { ModelUpdate } from "./data-types";

// An announcement can precede publication. Never substitute its date for
// the date the article was actually published on this website.
export function buildUpdateOpenGraphDates(
  update: Pick<ModelUpdate, "publishedAtISO" | "updatedAtISO">
) {
  return {
    ...(update.publishedAtISO ? { publishedTime: update.publishedAtISO } : {}),
    ...(update.updatedAtISO ? { modifiedTime: update.updatedAtISO } : {}),
  };
}

export function buildUpdateArticleSchema(update: ModelUpdate, pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: update.headline,
    description: update.tldr,
    ...(update.publishedAtISO ? { datePublished: update.publishedAtISO } : {}),
    ...(update.updatedAtISO ? { dateModified: update.updatedAtISO } : {}),
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    publisher: { "@type": "Organization", name: "Xavkit" },
    keywords: update.tags.join(", "),
    about: { "@type": "Thing", name: update.model },
    inLanguage: "en",
  };
}
