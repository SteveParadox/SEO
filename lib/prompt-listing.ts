import type { Prompt } from "@/lib/data-types";

/**
 * Small, serializable listing records. Keep complete prompt bodies on server-rendered
 * detail pages instead of shipping the whole content catalog to directory visitors.
 */
export type PromptListing = Pick<
  Prompt,
  "id" | "slug" | "title" | "purpose" | "description" | "tags" | "modelCompatibility" | "updatedAtISO"
> & {
  variableCount: number;
  variationCount: number;
};

export function getPromptVariableCount(promptText: string): number {
  // The catalog uses {VARIABLE}, not only {{variable}} syntax.
  const placeholders = promptText.match(/\{[A-Z][A-Z0-9_]*\}/g) ?? [];
  return new Set(placeholders).size;
}

export function toPromptListing(prompt: Prompt): PromptListing {
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
