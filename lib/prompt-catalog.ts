import type { Prompt } from "@/lib/data-types";

/**
 * Safe, compact listing data. Full prompt bodies remain on server-rendered detail pages,
 * rather than being shipped in the browser bundle for every catalog visitor.
 */
export type PromptCatalogItem = Pick<
  Prompt,
  "id" | "slug" | "title" | "purpose" | "description" | "tags" | "modelCompatibility" | "updatedAtISO"
> & {
  variableCount: number;
  variationCount: number;
};

export function getPromptVariableCount(prompt: string): number {
  const variables = new Set<string>();
  const pattern = /\{\{\s*([\w.-]+)\s*\}\}|\{([A-Z][A-Z0-9_]*)\}/g;
  for (const match of prompt.matchAll(pattern)) {
    variables.add((match[1] ?? match[2]).toLowerCase());
  }
  return variables.size;
}

export function toPromptCatalogItem(prompt: Prompt): PromptCatalogItem {
  return {
    id: prompt.id,
    slug: prompt.slug,
    title: prompt.title,
    purpose: prompt.purpose,
    description: prompt.description,
    tags: prompt.tags,
    modelCompatibility: prompt.modelCompatibility,
    updatedAtISO: prompt.updatedAtISO,
    variableCount: getPromptVariableCount(prompt.prompt),
    variationCount: prompt.variations.length,
  };
}
