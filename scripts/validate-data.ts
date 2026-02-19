/**
 * Build-time data validation script
 * Run this before deployment to catch data issues early
 * Usage: tsx scripts/validate-data.ts
 */

import { DATA } from "@/lib/data";

interface ValidationError {
  type: string;
  item: string;
  message: string;
}

const errors: ValidationError[] = [];

function validateItem(item: any, kind: string, requiredFields: string[]) {
  const id = item.id || item.slug || "unknown";
  for (const field of requiredFields) {
    if (!item[field]) {
      errors.push({
        type: kind,
        item: `${kind}:${id}`,
        message: `Missing required field: ${field}`,
      });
    }
  }
}

// Validate tools
console.log("Validating tools...");
DATA.tools.forEach((t) => {
  validateItem(t, "tool", ["id", "slug", "name", "oneLiner", "description", "pricing", "useCases", "pros", "cons"]);
  if (t.useCases.length === 0) {
    errors.push({ type: "tool", item: `tool:${t.id}`, message: "useCases array is empty" });
  }
});

// Validate prompts
console.log("Validating prompts...");
DATA.prompts.forEach((p) => {
  validateItem(p, "prompt", ["id", "slug", "title", "purpose", "prompt", "variations", "modelCompatibility"]);
  if (!p.prompt || p.prompt.trim().length < 10) {
    errors.push({ type: "prompt", item: `prompt:${p.id}`, message: "Prompt text is empty or too short" });
  }
});

// Validate updates
console.log("Validating updates...");
DATA.updates.forEach((u) => {
  validateItem(u, "update", ["id", "slug", "model", "headline", "whatChanged", "whoItAffects", "whatToDoNow"]);
  if (!Array.isArray(u.whatChanged) || u.whatChanged.length === 0) {
    errors.push({ type: "update", item: `update:${u.id}`, message: "whatChanged must be a non-empty array" });
  }
});

// Validate collections
console.log("Validating collections...");
DATA.collections.forEach((c) => {
  validateItem(c, "collection", ["id", "slug", "title", "description", "items"]);
  if (!Array.isArray(c.items) || c.items.length === 0) {
    errors.push({ type: "collection", item: `collection:${c.id}`, message: "Collection has no items" });
  }
  // Verify items exist
  c.items.forEach((item) => {
    const found = DATA[`${item.kind}s` as "tools" | "prompts" | "updates"]?.find((x: any) => x.id === item.id);
    if (!found) {
      errors.push({
        type: "collection",
        item: `collection:${c.id}`,
        message: `Referenced ${item.kind}:${item.id} not found in DATA`,
      });
    }
  });
});

// Validate comparisons
console.log("Validating comparisons...");
DATA.comparisons.forEach((c) => {
  validateItem(c, "comparison", ["id", "slug", "title", "description", "contenders", "criteria", "verdict"]);
  if (!Array.isArray(c.contenders) || c.contenders.length < 2) {
    errors.push({ type: "comparison", item: `comparison:${c.id}`, message: "Comparison must have at least 2 contenders" });
  }
  // Verify contenders exist
  c.contenders.forEach((item) => {
    const found = DATA[`${item.kind}s` as "tools" | "prompts"]?.find((x: any) => x.id === item.id);
    if (!found) {
      errors.push({
        type: "comparison",
        item: `comparison:${c.id}`,
        message: `Referenced ${item.kind}:${item.id} not found in DATA`,
      });
    }
  });
});

// Check for slug collisions
console.log("Checking for slug collisions...");
const slugs = new Map<string, string>();
const allItems = [
  ...DATA.tools.map((t) => ({ slug: t.slug, type: "tool", id: t.id })),
  ...DATA.prompts.map((p) => ({ slug: p.slug, type: "prompt", id: p.id })),
  ...DATA.updates.map((u) => ({ slug: u.slug, type: "update", id: u.id })),
  ...DATA.collections.map((c) => ({ slug: c.slug, type: "collection", id: c.id })),
  ...DATA.comparisons.map((c) => ({ slug: c.slug, type: "comparison", id: c.id })),
];

allItems.forEach(({ slug, type, id }) => {
  const key = slug.toLowerCase();
  if (slugs.has(key)) {
    errors.push({
      type: "general",
      item: "slug-collision",
      message: `Slug collision: "${slug}" used in both ${slugs.get(key)} and ${type}:${id}`,
    });
  } else {
    slugs.set(key, `${type}:${id}`);
  }
});

// Report results
console.log("\n=== Data Validation Results ===\n");
if (errors.length === 0) {
  console.log("✅ All data validation checks passed!");
  process.exit(0);
} else {
  console.error(`❌ Found ${errors.length} validation error(s):\n`);
  errors.forEach(({ type, item, message }) => {
    console.error(`  [${type.toUpperCase()}] ${item}: ${message}`);
  });
  process.exit(1);
}
