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
