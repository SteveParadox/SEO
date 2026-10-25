import type { Prompt, Collection } from "@/lib/data-types";

/**
 * Editorial expansion: practical, reusable workflows with explicit limitations.
 * These entries are curated content, not generated from search queries or keyword lists.
 */
export const expandedPrompts: Prompt[] = [
  {
    id: "xp1001",
    slug: "seo-content-brief",
    title: "SEO Content Brief (Search Intent to Editorial Plan)",
    purpose: "Turn a topic into a useful, evidence-led brief before drafting.",
    description: "This workflow creates an editorial brief that connects the reader's actual task to a clear article structure. It separates verified facts from assumptions, identifies what original contribution the article can make, and gives writers a practical plan without treating keyword repetition as a strategy.",
    whenToUse: "Use before writing a guide, comparison, tutorial, or explainer. It is especially useful when several pages target related topics and the team needs to avoid cannibalization, shallow coverage, and duplicated sections.",
    decisionContext: "A brief is worth creating when the topic needs research, multiple sections, or coordination between writers and reviewers. For a short announcement or a simple factual update, a lightweight outline may be enough. Search volume alone is not evidence that a page deserves to exist.",
    howItWorks: "The model first defines the reader and their task, then lists the questions the page must answer, the evidence required, and the original value the article can add. It proposes a structure only after the purpose is clear. Unsupported claims and missing sources are called out rather than filled with invented details.",
    bestPractices: "Supply the intended audience, product context, primary sources, and competing pages you have actually reviewed. Ask for a source plan and verification checklist. Have an editor confirm the angle and factual claims before publication.",
    commonMistakes: "Do not treat suggested keywords as mandatory phrases, invent search-volume data, copy competitors' headings, or publish a brief as if its assumptions were verified research. Avoid making multiple near-identical pages for tiny keyword variations.",
    expectedOutput: "A brief containing audience, search task, page promise, scope boundaries, proposed title and H2 outline, questions to answer, primary-source requirements, internal-link opportunities, differentiating evidence, and a pre-publication verification checklist.",
    limitations: "A language model cannot reliably infer live search demand or verify a source it has not accessed. The brief is a planning artifact, not proof that the topic has traffic or that a page will rank.",
    technicalRequirements: "Works with GPT, Claude, Gemini, or another capable text model. Provide source URLs or excerpts when factual verification matters.",
    realWorldApplications: "Editorial teams use it to standardize briefs, solo publishers use it to reduce research drift, and product teams use it to plan documentation around real user problems.",
    successMetrics: "The writer can explain the page's unique purpose, every important claim has an evidence plan, the outline answers the reader's task, and the final page does not duplicate an existing URL.",
    relatedPrompts: "Pair with the source-grounded research brief and content quality audit prompts in this collection.",
    prompt: `Create an editorial SEO content brief for {TOPIC}.

Audience: {AUDIENCE}
Site or product context: {SITE_CONTEXT}
Reader's task: {READER_TASK}
Existing related URLs: {RELATED_URLS}
Available primary sources: {SOURCES}

Requirements:
- State the reader's problem and the page's specific promise.
- Distinguish verified facts, assumptions, and questions requiring research.
- Do not invent search volume, ranking difficulty, statistics, quotations, or source findings.
- Propose a useful outline based on reader needs, not copied competitor headings.
- Identify what original analysis, example, test, or decision aid could make the page valuable.
- Flag overlapping URLs and explain whether to update, combine, or create a page.
- Suggest relevant internal links only when the destination genuinely helps the reader.

Output:
1. Audience and intent
2. Page promise and scope exclusions
3. Proposed title and outline
4. Questions the article must answer
5. Evidence and source plan
6. Original contribution
7. Internal-link opportunities
8. Risks, unknowns, and pre-publication checklist

Topic: {TOPIC}`,
    variations: [
      "Create a short brief for a product comparison with an explicit evaluation methodology.",
      "Turn a verified support-ticket theme into a documentation brief.",
      "Audit a proposed brief for overlap with existing pages before drafting."
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["seo", "content-strategy", "editorial", "research"],
    updatedAtISO: "2026-10-25"
  },
  {
    id: "xp1002",
    slug: "source-grounded-research-brief",
    title: "Source-Grounded Research Brief (Claims, Evidence, Unknowns)",
    purpose: "Build a research trail that makes factual writing easier to verify.",
    description: "This prompt organizes research into claims, source evidence, dates, and unresolved questions. It prioritizes primary documentation and keeps a clear boundary between what a source states and what the writer infers.",
    whenToUse: "Use for product documentation, AI model updates, technical explainers, pricing changes, policy summaries, and any article where stale or misattributed information could mislead readers.",
    decisionContext: "Research depth should match the risk and volatility of the topic. A stable definition may need a small number of authoritative references; a current product comparison needs dated source checks for each changing feature or price.",
    howItWorks: "The model extracts individual claims, links each to a supplied source, records the source date where available, and labels gaps. It does not treat a search snippet, affiliate page, or unsourced summary as equivalent to an official announcement.",
    bestPractices: "Provide direct source URLs and relevant excerpts. Capture access dates for volatile details. Keep exact quotations short and attribute them. Verify important claims in the source itself rather than relying on a generated summary.",
    commonMistakes: "Never ask the model to fill missing citations, infer a launch date from rumors, or turn an unverified claim into confident prose. A source existing does not mean it supports every claim nearby.",
    expectedOutput: "A claim ledger with claim text, source, evidence excerpt or location, source type, date checked, confidence, caveats, and next verification step.",
    limitations: "The prompt cannot open inaccessible links or independently establish that a source is authentic. Human review remains necessary for material claims and changing facts.",
    technicalRequirements: "Supply source material directly if browsing is unavailable. For current information, use the official vendor documentation or announcement wherever possible.",
    realWorldApplications: "Useful for model-release notes, SaaS feature pages, technical tutorials, purchasing guides, and fact-checking existing content.",
    successMetrics: "Every material claim has a traceable basis, time-sensitive facts are dated, unknowns remain visible, and a reviewer can reproduce the verification quickly.",
    relatedPrompts: "Use before the tutorial writer or content quality audit.",
    prompt: `Create a source-grounded research ledger for {TOPIC}.

Sources supplied:
{SOURCES}

For each material claim, provide:
- Claim in plain language
- Supporting source and exact URL
- Short evidence excerpt or section reference, if supplied
- Source type: primary, secondary, or unverified
- Publication/update date and date checked, if known
- What the source does not establish
- Confidence: supported, partially supported, conflicting, or unverified
- Next verification step

Rules:
- Never invent URLs, quotations, dates, prices, statistics, or source contents.
- Prefer official documentation, release notes, standards, and first-party announcements.
- Keep facts separate from interpretation.
- Flag conflicting sources and stale information.
- If the supplied evidence is insufficient, write "not established by the available sources."

Topic: {TOPIC}`,
    variations: [
      "Build a price-and-feature verification table for a software comparison.",
      "Audit a release article for claims that lack primary-source evidence.",
      "Convert a research ledger into an editor-friendly fact-check checklist."
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["research", "fact-checking", "sources", "editorial"],
    updatedAtISO: "2026-10-25"
  },
  {
    id: "xp1003",
    slug: "helpful-tutorial-writer",
    title: "Helpful Tutorial Writer (Prerequisites, Steps, Verification)",
    purpose: "Create instructions readers can follow and verify without guesswork.",
    description: "This prompt builds tutorials around successful task completion. It includes prerequisites, explicit steps, expected outcomes, recovery paths, and a final verification stage so a guide is more than a wall of plausible instructions.",
    whenToUse: "Use for software setup, AI workflows, coding guides, tool onboarding, and troubleshooting articles where missing one step can derail the reader.",
    decisionContext: "A tutorial should match the reader's starting point and environment. If instructions differ across operating systems, versions, or plans, document those branches rather than pretending one sequence works for everyone.",
    howItWorks: "The prompt identifies prerequisites and version-sensitive details, sequences the task, defines observable success at checkpoints, and lists common failure modes. It asks for commands and configuration only when the necessary environment is specified.",
    bestPractices: "Test instructions in a clean environment. Include version numbers where they affect behavior. Use placeholders for secrets, explain where commands run, and never include real credentials.",
    commonMistakes: "Avoid skipping setup, assuming hidden state, presenting untested commands as guaranteed, or burying destructive steps. Explain backup and rollback requirements before commands that change data.",
    expectedOutput: "A tutorial with intended outcome, audience, prerequisites, estimated effort, numbered steps, expected results, troubleshooting, security notes, rollback guidance, and further reading.",
    limitations: "Generated instructions may still contain version-specific errors. Commands that affect production, credentials, billing, or data require review and testing before publication.",
    technicalRequirements: "Provide operating system, versions, package manager, permissions, and relevant constraints. Use placeholders such as YOUR_API_KEY instead of secrets.",
    realWorldApplications: "Developer documentation, SaaS onboarding, internal runbooks, classroom exercises, and customer support knowledge bases.",
    successMetrics: "A reader from the target audience can complete the task, verify the result, and recover from common errors without needing undocumented help.",
    relatedPrompts: "Use the research brief for claims and the content quality audit before publication.",
    prompt: `Write a task-completion tutorial for {TASK}.

Audience and experience: {AUDIENCE}
Environment and versions: {ENVIRONMENT}
Starting state: {STARTING_STATE}
Desired outcome: {OUTCOME}
Constraints: {CONSTRAINTS}

Include:
1. What the reader will achieve
2. Prerequisites, permissions, time, and backup requirements
3. Numbered steps with the location/context for each command
4. Expected output or observable checkpoint after important steps
5. Common errors and safe recovery steps
6. Security and privacy considerations
7. Verification that the task succeeded
8. Rollback or cleanup instructions when relevant
9. Further learning

Rules:
- Do not invent command output or claim an untested command was tested.
- Mark version-sensitive instructions.
- Use placeholders for credentials and explain how secrets should be stored.
- Warn before destructive or irreversible actions.
- If required environment details are missing, list assumptions instead of hiding them.

Task: {TASK}`,
    variations: [
      "Create a beginner quick-start and a separate advanced troubleshooting section.",
      "Review an existing tutorial for missing prerequisites and unverified commands.",
      "Add a safe rollback plan for a database or deployment procedure."
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["tutorial", "documentation", "developer", "how-to"],
    updatedAtISO: "2026-10-25"
  },
  {
    id: "xp1004",
    slug: "content-quality-and-originality-audit",
    title: "Content Quality Audit (Originality, Accuracy, Reader Value)",
    purpose: "Review a draft for usefulness and credibility before publishing.",
    description: "This audit checks whether a page actually solves a reader's problem, adds meaningful value, supports its claims, and avoids repetitive filler. It treats SEO metadata as supporting infrastructure, not a substitute for useful content.",
    whenToUse: "Use on existing pages, AI-assisted drafts, product descriptions, tutorials, and articles due for a substantive review.",
    decisionContext: "The right outcome may be improve, merge, redirect, noindex, or leave unchanged. Do not rewrite a page solely to make it longer or to change its date. Assess the page's purpose and evidence first.",
    howItWorks: "The audit scores reader-task completion, originality, accuracy, specificity, structure, sourcing, freshness, internal links, and page intent. Each finding includes evidence from the draft and a concrete recommended action.",
    bestPractices: "Supply the full draft, intended audience, page purpose, source list, and nearby pages. Ask reviewers to separate blocking factual issues from editorial improvements and optional polish.",
    commonMistakes: "Do not reward word count, keyword density, fake author credentials, invented testimonials, or generic FAQs. Do not mark a fact as wrong unless the evidence supports that finding.",
    expectedOutput: "A prioritized audit with strengths, critical factual gaps, thin or redundant sections, originality opportunities, structural issues, metadata suggestions, internal-link candidates, and a publish/revise/merge recommendation.",
    limitations: "A text-only audit cannot confirm real-world product experience, traffic performance, or whether a source is current unless supporting evidence is supplied.",
    technicalRequirements: "Provide the draft and relevant source material. Include analytics or Search Console evidence only if you want performance conclusions.",
    realWorldApplications: "Content operations, documentation maintenance, editorial QA, migration planning, and quality reviews for large content libraries.",
    successMetrics: "The revised page answers the intended question, has fewer unsupported claims, contributes something distinct, and gives readers a clear next step.",
    relatedPrompts: "Combine with the source-grounded research brief and SEO content brief.",
    prompt: `Audit this page for reader value and editorial quality.

Page URL or slug: {URL}
Intended reader and task: {AUDIENCE_AND_TASK}
Draft: {DRAFT}
Sources and related pages: {EVIDENCE_AND_RELATED_PAGES}

Evaluate:
- Does the page satisfy the stated reader task?
- What useful information or analysis is original to this page?
- Which claims need evidence, dates, caveats, or correction?
- Which sections are repetitive, vague, misleading, or unnecessary?
- Are examples specific enough to help someone act?
- Does the structure make the answer easy to find?
- Are internal links relevant and useful?
- Is the page materially stale, or is a date change unnecessary?
- Should the page be revised, merged, redirected, noindexed, or left alone?

For every finding include severity, evidence from the supplied draft, recommended change, and why it helps readers. Do not invent analytics, source checks, author credentials, reviews, or rankings.

Finish with a prioritized revision plan and a publish-readiness verdict.`,
    variations: [
      "Audit a batch of related URLs for overlap and consolidation opportunities.",
      "Review a tool listing for unsupported features, stale prices, and missing limitations.",
      "Run a pre-publication pass focused only on factual claims and sourcing."
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["seo", "content-audit", "quality", "editorial"],
    updatedAtISO: "2026-10-25"
  },
  {
    id: "xp1005",
    slug: "software-tool-evaluation-matrix",
    title: "Software Tool Evaluation Matrix (Transparent Trade-offs)",
    purpose: "Compare software using consistent criteria instead of vague winner claims.",
    description: "This prompt produces a decision matrix tailored to a real use case. It distinguishes verified capabilities from subjective judgments and makes trade-offs visible so readers can select a tool that fits their constraints.",
    whenToUse: "Use for AI tool comparisons, alternatives pages, procurement shortlists, and internal software selection.",
    decisionContext: "The best tool depends on workload, budget, privacy, integration needs, accessibility, and team experience. A universal winner is rarely meaningful without those constraints.",
    howItWorks: "The prompt defines weighted criteria before comparing candidates, records evidence for each score, and marks unknowns explicitly. It separates must-have requirements from preferences and ends with conditional recommendations.",
    bestPractices: "Use official pricing and feature pages, test the same workflow across products when possible, record the test date, and disclose affiliate relationships. If hands-on testing did not occur, do not imply that it did.",
    commonMistakes: "Avoid arbitrary scores, false precision, unverified feature claims, stale pricing, and rankings driven by commission rather than fit. Do not compare products using criteria that only one product can satisfy unless the distinction is relevant.",
    expectedOutput: "A comparison framework with use-case assumptions, criteria, evidence links, confidence labels, trade-offs, unknowns, and recommendations for distinct user profiles.",
    limitations: "Scores are only as reliable as the evidence and method. Vendor pages can omit limitations, and plan details may change.",
    technicalRequirements: "Provide candidate names, official URLs, target workload, budget, constraints, and any hands-on test results.",
    realWorldApplications: "Buyer guides, internal procurement, team tool selection, migration planning, and product comparison pages.",
    successMetrics: "A reader can understand why each candidate fits or fails their needs, reproduce the evaluation, and identify unresolved questions before committing.",
    relatedPrompts: "Pair with the source-grounded research brief and content quality audit.",
    prompt: `Build a fair evaluation matrix for {CATEGORY} tools.

Use case: {USE_CASE}
Candidates and official URLs: {CANDIDATES}
Budget and plan constraints: {BUDGET}
Privacy, security, and integration requirements: {CONSTRAINTS}
Evidence or test notes available: {EVIDENCE}

Process:
1. Define the intended user and realistic workload.
2. Separate must-have requirements from weighted preferences.
3. Propose criteria and explain why each matters before scoring.
4. Use supplied evidence for every factual claim and label unknowns.
5. Distinguish vendor-stated capabilities from hands-on test results.
6. Record source URLs and the date checked for volatile pricing/features.
7. Explain meaningful trade-offs and who should avoid each option.
8. Give conditional recommendations for different user profiles.

Never invent pricing, benchmarks, security certifications, user counts, or personal testing. Do not force a winner when evidence is insufficient. Disclose affiliate links if relevant.

Output: methodology, matrix, evidence ledger, candidate strengths and limitations, unknowns, conditional verdicts, and recheck schedule.`,
    variations: [
      "Focus on privacy, data retention, and enterprise administration.",
      "Compare free tiers for students and solo developers.",
      "Turn the matrix into a buyer guide with transparent methodology."
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["comparison", "software", "evaluation", "buying-guide"],
    updatedAtISO: "2026-10-25"
  },
  {
    id: "xp1006",
    slug: "technical-article-refresh",
    title: "Technical Article Refresh (Version-Aware Maintenance)",
    purpose: "Update technical content only where the evidence shows it needs changing.",
    description: "This workflow identifies stale commands, changed interfaces, deprecated behavior, and broken assumptions in technical articles. It preserves correct material and asks for verification rather than performing a cosmetic rewrite.",
    whenToUse: "Use for developer tutorials, API guides, software setup pages, AI tool documentation, and articles about rapidly changing products.",
    decisionContext: "Not every old page needs a full rewrite. Decide whether to make a narrow correction, add a version note, restructure the guide, or retire it based on actual changes and reader impact.",
    howItWorks: "The prompt maps each version-sensitive statement to a source or test, records what changed, and proposes the smallest accurate edit. It separates verified changes from checks that still need to be performed.",
    bestPractices: "Test code examples in the stated environment, capture the version used, preserve stable URLs, and explain breaking changes. Use meaningful revision dates only after substantive edits.",
    commonMistakes: "Do not update dates automatically, silently replace old behavior with new behavior, or claim code was tested when it was not. Do not remove context that remains useful for older supported versions.",
    expectedOutput: "A maintenance report with stale claims, evidence, affected versions, minimal edits, compatibility notes, test steps, and a recommendation for the revision date.",
    limitations: "Without access to current docs or a runnable environment, the model can only identify likely checks, not certify the article as current.",
    technicalRequirements: "Supply the current draft, target versions, official documentation, release notes, and test results where available.",
    realWorldApplications: "Docs teams, technical publishers, open-source maintainers, and SaaS knowledge bases.",
    successMetrics: "Instructions match stated versions, breaking changes are explicit, readers can choose the right path for their environment, and the revision log explains meaningful changes.",
    relatedPrompts: "Use with the helpful tutorial writer and content quality audit.",
    prompt: `Review this technical article for version-sensitive accuracy.

Article: {DRAFT}
Target versions and platforms: {VERSIONS}
Current official documentation and release notes: {SOURCES}
Available test results: {TEST_RESULTS}

Create a table with:
- Statement or instruction from the article
- Why it may be stale or risky
- Evidence and source URL
- Affected version/platform
- Status: verified current, verified stale, conflicting, or needs testing
- Smallest accurate change
- Test required before publication

Preserve correct sections. Identify deprecated APIs, changed UI labels, command differences, security implications, and migration requirements. Keep older-version instructions where they remain useful and label them clearly.

Do not claim to have run tests or opened sources unless that evidence is supplied. Do not change the update date until a substantive revision is completed.

Finish with a prioritized patch plan and unresolved checks.`,
    variations: [
      "Audit only code blocks and commands.",
      "Create a migration note for users moving between major versions.",
      "Prepare a change log entry that distinguishes tested fixes from documentation-only edits."
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["technical-writing", "maintenance", "documentation", "versions"],
    updatedAtISO: "2026-10-25"
  }
];

export const expandedCollections: Collection[] = [
  {
    id: "xc1001",
    slug: "responsible-seo-editorial-workflow",
    title: "Responsible SEO Editorial Workflow",
    description: "A repeatable workflow for planning, researching, drafting, and maintaining useful search content.",
    longDescription: "A practical editorial system that starts with a reader problem and ends with a verified, maintainable page. It favors evidence, clear purpose, original contribution, and useful internal navigation over content volume for its own sake.",
    whoItsFor: "Solo publishers, content strategists, technical writers, and small editorial teams that need consistent quality without turning publishing into paperwork.",
    howToUse: "Start with the content brief. Build a claim ledger before drafting. Use the quality audit before publication and revisit the article when its sources or product details change. Do not create a page unless it has a distinct job for the reader.",
    commonMistakes: "Publishing keyword variations as separate pages, treating generated outlines as research, using unsupported statistics, and changing dates without meaningful revisions.",
    successMetrics: "Every page has a defined audience and task, material claims are traceable, related pages link naturally, and outdated content has an explicit maintenance decision.",
    items: [
      { kind: "prompt", id: "xp1001" },
      { kind: "prompt", id: "xp1002" },
      { kind: "prompt", id: "xp1004" },
      { kind: "prompt", id: "xp1006" }
    ],
    tags: ["seo", "editorial", "content-quality", "research"],
    updatedAtISO: "2026-10-25"
  },
  {
    id: "xc1002",
    slug: "technical-documentation-that-works",
    title: "Technical Documentation That Works",
    description: "Tutorial and maintenance prompts for instructions people can follow, test, and recover from.",
    longDescription: "Documentation succeeds when readers can complete a task in a stated environment and recognize whether it worked. This collection emphasizes prerequisites, safe commands, visible checkpoints, version awareness, and honest limitations.",
    whoItsFor: "Developer advocates, engineering teams, educators, support writers, and maintainers of software documentation.",
    howToUse: "Use the tutorial prompt for new instructions, then use the refresh prompt when versions change. Run the content audit before release, and test all commands in a clean environment when possible.",
    commonMistakes: "Assuming environment details, omitting expected results, using real credentials in examples, and describing untested commands as verified.",
    successMetrics: "Readers complete the task with fewer support requests, error recovery is documented, and each guide states its tested or supported environment.",
    items: [
      { kind: "prompt", id: "xp1003" },
      { kind: "prompt", id: "xp1006" },
      { kind: "prompt", id: "xp1004" }
    ],
    tags: ["documentation", "tutorials", "developer", "maintenance"],
    updatedAtISO: "2026-10-25"
  },
  {
    id: "xc1003",
    slug: "software-buying-and-comparison-toolkit",
    title: "Software Buying and Comparison Toolkit",
    description: "Evaluate software options with transparent criteria, verified evidence, and honest trade-offs.",
    longDescription: "A buyer's guide is useful when it helps readers make a decision under real constraints. This collection separates vendor claims from tested behavior, exposes unknowns, and makes recommendations conditional on budget, privacy, workflow, and team needs.",
    whoItsFor: "Developers, creators, small businesses, procurement teams, and editorial teams maintaining software comparison pages.",
    howToUse: "Define the use case and must-haves first. Research claims from primary sources, score only what the evidence supports, and publish limitations and date-sensitive details alongside the verdict.",
    commonMistakes: "Inventing benchmarks, ranking products without a method, hiding unknowns, and allowing affiliate commissions to determine the recommendation.",
    successMetrics: "Readers can reproduce the comparison, see why a tool fits their situation, and identify what to verify before purchasing.",
    items: [
      { kind: "prompt", id: "xp1005" },
      { kind: "prompt", id: "xp1002" },
      { kind: "prompt", id: "xp1004" }
    ],
    tags: ["software", "comparison", "buyer-guide", "research"],
    updatedAtISO: "2026-10-25"
  }
];
