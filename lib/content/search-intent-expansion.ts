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
    description: "Groups related queries by intent and page purpose, then checks them against business priorities, existing URLs, and available keyword evidence.",
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
    prompt: `Act as an SEO analyst. Build a keyword and search-intent map for {SITE_OR_TOPIC}.

Target audience and geography: {AUDIENCE_AND_REGION}
Business or site goal: {BUSINESS_GOAL}
Seed topics and keyword export: {KEYWORD_DATA}
Existing URLs and page titles: {EXISTING_URLS}
Competitor pages actually reviewed: {REVIEWED_COMPETITORS}
Available performance data: {SEARCH_CONSOLE_DATA}

For each cluster:
- Group equivalent queries without merging terms that serve different intents.
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
    purpose: "Build an SEO workflow around free tools, their limits, and the tasks they can support.",
    description: "Maps technical checks, keyword discovery, performance monitoring, and content decisions to free or free-tier tools. It records data limits and the conditions that would justify paying for a tool.",
    whenToUse: "Use when starting SEO on a small site, working with a limited budget, teaching SEO basics, or deciding whether a paid subscription solves a real problem.",
    decisionContext: "Free tiers change, and some products restrict history, exports, tracked keywords, or crawl size. Check each vendor’s current plan before describing a feature as free.",
    howItWorks: "The prompt maps each SEO task to an appropriate tool category, defines the input and expected output, and specifies a manual fallback where available. It separates first-party performance data from third-party estimates.",
    bestPractices: "Start with Search Console and analytics access where appropriate, verify the site's ownership, and document tool limits. Use official product pages for current pricing and feature claims.",
    commonMistakes: "Do not describe a trial as a permanent free plan, present third-party estimates as Google measurements, or recommend a paid suite without identifying the task it would solve.",
    expectedOutput: "A workflow table with task, tool, cost tier, setup, steps, output, limitation, validation method, and upgrade trigger.",
    limitations: "Free-plan availability and quotas change. Tool recommendations must be rechecked against current official plan pages before publication.",
    technicalRequirements: "Provide site size, CMS, technical access, geography, budget, and which SEO tasks matter most.",
    realWorldApplications: "Small-business SEO, creator sites, early-stage products, student projects, and agency onboarding.",
    successMetrics: "Every step works with the stated access level, each tool has a defined job, and upgrade decisions cite a specific limit or unmet requirement.",
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
    purpose: "Plan AI-assisted content that answers a specific reader question and passes editorial review.",
    description: "Produces an intent-led brief with a distinct reader benefit, primary-source requirements, original contribution, and explicit editorial checks. It is designed to prevent keyword stuffing and scaled low-value content.",
    whenToUse: "Use before drafting tutorials, software explainers, AI tool guides, product comparisons, and pages that depend on changing product features or prices.",
    decisionContext: "AI can help organize research and draft structure. It cannot supply first-hand experience or verify claims by itself. Google's guidance emphasizes helpful content and established SEO practices.",
    howItWorks: "The prompt defines the user's task, reviews existing pages, proposes evidence requirements, and asks for original examples or analysis before suggesting an outline. It adds fact-check and editorial approval gates.",
    bestPractices: "Provide first-party documentation, tested examples, the site's existing content, and the reviewer responsible for approval. Mark untested claims and disclose AI use when it is relevant to readers.",
    commonMistakes: "Do not generate hundreds of city or keyword variants, fabricate expert experience, claim hands-on tests that did not happen, or publish unsupported comparisons.",
    expectedOutput: "A concise brief, source ledger, outline, originality plan, internal-link suggestions, reviewer checklist, and explicit go/no-go conditions.",
    limitations: "The prompt cannot guarantee rankings or validate evidence it cannot access. Human fact-checking and editorial judgment remain required.",
    technicalRequirements: "Supply the topic, audience, existing URLs, authoritative source links, and any original tests or examples available.",
    realWorldApplications: "Editorial teams, SaaS blogs, developer documentation, AI-tool directories, and small businesses producing search-focused resources.",
    successMetrics: "The article answers a real task, contains verified claims and a distinct contribution, and passes a human review before publication.",
    relatedPrompts: "Combine with the research brief that requires source checks and the content quality audit.",
    prompt: `Create a human-reviewed SEO content brief for {TOPIC}.

