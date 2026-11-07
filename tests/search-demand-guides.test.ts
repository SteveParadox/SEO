import assert from "node:assert/strict";
import test from "node:test";
import { SEARCH_DEMAND_GUIDES, getSearchDemandGuide, getGuidesRelatedToUrl } from "../lib/content/search-demand-guides";
import { DATA } from "../lib/data";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/** npm test runs from the package root under tsx (CJS or ESM). */
function readRepoFile(relativePath: string) {
  return readFileSync(join(process.cwd(), relativePath), "utf8");
}

test("search-demand guides are original, complete and have unique URL slugs", () => {
  assert.ok(SEARCH_DEMAND_GUIDES.length >= 4);
  assert.equal(new Set(SEARCH_DEMAND_GUIDES.map((g) => g.id)).size, SEARCH_DEMAND_GUIDES.length);
  assert.equal(new Set(SEARCH_DEMAND_GUIDES.map((g) => g.slug)).size, SEARCH_DEMAND_GUIDES.length);
  assert.equal(new Set(SEARCH_DEMAND_GUIDES.map((g) => g.primaryQuery.trim().toLowerCase())).size, SEARCH_DEMAND_GUIDES.length, "duplicate primary search intents");
  for (const guide of SEARCH_DEMAND_GUIDES) {
    assert.match(guide.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.equal(getSearchDemandGuide(guide.slug)?.id, guide.id);
    assert.ok(guide.title.length >= 35);
    assert.ok(guide.description.length >= 100 && guide.description.length <= 160, guide.slug + ": meta description length");
    assert.ok(guide.answer.length > 110);
    assert.ok(guide.intro.length >= 2);
    assert.ok(guide.steps.length >= 4);
    assert.ok(guide.steps.every((step) => step.body.length >= 90 && step.example.length >= 50));
    assert.ok(guide.pitfalls.length >= 3 && guide.faqs.length >= 3);
    assert.ok(guide.faqs.every((faq) => faq.q.endsWith("?") && faq.a.length >= 70));
    assert.ok(guide.sources.length > 0 && guide.sources.every((source) => new URL(source.url).protocol === "https:"));
    assert.match(guide.updatedAtISO, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(new Date(guide.updatedAtISO).toISOString().slice(0, 10), guide.updatedAtISO);
    if (guide.publishedAtISO) {
      assert.match(guide.publishedAtISO, /^\d{4}-\d{2}-\d{2}$/);
      assert.equal(new Date(guide.publishedAtISO).toISOString().slice(0, 10), guide.publishedAtISO);
      assert.ok(guide.publishedAtISO <= guide.updatedAtISO, "publication must not follow revision");
    }
    for (const link of guide.relatedLinks) {
      assert.ok(link.href.startsWith("/"), "Only internal links are allowed");
      const parts = link.href.split("/").filter(Boolean);
      const pools: Record<string, readonly { slug: string }[]> = {
        prompts: DATA.prompts, tools: DATA.tools, best: DATA.bestPages,
        collections: DATA.collections, comparisons: DATA.comparisons,
      };
      assert.ok(pools[parts[0]]?.some((item) => item.slug === parts[1]), "Broken internal link: " + link.href);
    }
  }
});

// The root layout already wraps all page content in <main>. Nested main
// landmarks are invalid HTML and create confusing accessibility navigation.
test("guide routes never nest a second main landmark", () => {
  for (const path of ["app/guides/page.tsx", "app/guides/[slug]/page.tsx"]) {
    const source = readRepoFile(path);
    assert.doesNotMatch(source, /<main(?:\s|>)/, path + ": nested main landmark");
    assert.match(source, /<h1(?:\s|>)/, path + ": expected visible primary heading");
  }
});

test("guide articles avoid invented publication dates and retain canonical metadata", () => {
  const source = readRepoFile("app/guides/[slug]/page.tsx");
  assert.match(source, /guide\.publishedAtISO\s*\?/);
  assert.match(source, /dateModified:\s*guide\.updatedAtISO/);
  assert.doesNotMatch(source, /datePublished:\s*guide\.updatedAtISO/);
  assert.match(source, /alternates:\s*\{ canonical: url \}/);
});

test("guide index and detail pages are discoverable through sitemap", () => {
  const source = readRepoFile("app/sitemap.ts");
  assert.match(source, /absoluteUrl\("\/guides"\)/);
  assert.match(source, /SEARCH_DEMAND_GUIDES\.map/);
  assert.match(source, /\.\.\.guides,/);
});

// Cross-links need to work in both directions. Guide-only outbound links
// leave new routes isolated from established editorial entry points.
test("related rankings can link back to relevant how-to guides", () => {
  for (const href of [
    "/best/best-ai-tools-for-research",
    "/best/best-ai-tools-for-data-analysis",
    "/best/best-ai-tools-for-seo",
    "/best/best-ai-tools-for-design",
    "/best/best-ai-tools-for-social-media",
  ]) {
    const guides = getGuidesRelatedToUrl(href);
    assert.ok(guides.length >= 1, "missing contextual guide for " + href);
    assert.ok(guides.every((guide) => SEARCH_DEMAND_GUIDES.includes(guide)));
  }
  const source = readRepoFile("app/best/[slug]/page.tsx");
  assert.match(source, /getGuidesRelatedToUrl/);
  assert.match(source, /howToGuides\.map/);
});

test("guide previews opt out of indexing until a production release", () => {
  for (const path of ["app/guides/page.tsx", "app/guides/[slug]/page.tsx"]) {
    const source = readRepoFile(path);
    assert.match(source, /VERCEL_ENV/);
    assert.match(source, /NOINDEX_FOLLOW_ROBOTS/);
  }
});


test("guide copy must not promise complete fidelity or imply tested results", () => {
  for (const guide of SEARCH_DEMAND_GUIDES) {
    assert.doesNotMatch(guide.title, /without losing (?:any|important) details/i);
    assert.ok(guide.description.length >= 100 && guide.description.length <= 160);
  }
  const detail = readRepoFile("app/guides/[slug]/page.tsx");
  assert.doesNotMatch(detail, /guaranteed results|perfect accuracy|tested and verified/i);
  const index = readRepoFile("app/guides/page.tsx");
  assert.doesNotMatch(index, /guaranteed rankings|tested and verified/i);
});
