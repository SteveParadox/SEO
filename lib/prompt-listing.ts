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
  // Support {VARIABLE} and {{variable.name}} formats without mistaking
  // arbitrary JSON punctuation for editable prompt inputs.
  const matches = promptText.matchAll(/\{\{\s*([\w.-]+)\s*\}\}|\{([A-Z][A-Z0-9_]*)\}/g);
  return new Set(Array.from(matches, (match) => (match[1] ?? match[2]).toUpperCase())).size;
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