Audience and intended task: {AUDIENCE_AND_TASK}
Site expertise and product context: {SITE_CONTEXT}
Existing pages that may overlap: {EXISTING_URLS}
Primary sources and evidence: {SOURCES}
Original experience, data, or examples available: {ORIGINAL_INPUTS}

Deliver:
- The reader’s problem and the question the page will answer.
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
    purpose: "Find content gaps worth addressing without copying competitors.",
    description: "Audits a supplied set of competitor URLs and existing site pages to identify unanswered questions, missing evidence, weak task coverage, and realistic opportunities for original content.",
    whenToUse: "Use before launching a content cluster, refreshing pages that lost relevance, or deciding whether a competitor topic is worth covering.",
    decisionContext: "A competitor ranking for a query does not prove that your site should create the same page. The opportunity depends on audience fit, existing coverage, and whether you can add original evidence, analysis, or a better answer.",
    howItWorks: "It compares page purpose, audience, supporting evidence, examples, structure, freshness, and actionable next steps. It separates page observations from assumptions about traffic or rankings.",
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
- Readability, accessibility, freshness, and actionable next steps
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
    id: "u50",
    slug: "google-ai-search-links-and-source-context-oct-2026",
    model: "Google Search",
    headline: "Google changes how links appear in AI Mode and AI Overviews",
    announcedAtISO: "2026-10-15",
    publishedAtISO: "2026-10-25",
    updatedAtISO: "2026-10-25",
    tldr: "Google announced changes to inline links and source context in AI Mode and AI Overviews on October 15, 2026.",
    description: "Summary of Google's October 15, 2026 announcement about links and context in AI search.",
    context: "The announcement describes more prominent inline links, extra context around selected sources, and additional ways to discover pages from AI Mode and AI Overviews. It is a change to the search interface; the announcement does not report traffic results for individual sites.",
    why: "Review whether important pages answer the query, support factual claims, and make source links easy to follow. Track referral and search performance after the interface change; do not assume it will increase traffic.",
    whatChanged: [
      "Google announced updates that make inline links in AI responses easier to discover.",
      "The announcement describes additional context for selected source links.",
      "Google continues to adjust how people explore websites from AI search experiences."
    ],
    whoItAffects: ["Website owners and publishers", "SEO and content teams", "People researching through Google AI search"],
    whatToDoNow: [
      "Read the official announcement and check the current availability for your market.",
      "Check that key pages answer the query, cite evidence for factual claims, and help readers find related material.",
      "Compare Search Console and analytics data before and after rollout, accounting for seasonality and other changes."
    ],
    limitations: "The announcement does not report ranking changes or traffic impact for individual sites. Features and availability may differ by market and rollout stage.",
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
  },
  {
    id: "u51",
    slug: "google-generative-ai-search-seo-guidance-may-2026",
    model: "Google Search Central",
    headline: "Google publishes guidance for visibility in generative AI search",
    announcedAtISO: "2026-05-15",
    publishedAtISO: "2026-05-15",
    updatedAtISO: "2026-10-25",
    tldr: "Google says standard SEO practices remain relevant to AI Overviews and AI Mode. Its guidance does not require special schema just for these features.",
    description: "Summary of Google's guidance for websites appearing in AI Overviews and AI Mode.",
    context: "Google Search Central published a guide for website owners, SEOs, and developers on generative AI features in Search. The guidance emphasizes technical eligibility, crawlability, internal linking, accessible text, accurate structured data, and content that offers value beyond common knowledge. It says there are no additional technical requirements or special schema markup just for AI Overviews or AI Mode.",
    why: "The guidance does not describe a separate set of ranking tricks for AI search. Check crawlability, indexing, internal links, and page quality, then measure performance in Search Console. Inclusion in AI responses is not guaranteed.",
    whatChanged: [
      "Google published a dedicated guide to generative AI features in Search.",
      "The guide reiterates that core SEO practices remain foundational.",
      "Google cautions against treating special AI files or schema as a requirement for appearing in AI search."
    ],
    whoItAffects: ["SEO practitioners", "Publishers and content teams", "Web developers and site owners"],
    whatToDoNow: [
      "Check crawlability, indexing eligibility, internal links, and whether important information is available as text.",
      "Add first-hand examples or supporting evidence where available; do not publish pages that only rephrase existing search results.",
      "Use Search Console to monitor performance and validate technical issues."
    ],
    limitations: "Eligibility does not guarantee crawling, indexing, ranking, or inclusion in an AI-generated response. This summary reflects Google's published guidance and should not be interpreted as a ranking guarantee.",
    sources: [
      {
        label: "Google Search Central announcement, May 15, 2026",
        url: "https://developers.google.com/search/blog/2026/05/a-new-resource-for-optimizing"
      },
      {
        label: "Google Search Central: AI features and your website",
        url: "https://developers.google.com/search/docs/appearance/ai-features"
      }
    ],
    tags: ["google-search", "ai-search", "seo", "content-quality"],
    updatedAtISO: "2026-10-25"
  }
];

