// app/sitemap.ts
import type { MetadataRoute } from "next";
import { DATA } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
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
    priority: 0.7,
  }));

  const collections = DATA.collections.map((c) => ({
    url: absoluteUrl(`/collections/${c.slug}`),
    lastModified: new Date(c.updatedAtISO),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...collections, ...tools, ...prompts, ...updates];
}
