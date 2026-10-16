import type { MetadataRoute } from "next";
import { DATA, getAllTagsWithCounts, getLatestUpdatedForTag } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";
import { getAlternativePageStaticSlugs } from "@/lib/alternatives";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "daily", priority: 1 },

    { url: absoluteUrl("/tools"), changeFrequency: "daily", priority: 0.9 },
    { url: absoluteUrl("/alternatives"), changeFrequency: "weekly", priority: 0.88 },
    { url: absoluteUrl("/prompts"), changeFrequency: "daily", priority: 0.8 },
    { url: absoluteUrl("/ai-stack-builder"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/compare-tools"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/updates"), changeFrequency: "daily", priority: 0.7 },
    { url: absoluteUrl("/collections"), changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/comparisons"), changeFrequency: "weekly", priority: 0.7 },

    { url: absoluteUrl("/best"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/tags"), changeFrequency: "weekly", priority: 0.6 },
  ];

  const tools = DATA.tools.map((t) => ({
    url: absoluteUrl(`/tools/${t.slug}`),
    lastModified: new Date(t.updatedAtISO),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const prompts = DATA.prompts.map((p) => ({
    url: absoluteUrl(`/prompts/${p.slug}`),
    lastModified: new Date(p.updatedAtISO),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const updates = DATA.updates.map((u) => ({
    url: absoluteUrl(`/updates/${u.slug}`),
    lastModified: new Date(u.updatedAtISO),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const collections = DATA.collections.map((c) => ({
    url: absoluteUrl(`/collections/${c.slug}`),
    lastModified: new Date(c.updatedAtISO),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const comparisons = DATA.comparisons.map((c) => ({
    url: absoluteUrl(`/comparisons/${c.slug}`),
    lastModified: new Date(c.updatedAtISO),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const alternatives = getAlternativePageStaticSlugs().map((slug) => {
    const tool = DATA.tools.find((entry) => entry.slug === slug);

    return {
      url: absoluteUrl(`/alternatives/${slug}`),
      lastModified: tool ? new Date(tool.updatedAtISO) : undefined,
      changeFrequency: "weekly" as const,
      priority: 0.82,
    };
  });

  const bestPages = DATA.bestPages.map((b) => ({
    url: absoluteUrl(`/best/${b.slug}`),
    lastModified: new Date(b.updatedAtISO),
    changeFrequency: "weekly" as const,
    priority: 0.95,
  }));

  // Tags: await + normalize to lowercase for consistency
  const tagRows = await getAllTagsWithCounts();
  const tags = tagRows
    .filter(({ count }) => count >= 2)
    .map(({ tag }) => {
      const lastModified = getLatestUpdatedForTag(tag);
    const slug = encodeURIComponent(tag.trim().toLowerCase());
    return {
      url: absoluteUrl(`/tags/${slug}`),
      lastModified: lastModified ? new Date(lastModified) : undefined,
      changeFrequency: "weekly" as const,
      priority: 0.6,
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
    ...updates,
    ...tags,
  ];
}