export const searchIntentBestPages: BestPage[] = [
  {
    id: "b30",
    slug: "best-ai-tools-for-content-research",
    title: "Best AI Tools for Content Research (2026)",
    description: "Compare tools for research, team documentation, and copy editing, including where each fits and where it falls short.",
    primaryKeyword: "best AI tools for content research",
    intro: [
      "Content research is not the same as asking a chatbot to write an article. A reliable workflow needs source discovery, claim verification, outlining, collaboration, and a final human review. The right tool depends on which of those tasks currently slows you down.",
      "Perplexity is suited to source discovery, Notion AI to organizing work in a shared workspace, and Grammarly to editing a draft. None replaces checking the original sources.",
      "Selection note: this is a use-case shortlist based on each product’s described role and fit with the workflows above, not a controlled hands-on benchmark or a claim that one tool wins every task. Verify current features and pricing on vendor sites, and test candidates with the same research task before purchasing.",
      "The picks are organized by workflow fit: source discovery, team organization, and editorial polish. This guide does not score keyword volume, backlink metrics, or SERP performance, so use dedicated SEO data tools when those measurements are part of the decision.",
      "Check current plan limits and pricing on each vendor’s site. Before paying, test the candidates against the same research brief and compare source quality, editing time, and team fit."
    ],
    picks: [
      {
        toolId: "t2",
        badge: "Best Overall",
        why: "Helps researchers explore a topic and find source links to check before drafting.",
        bestFor: ["Early research and question discovery", "Building a list of sources to verify", "Comparing viewpoints before drafting"],
        watchOutFor: ["Open and verify cited sources directly", "Do not assume a generated summary captures every caveat"]
      },
      {
        toolId: "t3",
        badge: "Best for Teams",
        why: "Fits teams that already keep briefs, notes, editorial tasks, and drafts in Notion.",
        bestFor: ["Organizing research notes", "Collaborative briefs and drafts", "Turning meeting notes into editorial tasks"],
        watchOutFor: ["Workspace AI access and limits vary by plan", "Keep source links attached to factual claims"]
      },
      {
        toolId: "t25",
        why: "Helps catch grammar, wording, and tone issues after the facts and citations have been checked.",
        bestFor: ["Copy editing and clarity", "Tone consistency", "Polishing a reviewed draft"],
        watchOutFor: ["Writing suggestions do not fact-check claims", "Keep citations and evidence attached to factual statements"]
      }
    ],
    faqs: [
      { q: "Can AI tools do SEO keyword research by themselves?", a: "They can help organize ideas and classify intent, but current search demand should be validated with keyword data, Search Console, Google Trends, or another source that exposes the relevant metrics." },
      { q: "Should I publish AI-written articles without editing?", a: "No. Check factual claims against original sources, add first-hand examples or analysis where possible, remove sections that repeat existing pages, and make sure the article answers the query." },
      { q: "Are these tools all free?", a: "No universal free-status claim is made here. Plans and limits change, so check each vendor's current official pricing and feature pages." },
      { q: "What is the best workflow for research-heavy SEO content?", a: "Use a research tool to find candidate sources, check each important claim against the originals, organize the evidence in a brief, draft to answer the query, and have an editor review the finished page." }
    ],
    updatedAtISO: "2026-10-25",
    tags: ["ai-tools", "content-research", "writing", "seo", "research"]
  }
];
