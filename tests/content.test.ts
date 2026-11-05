import assert from "node:assert/strict";
import test from "node:test";
import { DATA, getToolBySlug, getUpdateBySlug, getPromptBySlug } from "../lib/data";
import { absoluteUrl } from "../lib/seo";
import { buildUpdateArticleSchema, buildUpdateOpenGraphDates } from "../lib/update-article-seo";
import { serializeJsonLd } from "../components/json-ld";
import { PROMPT_TOPICS, getPromptTopic, promptsForTopic } from "../lib/prompt-topics";
import { getPromptVariableCount, toPromptListing } from "../lib/prompt-listing";

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
    assert.match(prompt.updatedAtISO, /^\d{4}-\d{2}-\d{2}$/);
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

test("OWASP 2026 GenAI security update is dated and linked to primary sources", () => {
  const update = DATA.updates.find((item) => item.slug === "owasp-genai-llm-top-10-2026-agent-control-standard");
  assert.ok(update, "missing OWASP GenAI security update");
  assert.equal(update.id, "u46");
  assert.equal(update.announcedAtISO, "2026-09-01");
  assert.equal(update.publishedAtISO, "2026-11-04");
  assert.ok(update.context.includes("Agent Control Standard"));
  assert.ok(update.context.includes("Top 10 for Agentic Applications"));
  assert.ok(update.whatToDoNow.some((step) => step.includes("do not describe a framework mapping as certification")));
  assert.deepEqual(
    update.sources?.map((source) => new URL(source.url).hostname),
    ["genai.owasp.org", "genai.owasp.org", "genai.owasp.org"]
  );
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


test("Article metadata uses website publication dates, not announcement dates", () => {
  const update = DATA.updates.find(
    (item) => item.slug === "owasp-genai-llm-top-10-2026-agent-control-standard"
  );
  assert.ok(update);

  const socialDates = buildUpdateOpenGraphDates(update);
  const schema = buildUpdateArticleSchema(update, absoluteUrl("/updates/" + update.slug));

  assert.equal(socialDates.publishedTime, update.publishedAtISO);
  assert.equal(schema.datePublished, update.publishedAtISO);
  assert.equal(schema.dateModified, update.updatedAtISO);
  assert.notEqual(schema.datePublished, update.announcedAtISO);

  const unpublished = { ...update, publishedAtISO: undefined };
  assert.equal("publishedTime" in buildUpdateOpenGraphDates(unpublished), false);
  assert.equal("datePublished" in buildUpdateArticleSchema(unpublished, "https://xavkit.com/example"), false);
});

test("JSON-LD escapes script closers without changing decoded content", () => {
  const data = {
    headline: '</script><script>alert("unsafe")</script>',
    description: 'Literal <, > and "quotes" should round-trip',
  };
  const encoded = serializeJsonLd(data);

  assert.ok(encoded.includes("\\u003c/script>"), "angle bracket must be escaped");
  assert.equal(encoded.includes("</script>"), false, "must not terminate the script element");
  assert.deepEqual(JSON.parse(encoded), data);
});

test("high-intent prompt pages have unique task-specific copy and indexable metadata inputs", () => {
  const slugs = [
    "ats-resume-optimizer",
    "tailored-cover-letter-generator",
    "resume-bullet-point-rewriter",
    "star-interview-answer-generator",
    "linkedin-headline-and-about-generator",
    "ai-image-prompt-generator",
    "excel-formula-generator",
    "google-sheets-data-cleaning-prompt",
    "youtube-seo-title-description-generator",
    "ecommerce-product-description-generator",
    "cold-email-outreach-generator",
    "landing-page-copywriter",
    "google-ads-copy-generator",
    "blog-post-outline-generator",
    "python-automation-script-prompt",
    "chatbot-system-prompt-generator",
    "anki-flashcard-generator-from-notes",
  ];
  const found = slugs.map((slug) => {
    const prompt = DATA.prompts.find((item) => item.slug === slug);
    assert.ok(prompt, `missing high-intent prompt: ${slug}`);
    assert.equal(getPromptBySlug(slug)?.id, prompt.id, `${slug}: slug lookup failed`);
    assert.ok(prompt.title.length >= 12, `${slug}: title too short`);
    assert.ok(prompt.description && prompt.description.length >= 80, `${slug}: thin page description`);
    assert.ok(prompt.prompt.length >= 500, `${slug}: prompt lacks operational detail`);
    assert.match(prompt.prompt, /\{[A-Z_]+\}/, `${slug}: missing input placeholders`);
    assert.ok(prompt.variations.length >= 3, `${slug}: too few variations`);
    assert.ok(prompt.variations.every((variation) => variation.length >= 20), `${slug}: vague variation`);
    assert.ok(prompt.tags.length >= 3, `${slug}: missing discovery tags`);
    assert.ok(prompt.limitations && prompt.limitations.length >= 40, `${slug}: missing limitations`);
    assert.ok(prompt.successMetrics && prompt.successMetrics.length >= 40, `${slug}: missing success guidance`);
    assert.ok(prompt.modelCompatibility.length > 0, `${slug}: missing model metadata`);
    assert.equal(prompt.updatedAtISO, "2026-11-05", `${slug}: incorrect content date`);
    return prompt;
  });
  assert.equal(found.length, 17);
  assert.equal(new Set(found.map((prompt) => prompt.id)).size, found.length);
  assert.equal(new Set(found.map((prompt) => prompt.title.toLowerCase())).size, found.length);
});


test("second high-intent expansion contains 30 unique, complete and useful searchable prompts", () => {
  const expansion = DATA.prompts.filter((item) => /^xp31\d{2}$/.test(item.id));
  assert.equal(expansion.length, 30, "all new prompt pages should be registered in DATA");
  assert.equal(new Set(expansion.map((item) => item.slug.toLowerCase())).size, 30, "all new slugs must be unique");
  assert.equal(new Set(expansion.map((item) => item.title.toLowerCase())).size, 30, "all new page titles must be unique");

  for (const category of ["career", "development", "spreadsheets", "seo", "copywriting", "education"]) {
    const entries = expansion.filter((item) => item.tags.includes(category));
    assert.equal(entries.length, 5, `${category} must include five distinct prompts`);
  }
  for (const item of expansion) {
    assert.equal(getPromptBySlug(item.slug)?.id, item.id, `${item.slug}: not accessible via slug lookup`);
    assert.ok(item.title.length >= 15, `${item.slug}: short title`);
    assert.ok(item.description && item.description.length >= 100, `${item.slug}: thin description`);
    assert.ok(item.whenToUse && item.whenToUse.length >= 90, `${item.slug}: thin use guidance`);
    assert.ok(item.howItWorks && item.howItWorks.length >= 120, `${item.slug}: missing task workflow`);
    assert.ok(item.prompt.length >= 900, `${item.slug}: prompt is too short`);
    assert.match(item.prompt, /\{[A-Z_]+\}/, `${item.slug}: no editable input fields`);
    assert.ok(item.variations.length >= 3, `${item.slug}: needs variations`);
    assert.ok(item.variations.every((variant) => variant.length >= 30), `${item.slug}: variation lacks detail`);
    assert.ok(item.tags.length >= 3, `${item.slug}: not discoverable by topic`);
    assert.ok(item.limitations && item.limitations.length >= 90, `${item.slug}: missing limitations`);
    assert.ok(item.successMetrics && item.successMetrics.length >= 90, `${item.slug}: missing success criteria`);
    assert.deepEqual(item.modelCompatibility, ["GPT", "Claude", "Gemini"]);
    assert.equal(item.updatedAtISO, "2026-11-05");
  }
});


test("prompt directory summaries exclude full templates and count real placeholders", () => {
  assert.equal(getPromptVariableCount("Topic: {TOPIC}, user: {USER}, repeated {TOPIC}"), 2);
  assert.equal(getPromptVariableCount("A plain prompt without variables"), 0);
  assert.equal(getPromptVariableCount("Use {{TOPIC}} and {USER_1}"), 2);

  const example = DATA.prompts[0];
  assert.ok(example, "expected prompt data");
  const summary = toPromptListing(example);
  assert.equal(summary.id, example.id);
  assert.equal(summary.slug, example.slug);
  assert.equal(summary.variationCount, example.variations.length);
  assert.equal(summary.variableCount, getPromptVariableCount(example.prompt));
  assert.equal(Object.hasOwn(summary, "prompt"), false, "do not serialize complete prompt to client");
  assert.equal(Object.hasOwn(summary, "bestPractices"), false, "do not serialize editorial body to client");
});

test("all editorial prompt topic hubs have unique purpose and populated crawlable listings", () => {
  assert.equal(PROMPT_TOPICS.length, 6);
  assert.equal(new Set(PROMPT_TOPICS.map((topic) => topic.slug)).size, PROMPT_TOPICS.length);
  assert.equal(new Set(PROMPT_TOPICS.map((topic) => topic.title)).size, PROMPT_TOPICS.length);

  for (const topic of PROMPT_TOPICS) {
    assert.equal(getPromptTopic(topic.slug)?.title, topic.title);
    assert.ok(topic.summary.length >= 70, topic.slug + ": missing search description");
    assert.equal(topic.intro.length, 2, topic.slug + ": needs unique editorial explanation");
    assert.ok(topic.intro.every((paragraph) => paragraph.length >= 180), topic.slug + ": thin editorial paragraphs");
    assert.equal(topic.whatYouWillFind.length, 3, topic.slug + ": missing use cases");
    assert.ok(topic.practicalAdvice.length >= 100, topic.slug + ": missing actionable guidance");

    const matched = promptsForTopic(topic, DATA.prompts);
    assert.ok(matched.length >= 5, topic.slug + ": needs at least five relevant prompts");
    assert.equal(new Set(matched.map((prompt) => prompt.slug)).size, matched.length);
    assert.ok(
      matched.every((prompt) =>
        prompt.tags.some((tag) => topic.tags.some((alias) => alias.toLowerCase() === tag.toLowerCase()))
      ),
      topic.slug + ": includes unrelated prompt"
    );
    assert.ok(
      matched.every((prompt) => DATA.prompts.some((entry) => entry.id === prompt.id)),
      topic.slug + ": unresolved prompt link"
    );
  }

  assert.equal(getPromptTopic("not-a-real-topic"), undefined);
});
