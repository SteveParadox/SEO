// app/sitemap.ts
import type { MetadataRoute } from "next";
import { DATA, getAllTagsWithCounts } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // -------------------------
  // Static / index pages
  // -------------------------
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "daily", priority: 1 },

    { url: absoluteUrl("/tools"), lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: absoluteUrl("/prompts"), lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: absoluteUrl("/updates"), lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: absoluteUrl("/collections"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/comparisons"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },

    // Money pages
    { url: absoluteUrl("/best"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },

    // Tags index
    { url: absoluteUrl("/tags"), lastModified: now, changeFrequency: "weekly", priority: 0.6 },
  ];

  // -------------------------
  // Dynamic content pages
  // -------------------------
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

  const bestPages = DATA.bestPages.map((b) => ({
    url: absoluteUrl(`/best/${b.slug}`),
    lastModified: new Date(b.updatedAtISO),
    changeFrequency: "weekly" as const,
    priority: 0.95,
  }));

  // -------------------------
  // Tag pages (critical)
  // -------------------------
  const tags = getAllTagsWithCounts().map(({ tag }) => ({
    url: absoluteUrl(`/tags/${encodeURIComponent(tag)}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...bestPages,
    ...collections,
    ...comparisons,
    ...tools,
    ...prompts,
    ...updates,
    ...tags,
  ];
}
