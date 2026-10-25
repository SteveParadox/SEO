import assert from "node:assert/strict";
import test from "node:test";
import { DATA, getToolBySlug, getUpdateBySlug } from "../lib/data";
import { absoluteUrl } from "../lib/seo";

test("all published content has unique IDs and slugs within its collection", () => {
  for (const [kind, items] of Object.entries(DATA)) {
    assert.equal(new Set(items.map((item) => item.id)).size, items.length, `duplicate ${kind} ID`);
    assert.equal(new Set(items.map((item) => item.slug.toLowerCase())).size, items.length, `duplicate ${kind} slug`);
  }
});

test("expanded editorial prompts are substantive and structurally complete", () => {
  const expectedSlugs = [
    "seo-content-brief",
    "source-grounded-research-brief",
    "helpful-tutorial-writer",
    "content-quality-and-originality-audit",
    "software-tool-evaluation-matrix",
    "technical-article-refresh",
  ];
  for (const slug of expectedSlugs) {
    const prompt = DATA.prompts.find((item) => item.slug === slug);
    assert.ok(prompt, `missing expanded prompt: ${slug}`);
    assert.ok(prompt.title.trim().length >= 12, `${slug}: title too short`);
    assert.ok(prompt.purpose.trim().length >= 20, `${slug}: purpose too short`);
    assert.ok(prompt.prompt.trim().length >= 500, `${slug}: prompt lacks operational detail`);
    assert.ok(prompt.variations.length >= 3, `${slug}: expected at least three useful variations`);
    assert.ok(prompt.tags.length >= 3, `${slug}: insufficient topical metadata`);
    assert.ok(prompt.limitations && prompt.limitations.length >= 40, `${slug}: limitations are missing`);
    assert.ok(prompt.successMetrics && prompt.successMetrics.length >= 40, `${slug}: success criteria are missing`);
    assert.match(prompt.updatedAtISO, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(Number.isFinite(Date.parse(prompt.updatedAtISO)), `${slug}: invalid update date`);
  }
});

test("expanded collections reference existing prompts and have distinct editorial purposes", () => {
  const expectedCollections = [
    "responsible-seo-editorial-workflow",
    "technical-documentation-that-works",
    "software-buying-and-comparison-toolkit",
  ];
  for (const slug of expectedCollections) {
    const collection = DATA.collections.find((item) => item.slug === slug);
    assert.ok(collection, `missing expanded collection: ${slug}`);
    assert.ok(collection.description.trim().length >= 40, `${slug}: description too short`);
    assert.ok(collection.longDescription && collection.longDescription.length >= 80, `${slug}: long description missing`);
    assert.ok(collection.howToUse && collection.howToUse.length >= 60, `${slug}: usage guidance missing`);
    assert.ok(collection.items.length >= 3, `${slug}: too few curated items`);
    for (const ref of collection.items) {
      assert.equal(ref.kind, "prompt", `${slug}: unexpected item kind`);
      assert.ok(DATA.prompts.some((prompt) => prompt.id === ref.id), `${slug}: unresolved prompt reference ${ref.id}`);
    }
  }
});

test("search-intent expansion is integrated across prompts, updates, and ranked guides", () => {
  for (const slug of ["keyword-research-and-search-intent-mapper", "free-seo-tools-workflow-builder", "ai-seo-content-brief-and-human-review", "seo-competitor-content-gap-audit"]) {
    const prompt = DATA.prompts.find((item) => item.slug === slug);
    assert.ok(prompt, `missing search-intent prompt: ${slug}`);
    assert.ok(prompt.prompt.length >= 500, `${slug}: prompt lacks operational detail`);
    assert.ok(prompt.variations.length >= 3, `${slug}: variations missing`);
    assert.ok(prompt.tags.includes("seo") || prompt.tags.some((tag) => tag.includes("seo")), `${slug}: SEO metadata missing`);
  }
  const update = DATA.updates.find((item) => item.slug === "google-ai-search-links-and-source-context-oct-2026");
  assert.ok(update, "missing sourced Google AI Search update");
  assert.ok(update.sources?.some((source) => source.url.includes("blog.google")));
  const bestPage = DATA.bestPages.find((item) => item.slug === "best-ai-tools-for-content-research");
  assert.ok(bestPage, "missing AI content research ranking guide");
  for (const pick of bestPage.picks) assert.ok(DATA.tools.some((tool) => tool.id === pick.toolId), `unresolved tool pick: ${pick.toolId}`);
});

test("search-intent content has valid dates, sourced claims, and complete ranked picks", () => {
  const addedPromptSlugs = [
    "keyword-research-and-search-intent-mapper",
    "free-seo-tools-workflow-builder",
    "ai-seo-content-brief-and-human-review",
    "seo-competitor-content-gap-audit",
  ];
  for (const slug of addedPromptSlugs) {
    const prompt = DATA.prompts.find((item) => item.slug === slug);
    assert.ok(prompt, `missing prompt: ${slug}`);
    assert.ok(prompt.description && prompt.description.length >= 80, `${slug}: description missing`);
    assert.ok(prompt.limitations && prompt.limitations.length >= 40, `${slug}: limitations missing`);
    assert.ok(prompt.successMetrics && prompt.successMetrics.length >= 40, `${slug}: success criteria missing`);
    assert.ok(prompt.prompt.includes("{"), `${slug}: expected explicit input placeholders`);
    assert.ok(prompt.variations.every((variation) => variation.trim().length >= 20), `${slug}: empty variation`);
    assert.match(prompt.updatedAtISO, /^\\d{4}-\\d{2}-\\d{2}$/);
    assert.equal(new Date(prompt.updatedAtISO).toISOString().slice(0, 10), prompt.updatedAtISO);
  }

  for (const slug of ["google-ai-search-links-and-source-context-oct-2026", "google-generative-ai-search-seo-guidance-may-2026"]) {
    const update = DATA.updates.find((item) => item.slug === slug);
    assert.ok(update, `missing update: ${slug}`);
    assert.ok(update.sources && update.sources.length > 0, `${slug}: source list missing`);
    assert.ok(Date.parse(update.announcedAtISO ?? "") <= Date.parse(update.publishedAtISO ?? ""), `${slug}: announcement date follows publication date`);
    for (const source of update.sources ?? []) {
      const url = new URL(source.url);
      assert.equal(url.protocol, "https:");
      assert.ok(["blog.google", "developers.google.com"].includes(url.hostname), `${slug}: unexpected source host ${url.hostname}`);
      assert.ok(source.label.trim());
    }
  }

  const page = DATA.bestPages.find((item) => item.slug === "best-ai-tools-for-content-research");
  assert.ok(page, "missing AI content research ranking guide");
  assert.ok(page.title.includes("Content Research"));
  assert.ok(page.description.length >= 80 && page.description.length <= 160);
  assert.ok(page.intro.length >= 3);
  assert.ok(page.picks.length >= 2);
  assert.ok(page.faqs.length >= 3);
  assert.equal(new Set(page.picks.map((pick) => pick.toolId)).size, page.picks.length, "ranked picks must not repeat tools");
  for (const pick of page.picks) {
    assert.ok(DATA.tools.some((tool) => tool.id === pick.toolId), `unresolved tool pick: ${pick.toolId}`);
    assert.ok(pick.why.trim().length >= 30);
    assert.ok(pick.bestFor.length > 0);
  }
  for (const faq of page.faqs) {
    assert.ok(faq.q.trim().endsWith("?"), "FAQ questions should be explicit questions");
    assert.ok(faq.a.trim().length >= 30, "FAQ answers should be useful, not filler");
  }
});

test("published recent updates have verifiable source URLs and real dates", () => {
  const recent = DATA.updates.filter((update) => update.publishedAtISO);
  assert.ok(recent.length >= 9);
  for (const update of recent) {
    assert.match(update.announcedAtISO ?? "", /^\d{4}-\d{2}-\d{2}$/);
    assert.match(update.publishedAtISO ?? "", /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(Date.parse(update.announcedAtISO!) <= Date.parse(update.publishedAtISO!));
    assert.ok(update.sources?.length);
    for (const source of update.sources ?? []) {
      assert.equal(new URL(source.url).protocol, "https:");
      assert.ok(source.label.trim());
    }
    assert.equal(getUpdateBySlug(update.slug)?.id, update.id);
  }
});

test("content lookup handles URL-encoded slugs and malformed escapes", () => {
  assert.equal(getToolBySlug("CURSOR")?.slug, "cursor");
  assert.equal(getToolBySlug("%63ursor")?.slug, "cursor");
  assert.equal(getUpdateBySlug("%"), undefined);
});

test("canonical URL builder uses the configured site origin", () => {
  const actual = absoluteUrl("/updates");
  assert.match(actual, /^https?:\/\/[^/]+\/updates$/);
  assert.ok(!actual.includes("undefined"));
});
