// lib/content/prompts.ts
import type { Prompt } from "@/lib/data-types";

export const prompts: Prompt[] = [
  {
    id: "p1",
    slug: "explain-like-tutor",
    title: "Explain Like a Patient Tutor (Step-by-step + Quiz)",
    purpose:
      "Turn confusing topics into something you can explain back clearly, under pressure.",
    description: "This prompt transforms complex subjects into digestible learning experiences by combining structured explanation with active recall testing. It works by breaking down abstract concepts into concrete steps, then reinforcing understanding through analogies, examples, and immediate practice questions. The format mirrors how effective tutors teach: explain clearly, demonstrate practically, then verify comprehension.",
    whenToUse: "Use this when preparing for exams, learning new technical concepts, onboarding to unfamiliar domains, or when you need to understand something well enough to teach it to others. Particularly effective for topics with clear logical progression or cause-and-effect relationships.",
    howItWorks: "The prompt enforces clarity through word limits and jargon restrictions, ensuring explanations remain accessible. The structured five-part output creates a complete learning loop: understanding (explanation), connection (analogy), application (examples), and verification (quiz with answers). Each component serves a specific cognitive function in building durable knowledge.",
    bestPractices: "Replace {TOPIC} with specific, focused subjects rather than broad domains. For example, use 'how JWT tokens expire and refresh' instead of 'authentication'. More specific topics yield more actionable explanations. If the AI asks a clarifying question, answer it to get precisely tailored content. Review the quiz before checking answers to maximize learning impact.",
    commonMistakes: "Avoid overly broad topics that span multiple concepts. Don't skip the quiz section thinking you understand after reading the explanation—active recall is where learning solidifies. Resist the urge to make topics more complex than necessary; simpler framings often produce clearer explanations.",
    expectedOutput: "You'll receive a complete learning package under 350 words: a step-by-step explanation in plain language, a brief analogy that makes the concept relatable, two labeled examples showing the concept in practice, five quiz questions testing different aspects of understanding, and a complete answer key with explanations.",
    limitations: "The 350-word constraint means extremely complex topics may need to be split into multiple sessions. Highly visual concepts may not translate perfectly to text-only explanations. The quiz assesses comprehension but not deep mastery—use this as a starting point, not a complete learning solution.",
    technicalRequirements: "Works with all major language models. Claude and GPT-4 tend to produce more natural analogies. Gemini often generates more diverse example scenarios. No special formatting or plugins required.",
    realWorldApplications: "Students use this for exam preparation across STEM subjects. Developers use it to understand new frameworks, APIs, or architectural patterns. Product managers use it to grasp technical concepts they need to communicate to stakeholders. Teachers use it to generate lesson structures for complex topics.",
    successMetrics: "Effective use means you can answer the quiz questions without looking at the key, then explain the topic to someone else in your own words. If you can do both, the prompt succeeded. If you need to re-read the explanation multiple times, consider breaking the topic into smaller pieces.",
    relatedPrompts: "Pairs well with the 7-Day Study Plan for longer learning journeys. Combine with Rewrite for Clarity if you need to simplify the output further. Use before Interview Prep Coach to build foundational knowledge for technical interviews.",
    prompt: `You are a patient tutor.
Teach {TOPIC} step-by-step in plain language.

Rules:
- If {TOPIC} is vague, ask 1 clarifying question first. Otherwise proceed.
- Keep it under 350 words total.
- Avoid jargon. If you must use a term, define it in 8 words or less.

Output format:
1) Simple explanation (steps)
2) Tiny analogy (1–2 sentences)
3) Two examples (labeled Example A and Example B)
4) Mini-quiz (5 questions)
5) Answer key

Topic: {TOPIC}`,
    variations: [
      "Add a tiny ASCII diagram in section 1.",
      "Explain for a 12-year-old, then for an adult (same structure).",
      "Only output the mini-quiz + answer key.",
      "Make the examples exam-style (short, tricky, realistic).",
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["study", "learning"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "p2",
    slug: "bug-hunter",
    title: "Bug Hunter (Ranked Causes + Minimal Fixes)",
    purpose: "Debug code without random guessing disguised as confidence.",
    description: "This prompt approaches debugging systematically by ranking likely causes and proposing minimal, targeted fixes. Unlike generic debugging advice, it demands precision: exact line numbers, quoted code sections, and changes that address the specific error without unnecessary refactoring. The output provides both immediate fixes and optional improvements, clearly separated.",
    whenToUse: "Deploy this when facing cryptic error messages, unexpected behavior in working code, performance issues with unclear origins, or when you've tried obvious fixes without success. Most valuable when you need to ship a fix quickly but want to understand the underlying issue.",
    howItWorks: "The prompt forces a structured diagnostic process: interpreting the error message, identifying potential causes ranked by likelihood, proposing minimal fixes for each, providing exact code changes, and outlining verification steps. The separation of minimal fixes from optional refactors prevents scope creep during critical debugging.",
    bestPractices: "Include the complete error stack trace and relevant code context, not just the error message. Be specific about when the error occurs—on startup, after certain actions, or under specific conditions. If you have suspicions about the cause, mention them to help the AI prioritize hypotheses. Always test the minimal fix before implementing the optional refactor.",
    commonMistakes: "Providing incomplete code snippets that lack necessary context. Skipping straight to the refactor suggestions without testing the minimal fix first. Not specifying the programming language, framework version, or runtime environment when these could affect the diagnosis. Accepting the first suggested fix without understanding why it works.",
    expectedOutput: "A structured debugging report containing: a quick interpretation of what the error means, six ranked potential causes with exact locations and minimal fixes, patch snippets showing only changed lines, a three-point test plan to verify the fix, and clearly labeled optional refactoring suggestions that improve code quality without changing behavior.",
    limitations: "Requires you to provide the actual code and error message—it can't debug from vague descriptions. Less effective for race conditions, timing issues, or bugs that depend on external system state. The AI can't run your code, so complex interactions or environment-specific issues may need human verification.",
    technicalRequirements: "Works best with GPT-4 and Claude for code-heavy tasks. Provide code in markdown code blocks with language specified for proper syntax highlighting. Include line numbers if referencing specific locations. Works with any programming language but is most accurate with popular languages like Python, JavaScript, TypeScript, Java, and Go.",
    realWorldApplications: "Junior developers use this to learn debugging methodology while fixing issues. Senior engineers use it to quickly triage unfamiliar codebases. Teams use it during incident response to generate fix hypotheses. Code reviewers use it to understand why certain changes were made.",
    successMetrics: "Success means getting a working fix with the minimal patch, understanding why the bug occurred, and having confidence the fix doesn't introduce new issues. The test plan should catch regressions. If the fix works but you don't understand why, ask follow-up questions before moving on.",
    relatedPrompts: "Use after SQL Query Builder if debugging database-related errors. Combine with Rewrite for Clarity to document complex fixes for your team. Follow up with the optional refactor using Compare and Pick if you're evaluating multiple improvement approaches.",
    prompt: `You are a debugging assistant. Be precise, not dramatic.

Input:
CODE: {CODE}
ERROR: {ERROR}

Rules:
- Ask at most 2 clarifying questions only if you truly cannot proceed.
- Prefer minimal fixes first. Refactor is optional and must be separated.
- If you cite a line number, quote that exact line/section from CODE.

Output format:
A) Quick read (1–2 sentences): what the error *likely* means.
B) Likely causes (ranked 1–6):
   For each cause:
   - Where: file/line/area
   - Why it fails (short)
   - Smallest fix (exact change)
C) Patch snippet(s) (only the changed lines)
D) Quick test plan (3 checks)
E) Optional cleanup refactor (if it improves clarity without changing behavior)`,
    variations: [
      "Also propose a cleaner refactor after the minimal fix (clearly labeled).",
      "Add minimal logging suggestions to confirm the hypothesis.",
      "Explain the bug like I'm new to the language, but keep the fixes the same.",
      "Prioritize root-cause over symptom-fix (still keep minimal patch).",
    ],
    modelCompatibility: ["GPT", "Claude"],
    tags: ["dev", "debug"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "p3",
    slug: "rewrite-for-clarity",
    title: "Rewrite for Clarity (No Fluff, Same Meaning)",
    purpose: "Make text sharper, shorter, and harder to misunderstand.",
    description: "This prompt eliminates ambiguity and wordiness while preserving original meaning and intent. It applies principles of clear writing—active voice, short sentences, concrete language—to transform verbose or confusing text into crisp, readable communication. The output includes both the rewrite and extracted key points for quick reference.",
    whenToUse: "Apply this to emails before sending, documentation before publishing, presentation scripts before rehearsing, or any written communication where clarity matters more than word count. Essential when writing for busy readers, non-native speakers, or situations where misunderstanding has consequences.",
    howItWorks: "The prompt strips filler words, converts passive constructions to active voice, breaks run-on sentences, and eliminates redundancy. It maintains a friendly tone while prioritizing comprehension. If key context is missing from the original, it adds a brief assumption note rather than leaving readers to infer.",
    bestPractices: "Paste complete paragraphs or sections, not fragments. Include context about the audience if it affects tone (e.g., internal team vs. customers). Review both the clean version and the bullet points—sometimes the bullets reveal structure issues in the original. Use the one-line summary to verify the core message wasn't lost.",
    commonMistakes: "Submitting text that's already clear—the prompt can't improve what doesn't need improvement. Asking for rewrites of highly technical jargon without specifying the audience's expertise level. Expecting the prompt to fix structural problems in arguments or logic; it clarifies expression, not reasoning.",
    expectedOutput: "Three components: a clean rewritten version that's more concise and readable, five bullet points capturing the key information, and a one-sentence summary of the core message. The clean version maintains the original tone and intent while dramatically improving scanability and comprehension.",
    limitations: "Cannot fix unclear thinking, only unclear writing. Works best with text that has a clear point obscured by poor expression. Less effective with creative writing where style matters as much as clarity. Won't dramatically shorten text that's already concise—it clarifies muddled writing, not dense technical content.",
    technicalRequirements: "Compatible with all major models. GPT tends to produce slightly more formal rewrites. Claude often maintains a more conversational tone. Gemini sometimes generates more varied bullet point structures. No special formatting needed—plain text works fine.",
    realWorldApplications: "Business professionals use this for emails to executives who value brevity. Technical writers use it to simplify documentation. Customer support teams use it to clarify help articles. Students use it to tighten essay arguments. Managers use it to make team announcements more scannable.",
    successMetrics: "Effective output means readers understand the message on first read without re-reading sentences. The bullet points should stand alone as a useful summary. The one-line summary should accurately capture the main point. If readers still ask clarifying questions, the original might need structural revision, not just rewriting.",
    relatedPrompts: "Use before Frontend Copy Audit to clean up raw content before optimizing for web. Pair with YouTube Script Generator to adapt written content for verbal delivery. Combine with Product Review Brief to tighten review copy before publishing.",
    prompt: `Rewrite the text for clarity while keeping the meaning the same.

Rules:
- Remove filler and repetition.
- Short sentences. Active voice.
- Keep the tone friendly.
- If the text is missing key context, add a brief [Assumption] line (max 1).

Output format:
1) Clean version
2) 5 key bullet points
3) One-line summary

TEXT:
{TEXT}`,
    variations: [
      "Make it more confident (but not arrogant).",
      "Make it more casual (still clear).",
      "Make it more formal (still simple).",
      "Make it skimmable for mobile (short lines, punchy bullets).",
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["writing", "communication"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "p4",
    slug: "youtube-script-fast",
    title: "YouTube Script Generator (Hook → Value → CTA)",
    purpose: "Generate scripts that feel watchable, not like a school presentation.",
    description: "This prompt creates YouTube scripts optimized for viewer retention using the proven hook-value-payoff structure. It emphasizes pacing, natural transitions, and production cues that make scripts easier to film and edit. The output feels conversational and engaging rather than written or rehearsed.",
    whenToUse: "Use when creating educational content, product reviews, tutorials, explainers, or any YouTube video where you need to communicate information while keeping viewers watching. Most effective for videos between 5-15 minutes where structure prevents rambling.",
    howItWorks: "The prompt structures content around viewer psychology: hook their attention immediately, promise specific value, deliver through three focused sections with examples, recap for retention, and end with a clear next step. Production cues like (pause) and (show screen) make filming smoother and editing clearer.",
    bestPractices: "Be specific about your audience's expertise level and interests. Replace {TOPIC} with concrete subjects, not vague themes. Define {AUDIENCE} with demographic and psychographic details (e.g., 'junior developers learning React' not just 'developers'). Read the script aloud to catch awkward phrasing before filming.",
    commonMistakes: "Writing scripts too long for the intended format—a 3-minute target shouldn't get a 10-minute script. Using the script verbatim without adapting to your natural speaking style. Ignoring the production cues during filming. Skipping the recap section thinking it's repetitive—it significantly improves retention.",
    expectedOutput: "A complete shoot-ready script with seven sections: a 10-second hook that promises value, a clear promise statement, three content sections each with concrete examples, a three-bullet recap, and a natural call-to-action. Includes light production cues to guide filming and editing.",
    limitations: "Scripts work best for informational content, not vlogs or highly personal storytelling. The structure may feel formulaic for experienced creators who have their own style. Production cues are suggestions, not professional direction. Doesn't include visual storyboarding or detailed shot lists.",
    technicalRequirements: "Works with all major models. Claude tends to write more natural conversational flow. GPT produces slightly more structured, formal scripts. Gemini often generates more varied examples. No special tools needed—outputs plain text script format.",
    realWorldApplications: "Educational creators use this for tutorial series. Tech reviewers use it for product comparison videos. Course creators use it to script lesson content. Corporate teams use it for training videos. Marketing teams use it for explainer content.",
    successMetrics: "A successful script keeps you on topic while filming, feels natural when spoken aloud, provides clear editing points through section headers, and guides viewers to the intended action. If you find yourself ad-libbing extensively, the script might need revision to match your voice better.",
    relatedPrompts: "Use Rewrite for Clarity if the script feels too formal or complex. Pair with variations for title options and B-roll to complete your production brief. Use the Shorts variation for Instagram Reels or TikTok adaptations.",
    prompt: `Write a YouTube script about {TOPIC} for {AUDIENCE}.

Rules:
- Fast pacing, short sentences.
- Use simple transitions. Avoid "in conclusion".
- Add light audience cues like (pause), (show screen), (cut).

Structure (use these exact headings):
HOOK (0–10s)
PROMISE (what they'll get)
SECTION 1 (with an example)
SECTION 2 (with an example)
SECTION 3 (with an example)
QUICK RECAP (3 bullets)
CTA (1 sentence)

Topic: {TOPIC}
Audience: {AUDIENCE}`,
    variations: [
      "Add 5 click-worthy title options (no cringe).",
      "Add B-roll suggestions per section.",
      "Make it 60 seconds only (Shorts).",
      "Add a pinned comment text + 3 hashtag suggestions.",
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["creator", "content", "video"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "p5",
    slug: "study-plan-7-days",
    title: "7-Day Study Plan (Realistic, Not Delusional)",
    purpose: "Build a study plan that assumes you're human and get tired.",
    description: "This prompt generates achievable study schedules that account for cognitive fatigue, the need for variety, and the reality that motivation fluctuates. It incorporates spaced repetition principles, includes lighter recovery days, and ends with practice questions to verify learning. The plan balances coverage with retention.",
    whenToUse: "Deploy this when preparing for exams with a week of dedicated study time, learning new job-related skills under deadline, or tackling certification preparation. Most effective when you have a clear goal and can dedicate at least 2-3 hours daily to focused study.",
    howItWorks: "The prompt structures learning across seven days with varied intensity, ensuring you're not burnt out by day three. Each day includes time allocations, specific tasks, and checkpoint questions to verify understanding before proceeding. The final practice test simulates exam conditions. The lighter day prevents cognitive overload.",
    bestPractices: "Be honest about your available hours—overestimating leads to demotivating plans you can't complete. Specify your actual goal (pass exam, build project, get job) not just the subject. Note your current level so the plan matches your starting point. Follow the checkpoint questions—they prevent false confidence from passive reading.",
    commonMistakes: "Setting unrealistic daily hours that don't account for life obligations. Skipping the lighter day thinking more study equals better results—rest improves retention. Ignoring checkpoint questions and pushing forward when concepts aren't solid. Not customizing the plan when you finish days early or fall behind.",
    expectedOutput: "A seven-day schedule where each day specifies time splits across topics, concrete tasks to complete, and a checkpoint question to verify understanding. The plan includes strategic variation in intensity and topic coverage. Concludes with ten practice questions spanning all material plus a complete answer key.",
    limitations: "Seven days isn't enough for completely new subjects requiring months of foundation. The plan assumes dedicated study time, not casual learning around full-time commitments. Practice questions test knowledge but not exam-taking skills like time management. May need adjustment based on your actual progress.",
    technicalRequirements: "Compatible with all major language models. GPT tends to create more structured, systematic plans. Claude often includes more metacognitive reflection prompts. Gemini sometimes generates more creative practice scenarios. Works for any subject domain.",
    realWorldApplications: "Students use this for final exam preparation. Job seekers use it to cram technical skills before interviews. Professionals use it for certification prep. Bootcamp students use it to master specific technology stacks. Teams use it to onboard to new tools or frameworks.",
    successMetrics: "Effective plans mean you complete each day's tasks in the allotted time, answer checkpoint questions correctly before moving on, and score well on the final practice test. If you're consistently running over time, either the estimate was wrong or you need foundational review first.",
    relatedPrompts: "Start with Explain Like a Tutor for topics you don't understand during the plan. Use Interview Prep Coach if your goal is job interviews. Extend with the 14-day variation for bigger subjects or earlier starts.",
    prompt: `Create a 7-day study plan for {SUBJECT}.

Inputs:
- Daily time available (hours): {HOURS}
- Goal (exam/project/outcome): {GOAL}

Rules:
- Make it realistic: include at least 1 lighter day and daily short revision.
- Every day must have: tasks, time split, and a checkpoint question.
- End with 10 practice questions (mixed difficulty). Include answers.

Output format:
DAY 1 … DAY 7 (each: Time Split, Tasks, Checkpoint)
FINAL: Practice Questions (10) + Answer Key

Subject: {SUBJECT}
Hours/day: {HOURS}
Goal: {GOAL}`,
    variations: [
      "Make it 14 days with spaced repetition.",
      "Include breaks + motivation tips (short, non-cringe).",
      "Add a final mock test with marking scheme.",
      "Make it for someone who procrastinates (tighter tasks, more checkpoints).",
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["study", "planning"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "p6",
    slug: "product-review-brief",
    title: "Product Review Brief (Balanced + Credible)",
    purpose: "Write reviews that don't sound like paid ads.",
    description: "This prompt generates honest, balanced product reviews that help readers make informed decisions. It enforces specificity over generic praise, requires acknowledging both strengths and weaknesses, and clearly identifies who the product serves versus who should look elsewhere. The format builds trust through transparency.",
    whenToUse: "Use when reviewing software tools, physical products, services, or any offering where readers need objective analysis to decide if it fits their needs. Most valuable when you have hands-on experience but want to structure your observations professionally.",
    howItWorks: "The prompt demands concrete details instead of vague positives, balances five pros against five cons to avoid seeming biased, and concludes with a scored verdict that requires justification. The 'best for / avoid if' section immediately tells readers if they should keep reading, respecting their time.",
    bestPractices: "Use specific examples from actual use, not marketing claims. Quantify where possible (battery lasts 6 hours, not 'good battery life'). Compare to alternatives in the same category. If reviewing pre-release or based on specs, explicitly state what you're assuming. Update reviews as products change.",
    commonMistakes: "Listing generic pros like 'good quality' without specifics. Being overly harsh on cons that are actually tradeoffs. Scoring without justification. Failing to identify the target user clearly. Comparing products in different categories or price ranges unfairly.",
    expectedOutput: "A structured review containing a 2-3 sentence summary, clear bullets on who should buy versus avoid, five specific pros with concrete details, five honest cons without exaggeration, and a numerical score out of ten with a one-sentence justification that ties to the product's core purpose.",
    limitations: "Requires you to provide product details or experience—can't review products you haven't researched. Scores are somewhat subjective; different users weight features differently. The balanced format may feel forced for truly exceptional or truly terrible products. Can't test long-term durability from short-term use.",
    technicalRequirements: "Works with all major models. GPT tends to generate more consumer-focused language. Claude often provides more nuanced technical analysis. Gemini sometimes surfaces less obvious use cases. The long-form variation works best with GPT-4 or Claude for detailed analysis.",
    realWorldApplications: "Tech reviewers use this for gadgets and software. Affiliate marketers use it to provide genuine value before recommendations. Product teams use it to understand how users perceive their offerings. Purchasing teams use it to document vendor evaluations.",
    successMetrics: "Successful reviews help readers decide whether the product fits their needs within 30 seconds of reading. The pros and cons should feel balanced and specific. Readers should trust the verdict because it acknowledges tradeoffs. If everyone agrees or everyone disagrees, the review may lack nuance.",
    relatedPrompts: "Use Compare and Pick when reviewing multiple similar products. Apply Rewrite for Clarity to tighten draft reviews. Use the SEO-friendly variation for published content that needs discoverability.",
    prompt: `Write a balanced product review for {PRODUCT}.

Rules:
- Be specific. Avoid generic praise.
- If you lack concrete specs, state what you are assuming in 1 line.
- Include who it's for and who should avoid it.

Output format:
1) Summary (2–3 sentences)
2) Best for / Avoid if (bullets)
3) Pros (5 bullets)
4) Cons (5 bullets)
5) Verdict: score /10 + 1-sentence justification

Product: {PRODUCT}`,
    variations: [
      "Make it 200 words max.",
      "Make it long-form (1200–1600 words) with headings.",
      "Add 3 alternatives with one-liner reasons.",
      "Make it SEO-friendly without sounding robotic (use natural headings).",
    ],
    modelCompatibility: ["GPT", "Claude"],
    tags: ["writing", "reviews", "seo"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "p7",
    slug: "compare-and-pick",
    title: "Compare Options + Pick a Winner (With Criteria)",
    purpose:
      "Turn 'which is better?' into a clear decision with tradeoffs and a final pick.",
    description: "This prompt structures comparison decisions through explicit criteria, scored evaluation, and clear recommendations. It moves beyond feature lists to examine how options perform against your specific use case. The output acknowledges that the 'right' choice depends on context, not universal superiority.",
    whenToUse: "Apply this when choosing between tools, services, technologies, or approaches where both options have merit. Most valuable when you understand the choices superficially but need deeper analysis of tradeoffs. Essential when explaining decisions to stakeholders or teams.",
    howItWorks: "The prompt evaluates options across consistent criteria, scores each 1-10 with justification, identifies key tradeoffs, recommends a winner for the stated use case, then describes scenarios where the other option makes sense. This structure prevents false dichotomy thinking.",
    bestPractices: "Define your use case specifically—'e-commerce site with 100k monthly visitors' not just 'website'. If comparing tools you haven't used, state this and rely on documented capabilities. Let the AI ask clarifying questions if your use case is vague. Focus on criteria that matter to your decision, not exhaustive feature lists.",
    commonMistakes: "Comparing options at different price points without considering budget as a criterion. Treating scores as objective when they're contextual to the use case. Ignoring the 'when to pick the other option' section—it often reveals the decision is closer than it seems. Making criteria too generic to be useful.",
    expectedOutput: "A decision framework containing any necessary assumptions, a criteria table with 1-10 scores and justifications for both options, key tradeoffs in bullet form, a clear winner recommendation with reasoning, and scenarios where choosing the alternative makes sense.",
    limitations: "Quality depends on the specificity of your use case—vague needs produce vague comparisons. Can't account for future changes in the options. Scores are somewhat arbitrary; focus on the justifications instead. Works best comparing similar categories, not apples-to-oranges comparisons.",
    technicalRequirements: "Compatible with all major models. Claude excels at nuanced tradeoff analysis. GPT-4 tends to generate more systematic scoring. Gemini sometimes surfaces less obvious comparison angles. Works for any domain: software, services, methodologies, approaches.",
    realWorldApplications: "Engineering teams use this to evaluate technology choices. Product managers use it to prioritize features or approaches. Individuals use it for major purchases. Consultants use it to structure recommendations. Teams use it to document why decisions were made.",
    successMetrics: "Effective comparisons mean you can defend the decision to skeptics, understand when to revisit the choice, and know what you're sacrificing. If team members disagree after seeing the analysis, the criteria likely need refinement. If the decision feels obvious, you might not have needed the comparison.",
    relatedPrompts: "Follow up with Product Review Brief to deep-dive on the winner. Use Bug Hunter if comparing debugging approaches. Pair with SQL Query Builder when comparing database solutions.",
    prompt: `Compare {OPTION_A} vs {OPTION_B} for {USE_CASE}.

Rules:
- If USE_CASE is vague, ask 1 clarifying question first.
- Score each criterion 1–10 with 1-line justification.
- End with a clear recommendation and who should pick the other option.

Output format:
1) Assumptions (if any)
2) Criteria table (Criterion | A score | B score | Why)
3) Key tradeoffs (bullets)
4) Recommendation (winner + why)
5) If you choose the other one (when that makes sense)

Option A: {OPTION_A}
Option B: {OPTION_B}
Use case: {USE_CASE}`,
    variations: [
      "Add a 'budget pick' and 'power-user pick' if relevant.",
      "Make it one-screen short (no table, just bullets).",
      "Add a 30-second summary I can read out loud.",
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["decision", "productivity", "tools"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "p8",
    slug: "sql-query-builder",
    title: "SQL Query Builder (Ask → Build → Explain)",
    purpose:
      "Generate correct SQL from requirements, with explanations and edge cases.",
    description: "This prompt translates natural language database requirements into production-ready SQL queries. It doesn't just generate code—it explains the reasoning behind each clause, highlights potential edge cases, and uses safe defaults that prevent common pitfalls. The output teaches SQL patterns while solving immediate needs.",
    whenToUse: "Use when constructing complex joins, writing aggregation queries, optimizing slow queries, or learning SQL patterns for new scenarios. Most effective when you know what data you need but aren't sure of the optimal query structure.",
    howItWorks: "The prompt requires database type and schema upfront to generate compatible syntax. It builds queries using explicit joins, qualified column names, and clear table aliases. The explanation section connects syntax to intent, making it educational. Edge case warnings prevent production issues.",
    bestPractices: "Provide complete schema including data types, relationships, and constraints. Specify your database system—syntax varies between MySQL, PostgreSQL, SQLite, SQL Server. Describe your goal in terms of the data you need, not the SQL you think you need. Test generated queries on sample data before production use.",
    commonMistakes: "Providing incomplete schema that's missing key relationships. Not specifying whether you want efficiency or readability optimized. Skipping the edge cases section—it often catches critical scenarios. Using queries without understanding them, then struggling to modify them later.",
    expectedOutput: "A complete package: a single executable SQL query optimized for the stated database system, a bulleted explanation of what the query does and why key clauses exist, and two edge cases to watch for when running it in production.",
    limitations: "Cannot optimize queries without knowing data volume and distribution. Generated queries may need index tuning for large datasets. Explanation assumes basic SQL knowledge—absolute beginners may need supplementary learning. Cannot access your actual database to verify results.",
    technicalRequirements: "Works best with GPT-4 and Claude for complex queries. Gemini handles simpler queries well. Specify database system clearly—supports MySQL, PostgreSQL, SQLite, SQL Server, Oracle. Provide schema as text or DDL statements. Test output in a development environment first.",
    realWorldApplications: "Analysts use this to construct reporting queries. Backend engineers use it to build API data access. Data scientists use it for exploratory analysis. Database administrators use it to document query patterns. Students use it to learn SQL through working examples.",
    successMetrics: "Success means the query returns correct results efficiently, the explanation makes sense without trial and error, and edge cases match real scenarios you encounter. If the query fails, the error message plus explanation should make the fix obvious.",
    relatedPrompts: "Use Bug Hunter if the generated query produces errors. Pair with Compare and Pick when evaluating SQL vs. ORM approaches. Follow with variations for optimization or CTE versions.",
    prompt: `You are a SQL assistant.

Given:
- Database: {DB_TYPE} (e.g., MySQL/Postgres/SQLite)
- Tables/schema: {SCHEMA}
- Goal: {GOAL}

Rules:
- Ask at most 2 questions only if the schema/goal is ambiguous.
- Output a single final query first, then explanation.
- Use safe defaults (explicit JOINs, qualified columns).

Output format:
QUERY:
<final SQL>

EXPLANATION:
- What it does (bullets)
- Why key clauses exist (bullets)
- 2 edge cases to watch for

DB: {DB_TYPE}
SCHEMA: {SCHEMA}
GOAL: {GOAL}`,
    variations: [
      "Also output an optimized version and explain the difference.",
      "Add a version using CTEs (if supported).",
      "Add sample test inputs + expected result shape.",
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["sql", "dev", "database"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "p9",
    slug: "frontend-copy-audit",
    title: "Landing Page Copy Audit (Fix Confusing Text)",
    purpose:
      "Improve website copy so users understand it in 5 seconds instead of leaving.",
    description: "This prompt audits and rewrites landing page copy to reduce bounce rates and improve conversion. It identifies where messaging confuses visitors, restructures content for scanability, clarifies value propositions, and ensures call-to-action language feels natural rather than desperate or manipulative.",
    whenToUse: "Deploy this when your landing page has traffic but low conversion, when user testing reveals confusion, when rebranding or repositioning, or when copy was written by people too close to the product. Most effective before A/B testing headline variations.",
    howItWorks: "The prompt analyzes copy for common problems: vague value propositions, cognitive overload, unclear audience targeting, and awkward CTAs. It restructures content following proven patterns: clear hero statement, compelling sub-headline, concrete benefits, and natural next step. Alternative headlines let you test variations.",
    bestPractices: "Include the complete above-the-fold copy, not fragments. Specify if you're B2B or B2C—it affects tone significantly. Note any brand voice guidelines you want maintained. Test the improved copy with target users before full deployment. A/B test headline alternatives rather than guessing the best one.",
    commonMistakes: "Submitting entire pages instead of focused sections—start with hero area. Asking for 'more creative' copy when clarity is the issue. Ignoring the plain English summary—if that doesn't make sense, the copy won't either. Making too many changes simultaneously instead of testing iteratively.",
    expectedOutput: "Four components: problems found in the current copy listed as bullets, improved copy structured as hero headline, sub-headline, three benefits, and one natural CTA, three alternative hero headlines for testing, and a one-sentence plain English summary of what the site actually offers.",
    limitations: "Cannot fix products with no clear value proposition—copy can't rescue fundamentally unclear positioning. Works on text only, not design or layout issues. Improved copy still needs traffic to validate. Can't guarantee conversion rate improvements without testing.",
    technicalRequirements: "Compatible with all major models. Claude tends to maintain brand voice well. GPT produces slightly more varied headline options. Gemini sometimes generates more playful alternatives. Works for any industry but tone varies by variation selected.",
    realWorldApplications: "Startups use this to clarify unclear messaging. Marketing teams use it to optimize conversion funnels. Agencies use it for client landing pages. Product teams use it before launching new features. Solo founders use it when they're too close to the product to see confusion.",
    successMetrics: "Effective audits mean first-time visitors understand what you offer without scrolling, can self-identify as the target audience, know exactly what happens when they click the CTA, and feel the copy speaks to their needs. Measure with user testing, not just personal preference.",
    relatedPrompts: "Use Rewrite for Clarity on sections beyond the hero. Pair with Product Review Brief to understand how users actually describe your product. Follow up with YouTube Script Generator if creating video landing pages.",
    prompt: `Audit and improve this landing page copy.

Rules:
- Keep it honest. No fake hype.
- Reduce cognitive load: short lines, clear headings.
- Rewrite with a clear value prop + who it's for.
- Add one call-to-action that sounds natural.

Output format:
1) Problems found (bullets)
2) Improved copy (Hero, Sub-hero, 3 benefits, 1 CTA)
3) 3 alternative hero headlines
4) One sentence: what this site is in plain English

COPY:
{TEXT}`,
    variations: [
      "Make it more playful but still clear.",
      "Make it more premium/serious.",
      "Make it more direct and short (mobile-first).",
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["copywriting", "seo", "product"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "p10",
    slug: "interview-prep-coach",
    title: "Interview Prep Coach (Questions + Answers + Follow-ups)",
    purpose:
      "Practice interviews with realistic questions and strong, structured answers.",
    description: "This prompt simulates interview preparation by generating realistic questions for your target role, outlining what strong answers include, providing sample responses that demonstrate structure, anticipating follow-up questions, and identifying common mistakes candidates make. It's comprehensive interview prep in a structured format.",
    whenToUse: "Use when preparing for job interviews, promotion conversations, performance reviews, or any high-stakes Q&A situation. Most effective 1-2 weeks before the interview when you have time to practice answers and internalize the structure.",
    howItWorks: "The prompt tailors questions to your role, experience level, and focus areas. For each question, it explains what interviewers are really assessing, provides a sample answer demonstrating good structure and content, includes likely follow-up questions that probe deeper, and warns about common pitfalls to avoid.",
    bestPractices: "Be specific about the role you're interviewing for—'Senior Backend Engineer at a fintech startup' not just 'engineer'. Mention technologies or domains in focus areas. Practice answering questions aloud, not just reading samples. Adapt sample answers to your actual experience. Prepare for the follow-ups, not just the initial questions.",
    commonMistakes: "Memorizing sample answers verbatim instead of understanding the structure. Practicing only technical questions while ignoring behavioral ones. Skipping the common mistakes section—it's often where candidates fail. Not timing practice answers to ensure they're concise.",
    expectedOutput: "A complete interview prep package containing eight realistic questions mixing technical, behavioral, and scenario types, guidance on what strong answers include for each, sample answers demonstrating good structure, one follow-up question per main question, and five common mistakes candidates make for this specific role.",
    limitations: "Sample answers are examples, not scripts to memorize—interviewers spot rehearsed responses. Cannot predict your specific interviewer's style or company-specific questions. Follow-ups are common ones, not exhaustive. Doesn't replace mock interviews with real people.",
    technicalRequiratures: "Works with all major models. Claude excels at behavioral questions and nuanced follow-ups. GPT-4 generates strong technical question variations. Gemini sometimes produces creative scenario questions. Works for any role level or industry with appropriate customization.",
    realWorldApplications: "Job seekers use this for interview preparation across industries. Managers use it to prepare for promotion conversations. Career changers use it to practice explaining their transition. Recent graduates use it to prepare for their first professional interviews.",
    successMetrics: "Effective prep means you can answer questions confidently without scripts, handle follow-ups without panic, avoid common mistakes listed, and adapt the structure to unexpected questions. If you're still reading samples during the interview day, you under-prepared.",
    relatedPrompts: "Use Explain Like a Tutor to master technical concepts mentioned in questions. Pair with Rewrite for Clarity to tighten rambling practice answers. Use Compare and Pick to evaluate job offers after successful interviews.",
    prompt: `Act as an interview coach for the role: {ROLE}.

Input:
- Role: {ROLE}
- My experience level: {LEVEL}
- Focus areas: {FOCUS} (e.g., backend, ML, system design)

Output format:
1) 8 interview questions (mix: technical, behavioral, scenario)
2) For each question:
   - What a strong answer includes (bullets)
   - A sample answer (150–250 words)
   - 1 follow-up question interviewers ask
3) Final: 5 common mistakes candidates make for this role

Rules:
- Keep answers concrete, not motivational posters.

ROLE: {ROLE}
LEVEL: {LEVEL}
FOCUS: {FOCUS}`,
    variations: [
      "Make it for junior candidates (simpler).",
      "Make it for senior candidates (harder, deeper tradeoffs).",
      "Include a 30-second 'tell me about yourself' script.",
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["career", "interview", "practice"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "p11",
    slug: "email-to-executive",
    title: "Email to Executive (Clear Ask, No Rambling)",
    purpose: "Write emails that busy executives actually read and respond to.",
    description: "This prompt structures emails for executive audiences who value brevity and clarity. It enforces a clear ask upfront, provides just enough context without over-explaining, and respects time by making the email scannable. The output feels professional without being stiff or overly formal.",
    whenToUse: "Use when emailing senior leadership, board members, investors, or any executive where your window of attention is measured in seconds. Essential when making requests, proposing initiatives, or escalating issues to decision-makers.",
    howItWorks: "The prompt structures content around the executive mindset: lead with what you need, provide minimal context to support the ask, outline options or next steps, and close with a clear action item. It eliminates preamble, jargon, and unnecessary detail that dilutes the message.",
    bestPractices: "State your ask in the first sentence. Limit emails to under 150 words. Use bullet points for anything with multiple parts. Attach supporting details as documents rather than embedding them. Follow up once if no response after 3-4 business days.",
    commonMistakes: "Burying the ask in paragraphs of context. Writing novel-length explanations assuming they'll read it all. Using jargon or acronyms without definition. Not providing clear next steps or decision points.",
    expectedOutput: "A concise email structured as: clear ask or purpose in opening line, 2-3 bullet points of essential context, decision options or next steps if applicable, specific call-to-action with timeline. Total length under 150 words unless complexity absolutely requires more.",
    limitations: "Works best for business contexts, not personal or sensitive topics. Assumes the executive has baseline context about your role and projects. Can't replace relationship-building or informal communication. Not suitable for complex negotiations requiring nuance.",
    technicalRequirements: "Compatible with all major models. Claude tends to maintain appropriate formality. GPT sometimes generates slightly more structured options. Gemini occasionally adds unnecessary creativity. No special tools needed.",
    realWorldApplications: "Middle managers use this to communicate with C-suite. Individual contributors use it for executive updates. Consultants use it for client communications. Entrepreneurs use it for investor updates. Project managers use it for escalations.",
    successMetrics: "Success means getting timely responses, clear decisions, or requested actions. If executives ask clarifying questions, you likely provided too little context. If they don't respond, you probably provided too much or the ask wasn't clear.",
    relatedPrompts: "Use Rewrite for Clarity if your draft email is too long. Pair with Compare and Pick when presenting decision options. Follow up with Meeting Notes Action Items after the resulting conversation.",
    prompt: `Write an email to an executive about {TOPIC}.

Input:
- What I need: {ASK}
- Essential context (max 3 points): {CONTEXT}
- Timeline: {WHEN}

Rules:
- Lead with the ask in sentence one
- Keep under 150 words total
- Use bullets for multiple points
- End with clear next step

Output format:
Subject line
Email body (ask first, context bullets, next step)

Topic: {TOPIC}
Ask: {ASK}
Context: {CONTEXT}
Timeline: {WHEN}`,
    variations: [
      "Make it more formal for board communications.",
      "Add decision options when asking for approval.",
      "Include a one-line impact statement for proposals.",
      "Make it update-style (FYI, no action needed).",
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["writing", "executive", "communication"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "p12",
    slug: "meeting-agenda-that-works",
    title: "Meeting Agenda (Clear Outcomes, Not Generic Lists)",
    purpose: "Create agendas that make meetings actually productive.",
    description: "This prompt generates meeting agendas focused on outcomes rather than vague discussion topics. It allocates time realistically, specifies what success looks like for each item, assigns pre-work when needed, and ensures every topic has a clear owner and expected outcome.",
    whenToUse: "Use before any meeting where you need alignment, decisions, or action items. Essential for recurring team meetings, project kickoffs, stakeholder reviews, or any gathering where vague agendas lead to wasted time.",
    howItWorks: "The prompt structures agendas around decision-making and action. Each agenda item includes time allocation, expected outcome (decide, align, inform, create), owner, and any required pre-work. This prevents meetings from becoming unstructured discussions with no outputs.",
    bestPractices: "Send agendas 24 hours before meetings. Keep meetings under 60 minutes when possible. Assign pre-work for complex topics. Include only stakeholders who need to decide or contribute. Skip topics that can be handled async.",
    commonMistakes: "Creating agendas full of vague discussion topics. Not allocating time per item. Including too many topics for the time available. Not specifying what decisions need to be made. Forgetting to assign pre-work for complex items.",
    expectedOutput: "A structured agenda containing: meeting purpose and success criteria, list of attendees and their roles, 3-5 agenda items each with time allocation, owner, outcome type (decide/align/inform/create), and any required pre-work, plus time reserved for questions and next steps.",
    limitations: "Can't make poorly planned meetings productive—good agendas help but don't replace good meeting culture. Assumes attendees will actually read the agenda and complete pre-work. Won't fix fundamental meeting overload problems.",
    technicalRequirements: "Compatible with all major models. GPT tends to create more structured formats. Claude often includes better outcome specifications. Gemini sometimes suggests creative formats. Works for any meeting type.",
    realWorldApplications: "Project managers use this for sprint planning and retrospectives. Product managers use it for stakeholder reviews. Team leads use it for recurring team meetings. Executives use it for leadership team meetings.",
    successMetrics: "Successful agendas mean meetings start on time, stay on topic, produce expected outcomes, end with clear action items, and don't require follow-up meetings for the same topics. If meetings consistently run over, your time allocations are unrealistic.",
    relatedPrompts: "Follow with Meeting Notes Action Items to document outcomes. Use Email to Executive to send pre-reads. Pair with Decision Framework when agenda includes major decisions.",
    prompt: `Create a meeting agenda for {MEETING_PURPOSE}.

Input:
- Purpose: {PURPOSE}
- Duration: {DURATION} minutes
- Key topics: {TOPICS}
- Attendees: {ATTENDEES}

Rules:
- Specify outcome for each item (decide/align/inform/create)
- Allocate realistic time per topic
- Note any required pre-work
- Reserve 10 minutes for questions/next steps

Output format:
Purpose & Success Criteria
Attendees & Roles
Agenda Items (each: Topic, Time, Owner, Outcome, Pre-work if needed)
Q&A / Next Steps (10 min)

Meeting: {MEETING_PURPOSE}
Duration: {DURATION}
Topics: {TOPICS}
Attendees: {ATTENDEES}`,
    variations: [
      "Add a parking lot section for off-topic items.",
      "Include decision-making framework for contentious items.",
      "Make it workshop-style with activities and timers.",
      "Add retrospective format (what worked, what didn't, actions).",
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["meetings", "productivity", "planning"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "p13",
    slug: "technical-explainer",
    title: "Technical Explainer (For Non-Technical Stakeholders)",
    purpose: "Explain technical concepts without losing clarity or dumbing down.",
    description: "This prompt translates technical topics into clear explanations for business stakeholders. It balances accuracy with accessibility, uses relevant analogies, focuses on impact rather than implementation details, and avoids both jargon and condescension.",
    whenToUse: "Deploy this when presenting technical solutions to executives, explaining engineering decisions to product or business teams, writing documentation for cross-functional audiences, or any situation where technical accuracy meets non-technical readers.",
    howItWorks: "The prompt structures explanations around business impact first, then provides just enough technical detail to support credibility. It uses analogies that connect to the stakeholder's domain knowledge, explains why something matters before how it works, and avoids unnecessary complexity.",
    bestPractices: "Start with what it means for the business or user. Use analogies from the stakeholder's domain (finance, operations, sales). Provide diagrams or visuals when possible. Test explanations with non-technical colleagues before sharing broadly.",
    commonMistakes: "Over-simplifying to the point of inaccuracy. Using technical jargon without definition. Explaining how before why. Not connecting technical choices to business outcomes. Being condescending by over-explaining obvious concepts.",
    expectedOutput: "A structured explanation containing: what problem this solves (business impact), how it works at a high level (without jargon), why this approach over alternatives (tradeoffs), what stakeholders need to know or decide, and clear next steps if applicable.",
    limitations: "Cannot make fundamentally complex systems simple without losing some nuance. Works best when you deeply understand both the technical topic and the audience's knowledge level. May require iteration based on stakeholder feedback.",
    technicalRequirements: "Compatible with all major models. Claude excels at finding appropriate analogies. GPT tends to provide more structured explanations. Gemini sometimes surfaces creative comparisons. Works for any technical domain.",
    realWorldApplications: "Engineers use this for architecture decision documents. Product managers use it to explain technical constraints. CTOs use it for board presentations. Consultants use it for client communications. Teachers use it for introductory technical courses.",
    successMetrics: "Successful explanations mean stakeholders can explain the concept back to others, make informed decisions about tradeoffs, and ask relevant follow-up questions. If they look confused or ask basic questions, the explanation assumed too much knowledge.",
    relatedPrompts: "Use Rewrite for Clarity to simplify draft explanations. Pair with Explain Like a Tutor if you need to learn the concept first. Combine with Email to Executive for stakeholder communications.",
    prompt: `Explain {TECHNICAL_TOPIC} for non-technical stakeholders.

Input:
- Topic: {TOPIC}
- Audience: {AUDIENCE} (e.g., executives, product team, customers)
- Context: {CONTEXT}

Rules:
- Start with business impact / "why it matters"
- Use analogies from the audience's domain
- Avoid jargon; define necessary terms in one sentence
- Explain tradeoffs in terms of outcomes, not implementation

Output format:
1) What it does & why it matters (2-3 sentences)
2) How it works (high level, max 150 words)
3) Key tradeoffs or constraints (bullets)
4) What stakeholders need to know or decide
5) Next steps (if applicable)

Topic: {TECHNICAL_TOPIC}
Audience: {AUDIENCE}
Context: {CONTEXT}`,
    variations: [
      "Add a visual diagram description.",
      "Include FAQ section for common concerns.",
      "Make it decision-focused (what to approve/choose).",
      "Add cost or timeline implications.",
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["technical", "communication", "stakeholders"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "p14",
    slug: "brainstorm-facilitator",
    title: "Brainstorm Facilitator (Ideas → Prioritization)",
    purpose: "Turn messy brainstorms into prioritized, actionable ideas.",
    description: "This prompt facilitates structured brainstorming by first generating diverse ideas without judgment, then organizing and prioritizing them using clear criteria. It balances creativity with practicality, ensuring brainstorms produce usable outputs instead of just long lists.",
    whenToUse: "Use when starting new projects, tackling open-ended problems, exploring product features, or whenever you need fresh ideas followed by realistic prioritization. Most effective when you're stuck or need to expand thinking beyond obvious solutions.",
    howItWorks: "The prompt operates in two phases: divergent thinking to generate ideas without constraints, then convergent thinking to organize, evaluate, and prioritize using specified criteria (impact, effort, risk, alignment). This prevents premature judgment from killing good ideas while ensuring outputs are actionable.",
    bestPractices: "Set a timer for idea generation to prevent overthinking. Defer judgment during the divergent phase. Be specific about evaluation criteria relevant to your situation. Include diverse perspectives if brainstorming with a team. Document everything, even ideas you don't pursue.",
    commonMistakes: "Judging ideas during generation phase. Using generic criteria that don't match your context. Not generating enough ideas before evaluating. Picking the first decent idea without exploring alternatives. Forgetting to consider implementation feasibility.",
    expectedOutput: "A two-part output: first, 15-20 diverse ideas organized by theme or category, then a prioritized short-list of 3-5 top ideas with evaluation scores, rationale, and recommended next steps for each. Includes criteria used for evaluation.",
    limitations: "Quality depends on how well you define the problem and criteria. Can't replace domain expertise or market knowledge. Works best for ideation, not detailed implementation planning. Won't magically solve problems with no good solutions.",
    technicalRequirements: "Compatible with all major models. GPT generates high volumes of ideas quickly. Claude tends to provide more nuanced evaluation. Gemini sometimes surfaces more creative angles. Works for any domain or problem type.",
    realWorldApplications: "Product teams use this for feature brainstorming. Marketing teams use it for campaign ideation. Startups use it for business model exploration. Designers use it for concept generation. Writers use it to overcome creative blocks.",
    successMetrics: "Successful brainstorms mean you identify ideas you wouldn't have thought of alone, can clearly articulate why top ideas are prioritized that way, and have actionable next steps for testing or implementing ideas. If every idea feels obvious, you haven't pushed far enough.",
    relatedPrompts: "Follow with Compare and Pick to evaluate top ideas more deeply. Use Technical Explainer to communicate selected ideas to stakeholders. Pair with Meeting Agenda for brainstorm sessions.",
    prompt: `Facilitate a brainstorm on {CHALLENGE}.

Input:
- Challenge: {CHALLENGE}
- Constraints: {CONSTRAINTS}
- Evaluation criteria: {CRITERIA} (e.g., impact, effort, risk, alignment)

Rules:
- Phase 1: Generate 15-20 diverse ideas without judgment
- Phase 2: Organize, evaluate, and prioritize using criteria
- Be specific and actionable

Output format:
PHASE 1 - Ideas (organized by theme)
- 15-20 ideas with brief descriptions

PHASE 2 - Evaluation & Prioritization
- Top 5 ideas scored on criteria (1-10)
- Rationale for each
- Recommended next steps

Challenge: {CHALLENGE}
Constraints: {CONSTRAINTS}
Criteria: {CRITERIA}`,
    variations: [
      "Add worst-idea brainstorm (then invert).",
      "Include implementation complexity assessment.",
      "Make it quick-win focused (high impact, low effort).",
      "Add risk analysis for top ideas.",
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["ideation", "brainstorming", "prioritization"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "p15",
    slug: "postmortem-template",
    title: "Postmortem Template (Learn, Don't Blame)",
    purpose: "Document incidents and outages to prevent repeat failures.",
    description: "This prompt creates blameless postmortem documents that focus on systemic issues rather than individual mistakes. It structures incident analysis around timeline, root cause, impact, and preventive measures. The goal is organizational learning, not finger-pointing.",
    whenToUse: "Use after any significant incident, outage, missed deadline, or project failure where learning matters. Essential for engineering teams doing incident reviews, operations teams analyzing failures, or any situation where understanding what went wrong prevents future problems.",
    howItWorks: "The prompt structures postmortems around facts and systems: what happened (timeline), why it happened (root cause analysis), what the impact was (quantified when possible), and what changes prevent recurrence. It explicitly avoids blame language and focuses on process improvements.",
    bestPractices: "Conduct postmortems within 48 hours while details are fresh. Include all involved team members. Focus on systemic causes, not individual actions. Assign owners to action items with deadlines. Share postmortems broadly for organizational learning.",
    commonMistakes: "Blaming individuals instead of examining systems. Rushing to solutions without understanding root causes. Writing vague action items without owners. Not following up on action items. Making postmortems feel like punishment.",
    expectedOutput: "A structured document containing: incident summary with severity and impact, detailed timeline of events, root cause analysis with contributing factors, action items with owners and deadlines, and what went well (not just what went wrong).",
    limitations: "Can't prevent incidents, only help learn from them. Requires honest participation from all involved. Action items need follow-through or nothing changes. Cultural resistance to blameless culture makes these less effective.",
    technicalRequirements: "Compatible with all major models. Claude tends to maintain blameless framing well. GPT creates clear action items. Gemini sometimes surfaces less obvious contributing factors. Works for any incident type.",
    realWorldApplications: "Engineering teams use this for production incidents. Operations teams use it for service outages. Project teams use it for delivery failures. Product teams use it for launch issues. Sales teams use it for deal losses.",
    successMetrics: "Effective postmortems mean action items get completed, similar incidents don't recur, team members feel safe sharing mistakes, and the organization builds institutional knowledge. If people hide information, your culture needs work.",
    relatedPrompts: "Use Bug Hunter for technical root cause analysis. Pair with Meeting Agenda for postmortem sessions. Follow with Email to Executive for incident summaries.",
    prompt: `Create a postmortem for {INCIDENT}.

Input:
- What happened: {SUMMARY}
- When: {DATE_TIME}
- Duration: {DURATION}
- Impact: {IMPACT}

Rules:
- Use blameless language (focus on systems, not people)
- Include timeline with timestamps
- Identify root cause and contributing factors
- Create actionable prevention steps with owners

Output format:
SUMMARY (severity, impact, duration)
TIMELINE (key events with timestamps)
ROOT CAUSE ANALYSIS
- Primary cause
- Contributing factors
IMPACT
- Users affected
- Revenue/business impact
- Internal impact
WHAT WENT WELL (yes, really)
ACTION ITEMS (owner, deadline, priority)
- Prevention
- Detection
- Response

Incident: {INCIDENT}
Summary: {SUMMARY}
Date: {DATE_TIME}
Impact: {IMPACT}`,
    variations: [
      "Add 5 Whys analysis for root cause.",
      "Include communication timeline (who was notified when).",
      "Add lessons learned section with key takeaways.",
      "Make it short-form (one-pager for minor incidents).",
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["incidents", "postmortem", "learning"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "p16",
    slug: "onboarding-checklist",
    title: "Onboarding Checklist (Role-Specific, Week-by-Week)",
    purpose: "Create onboarding plans that set new hires up for success.",
    description: "This prompt generates structured onboarding checklists tailored to specific roles and companies. It organizes tasks by week, balances learning with doing, includes check-in points, and ensures new hires have clear success criteria. The output feels supportive, not overwhelming.",
    whenToUse: "Use when hiring new team members, promoting internally, or whenever someone joins a new role. Essential for scaling teams, ensuring consistent onboarding experiences, or documenting tribal knowledge before it's lost.",
    howItWorks: "The prompt structures onboarding across 4-8 weeks with increasing responsibility. Each week includes: tasks to complete, people to meet, resources to review, and checkpoints to verify progress. It balances orientation, training, and hands-on work while building relationships.",
    bestPractices: "Customize for the specific role and company. Assign an onboarding buddy. Build in regular check-ins. Include both technical tasks and cultural integration. Get feedback from recent hires to improve the checklist.",
    commonMistakes: "Making week one too information-dense. Not including hands-on work early enough. Forgetting to schedule regular check-ins. Creating generic checklists that don't match the role. Not assigning clear owners for each item.",
    expectedOutput: "A week-by-week checklist spanning 30-60 days containing: orientation tasks, training modules, systems access, key relationships to build, projects to complete, checkpoints with manager, and success criteria for the first 90 days.",
    limitations: "Can't replace good management and regular feedback. Assumes company has resources and documentation worth referencing. Works best with stable roles and processes. May need adjustment for very senior or unique positions.",
    technicalRequirements: "Compatible with all major models. GPT creates well-structured checklists. Claude often includes better relationship-building elements. Gemini sometimes suggests creative onboarding activities. Works for any role type.",
    realWorldApplications: "Hiring managers use this for new team members. HR teams use it to standardize onboarding. Startups use it to scale hiring beyond founders. Remote teams use it to structure virtual onboarding. Consultants use it for client team integration.",
    successMetrics: "Successful onboarding means new hires contribute meaningfully by week 3-4, feel integrated by week 6-8, and report high satisfaction in feedback surveys. If people quit in the first 90 days, onboarding likely failed.",
    relatedPrompts: "Use Meeting Agenda for regular check-ins. Pair with Technical Explainer for complex systems training. Follow with Interview Prep Coach for internal promotions.",
    prompt: `Create an onboarding checklist for {ROLE}.

Input:
- Role: {ROLE}
- Team/Department: {TEAM}
- Duration: {WEEKS} weeks
- Key systems/tools: {SYSTEMS}

Rules:
- Organize by week with clear tasks
- Include people to meet and relationships to build
- Balance learning (reading/training) with doing (hands-on tasks)
- Add checkpoints every 1-2 weeks

Output format:
Overview & Success Criteria (30/60/90 day goals)

WEEK 1: Orientation
- Tasks (checkboxes)
- People to meet
- Resources to review
- Checkpoint

WEEK 2-{N}: [Continue pattern]
- Tasks
- People
- Resources
- Projects (hands-on work)
- Checkpoint

Role: {ROLE}
Team: {TEAM}
Duration: {WEEKS}
Systems: {SYSTEMS}`,
    variations: [
      "Add remote-specific elements (virtual coffee chats, etc).",
      "Include culture and values learning.",
      "Make it project-based (deliver X by week 4).",
      "Add manager guide (what to cover in check-ins).",
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["onboarding", "hiring", "management"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "p17",
    slug: "feature-spec-template",
    title: "Feature Spec Template (Problem → Solution → Success)",
    purpose: "Write feature specs that engineers and designers can actually build from.",
    description: "This prompt creates clear feature specifications that connect user problems to proposed solutions. It includes success metrics, edge cases, and dependencies without unnecessary detail. The output helps teams align on what to build and why before committing to implementation.",
    whenToUse: "Use before starting significant features, when proposing new functionality, or whenever cross-functional alignment is needed. Essential for product managers, technical leads, or anyone translating user needs into technical requirements.",
    howItWorks: "The prompt structures specs around: problem definition, proposed solution, user stories, acceptance criteria, technical considerations, success metrics, and open questions. This ensures teams understand context, scope, and constraints before building.",
    bestPractices: "Write specs before designing or coding. Include designers and engineers in early review. Start with problem and impact, not solution. Define success metrics upfront. Document decisions and tradeoffs made during scoping.",
    commonMistakes: "Writing implementation details without explaining the problem. Not defining success metrics. Leaving edge cases undocumented. Forgetting dependencies on other teams. Making specs too long or too vague.",
    expectedOutput: "A structured spec containing: problem statement with user impact, proposed solution at high level, detailed user stories with acceptance criteria, technical considerations and constraints, success metrics, dependencies, and open questions for discussion.",
    limitations: "Can't replace collaborative refinement with teams. Specs will evolve during implementation. Works best for features with clear scope. May need iteration based on technical feasibility discovery.",
    technicalRequirements: "Compatible with all major models. GPT creates well-organized structures. Claude often includes better edge case coverage. Gemini sometimes surfaces creative solution angles. Works for any product type.",
    realWorldApplications: "Product managers use this for feature planning. Tech leads use it for technical design docs. Designers use it for understanding requirements. Startups use it for MVP definition. Enterprise teams use it for stakeholder alignment.",
    successMetrics: "Successful specs mean teams can start work without major questions, scope creep is minimal during implementation, and delivered features meet defined success criteria. If teams constantly ask clarifying questions, the spec was too vague.",
    relatedPrompts: "Use Technical Explainer for complex technical sections. Pair with Compare and Pick when evaluating solution approaches. Follow with Postmortem Template if launch reveals issues.",
    prompt: `Write a feature spec for {FEATURE}.

Input:
- Feature: {FEATURE}
- Problem it solves: {PROBLEM}
- Target users: {USERS}

Rules:
- Start with problem and user impact
- Include user stories with acceptance criteria
- Note technical constraints and dependencies
- Define success metrics
- List open questions

Output format:
OVERVIEW
- Problem statement
- Impact (why now, why us)

SOLUTION
- High-level approach
- Key user stories (As a [user], I want to [action] so that [outcome])
- Acceptance criteria per story

TECHNICAL CONSIDERATIONS
- Constraints
- Dependencies
- Edge cases

SUCCESS METRICS
- How we measure success
- Target outcomes

OPEN QUESTIONS
- Decisions still needed

Feature: {FEATURE}
Problem: {PROBLEM}
Users: {USERS}`,
    variations: [
      "Add mockups or wireframe descriptions.",
      "Include technical design details for engineering.",
      "Make it lean (one-pager for simple features).",
      "Add competitive analysis section.",
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["product", "specs", "planning"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "p18",
    slug: "executive-summary",
    title: "Executive Summary (Dense Information, Quick Read)",
    purpose: "Distill complex documents into summaries executives will actually read.",
    description: "This prompt creates executive summaries that extract key decisions, risks, and recommendations from longer documents. It front-loads critical information, uses visual hierarchy, and respects that executives need just enough context to make informed decisions quickly.",
    whenToUse: "Use when presenting proposals, reports, or analyses to senior leadership. Essential before board meetings, investor presentations, or any situation where busy decision-makers need the essence without the details.",
    howItWorks: "The prompt identifies the core message, extracts decision points, highlights risks and opportunities, and presents everything in scannable format. It assumes the reader may not have time for the full document and structures content for progressive disclosure.",
    bestPractices: "Keep to one page maximum. Lead with recommendation or ask. Use bullets and visual hierarchy. Quantify impact when possible. Include one-sentence rationale for key points. Attach full document for those who want details.",
    commonMistakes: "Writing mini-versions of the full document. Burying the recommendation. Using jargon without context. Not quantifying impact. Forgetting to include clear next steps. Making it too dense to scan.",
    expectedOutput: "A one-page summary containing: situation in 2-3 sentences, key recommendation or ask, supporting rationale in bullets, risks and mitigations, financial or timeline impact if relevant, and explicit next steps with owners.",
    limitations: "Can't capture all nuance from complex documents. Assumes executive has baseline context. Works best for business decisions, less effective for technical deep-dives. Requires good judgment about what to include.",
    technicalRequirements: "Compatible with all major models. GPT creates clear hierarchical structure. Claude maintains appropriate brevity. Gemini sometimes over-simplifies. Works for any document type.",
    realWorldApplications: "Consultants use this for client deliverables. Product managers use it for strategy documents. Finance teams use it for investment proposals. Operations teams use it for process change proposals. Analysts use it for research reports.",
    successMetrics: "Successful summaries mean executives make informed decisions without reading full documents, meetings stay focused on decisions rather than rehashing details, and follow-up questions are about decisions rather than clarifications.",
    relatedPrompts: "Use Email to Executive for the cover email. Pair with Technical Explainer for technical decisions. Follow with Meeting Agenda if presenting in person.",
    prompt: `Create an executive summary for {DOCUMENT_TOPIC}.

Input:
- Topic: {TOPIC}
- Key finding/recommendation: {FINDING}
- Decision needed: {DECISION}

Rules:
- Maximum one page
- Lead with recommendation/ask
- Use bullets and hierarchy
- Quantify impact
- Include risks and next steps

Output format:
SITUATION (2-3 sentences)

RECOMMENDATION / ASK
- Primary recommendation
- Key rationale (3-4 bullets)

IMPACT
- Financial/timeline/resource impact
- Risks and mitigations

NEXT STEPS
- Action items with owners
- Decision points

Topic: {DOCUMENT_TOPIC}
Finding: {FINDING}
Decision: {DECISION}`,
    variations: [
      "Add visual layout suggestions (boxes, callouts).",
      "Include options analysis (3 choices with pros/cons).",
      "Make it investor-focused (TAM, traction, ask).",
      "Add appendix section for supporting data.",
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["executive", "summary", "communication"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "p19",
    slug: "tutorial-writer",
    title: "Tutorial Writer (Step-by-Step, No Assumptions)",
    purpose: "Write tutorials that beginners can actually follow without getting stuck.",
    description: "This prompt creates detailed, beginner-friendly tutorials that assume minimal prior knowledge. It breaks complex processes into discrete steps, explains why each step matters, includes troubleshooting for common issues, and validates understanding through checkpoints.",
    whenToUse: "Use when creating how-to content, onboarding documentation, course materials, or any instructional content where readers need to successfully complete a task. Essential when teaching technical skills, software usage, or multi-step processes.",
    howItWorks: "The prompt structures tutorials with clear prerequisites upfront, numbered steps with explanations, screenshots or visual descriptions where helpful, common error handling, and checkpoints to verify progress. It anticipates confusion and addresses it proactively.",
    bestPractices: "Test tutorials with actual beginners. Include time estimates for completion. Show expected outputs after key steps. Provide troubleshooting for predictable issues. Link to prerequisite knowledge rather than assuming it.",
    commonMistakes: "Skipping basic steps that seem obvious. Not showing what success looks like. Assuming too much prior knowledge. Writing for yourself rather than beginners. Not testing with actual target users.",
    expectedOutput: "A complete tutorial containing: clear learning objective, prerequisites and setup requirements, numbered step-by-step instructions with explanations, expected outcomes at checkpoints, troubleshooting section for common issues, and next steps or related tutorials.",
    limitations: "Can't replace hands-on practice or personalized instruction. Complex topics may need to be split into multiple tutorials. Written tutorials work best when supplemented with visuals. Can't cover every possible error or configuration.",
    technicalRequirements: "Compatible with all major models. GPT creates clear step structures. Claude often includes better error handling. Gemini sometimes suggests helpful analogies. Works for any tutorial topic.",
    realWorldApplications: "Educators use this for course materials. Product teams use it for user documentation. Developer advocates use it for API tutorials. Content creators use it for technical how-tos. Support teams use it for self-service resources.",
    successMetrics: "Successful tutorials mean users complete tasks without external help, error rates are low, support tickets decrease for that topic, and users reference the tutorial later. If people frequently get stuck, the tutorial has gaps.",
    relatedPrompts: "Use Explain Like a Tutor to understand the topic deeply first. Pair with Technical Explainer for complex concepts. Follow with FAQ sections using common issues discovered.",
    prompt: `Write a tutorial for {TASK}.

Input:
- Task: {TASK}
- Target audience: {AUDIENCE} (experience level)
- Tools/platform: {TOOLS}

Rules:
- Assume minimal prior knowledge
- Number all steps clearly
- Explain why, not just how
- Include expected outputs at key points
- Add troubleshooting section

Output format:
WHAT YOU'LL LEARN

PREREQUISITES
- Required tools/knowledge
- Time needed

STEPS
1. [Step with explanation]
   Expected outcome: [what success looks like]
2. [Continue...]

TROUBLESHOOTING
- Common issue 1: solution
- Common issue 2: solution

NEXT STEPS
- Related tutorials or advanced topics

Task: {TASK}
Audience: {AUDIENCE}
Tools: {TOOLS}`,
    variations: [
      "Add video script version with visual cues.",
      "Include quiz questions to check understanding.",
      "Make it quick-start (5 minutes to hello world).",
      "Add advanced section for experienced users.",
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["tutorial", "documentation", "teaching"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "p20",
    slug: "performance-review-prep",
    title: "Performance Review Prep (Achievements + Growth)",
    purpose: "Prepare performance reviews that are fair, specific, and actionable.",
    description: "This prompt helps structure performance reviews for direct reports by organizing achievements, identifying growth areas, and setting clear goals. It maintains balance between recognition and development, uses specific examples, and avoids vague feedback that doesn't help people improve.",
    whenToUse: "Use before annual or quarterly performance reviews, promotion discussions, or any formal feedback conversation. Essential for managers providing structured feedback, or individuals preparing self-reviews.",
    howItWorks: "The prompt organizes feedback around: key accomplishments with impact, areas of strength, growth opportunities with specific examples, and future goals. It enforces specificity over generic comments and ensures feedback is actionable and tied to observable behavior.",
    bestPractices: "Collect examples throughout the review period, not just at the end. Include feedback from peers and stakeholders. Focus on impact and outcomes, not just activities. Make growth areas specific and achievable. Set 2-3 clear goals, not ten vague ones.",
    commonMistakes: "Using vague language like 'good communicator' without examples. Surprising people with feedback they haven't heard before. Making everything positive or everything negative. Setting unrealistic goals. Not tying feedback to business impact.",
    expectedOutput: "A structured review containing: summary assessment, 3-5 key accomplishments with impact metrics, strengths with examples, 2-3 growth areas with specific behaviors and suggestions, and 2-3 goals for next period with success criteria.",
    limitations: "Can't replace ongoing feedback throughout the year. Requires manager to have observed or gathered sufficient examples. Works best in supportive feedback cultures. May need customization for company-specific review formats.",
    technicalRequirements: "Compatible with all major models. Claude maintains appropriate empathetic tone. GPT creates well-structured formats. Gemini sometimes over-focuses on positive. Works for any role level.",
    realWorldApplications: "Managers use this for direct report reviews. HR teams use it to standardize review quality. Individuals use it to prepare self-assessments. Consultants use it for client team evaluations. Mentors use it for mentee feedback.",
    successMetrics: "Successful reviews mean employees understand what they did well, have clear actionable feedback for improvement, feel the review was fair, and have specific goals they can work toward. If people are surprised or confused, the review failed.",
    relatedPrompts: "Use Meeting Agenda for the review conversation. Pair with Onboarding Checklist for new manager training. Follow with Email to Executive for promotion recommendations.",
    prompt: `Prepare a performance review for {ROLE}.

Input:
- Person: {NAME}
- Role: {ROLE}
- Review period: {PERIOD}
- Key projects: {PROJECTS}

Rules:
- Use specific examples with impact
- Balance achievements and growth areas
- Make feedback actionable
- Set 2-3 clear goals for next period

Output format:
OVERALL ASSESSMENT (2-3 sentences)

KEY ACCOMPLISHMENTS
- Achievement 1 (impact)
- Achievement 2 (impact)
- Achievement 3 (impact)

STRENGTHS (with examples)
- Strength 1: [example]
- Strength 2: [example]

GROWTH OPPORTUNITIES
- Area 1: [specific behavior, suggestion]
- Area 2: [specific behavior, suggestion]

GOALS FOR NEXT PERIOD
1. [Goal with success criteria]
2. [Goal with success criteria]

Name: {NAME}
Role: {ROLE}
Period: {PERIOD}
Projects: {PROJECTS}`,
    variations: [
      "Add peer feedback section.",
      "Include development plan with resources.",
      "Make it promotion-focused (readiness assessment).",
      "Add self-reflection questions for employee.",
    ],
    modelCompatibility: ["GPT", "Claude", "Gemini"],
    tags: ["management", "performance", "feedback"],
    updatedAtISO: "2026-01-24",
  },
];
