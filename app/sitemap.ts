import type { MetadataRoute } from "next";
import { DATA, getAllTagsWithCounts, getLatestUpdatedForTag } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";
import { getAlternativePageStaticSlugs } from "@/lib/alternatives";
import { PROMPT_TOPICS } from "@/lib/prompt-topics";
import { SEARCH_DEMAND_GUIDES } from "@/lib/content/search-demand-guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/") },
    { url: absoluteUrl("/tools") },
    { url: absoluteUrl("/alternatives") },
    { url: absoluteUrl("/prompts") },
    { url: absoluteUrl("/prompts/topics") },
    { url: absoluteUrl("/guides") },
    { url: absoluteUrl("/ai-stack-builder") },
    { url: absoluteUrl("/compare-tools") },
    { url: absoluteUrl("/updates") },
    { url: absoluteUrl("/collections") },
    { url: absoluteUrl("/comparisons") },
    { url: absoluteUrl("/best") },
    { url: absoluteUrl("/tags") },
  ];

  const tools = DATA.tools.map((t) => ({
    url: absoluteUrl(`/tools/${t.slug}`),
    lastModified: new Date(t.updatedAtISO),
  }));

  const prompts = DATA.prompts.map((p) => ({
    url: absoluteUrl(`/prompts/${p.slug}`),
    lastModified: new Date(p.updatedAtISO),
  }));

  // Curated, crawlable topic hubs make important prompt families easy to discover.
  const promptTopics = PROMPT_TOPICS.map((topic) => ({
    url: absoluteUrl(`/prompts/topics/${topic.slug}`),
  }));

  const guides = SEARCH_DEMAND_GUIDES.map((guide) => ({
    url: absoluteUrl("/guides/" + guide.slug),
    lastModified: new Date(guide.updatedAtISO),
  }));

  const updates = DATA.updates.map((u) => ({
    url: absoluteUrl(`/updates/${u.slug}`),
    lastModified: new Date(u.updatedAtISO),
  }));

  const collections = DATA.collections.map((c) => ({
    url: absoluteUrl(`/collections/${c.slug}`),
    lastModified: new Date(c.updatedAtISO),
  }));

  const comparisons = DATA.comparisons.map((c) => ({
    url: absoluteUrl(`/comparisons/${c.slug}`),
    lastModified: new Date(c.updatedAtISO),
  }));

  const alternatives = getAlternativePageStaticSlugs().map((slug) => ({
    url: absoluteUrl(`/alternatives/${slug}`),
  }));

  const bestPages = DATA.bestPages.map((b) => ({
    url: absoluteUrl(`/best/${b.slug}`),
    lastModified: new Date(b.updatedAtISO),
  }));

  const tags = getAllTagsWithCounts()
    .filter(({ count }) => count >= 2)
    .map(({ tag }) => {
      const lastModified = getLatestUpdatedForTag(tag);
    const slug = encodeURIComponent(tag.trim().toLowerCase());
    return {
      url: absoluteUrl(`/tags/${slug}`),
      lastModified: lastModified ? new Date(lastModified) : undefined,
    };
    });

  return [
    ...staticPages,
    ...bestPages,
    ...collections,
    ...comparisons,
    ...alternatives,
    ...tools,
    ...prompts,
    ...promptTopics,
    ...guides,
    ...updates,
    ...tags,
  ];
}
