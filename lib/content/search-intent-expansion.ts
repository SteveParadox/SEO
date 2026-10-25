import type { Prompt, ModelUpdate } from "@/lib/data-types";
import type { BestPage } from "@/lib/content/best-pages";

/**
 * Search-intent-led additions based on recurring SEO and AI-tool discovery themes.
 * These are editorial starting points, not claims of exact keyword volume.
 */
export const searchIntentPrompts: Prompt[] = [
  {
    id: "xp2001",
    slug: "keyword-research-and-search-intent-mapper",
    title: "SEO Keyword Research and Search Intent Mapper",
    purpose: "Turn seed topics and verified keyword data into a focused content plan.",
    description: "A practical keyword research workflow that groups related queries by intent, page type, business relevance, and evidence quality instead of treating every phrase as a separate article opportunity.",
    whenToUse: "Use when planning a new site section, building a topical cluster, refreshing a content calendar, or deciding which query deserves a guide, comparison, landing page, or no new page at all.",
    decisionContext: "This prompt organizes keyword evidence supplied by the user. It does not have inherent access to live search volume, keyword difficulty, or SERP results. Validate candidates in Google Search Console, Google Trends, Bing Webmaster Tools, or a keyword platform before committing resources.",
    howItWorks: "It normalizes seed terms, groups close variants, identifies informational, commercial, transactional, and navigational intent, then maps clusters to existing URLs or proposed pages. It flags cannibalization risk and separates observed data from hypotheses.",
    bestPractices: "Provide country, language, audience, site purpose, existing URLs, and exported keyword data with its source and date. Include impressions, clicks, CTR, and average position where available. Prioritize reader need and business fit alongside demand.",
    commonMistakes: "Do not invent search volumes, difficulty scores, trend direction, or ranking positions. Do not create separate pages for every synonym or chase high-volume topics unrelated to the site.",
    expectedOutput: "A prioritized keyword map with intent, funnel stage, evidence source, target URL, page format, internal-link role, overlap risks, confidence, and next validation step.",
    limitations: "Recommendations are only as reliable as the supplied data and SERP observations. Keyword tools use estimates, and search demand differs by country, season, device, and query wording.",
    technicalRequirements: "Supply seed topics, target geography, audience, current sitemap or URL list, and a dated export from a keyword or webmaster tool.",
    realWorldApplications: "Editorial planning, content-cluster design, site migrations, product-led SEO, and prioritizing pages from Search Console opportunities.",
    successMetrics: "Every proposed page has a distinct purpose, existing URLs are considered first, priority decisions are traceable to evidence, and the plan avoids unnecessary near-duplicate pages.",
    relatedPrompts: "Use with the SEO content brief, content quality audit, and technical article refresh prompts.",
    prompt: `Act as an evidence-led SEO strategist. Build a keyword and search-intent map for {SITE_OR_TOPIC}.

Target audience and geography: {AUDIENCE_AND_REGION}
Business or site goal: {BUSINESS_GOAL}
Seed topics and keyword export: {KEYWORD_DATA}
Existing URLs and page titles: {EXISTING_URLS}
Competitor pages actually reviewed: {REVIEWED_COMPETITORS}
Available performance data: {SEARCH_CONSOLE_DATA}

For each cluster:
- Group genuinely equivalent queries without collapsing different intents.
- Label intent as informational, commercial investigation, transactional, or navigational; explain ambiguous cases.
- Record the evidence source and date for any supplied volume, trend, difficulty, impression, click, or ranking metric.
- Recommend an existing URL to improve, a new page to consider, a merge, or no action.
- Suggest a page format and the specific question it must answer.
- Identify internal links, likely overlap with other URLs, and missing evidence.
- Prioritize using business relevance, reader value, evidence confidence, and effort, not volume alone.

Never fabricate search metrics, competitor findings, ranking forecasts, or SERP observations. Mark missing data as unknown and list the validation step required. End with a short, prioritized 30-day content plan.

Site/topic: {SITE_OR_TOPIC}`,
    variations: [
      "Use Search Console queries with high impressions and low CTR to identify title and intent mismatches.",
      "Map a new topic cluster while checking every proposed page against the current sitemap.",
      "Create separate keyword maps for Nigeria and a global English-speaking audience without assuming demand is identical."
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["seo", "keyword-research", "search-intent", "content-strategy"],
    updatedAtISO: "2026-10-25"
  },
  {
    id: "xp2002",
    slug: "free-seo-tools-workflow-builder",
    title: "Free SEO Tools Workflow Builder",
    purpose: "Design a useful SEO workflow around free tools and known limits.",
    description: "Creates a step-by-step workflow for technical checks, keyword discovery, performance monitoring, and content decisions using free or free-tier tools, with clear notes about data limits and when a paid tool may be justified.",
    whenToUse: "Use when starting SEO on a small site, working with a limited budget, teaching SEO basics, or deciding whether a paid subscription solves a real problem.",
    decisionContext: "Free tiers change, and some products restrict history, exports, tracked keywords, or crawl size. The workflow must verify current plan details instead of promising that every feature is free.",
    howItWorks: "The prompt maps each SEO task to an appropriate tool category, defines the input and expected output, and specifies a manual fallback where available. It separates first-party performance data from third-party estimates.",
    bestPractices: "Start with Search Console and analytics access where appropriate, verify the site's ownership, and document tool limits. Use official product pages for current pricing and feature claims.",
    commonMistakes: "Do not label a limited trial as permanently free, confuse estimated third-party metrics with Google data, or recommend buying a suite before the workflow has a clear requirement.",
    expectedOutput: "A workflow table with task, tool, cost tier, setup, steps, output, limitation, validation method, and upgrade trigger.",
    limitations: "Free-plan availability and quotas change. Tool recommendations must be rechecked against current official plan pages before publication.",
    technicalRequirements: "Provide site size, CMS, technical access, geography, budget, and which SEO tasks matter most.",
    realWorldApplications: "Small-business SEO, creator sites, early-stage products, student projects, and agency onboarding.",
    successMetrics: "The workflow can be followed without undocumented paid features, each tool has a clear purpose, and upgrade decisions are tied to a measurable limitation.",
    relatedPrompts: "Pair with the SEO content brief and technical SEO audit checklist.",
    prompt: `Build a realistic SEO workflow using free and free-tier tools for {WEBSITE_TYPE}.

Website and CMS: {SITE_AND_CMS}
Approximate page count: {SITE_SIZE}
Target market: {TARGET_MARKET}
Available access: {ACCESS}
Monthly budget: {BUDGET}
Main objective: {OBJECTIVE}

Cover these tasks where relevant:
1. Indexing and search performance monitoring
2. Keyword and question discovery
3. Technical crawling and broken-link checks
4. On-page content review
5. Competitor and SERP research
6. Local SEO or ecommerce checks, if applicable
7. Reporting and prioritization

For every recommendation state the tool, official URL, free/free-tier/paid status as verified from supplied evidence, setup steps, expected output, important limits, and a manual fallback. Distinguish first-party measurements from estimates. Do not invent current pricing, quotas, or included features; mark them for verification if current official evidence is missing.

Finish with a minimum viable weekly routine, a monthly review, and explicit criteria for when a paid tool becomes worth evaluating.

Website: {WEBSITE_TYPE}`,
    variations: [
      "Create a beginner workflow for a small WordPress site with no SEO budget.",
      "Build a technical SEO routine for a developer maintaining a documentation site.",
      "Compare the free-tier limits of candidate tools using only current official pricing pages supplied."
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["seo-tools", "free-tools", "technical-seo", "workflow"],
    updatedAtISO: "2026-10-25"
  },
  {
    id: "xp2003",
    slug: "ai-seo-content-brief-and-human-review",
    title: "AI SEO Content Brief with Human Review Gates",
    purpose: "Plan useful AI-assisted content without publishing generic, unverified pages.",
    description: "Produces an intent-led brief with a distinct reader benefit, primary-source requirements, original contribution, and explicit editorial checks. It is designed to prevent keyword stuffing and scaled low-value content.",
    whenToUse: "Use before drafting tutorials, software explainers, AI tool guides, product comparisons, and pages that depend on changing product features or prices.",
    decisionContext: "AI can help with research organization and structure, but publishing many lightly edited pages is not a substitute for expertise. Google's published guidance emphasizes accuracy, relevance, originality, and people-first value.",
    howItWorks: "The prompt defines the user's task, reviews existing pages, proposes evidence requirements, and asks for original examples or analysis before suggesting an outline. It adds fact-check and editorial approval gates.",
    bestPractices: "Provide first-party documentation, tested examples, the site's existing content, and the reviewer responsible for approval. Mark untested claims and disclose AI use when it is relevant to readers.",
    commonMistakes: "Do not generate hundreds of city or keyword variants, fabricate expert experience, claim hands-on tests that did not happen, or publish unsupported comparisons.",
    expectedOutput: "A concise brief, source ledger, outline, originality plan, internal-link suggestions, reviewer checklist, and explicit go/no-go conditions.",
    limitations: "The prompt cannot guarantee rankings or validate evidence it cannot access. Human fact-checking and editorial judgment remain required.",
    technicalRequirements: "Supply the topic, audience, existing URLs, authoritative source links, and any original tests or examples available.",
    realWorldApplications: "Editorial teams, SaaS blogs, developer documentation, AI-tool directories, and small businesses producing search-focused resources.",
    successMetrics: "The article answers a real task, contains verified claims and a distinct contribution, and passes a human review before publication.",
    relatedPrompts: "Combine with the source-grounded research brief and content quality audit.",
    prompt: `Create a human-reviewed SEO content brief for {TOPIC}.

Audience and intended task: {AUDIENCE_AND_TASK}
Site expertise and product context: {SITE_CONTEXT}
Existing pages that may overlap: {EXISTING_URLS}
Primary sources and evidence: {SOURCES}
Original experience, data, or examples available: {ORIGINAL_INPUTS}

Deliver:
- The exact reader problem and a clear page promise.
- Search intent and the evidence that supports this interpretation.
- A proposed title, outline, and concise answer to the core question.
- Claims requiring first-party sources, testing, dates, or caveats.
- A concrete original contribution that cannot be produced by merely paraphrasing competing pages.
- Internal links to relevant existing pages, with a reason for each.
- A review checklist for factual accuracy, accessibility, product claims, and helpfulness.
- A decision: draft, research more, update an existing URL, merge, or do not publish.

Rules:
- Never invent keyword metrics, expert credentials, product tests, quotations, sources, or user testimonials.
- Do not create pages solely for near-identical keyword variations.
- Treat model output as a draft and mark every unresolved claim.
- Do not claim that structured data, keyword repetition, or a special AI file guarantees inclusion in AI search results.
- Optimize for the reader's task first.

Topic: {TOPIC}`,
    variations: [
      "Adapt the brief for a software comparison with dated feature and pricing evidence.",
      "Use the brief to improve an existing article rather than creating a competing URL.",
      "Add an editorial review gate for AI-assisted tutorials that include commands or code."
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["ai-seo", "content-writing", "helpful-content", "editorial-quality"],
    updatedAtISO: "2026-10-25"
  },
  {
    id: "xp2004",
    slug: "seo-competitor-content-gap-audit",
    title: "SEO Competitor Content Gap and Differentiation Audit",
    purpose: "Find meaningful gaps without copying competing pages.",
    description: "Audits a supplied set of competitor URLs and existing site pages to identify unanswered questions, missing evidence, weak task coverage, and realistic opportunities for original content.",
    whenToUse: "Use before launching a content cluster, refreshing pages that lost relevance, or deciding whether a competitor topic is worth covering.",
    decisionContext: "A competitor ranking for a query does not prove that your site should create the same page. The opportunity depends on audience fit, existing coverage, evidence, and whether you can add something useful.",
    howItWorks: "It compares page purpose, audience, evidence, examples, structure, freshness, and next-step usefulness. It reports observed differences separately from assumptions about traffic or ranking.",
    bestPractices: "Supply URLs or page text actually reviewed and include your own pages. Record review dates for changing subjects and validate demand separately.",
    commonMistakes: "Do not copy competitor wording, assume a page's traffic from its ranking alone, or describe a missing section as a proven ranking opportunity without evidence.",
    expectedOutput: "A gap matrix, existing-URL mapping, original-angle options, source needs, consolidation recommendations, and a prioritized test plan.",
    limitations: "The audit cannot infer competitor analytics or hidden search metrics from page content. It requires actual page evidence and external demand validation.",
    technicalRequirements: "Provide competitor URLs or excerpts, your sitemap, audience, market, and any search performance exports.",
    realWorldApplications: "Content strategy, topical coverage, documentation audits, competitive research, and post-migration planning.",
    successMetrics: "Every recommended page fills a documented gap, overlaps are handled explicitly, and recommendations distinguish evidence from hypotheses.",
    relatedPrompts: "Use with the keyword research mapper and SEO content brief.",
    prompt: `Run a competitor content-gap audit for {SITE_OR_TOPIC}.

Target audience and market: {AUDIENCE_AND_MARKET}
Our existing URLs and page summaries: {OUR_CONTENT}
Competitor pages actually reviewed: {COMPETITOR_EVIDENCE}
Available search performance data: {PERFORMANCE_DATA}

Compare:
- Reader task and search intent
- Questions answered and questions left unresolved
- Evidence quality, original examples, and first-party experience
- Clarity, accessibility, freshness, and practical next steps
- Claims that need independent verification
- Overlap with our existing pages and consolidation options

For each gap, state the exact evidence observed, likely user benefit, original angle we could credibly contribute, source or test needed, and a confidence level. Separate content observations from assumptions about traffic or rankings. Do not invent competitor metrics, keyword volume, or page performance.

Conclude with a prioritized list of update/create/merge/no-action decisions and the evidence needed before investing.

Site/topic: {SITE_OR_TOPIC}`,
    variations: [
      "Audit three competitor pages and one existing URL for cannibalization and missing evidence.",
      "Identify ways to improve a page using original testing rather than copying headings.",
      "Build a gap matrix for a technical documentation section with version-sensitive content."
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["competitor-analysis", "content-gap", "seo", "content-audit"],
    updatedAtISO: "2026-10-25"
  }
];

export const searchIntentUpdates: ModelUpdate[] = [
  {
    id: "u45",
    slug: "google-ai-search-links-and-source-context-oct-2026",
    model: "Google Search",
    headline: "Google updates AI Mode and AI Overviews with clearer source links",
    announcedAtISO: "2026-10-15",
    publishedAtISO: "2026-10-25",
    updatedAtISO: "2026-10-25",
    tldr: "Google announced changes to inline links and source context in AI Mode and AI Overviews, making it more important for publishers to provide useful, trustworthy pages worth visiting.",
    description: "A source-grounded summary of Google's October 15, 2026 announcement about links and context in AI search experiences.",
    context: "Google's announcement describes more prominent inline links, clearer context around sources, and additional ways to discover relevant pages in AI Mode and AI Overviews. These are product changes, not a promise that any particular page will be cited or receive more traffic.",
    why: "Publishers should make their pages genuinely useful, easy to navigate, and supported by evidence. A change to search presentation is a reason to monitor referral and search performance, not to chase speculative AI-search hacks.",
    whatChanged: [
      "Google announced updates that make inline links in AI responses easier to discover.",
      "The announcement describes clearer context for selected source links.",
      "Google continues to adjust how people explore websites from AI search experiences."
    ],
    whoItAffects: ["Website owners and publishers", "SEO and content teams", "People researching through Google AI search"],
    whatToDoNow: [
      "Read the official announcement and check the current availability for your market.",
      "Review important pages for clear answers, source quality, useful navigation, and original value.",
      "Monitor Search Console and analytics over time instead of assuming the interface change guarantees traffic gains."
    ],
    limitations: "This update summarizes Google's published announcement. It does not establish ranking changes, guaranteed citations, or traffic impact for an individual site. Availability and search presentation can vary.",
    sources: [
      {
        label: "Google official announcement, October 15, 2026",
        url: "https://blog.google/products-and-platforms/products/search/updates-ai-mode-overviews-explore-web/"
      },
      {
        label: "Google Search Central: AI features and your website",
        url: "https://developers.google.com/search/docs/appearance/ai-features"
      }
    ],
    tags: ["google-search", "ai-search", "seo", "publishers"],
    updatedAtISO: "2026-10-25"
  }
];

export const searchIntentBestPages: BestPage[] = [
  {
    id: "b9",
    slug: "best-ai-tools-for-content-research",
    title: "Best AI Tools for Content Research (2026)",
    description: "Compare AI research and writing-workflow tools for source discovery, outlining, collaboration, and content review, with practical limitations.",
    primaryKeyword: "best AI tools for content research",
    intro: [
      "Content research is not the same as asking a chatbot to write an article. A reliable workflow needs source discovery, claim verification, outlining, collaboration, and a final human review. The right tool depends on which of those tasks currently slows you down.",
      "This shortlist focuses on complementary roles rather than pretending one product is the best at everything. Research assistants can help discover starting points, workspace tools can organize briefs, and coding assistants can help maintain content systems or automate repeatable technical tasks. None removes the need to check original sources.",
      "Features, pricing, and usage limits change. Treat the picks as starting points, confirm current plan details on official product pages, and test the same task before committing to a paid subscription."
    ],
    picks: [
      {
        toolId: "t2",
        badge: "Best Overall",
        why: "A practical starting point for exploring a topic and discovering sources to inspect.",
        bestFor: ["Early research and question discovery", "Building a list of sources to verify", "Comparing viewpoints before drafting"],
        watchOutFor: ["Open and verify cited sources directly", "Do not assume a generated summary captures every caveat"]
      },
      {
        toolId: "t3",
        badge: "Best for Teams",
        why: "Useful when briefs, shared notes, editorial tasks, and drafts already live in a shared workspace.",
        bestFor: ["Organizing research notes", "Collaborative briefs and drafts", "Turning meeting notes into editorial tasks"],
        watchOutFor: ["Workspace AI access and limits vary by plan", "Keep source links attached to factual claims"]
      },
      {
        toolId: "t1",
        badge: "Best for Pros",
        why: "A code-oriented option for teams that also maintain content-heavy websites, documentation, or SEO automation.",
        bestFor: ["Maintaining content tooling and scripts", "Reviewing code for content pipelines", "Working on a site's technical implementation"],
        watchOutFor: ["Not a replacement for dedicated keyword data", "Review generated code and protect credentials"]
      }
    ],
    faqs: [
      { q: "Can AI tools do SEO keyword research by themselves?", a: "They can help organize ideas and classify intent, but current search demand should be validated with keyword data, Search Console, Google Trends, or another source that exposes the relevant metrics." },
      { q: "Should I publish AI-written articles without editing?", a: "No. Verify material claims, add useful original experience or analysis, remove generic filler, and ensure the article actually solves the reader's problem." },
      { q: "Are these tools all free?", a: "No universal free-status claim is made here. Plans and limits change, so check each vendor's current official pricing and feature pages." },
      { q: "What is the best workflow for research-heavy SEO content?", a: "Use a research tool to find leads, verify claims against primary sources, organize the evidence in a brief, draft for a clear reader task, then complete a human fact-check and quality audit." }
    ],
    updatedAtISO: "2026-10-25",
    tags: ["ai-tools", "content-research", "writing", "seo", "research"]
  }
];
