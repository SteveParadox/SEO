import assert from "node:assert/strict";
import test from "node:test";
import { SEARCH_DEMAND_GUIDES, getSearchDemandGuide } from "../lib/content/search-demand-guides";
import { DATA } from "../lib/data";

test("search-demand guides are original, complete and have unique URL slugs", () => {
  assert.equal(SEARCH_DEMAND_GUIDES.length, 4);
  assert.equal(new Set(SEARCH_DEMAND_GUIDES.map((g) => g.id)).size, SEARCH_DEMAND_GUIDES.length);
  assert.equal(new Set(SEARCH_DEMAND_GUIDES.map((g) => g.slug)).size, SEARCH_DEMAND_GUIDES.length);
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
