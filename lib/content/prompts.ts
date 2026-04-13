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
  {
  id: "p21",
  slug: "business-proposal-writer",
  title: "Business Proposal Writer (Problem-Solution Framework)",
  purpose: "Create persuasive business proposals that clearly articulate value and drive decisions.",
  description: "This prompt structures compelling business proposals using a problem-solution framework. It leads with stakeholder pain points, presents your solution with clear differentiation, includes realistic implementation timelines, and addresses common objections preemptively.",
  whenToUse: "Use when pitching new initiatives to leadership, responding to RFPs, proposing vendor partnerships, seeking budget approval, or presenting strategic recommendations. Essential for any situation requiring formal buy-in or funding.",
  howItWorks: "The prompt organizes proposals into: executive summary for busy decision-makers, problem statement with business impact, proposed solution with differentiation, implementation roadmap, resource requirements and ROI projection, and risk mitigation strategies.",
  bestPractices: "Lead with business impact, not features. Use stakeholder language and metrics they care about. Include specific timelines and milestones. Address budget concerns directly. Provide clear next steps and decision points. Quantify expected outcomes whenever possible.",
  commonMistakes: "Burying the ask in paragraphs of background. Using jargon that alienates decision-makers. Not addressing obvious concerns or risks. Unrealistic timelines or budgets. Vague success metrics. Making it about you instead of the stakeholder's needs.",
  expectedOutput: "A complete proposal containing: executive summary (problem and recommendation), situation analysis with business impact, detailed solution description with differentiation, phased implementation plan, resource requirements and budget, expected outcomes with metrics, risk assessment and mitigation, and clear decision request.",
  limitations: "Can't replace relationship-building with stakeholders. Requires accurate data about costs and timelines. Works best when you understand decision criteria. May need legal or procurement review. Can't guarantee approval regardless of quality.",
  technicalRequirements: "Compatible with all major models. GPT creates strong logical flow. Claude excels at addressing objections. Gemini sometimes generates creative differentiation angles. Works for any business context.",
  realWorldApplications: "Product managers use this for feature proposals. Consultants use it for client recommendations. IT teams use it for technology investments. Marketing teams use it for campaign approvals. Operations teams use it for process improvements.",
  successMetrics: "Successful proposals get approved or advance to next stage, stakeholders understand the value clearly, decision-makers don't have unanswered questions, and implementation proceeds as outlined. If proposals consistently get rejected or stall, they're missing key elements.",
  relatedPrompts: "Use Executive Summary for condensed versions. Pair with Data Storytelling for impact visualization. Follow with Project Charter once approved.",
  prompt: `Write a business proposal for {INITIATIVE}.

Input:
- Initiative: {INITIATIVE}
- Target stakeholders: {STAKEHOLDERS}
- Problem being solved: {PROBLEM}
- Budget range: {BUDGET}

Rules:
- Lead with business impact, not solution details
- Use stakeholder-relevant metrics
- Address obvious objections proactively
- Include realistic timelines and costs
- Quantify expected outcomes

Output format:

EXECUTIVE SUMMARY
[Problem + Recommendation in 3-4 sentences]

SITUATION
Current state: [what's happening now]
Business impact: [cost, opportunity, or risk]

PROPOSED SOLUTION
What: [solution description]
Why this approach: [differentiation from alternatives]
How it works: [key components]

IMPLEMENTATION ROADMAP
Phase 1 (Month 1-2): [milestones]
Phase 2 (Month 3-4): [milestones]
Phase 3 (Month 5-6): [milestones]

RESOURCE REQUIREMENTS
Budget: [breakdown]
Team: [roles needed]
Timeline: [total duration]

EXPECTED OUTCOMES
- Metric 1: [baseline → target]
- Metric 2: [baseline → target]
- ROI: [calculation and timeframe]

RISKS & MITIGATION
- Risk 1: [mitigation strategy]
- Risk 2: [mitigation strategy]

DECISION REQUESTED
[Specific approval needed and next steps]

Initiative: {INITIATIVE}
Stakeholders: {STAKEHOLDERS}
Problem: {PROBLEM}
Budget: {BUDGET}`,
  variations: [
    "Add competitive analysis section.",
    "Include case studies or proof points.",
    "Make it one-page executive format.",
    "Add technical appendix for detailed specs.",
  ],
  modelCompatibility: ["GPT", "Claude", "Gemini"],
  tags: ["business", "proposal", "strategy"],
  updatedAtISO: "2026-02-03",
},
{
  id: "p22",
  slug: "incident-postmortem",
  title: "Incident Postmortem (Blameless, Action-Oriented)",
  purpose: "Document incidents in a way that improves systems without blaming people.",
  description: "This prompt creates effective incident postmortems that focus on system improvements rather than individual fault. It establishes clear timelines, identifies root causes through 5-whys analysis, and generates concrete action items with owners and deadlines.",
  whenToUse: "Use after production incidents, security breaches, customer-impacting outages, or any significant operational failure. Essential for building organizational learning and preventing recurrence.",
  howItWorks: "The prompt structures postmortems with: incident summary and impact, detailed timeline of events, root cause analysis, contributing factors, action items with owners, and lessons learned. It maintains blameless language and focuses on process and system improvements.",
  bestPractices: "Write postmortems within 48 hours while details are fresh. Include timeline in UTC with precise timestamps. Use 5-whys to find root causes, not just symptoms. Assign specific owners to action items. Set realistic deadlines. Share widely for organizational learning.",
  commonMistakes: "Blaming individuals instead of examining systems. Stopping at surface-level causes. Writing vague action items without owners. Making postmortems feel like punishment. Not following up on action items. Treating postmortems as administrative burden instead of learning opportunity.",
  expectedOutput: "A complete postmortem containing: incident summary with severity and impact, detailed timeline of detection and response, root cause analysis with contributing factors, what went well and what went poorly, 3-7 specific action items with owners and deadlines, and lessons learned for broader application.",
  limitations: "Can't prevent all future incidents. Requires psychological safety to be effective. Works best with accurate incident data. May need technical expertise to identify true root causes. Can't replace real-time incident response processes.",
  technicalRequirements: "Compatible with all major models. Claude maintains appropriate blameless tone. GPT creates clear timeline structures. Gemini sometimes suggests preventive measures. Works for technical and non-technical incidents.",
  realWorldApplications: "Engineering teams use this for production outages. Security teams use it for breach analysis. Operations teams use it for process failures. Customer support teams use it for major customer issues. Healthcare teams use it for patient safety events.",
  successMetrics: "Successful postmortems mean action items get completed, similar incidents decrease over time, team feels psychologically safe reporting issues, and organizational learning occurs. If incidents repeat without improvement, postmortems aren't working.",
  relatedPrompts: "Use Root Cause Analysis for deeper investigation. Pair with Project Retrospective for longer-term learnings. Follow with Process Documentation for updated runbooks.",
  prompt: `Write a blameless postmortem for {INCIDENT}.

Input:
- Incident: {INCIDENT}
- Date/time: {DATETIME}
- Duration: {DURATION}
- Impact: {IMPACT}

Rules:
- Use blameless language (no individual blame)
- Include precise timeline with UTC timestamps
- Use 5-whys to find root cause
- Make action items specific with owners
- Focus on system and process improvements

Output format:

INCIDENT SUMMARY
What happened: [1-2 sentences]
Severity: [SEV-1/2/3]
Duration: [detection to resolution]
Impact: [users/revenue/data affected]

TIMELINE (all times UTC)
HH:MM - [event]
HH:MM - [event]
HH:MM - [resolution]

ROOT CAUSE ANALYSIS
Immediate cause: [what broke]
Why? [first why]
Why? [second why]
Why? [continue to root]
Root cause: [systemic issue]

CONTRIBUTING FACTORS
- Factor 1: [what made it worse]
- Factor 2: [what delayed detection]

WHAT WENT WELL
- [positive aspects of response]

WHAT WENT POORLY
- [areas needing improvement]

ACTION ITEMS
1. [Specific action] - Owner: [name] - Due: [date]
2. [Specific action] - Owner: [name] - Due: [date]
3. [Specific action] - Owner: [name] - Due: [date]

LESSONS LEARNED
- [Broader takeaway for organization]
- [Process or system insight]

Incident: {INCIDENT}
Date/time: {DATETIME}
Duration: {DURATION}
Impact: {IMPACT}`,
  variations: [
    "Add customer communication section.",
    "Include metrics and monitoring graphs.",
    "Make it security-incident focused (threat analysis).",
    "Add cost analysis section for financial impact.",
  ],
  modelCompatibility: ["GPT", "Claude", "Gemini"],
  tags: ["incident", "operations", "reliability"],
  updatedAtISO: "2026-02-03",
},
{
  id: "p23",
  slug: "user-research-synthesis",
  title: "User Research Synthesis (Patterns to Insights)",
  purpose: "Transform raw user research data into actionable insights and recommendations.",
  description: "This prompt helps synthesize qualitative user research into clear patterns, insights, and design implications. It moves beyond summarizing feedback to identifying underlying needs, clustering related themes, and prioritizing opportunities based on frequency and impact.",
  whenToUse: "Use after user interviews, usability tests, surveys, or field research. Essential when you have rich qualitative data that needs to inform product decisions, design changes, or strategy.",
  howItWorks: "The prompt organizes research findings by: identifying recurring themes across participants, synthesizing observations into insights about user needs and behaviors, highlighting critical pain points with supporting quotes, and translating findings into prioritized recommendations.",
  bestPractices: "Include participant context and sample size. Use actual quotes to illustrate patterns. Distinguish between what users say and what they need. Prioritize insights by frequency and severity. Connect insights to business goals. Show, don't just tell—include examples.",
  commonMistakes: "Just listing individual feedback without synthesis. Treating all feedback equally without prioritization. Ignoring contradictory data. Jumping to solutions before understanding needs. Cherry-picking quotes that support existing beliefs. Not distinguishing strong patterns from outliers.",
  expectedOutput: "A research synthesis containing: study overview and methodology, participant demographics, 4-6 key themes with supporting evidence, critical insights about user needs and behaviors, pain points ranked by severity and frequency, opportunities for improvement, and prioritized recommendations with rationale.",
  limitations: "Can't replace quantitative validation for major decisions. Quality depends on research methodology used. May miss important nuance in complex situations. Can't account for non-represented user segments. Insights are directional, not definitive proof.",
  technicalRequirements: "Compatible with all major models. Claude excels at pattern identification. GPT creates clear thematic organization. Gemini sometimes suggests creative solution angles. Works with any qualitative research data.",
  realWorldApplications: "Product teams use this after user interviews. UX researchers use it to communicate findings. Design teams use it to inform redesigns. Product marketing uses it for positioning. Strategy teams use it for opportunity identification.",
  successMetrics: "Successful synthesis means stakeholders understand user needs clearly, insights inform actual product decisions, team alignment increases around priorities, and recommendations get implemented. If research sits unused, synthesis failed to connect to action.",
  relatedPrompts: "Use Data Storytelling to present findings. Pair with Business Proposal Writer for research-backed recommendations. Follow with Product Requirements for implementation.",
  prompt: `Synthesize user research findings for {PRODUCT/FEATURE}.

Input:
- Research type: {TYPE} (interviews/usability/survey)
- Participants: {NUMBER} {DESCRIPTION}
- Research focus: {FOCUS}
- Raw findings: {DATA}

Rules:
- Identify patterns across participants, not individual feedback
- Support themes with specific quotes or examples
- Distinguish high-frequency from low-frequency issues
- Focus on underlying needs, not requested features
- Prioritize insights by impact and frequency

Output format:

RESEARCH OVERVIEW
Method: [interviews/tests/survey]
Participants: [N participants, demographics]
Focus: [what we investigated]

KEY THEMES

Theme 1: [Pattern name]
What we observed: [description]
Supporting evidence: "[quote]", "[quote]"
Frequency: [X of N participants]

Theme 2: [Pattern name]
[Continue format...]

CRITICAL INSIGHTS
1. [Core user need or behavior insight]
   Why it matters: [business or user impact]

2. [Continue...]

TOP PAIN POINTS (ranked by severity × frequency)
1. [Pain point] - Severity: High/Med/Low - Frequency: X/N users
2. [Continue...]

OPPORTUNITIES
- [Opportunity 1 based on unmet need]
- [Opportunity 2]

RECOMMENDATIONS (prioritized)
1. [Recommendation]
   Rationale: [supporting insight]
   Impact: [expected outcome]

2. [Continue...]

Product/Feature: {PRODUCT/FEATURE}
Type: {TYPE}
Participants: {NUMBER} {DESCRIPTION}
Focus: {FOCUS}`,
  variations: [
    "Add journey map highlighting pain points.",
    "Include personas based on behavioral patterns.",
    "Make it comparison-focused (competitive study).",
    "Add quantitative metrics where available.",
  ],
  modelCompatibility: ["GPT", "Claude", "Gemini"],
  tags: ["research", "UX", "insights"],
  updatedAtISO: "2026-02-03",
},
  {
  id: "p24",
  slug: "stakeholder-communication-plan",
  title: "Stakeholder Communication Plan (Right Message, Right Time)",
  purpose: "Design communication strategies that keep stakeholders informed without overwhelming them.",
  description: "This prompt creates targeted communication plans that match message content and frequency to stakeholder needs and influence levels. It segments audiences, defines key messages for each group, establishes appropriate channels and cadence, and sets clear success metrics.",
  whenToUse: "Use when launching major initiatives, managing organizational changes, running cross-functional projects, or handling crisis communications. Essential when multiple stakeholder groups need different information at different times.",
  howItWorks: "The prompt maps stakeholders by influence and interest, defines tailored messaging for each segment, specifies communication channels and frequency, identifies key milestones requiring updates, and establishes feedback mechanisms to ensure messages land effectively.",
  bestPractices: "Segment stakeholders by decision authority and information needs, not just titles. Customize message depth—executives need summaries, implementers need details. Use their preferred channels. Front-load critical information. Build in two-way feedback. Update the plan as project evolves.",
  commonMistakes: "One-size-fits-all messaging that bores some and confuses others. Over-communicating to disengaged stakeholders. Under-communicating to critical decision-makers. Using wrong channels (email for urgent, Slack for strategic). Not measuring if messages are understood.",
  expectedOutput: "A communication plan containing: stakeholder map with influence/interest levels, tailored key messages for each group, communication matrix showing who gets what when via which channel, milestone-based update schedule, escalation paths for issues, and feedback mechanisms.",
  limitations: "Can't force stakeholders to engage or read messages. Requires ongoing maintenance as situations change. Works best with clear project milestones. May need adjustment based on organizational culture. Can't replace relationship-building.",
  technicalRequirements: "Compatible with all major models. Claude creates nuanced stakeholder segmentation. GPT organizes clear matrices. Gemini sometimes suggests creative engagement tactics. Works for any organizational context.",
  realWorldApplications: "Project managers use this for cross-functional initiatives. Change management teams use it for reorganizations. Product teams use it for launches. Communications teams use it for crisis response. Executives use it for strategic announcements.",
  successMetrics: "Successful plans mean stakeholders feel appropriately informed, decisions aren't delayed by information gaps, pushback decreases due to transparency, and engagement metrics show messages are read. If stakeholders are surprised or confused, the plan has gaps.",
  relatedPrompts: "Use Executive Summary for high-level updates. Pair with Change Management Plan for transformation projects. Follow with Meeting Agenda for stakeholder sessions.",
  prompt: `Create a stakeholder communication plan for {PROJECT/INITIATIVE}.

Input:
- Project: {PROJECT}
- Duration: {TIMELINE}
- Key stakeholders: {STAKEHOLDERS}
- Major milestones: {MILESTONES}

Rules:
- Segment stakeholders by influence and information needs
- Tailor message depth and frequency to each group
- Match channels to stakeholder preferences
- Define clear success metrics
- Build in feedback mechanisms

Output format:

STAKEHOLDER MAP

High Influence, High Interest:
- [Name/Group]: [role in project]

High Influence, Low Interest:
- [Name/Group]: [role in project]

Low Influence, High Interest:
- [Name/Group]: [role in project]

KEY MESSAGES BY AUDIENCE

Executive Leadership:
- Core message: [strategic impact in 2-3 sentences]
- What they need to know: [decisions, risks, resources]
- What they don't need: [implementation details]

Implementation Team:
- Core message: [tactical focus]
- What they need to know: [specs, timelines, responsibilities]

[Additional groups...]

COMMUNICATION MATRIX

| Audience | Message Type | Channel | Frequency | Owner |
|----------|-------------|---------|-----------|-------|
| Execs | Strategic update | Email | Monthly | [name] |
| Team | Sprint progress | Slack | Weekly | [name] |

MILESTONE COMMUNICATIONS

Week 2: [Kickoff announcement]
- Audience: [all stakeholders]
- Message: [what's launching and why]
- Channel: [all-hands + email]

Week 8: [Milestone 1 completion]
- Audience: [key groups]
- Message: [progress and next steps]

FEEDBACK MECHANISMS
- [How stakeholders can ask questions]
- [How we'll measure message effectiveness]

ESCALATION PATH
If [issue type] → Contact [person] via [channel]

Project: {PROJECT}
Timeline: {TIMELINE}
Stakeholders: {STAKEHOLDERS}`,
  variations: [
    "Add crisis communication protocols.",
    "Include FAQ section for common questions.",
    "Make it change-management focused (resistance mitigation).",
    "Add visual timeline/roadmap for stakeholders.",
  ],
  modelCompatibility: ["GPT", "Claude", "Gemini"],
  tags: ["communication", "stakeholder", "project-management"],
  updatedAtISO: "2026-02-03",
},
{
  id: "p25",
  slug: "competitive-analysis-framework",
  title: "Competitive Analysis Framework (Strategic Positioning)",
  purpose: "Analyze competitors to identify strategic advantages and market opportunities.",
  description: "This prompt structures comprehensive competitive analysis that goes beyond feature comparison. It examines competitor strategies, identifies positioning gaps, assesses strengths and vulnerabilities, and translates findings into actionable strategic recommendations.",
  whenToUse: "Use when entering new markets, planning product strategy, preparing for fundraising, defending market position, or making build-vs-buy decisions. Essential for strategic planning and positioning exercises.",
  howItWorks: "The prompt organizes analysis around: competitor landscape mapping, detailed capability comparison across key dimensions, strategic positioning assessment, SWOT analysis for each major competitor, and identification of white space opportunities where you can win.",
  bestPractices: "Focus on 3-5 key competitors, not dozens. Go beyond features to business models and strategies. Include emerging threats, not just established players. Use primary research (actual product testing) not just public materials. Identify what they're good at, not just weaknesses.",
  commonMistakes: "Creating massive feature checklists without strategic insight. Only highlighting competitor weaknesses. Ignoring business model differences. Treating all competitors as equal threats. Not updating analysis as market evolves. Underestimating new entrants.",
  expectedOutput: "A competitive analysis containing: market landscape overview, detailed comparison of 3-5 key competitors across strategic dimensions, positioning map showing market segments, SWOT analysis for each competitor, white space opportunities, and strategic recommendations for differentiation.",
  limitations: "Based on publicly available information and testing, not insider knowledge. Competitors' strategies may change rapidly. Can't predict future moves with certainty. Market positioning may vary by geography. Requires ongoing updates to stay relevant.",
  technicalRequirements: "Compatible with all major models. Claude provides nuanced strategic analysis. GPT creates clear comparison frameworks. Gemini sometimes identifies non-obvious patterns. Works for any competitive market.",
  realWorldApplications: "Product teams use this for roadmap prioritization. Strategy teams use it for market entry decisions. Sales teams use it for competitive positioning. Investors use it for due diligence. Marketing teams use it for messaging differentiation.",
  successMetrics: "Successful analysis means clear strategic decisions result, positioning becomes sharper, win rates improve in competitive deals, and team understands where to compete and where to avoid. If analysis sits unused, it lacked actionability.",
  relatedPrompts: "Use SWOT Analysis for deeper competitor assessment. Pair with Business Proposal Writer for market entry plans. Follow with Product Strategy for differentiation roadmap.",
  prompt: `Conduct competitive analysis for {PRODUCT/MARKET}.

Input:
- Your product/company: {YOUR_COMPANY}
- Market: {MARKET}
- Key competitors: {COMPETITORS}
- Analysis focus: {FOCUS} (features/pricing/strategy/positioning)

Rules:
- Limit to 3-5 most relevant competitors
- Go beyond features to business models
- Include emerging threats
- Identify what competitors do well
- Find white space opportunities

Output format:

MARKET LANDSCAPE
Market size: [TAM/SAM]
Key segments: [customer types]
Competitive intensity: [high/medium/low and why]

COMPETITOR OVERVIEW

Competitor 1: [Name]
- Target customer: [who they serve best]
- Business model: [how they make money]
- Key strength: [what they do exceptionally]
- Key weakness: [where they're vulnerable]
- Market share: [estimate if available]

[Repeat for each competitor...]

DETAILED COMPARISON

| Dimension | You | Comp 1 | Comp 2 | Comp 3 |
|-----------|-----|--------|--------|--------|
| Pricing | [approach] | [approach] | [approach] | [approach] |
| Target customer | [segment] | [segment] | [segment] | [segment] |
| Core differentiator | [what] | [what] | [what] | [what] |
| Go-to-market | [strategy] | [strategy] | [strategy] | [strategy] |

POSITIONING MAP
[Describe 2x2 matrix with key dimensions]
- High [X], High [Y]: [competitors in quadrant]
- Your position: [where you sit and why]

COMPETITOR SWOT

[Competitor Name]
Strengths: [2-3 items]
Weaknesses: [2-3 items]
Opportunities they're pursuing: [1-2 items]
Threats to them: [1-2 items]

WHITE SPACE OPPORTUNITIES
- [Underserved segment or need]
- [Emerging capability gap]
- [Strategic positioning opportunity]

STRATEGIC RECOMMENDATIONS
1. [Recommendation for differentiation]
   Rationale: [why this matters]
2. [Recommendation for competitive defense]
3. [Recommendation for market positioning]

Your company: {YOUR_COMPANY}
Market: {MARKET}
Competitors: {COMPETITORS}`,
  variations: [
    "Add pricing analysis and unit economics.",
    "Include customer perception survey data.",
    "Make it vertical-specific (industry focus).",
    "Add technology/capability assessment.",
  ],
  modelCompatibility: ["GPT", "Claude", "Gemini"],
  tags: ["strategy", "competitive", "market-analysis"],
  updatedAtISO: "2026-02-03",
},
{
  id: "p26",
  slug: "onboarding-checklist-creator",
  title: "Onboarding Checklist Creator (30-60-90 Day Success)",
  purpose: "Design onboarding experiences that get new hires productive and engaged quickly.",
  description: "This prompt creates a role-aware onboarding plan with concrete milestones for the first 30, 60, and 90 days. It goes beyond paperwork by combining logistics, learning, relationship-building, and early wins so a new hire is not just informed, but actually becoming productive. It is especially useful when managers need a repeatable onboarding structure that still feels personalized by role, seniority, and work mode.",
  whenToUse: "Use this when hiring a new employee, bringing on a long-term contractor, onboarding a first-time manager, or moving an internal team member into a new role. It is most valuable when you want every new hire to get a consistent experience without reducing onboarding to a generic checklist.",
  decisionContext: "A good onboarding plan has to balance speed and confidence. New hires need enough structure to know what success looks like, but not so much process that the first week becomes administrative overload. This prompt is strongest when you already know the role outcomes, key relationships, and systems a person must learn in order to contribute well.",
  howItWorks: "The prompt breaks onboarding into phases: pre-start setup, day-one logistics, week-one orientation, month-one learning, month-two supported contribution, and month-three ownership. Each phase covers tasks, learning objectives, stakeholder relationships, and success criteria so the plan feels like a progression instead of a long unordered list.",
  bestPractices: "Assign an onboarding buddy in addition to the manager. Give the new hire one early win in the first two weeks. Make success criteria visible so expectations are not implicit. Include cultural and social integration, not just tool setup. Customize by seniority, because leadership onboarding should look different from entry-level onboarding.",
  commonMistakes: "Overloading the first week with compliance tasks. Leaving relationship-building to chance. Defining goals too vaguely for days 30, 60, and 90. Skipping role-specific training pathways. Treating remote onboarding like office onboarding with Zoom pasted on top. Waiting too long to gather feedback from the new hire.",
  expectedOutput: "A strong output includes: pre-start preparation for the manager and IT, a realistic day-one agenda, week-one must-do items, learning goals for month one, contribution expectations for month two, ownership targets for month three, key people to meet, and a check-in rhythm that keeps the plan alive.",
  limitations: "This prompt cannot replace thoughtful management. It also assumes there is at least some role clarity, documentation, and calendar space for check-ins. If the company has no clear expectations or the manager is unavailable, the output may look organized while the real onboarding experience still feels chaotic.",
  technicalRequirements: "Compatible with all major models. GPT usually produces clear timelines and operational detail. Claude tends to add stronger relationship and communication guidance. Gemini can surface creative learning suggestions. Works best when you provide specific role context, team structure, and work mode.",
  realWorldApplications: "People ops teams use this to standardize onboarding without making it robotic. Startup managers use it to shorten time to first meaningful contribution. Remote teams use it to make relationship-building more intentional. Department heads use it when hiring multiple people into similar roles and wanting a consistent baseline.",
  successMetrics: "A good onboarding plan reduces time to productivity, increases role clarity, improves new-hire confidence, and helps people build the right relationships early. Signals that onboarding is working include strong 30-day feedback, faster contribution, lower confusion about priorities, and fewer avoidable early churn problems.",
  relatedPrompts: "Use Meeting Agenda for recurring 1-on-1 check-ins, Training Plan for deeper capability development, and Performance Review Prep when converting the 90-day checkpoint into a formal evaluation conversation.",
  specificRecommendations: "Ask the model to write separate manager actions and new-hire actions so accountability is clearer. If the role is remote, explicitly request connection rituals and communication expectations. If the role is senior, ask for stakeholder mapping and decision-rights context in addition to task lists.",
  whenToIgnore: "Skip this approach when the role is extremely short-term, the work is informal by design, or you truly need a one-page orientation instead of a structured 90-day ramp plan.",
  prompt: `Create an onboarding plan for {ROLE}.

Input:
- Role: {ROLE}
- Department: {DEPARTMENT}
- Seniority: {LEVEL} (entry/mid/senior/leadership)
- Work mode: {MODE} (remote/hybrid/in-office)

Rules:
- Phase activities by 30-60-90 days
- Balance tasks, learning, and relationships
- Include early wins for confidence
- Set clear success criteria for each phase
- Customize for role and seniority

Output format:

PRE-START (Manager prep)
- [Setup task 1]
- [Setup task 2]
- [Equipment/access needed]

DAY 1 AGENDA
9:00 AM - [Welcome and orientation]
10:00 AM - [IT setup]
11:00 AM - [Team introduction]
Lunch - [Buddy/team lunch]
Afternoon - [Key tool training]

WEEK 1 PRIORITIES
Must complete:
- [Administrative task]
- [Access/training]
Must meet:
- [Manager 1-on-1]
- [Buddy check-in]
- [Key stakeholder intro]
Should learn:
- [Company mission/values]
- [Team structure and processes]

MONTH 1 (Learning & Absorbing)
Learning objectives:
- [Understand product/service]
- [Learn key systems and tools]
- [Understand team workflows]

Key tasks:
- [Shadowing opportunities]
- [Training sessions to complete]
- [Documentation to review]

Relationships to build:
- [Cross-functional partners]
- [Mentors or subject matter experts]

Success criteria:
- [Can explain company value prop]
- [Completed required training]
- [Knows who to ask for what]

MONTH 2 (Contributing with Support)
Objectives:
- [First real project/responsibility]
- [Start contributing to team goals]

Key tasks:
- [Specific deliverable 1]
- [Specific deliverable 2]
- [Process participation]

Success criteria:
- [Completes first project with feedback]
- [Participates actively in team meetings]
- [Asks questions and seeks help appropriately]

MONTH 3 (Independent Contribution)
Objectives:
- [Own area of responsibility]
- [Work with minimal oversight on routine tasks]

Key tasks:
- [Ongoing responsibility]
- [Independent project]

Success criteria:
- [Meets quality standards independently]
- [Understands how work connects to goals]
- [Proactively identifies issues/opportunities]

CHECK-IN SCHEDULE
- Day 1 end of day: Quick pulse check
- End of week 1: First week reflection
- End of week 2: Early feedback session
- Day 30: Month 1 review
- Day 60: Month 2 review
- Day 90: Performance review and goal setting

Role: {ROLE}
Department: {DEPARTMENT}
Level: {LEVEL}`,
  variations: [
    "Add remote-specific connection activities.",
    "Include technical skills assessment checkpoints.",
    "Make it manager-specific (leadership onboarding).",
    "Add cultural immersion activities for company values.",
    "Create separate manager-owned and new-hire-owned checklists.",
    "Add a 14-day fast-start version for startup environments.",
  ],
  modelCompatibility: ["GPT", "Claude", "Gemini"],
  tags: ["onboarding", "HR", "management", "people-ops", "remote"],
  updatedAtISO: "2026-02-03",
},
{
  id: "p27",
  slug: "pricing-strategy-framework",
  title: "Pricing Strategy Framework (Value-Based Positioning)",
  purpose: "Design pricing that captures value, fits market positioning, and drives growth.",
  description: "This prompt helps develop pricing strategies grounded in customer value perception, competitive positioning, and business model. It evaluates different pricing models, suggests tier structures, identifies anchoring strategies, and projects revenue impact of different approaches.",
  whenToUse: "Use when launching new products, repositioning existing offerings, entering new markets, defending against competition, or optimizing revenue. Essential for any pricing decision beyond 'cost-plus.'",
  howItWorks: "The prompt analyzes: customer willingness to pay and value metrics, competitive pricing benchmarks, business model implications of different structures, psychological pricing principles, and tier/packaging strategies that maximize revenue while serving different customer segments.",
  bestPractices: "Start with value to customer, not cost to you. Test pricing with actual buyers. Use anchoring (show high-priced option to make others seem reasonable). Make it easy to understand. Align pricing with market positioning. Plan how to communicate changes. Build in flexibility to adjust.",
  commonMistakes: "Cost-plus pricing that ignores value. Too many tiers that confuse buyers. Pricing too low out of fear. Not testing willingness to pay. Copying competitor pricing without strategic rationale. Hidden fees that erode trust. Changing prices too frequently or without communication.",
  expectedOutput: "A pricing strategy containing: pricing philosophy and value proposition, recommended pricing model and structure, detailed tier breakdown with features and price points, competitive positioning rationale, psychological pricing tactics, revenue projections, and implementation plan with communication strategy.",
  limitations: "Can't guarantee customer acceptance without testing. Market dynamics may shift quickly. Competitor responses can't be fully predicted. Requires understanding of customer value perception. May need iteration based on market feedback.",
  technicalRequirements: "Compatible with all major models. Claude provides nuanced value-based reasoning. GPT creates clear tier structures. Gemini sometimes suggests creative packaging. Works for products, services, and platforms.",
  realWorldApplications: "Product teams use this for new launches. SaaS companies use it for tier optimization. Consultants use it for service pricing. Retailers use it for promotional strategy. Marketplaces use it for take-rate decisions.",
  successMetrics: "Successful pricing means revenue per customer increases, conversion rates remain healthy, customers perceive fair value, competitive win rates improve, and pricing supports growth goals. If customers consistently push back or choose lowest tier, pricing isn't optimized.",
  relatedPrompts: "Use Competitive Analysis to inform positioning. Pair with Business Proposal Writer for internal buy-in. Follow with Go-to-Market Plan for launch execution.",
  prompt: `Develop pricing strategy for {PRODUCT/SERVICE}.

Input:
- Product/Service: {OFFERING}
- Target customers: {CUSTOMERS}
- Value provided: {VALUE}
- Competitors' pricing: {COMPETITIVE_PRICING}
- Business goals: {GOALS}

Rules:
- Ground in customer value, not just costs
- Consider psychological pricing principles
- Align with market positioning
- Suggest tier structure if applicable
- Project revenue impact

Output format:

PRICING PHILOSOPHY
Value proposition: [core value to customer]
Market positioning: [premium/mid-market/value]
Strategic objective: [revenue/growth/market-share]

CUSTOMER VALUE ANALYSIS
What customers get:
- [Value driver 1]: [specific benefit]
- [Value driver 2]: [specific benefit]

Estimated willingness to pay:
- [Customer segment 1]: [range based on value]
- [Customer segment 2]: [range]

RECOMMENDED PRICING MODEL
Model: [subscription/usage/tiered/freemium/perpetual]
Rationale: [why this model fits customers and business]

TIER STRUCTURE (if applicable)

Tier 1: [Starter/Basic]
- Price: [amount per period]
- Target customer: [who this serves]
- Included features:
  • [Feature 1]
  • [Feature 2]
- Limitations: [what's not included]
- Rationale: [why this price/packaging]

Tier 2: [Professional/Growth]
- Price: [amount]
- Target customer: [who this serves]
- Everything in Tier 1, plus:
  • [Additional feature 1]
  • [Additional feature 2]
- Rationale: [why this is anchored here]

Tier 3: [Enterprise/Premium]
- Price: [custom or fixed]
- Target customer: [who this serves]
- Everything in Tier 2, plus:
  • [Premium feature 1]
  • [White-glove service]

COMPETITIVE POSITIONING
| | You | Competitor A | Competitor B |
|---------|-----|--------------|--------------|
| Entry price | [X] | [Y] | [Z] |
| Mid tier | [X] | [Y] | [Z] |
| Positioning | [value story] | [their story] | [their story] |

Our differentiation: [why our pricing makes sense]

PSYCHOLOGICAL PRICING TACTICS
- [Tactic 1]: [e.g., charm pricing at $99 vs $100]
- [Tactic 2]: [e.g., annual discount to increase LTV]
- [Anchor point]: [how to make prices seem reasonable]

REVENUE PROJECTIONS
Assumptions:
- [X customers in Tier 1 at $Y = $Z]
- [X customers in Tier 2 at $Y = $Z]
Total projected revenue: [amount]
Compared to [alternative approach]: [variance]

IMPLEMENTATION PLAN
Phase 1: [Test with pilot customers]
Phase 2: [Public launch with positioning]
Communication strategy: [how to message value]
Adjustment triggers: [when to reconsider]

Offering: {OFFERING}
Customers: {CUSTOMERS}
Value: {VALUE}`,
  variations: [
    "Add discounting strategy and guidelines.",
    "Include churn analysis by price point.",
    "Make it freemium-focused (conversion funnel).",
    "Add international pricing considerations.",
  ],
  modelCompatibility: ["GPT", "Claude", "Gemini"],
  tags: ["pricing", "strategy", "revenue"],
  updatedAtISO: "2026-02-03",
},
{
  id: "p28",
  slug: "meeting-notes-with-action-items",
  title: "Meeting Notes with Action Items (Clarity & Accountability)",
  purpose: "Document meetings so everyone knows what was decided and what happens next.",
  description: "This prompt transforms meeting discussions into clear, actionable notes. It captures key decisions with context, extracts action items with clear owners and deadlines, documents open questions, and provides enough context for people who weren't there to understand outcomes.",
  whenToUse: "Use for project meetings, client calls, strategy sessions, sprint planning, board meetings, or any meeting where decisions and actions matter. Essential when multiple stakeholders need alignment on outcomes.",
  howItWorks: "The prompt organizes notes into: meeting context and attendees, discussion summary organized by topic, explicit decisions made with rationale, action items with owner and due date, open questions or blockers, and next steps or follow-up meetings scheduled.",
  bestPractices: "Take notes in real-time or immediately after. Focus on decisions and actions, not everything said. Make action items specific and achievable. Assign one owner per item. Set realistic deadlines. Send notes within 24 hours. Follow up on action items before next meeting.",
  commonMistakes: "Transcribing everything instead of synthesizing. Vague action items like 'think about X.' No clear owners (everyone owns = no one owns). Unrealistic deadlines. Burying decisions in paragraphs. Not following up on action items. Assuming everyone remembers context.",
  expectedOutput: "Meeting notes containing: meeting metadata (date, attendees, purpose), concise discussion summary by topic, clear decisions made with context, specific action items with owner and deadline, parking lot items or open questions, and next meeting scheduled if applicable.",
  limitations: "Can't capture everything said or every nuance. Quality depends on note-taker's understanding. Requires discipline to send promptly. May miss undercurrents or politics. Can't force accountability, only document it.",
  technicalRequirements: "Compatible with all major models. GPT creates clear structures. Claude synthesizes discussions well. Gemini sometimes identifies implicit action items. Works for any meeting type.",
  realWorldApplications: "Project managers use this for standup and planning meetings. Account managers use it for client calls. Executives use it for leadership team meetings. Teams use it for retrospectives. Anyone uses it to create accountability.",
  successMetrics: "Successful notes mean action items get completed, attendees agree on what was decided, people who missed meeting understand outcomes, and follow-up meetings build on documented progress. If confusion persists or actions stall, notes weren't clear.",
  relatedPrompts: "Use Meeting Agenda to prepare beforehand. Pair with Project Status Update for ongoing tracking. Follow with Stakeholder Communication for broader sharing.",
  prompt: `Create meeting notes with action items for {MEETING}.

Input:
- Meeting: {MEETING_TITLE}
- Date: {DATE}
- Attendees: {ATTENDEES}
- Discussion points: {NOTES}

Rules:
- Synthesize, don't transcribe everything
- Make decisions explicit with context
- Action items must have owner and deadline
- Note open questions and blockers
- Keep it scannable for quick reference

Output format:

MEETING: {MEETING_TITLE}
Date: {DATE}
Attendees: [Present: names | Absent: names]
Purpose: [Why we met]

DISCUSSION SUMMARY

Topic 1: [Name]
- [Key point discussed]
- [Important consideration raised]
- [Outcome or direction]

Topic 2: [Name]
- [Continue format...]

DECISIONS MADE
1. [Decision]
   Context: [Why we decided this]
   Impact: [What this means]

2. [Next decision...]

ACTION ITEMS

High Priority:
□ [Specific task] - Owner: [Name] - Due: [Date]
□ [Specific task] - Owner: [Name] - Due: [Date]

Medium Priority:
□ [Specific task] - Owner: [Name] - Due: [Date]

OPEN QUESTIONS / BLOCKERS
- [Question that needs resolution]
  Who can answer: [Name or team]
- [Blocker preventing progress]
  How to unblock: [Next step]

NEXT STEPS
- [Immediate follow-up needed]
- Next meeting: [Date, purpose]

PARKING LOT (for future discussion)
- [Topic we didn't have time for]

Meeting: {MEETING_TITLE}
Date: {DATE}
Attendees: {ATTENDEES}`,
  variations: [
    "Add decision rationale section for strategic choices.",
    "Include risks or concerns discussed.",
    "Make it client-facing (external meeting recap).",
    "Add link to supporting documents or recordings.",
  ],
  modelCompatibility: ["GPT", "Claude", "Gemini"],
  tags: ["meetings", "productivity", "project-management"],
  updatedAtISO: "2026-02-03",
},
{
  id: "p29",
  slug: "customer-journey-map",
  title: "Customer Journey Map (End-to-End Experience)",
  purpose: "Visualize the complete customer experience to identify friction and opportunity.",
  description: "This prompt creates detailed customer journey maps showing touchpoints, emotions, pain points, and opportunities across the entire customer lifecycle. It reveals gaps between expected and actual experience, highlights moments that matter, and identifies where to invest in improvements.",
  whenToUse: "Use when designing customer experience strategy, identifying service gaps, prioritizing product improvements, onboarding new team members to customer reality, or building empathy for user problems. Essential for CX and product strategy.",
  howItWorks: "The prompt maps the journey in stages: awareness, consideration, purchase, onboarding, active use, renewal/expansion, and advocacy. For each stage it captures: customer actions, touchpoints, emotional state, pain points, and improvement opportunities.",
  bestPractices: "Base it on real research, not assumptions. Include customer quotes to ground it in reality. Map both digital and human touchpoints. Show emotional highs and lows visually. Identify moments of truth that disproportionately impact perception. Prioritize fixes on biggest pain points.",
  commonMistakes: "Mapping the ideal journey instead of current reality. Focusing only on product, ignoring support and service. Making it too detailed to be useful. Not validating with actual customers. Creating it once and never updating. Not connecting insights to action.",
  expectedOutput: "A journey map containing: persona or customer segment, journey stages with goals for each, detailed touchpoints and channels at each stage, customer emotions and pain points, gaps between current and ideal experience, and prioritized opportunities for improvement with expected impact.",
  limitations: "Simplifies complex individual variations into patterns. Can't capture every customer type or scenario. Static snapshot of dynamic experiences. Requires ongoing updates as products change. May miss emerging journey patterns.",
  technicalRequirements: "Compatible with all major models. Claude provides rich emotional context. GPT creates clear stage structures. Gemini sometimes identifies unexpected touchpoints. Works for B2C, B2B, or internal processes.",
  realWorldApplications: "Product teams use this to find UX improvements. Customer success teams use it to reduce churn. Marketing teams use it to optimize conversion. Service teams use it to identify training needs. Executives use it to prioritize CX investment.",
  successMetrics: "Successful journey maps drive concrete improvements in identified pain points, increase team empathy for customers, inform product roadmap priorities, and reduce friction metrics (time to value, support tickets, churn). If nothing changes, the map was academic.",
  relatedPrompts: "Use User Research Synthesis for journey validation. Pair with Service Blueprint for operational view. Follow with Product Roadmap to address opportunities.",
  prompt: `Create a customer journey map for {PRODUCT/SERVICE}.

Input:
- Product/Service: {OFFERING}
- Customer segment: {SEGMENT}
- Journey scope: {SCOPE} (awareness to advocacy, or specific phase)
- Known pain points: {PAIN_POINTS}

Rules:
- Base on real research and data, not assumptions
- Include emotional state at each stage
- Identify specific touchpoints and channels
- Highlight moments of truth
- Prioritize improvement opportunities

Output format:

CUSTOMER PROFILE
Segment: [Who we're mapping]
Goals: [What they're trying to achieve]
Context: [Relevant background]

JOURNEY STAGES

Stage 1: AWARENESS
Customer goal: [What they're trying to do]
Actions they take:
- [Action 1]
- [Action 2]

Touchpoints:
- [Channel/interaction 1]
- [Channel/interaction 2]

Emotional state: [Feeling: curious/overwhelmed/excited/etc.]
Quote: "[Actual customer quote if available]"

Pain points:
- [Friction point 1]
- [Friction point 2]

Current experience: [What happens now]
Ideal experience: [What should happen]

Stage 2: CONSIDERATION
[Repeat structure...]

Stage 3: PURCHASE/SIGNUP
[Repeat structure...]

Stage 4: ONBOARDING
[Repeat structure...]

Stage 5: ACTIVE USE
[Repeat structure...]

Stage 6: RENEWAL/EXPANSION
[Repeat structure...]

Stage 7: ADVOCACY
[Repeat structure...]

MOMENTS OF TRUTH (critical touchpoints)
1. [Moment that disproportionately impacts perception]
   Current experience: [What happens]
   Why it matters: [Impact on customer]

2. [Continue...]

JOURNEY INSIGHTS
Biggest pain points:
1. [Pain point] - Stage: [where] - Impact: [high/med/low]
2. [Pain point] - Stage: [where] - Impact: [high/med/low]

Emotional low points:
- [Where frustration peaks and why]

Gaps in current experience:
- [What's missing or broken]

PRIORITIZED OPPORTUNITIES

High Impact, Quick Win:
1. [Improvement]
   Expected impact: [What changes]
   Effort: [Low/Medium/High]

High Impact, Longer Term:
1. [Strategic improvement]
   Expected impact: [What changes]

Offering: {OFFERING}
Segment: {SEGMENT}`,
  variations: [
    "Add quantitative metrics at each stage (conversion, time, satisfaction).",
    "Include competitive journey comparison.",
    "Make it employee-focused (internal process journey).",
    "Add service blueprint layer (backstage operations).",
  ],
  modelCompatibility: ["GPT", "Claude", "Gemini"],
  tags: ["customer-experience", "UX", "journey-mapping"],
  updatedAtISO: "2026-02-03",
},
{
  id: "p30",
  slug: "crisis-response-plan",
  title: "Crisis Response Plan (Prepared, Not Panicked)",
  purpose: "Prepare for potential crises so teams can respond quickly and effectively when they happen.",
  description: "This prompt creates crisis response playbooks that define scenarios, establish clear response protocols, assign roles and responsibilities, provide communication templates, and set decision-making authority. It helps teams respond with speed and confidence during high-stress situations.",
  whenToUse: "Use proactively to prepare for security breaches, PR incidents, service outages, safety issues, legal problems, or any scenario that could significantly harm the business. Essential for risk management and business continuity.",
  howItWorks: "The prompt structures plans by: defining specific crisis scenarios and severity levels, establishing response team and roles, creating step-by-step response protocols, preparing stakeholder communication templates, and setting escalation paths and decision authority.",
  bestPractices: "Identify likely scenarios through risk assessment. Establish clear severity levels. Assign specific roles with backups. Practice with tabletop exercises. Update contact lists regularly. Review and update plans quarterly. Keep plans accessible when systems are down.",
  commonMistakes: "Planning for everything means preparing for nothing—prioritize likely scenarios. Vague roles and decision authority. No practice runs before real crisis. Contact lists out of date. Plans buried where no one can find them. Not learning from near-misses.",
  expectedOutput: "A crisis plan containing: crisis scenarios with severity definitions, response team roster with roles and contact info, step-by-step response protocols, stakeholder communication templates, decision trees for common situations, post-crisis review process, and regular drill schedule.",
  limitations: "Can't prevent all crises or predict every scenario. Requires organizational commitment to practice. Plans become outdated without maintenance. Effectiveness depends on team training and empowerment. External crises may have uncontrollable elements.",
  technicalRequirements: "Compatible with all major models. Claude provides thorough communication guidance. GPT creates clear decision trees. Gemini sometimes identifies non-obvious scenarios. Works for any organization or crisis type.",
  realWorldApplications: "Security teams use this for breach response. PR teams use it for reputation crises. IT teams use it for outage management. Operations teams use it for safety incidents. Executives use it for business continuity planning.",
  successMetrics: "Successful plans mean faster response times in actual crises, lower impact from incidents, clear accountability during chaos, consistent communication quality, and organizational learning from each event. If teams are confused or slow during crises, plans aren't working.",
  relatedPrompts: "Use Incident Postmortem after crises to improve plans. Pair with Stakeholder Communication for crisis messaging. Follow with Process Documentation to update procedures.",
  prompt: `Create a crisis response plan for {CRISIS_TYPE}.

Input:
- Crisis type: {CRISIS_TYPE}
- Potential triggers: {TRIGGERS}
- Stakeholders affected: {STAKEHOLDERS}
- Current capabilities: {CAPABILITIES}

Rules:
- Define specific severity levels
- Assign clear roles with backups
- Create step-by-step protocols
- Prepare communication templates
- Make it accessible during crisis

Output format:

CRISIS SCENARIOS

Scenario: {CRISIS_TYPE}
Potential triggers:
- [Trigger 1]
- [Trigger 2]

Severity levels:
- SEV-1 (Critical): [Definition and impact]
- SEV-2 (High): [Definition and impact]
- SEV-3 (Medium): [Definition and impact]

RESPONSE TEAM

Incident Commander: [Name, backup]
Role: [Overall decision authority, coordinates response]
Contact: [Phone, email, backup channel]

Communications Lead: [Name, backup]
Role: [All stakeholder communications]
Contact: [Phone, email]

Technical Lead: [Name, backup]
Role: [Handles technical resolution]
Contact: [Phone, email]

[Additional roles...]

RESPONSE PROTOCOL (SEV-1)

Within 15 minutes:
1. Incident Commander confirms severity
2. Communications Lead notifies response team
3. Technical Lead begins assessment

Within 30 minutes:
1. Team convenes on [platform]
2. Communications Lead sends initial holding statement
3. Technical Lead provides situation assessment

Within 1 hour:
1. Incident Commander makes go/no-go decisions
2. Communications Lead updates stakeholders
3. Technical Lead implements immediate mitigation

Ongoing:
- Status updates every [frequency]
- Stakeholder communication every [frequency]
- Leadership briefings every [frequency]

DECISION AUTHORITY

Incident Commander can:
- [Decision type 1]
- [Decision type 2]

Requires executive approval:
- [Decision requiring escalation]
- [Financial threshold: $X]

COMMUNICATION TEMPLATES

Internal Alert:
"[SEVERITY] [CRISIS TYPE] detected at [TIME]
Impact: [Description]
Response team: Convene immediately on [platform]
Status updates: Every [frequency] on [channel]"

Customer Communication:
"We're aware of [issue] affecting [scope]
Current status: [What we know]
Impact: [What customers experience]
Next update: [Timeline]
How to get help: [Support channel]"

Executive Briefing:
"Situation: [What happened]
Impact: [Scope and severity]
Response: [What we're doing]
Timeline: [Expected resolution]
Decision needed: [If any]"

ESCALATION PATHS

If [condition], escalate to [role]
If [condition], notify [external party]
If unresolved after [timeframe], escalate to [executive]

POST-CRISIS PROTOCOL

Within 24 hours:
- Send all-clear communication
- Begin postmortem documentation

Within 1 week:
- Complete postmortem
- Identify process improvements
- Update crisis plan

DRILL SCHEDULE
- Tabletop exercise: Quarterly
- Full simulation: Annually
- Plan review: Every 6 months
- Contact list update: Monthly

QUICK REFERENCE

Emergency contacts: [Link or embedded list]
Communication channels: [Platforms]
Runbook location: [Where to find detailed procedures]
Backup procedures: [If primary systems are down]

Crisis type: {CRISIS_TYPE}
Triggers: {TRIGGERS}`,
  variations: [
    "Add legal/regulatory compliance section.",
    "Include media relations protocols for public crises.",
    "Make it cyber-specific (ransomware, breach).",
    "Add customer compensation decision framework.",
  ],
  modelCompatibility: ["GPT", "Claude", "Gemini"],
  tags: ["crisis", "risk-management", "operations"],
  updatedAtISO: "2026-02-03",
},
{
  id: "p31",
  slug: "product-requirements-document",
  title: "Product Requirements Doc (PRD) (Clear Specs, Aligned Teams)",
  purpose: "Define product requirements so engineering, design, and stakeholders build the right thing.",
  description: "This prompt creates comprehensive PRDs that clearly articulate the problem, user needs, proposed solution, success metrics, and requirements. It balances enough detail for implementation without over-specifying design. Aligns cross-functional teams before development begins.",
  whenToUse: "Use when building new features, launching products, making significant changes to existing functionality, or any time engineering needs clear requirements. Essential for avoiding rework and ensuring alignment.",
  howItWorks: "The prompt structures PRDs with: problem statement and user impact, goals and success metrics, user stories and use cases, functional and non-functional requirements, design considerations, technical constraints, and launch criteria.",
  bestPractices: "Start with the problem, not the solution. Define success metrics upfront. Include user stories to illustrate use cases. Separate must-haves from nice-to-haves. Involve engineering early for feasibility. Keep it updated as requirements evolve. Link to supporting research.",
  commonMistakes: "Solution-first instead of problem-first. Vague requirements that require guessing. Everything is 'must-have' priority. Not defining success metrics. Over-specifying UI before design involvement. Not validating assumptions with users. Writing it alone without team input.",
  expectedOutput: "A PRD containing: problem statement with user impact, measurable goals and success metrics, detailed user stories and use cases, prioritized functional requirements, non-functional requirements (performance, security, etc.), design principles and constraints, technical considerations, and launch/rollout plan.",
  limitations: "Can't eliminate all ambiguity or change requests. Requires product judgment to scope appropriately. Works best with user research foundation. May need iteration as design and technical constraints emerge. Can't replace ongoing collaboration.",
  technicalRequirements: "Compatible with all major models. GPT creates clear requirement structures. Claude provides thorough user story development. Gemini sometimes suggests edge cases. Works for any product or feature.",
  realWorldApplications: "Product managers use this as core deliverable. Engineering teams use it for estimation and planning. Designers use it to inform explorations. QA teams use it to write test plans. Stakeholders use it to understand scope.",
  successMetrics: "Successful PRDs mean fewer mid-development requirement changes, engineering and design understand what to build, stakeholders are aligned on scope, and shipped product solves the stated problem. If teams are confused or build wrong things, PRD was unclear.",
  relatedPrompts: "Use User Research Synthesis to inform requirements. Pair with Technical Specification for implementation details. Follow with Project Plan for execution timeline.",
  prompt: `Write a Product Requirements Document for {FEATURE/PRODUCT}.

Input:
- Feature/Product: {NAME}
- Problem being solved: {PROBLEM}
- Target users: {USERS}
- Key stakeholders: {STAKEHOLDERS}

Rules:
- Start with problem and user need
- Define measurable success criteria
- Separate must-haves from nice-to-haves
- Include user stories for clarity
- Specify what, not how (preserve design freedom)

Output format:

OVERVIEW
Feature/Product: [Name]
Owner: [PM name]
Status: [Draft/In Review/Approved]
Target release: [Quarter/Date]

PROBLEM STATEMENT
Current situation: [What's happening now]
User impact: [How this affects users]
Business impact: [Why this matters to business]
How we know this is a problem: [Research/data]

GOALS & SUCCESS METRICS
Primary goal: [What we're trying to achieve]

Success metrics:
- [Metric 1]: Baseline [X] → Target [Y] by [when]
- [Metric 2]: Baseline [X] → Target [Y]

Secondary goals:
- [Additional benefit we expect]

USER STORIES

As a [user type]
I want to [action]
So that [benefit]

Acceptance criteria:
- [Specific condition 1]
- [Specific condition 2]

[Additional user stories...]

USE CASES

Use case 1: [Scenario name]
Actor: [Who is doing this]
Preconditions: [What's true before]
Flow:
1. [Step 1]
2. [Step 2]
3. [Step 3]
Postconditions: [What's true after]
Alternative flows: [Edge cases]

FUNCTIONAL REQUIREMENTS

Must have (P0):
1. [Requirement] - Rationale: [Why this is critical]
2. [Requirement]

Should have (P1):
1. [Requirement] - Rationale: [Why this is valuable]
2. [Requirement]

Nice to have (P2):
1. [Requirement] - Rationale: [Why this is optional]

Out of scope (for this release):
- [What we're explicitly not doing]

NON-FUNCTIONAL REQUIREMENTS

Performance:
- [Load time requirement]
- [Scalability requirement]

Security:
- [Data protection requirement]
- [Access control requirement]

Accessibility:
- [WCAG compliance level]
- [Specific accommodations]

DESIGN CONSIDERATIONS
Key principles:
- [Design principle 1 relevant to this feature]

Constraints:
- [Existing pattern to follow]
- [Platform limitation to respect]

User flows to consider:
- [Critical path users must take]

TECHNICAL CONSIDERATIONS
Dependencies:
- [System or API this relies on]

Constraints:
- [Technical limitation]

Data requirements:
- [What data needs to be stored/accessed]

OPEN QUESTIONS
1. [Question that needs resolution]
   Owner: [Who will answer]
2. [Continue...]

LAUNCH PLAN
Rollout strategy: [Percentage rollout, beta, etc.]
Go/no-go criteria: [What must be true to launch]
Monitoring: [What we'll watch closely]

APPENDIX
- Links to research/designs
- Related documents
- Previous discussions

Feature: {NAME}
Problem: {PROBLEM}
Users: {USERS}`,
  variations: [
    "Add technical specification section for complex features.",
    "Include competitive feature comparison.",
    "Make it experiment-focused (hypothesis testing).",
    "Add internationalization requirements.",
  ],
  modelCompatibility: ["GPT", "Claude", "Gemini"],
  tags: ["product-management", "requirements", "documentation"],
  updatedAtISO: "2026-02-03",
},
{
  id: "p32",
  slug: "grant-proposal-writer",
  title: "Grant Proposal Writer (Persuasive, Mission-Aligned)",
  purpose: "Write compelling grant proposals that secure funding for projects and organizations.",
  description: "This prompt creates persuasive grant proposals aligned with funder priorities. It articulates clear need and impact, presents realistic budgets, demonstrates organizational capacity, and includes measurable outcomes. Maximizes chance of funding by addressing what grant reviewers look for.",
  whenToUse: "Use when applying for foundation grants, government funding, research grants, nonprofit program support, or any competitive funding opportunity. Essential for organizations dependent on grant funding.",
  howItWorks: "The prompt structures proposals with: executive summary highlighting impact, needs statement with data, project description and methodology, organizational capacity and track record, detailed budget with justification, evaluation plan with metrics, and sustainability approach.",
  bestPractices: "Align closely with funder's mission and priorities. Use data to demonstrate need. Be specific about outcomes, not just activities. Show organizational capacity through track record. Make budget realistic and well-justified. Follow funder guidelines precisely. Get outside review before submitting.",
  commonMistakes: "Generic proposals not tailored to funder. Vague outcomes that can't be measured. Unrealistic budgets or poor justification. Focusing on organization instead of impact. Jargon that obscures clarity. Not addressing all required elements. Submitting without proofreading.",
  expectedOutput: "A grant proposal containing: compelling executive summary, needs statement with supporting data, detailed project description with timeline, clear measurable outcomes, organizational capacity overview, itemized budget with justification, evaluation methodology, and sustainability plan beyond grant period.",
  limitations: "Can't guarantee funding regardless of quality. Highly competitive process often outside your control. Requires accurate budget and program data. Works best with proven track record. May need multiple iterations for different funders.",
  technicalRequirements: "Compatible with all major models. Claude provides strong mission-driven narrative. GPT creates clear budget structures. Gemini sometimes suggests creative evaluation approaches. Works for any grant type or sector.",
  realWorldApplications: "Nonprofits use this for program funding. Researchers use it for study grants. Schools use it for educational initiatives. Community organizations use it for capacity building. Social enterprises use it for growth capital.",
  successMetrics: "Successful proposals get funded or advance to interview stage, align tightly with funder priorities, clearly demonstrate impact, include realistic budgets, and lead to strong grantee-funder relationships. Low win rates signal misalignment or weak cases.",
  relatedPrompts: "Use Business Proposal Writer for corporate sponsorships. Pair with Impact Report for demonstrating past success. Follow with Project Plan for implementation if funded.",
  prompt: `Write a grant proposal for {PROJECT/ORGANIZATION}.

Input:
- Project/Organization: {NAME}
- Funding request: {AMOUNT}
- Funder: {FUNDER_NAME}
- Funder's priorities: {PRIORITIES}
- Project description: {PROJECT_OVERVIEW}

Rules:
- Align tightly with funder's mission and priorities
- Use data to demonstrate need
- Define measurable outcomes
- Make budget realistic and justified
- Show organizational capacity

Output format:

EXECUTIVE SUMMARY (250 words)
[Compelling overview including:
- Who you are
- Problem being addressed
- Proposed solution and impact
- Amount requested
- Expected outcomes]

NEEDS STATEMENT
Problem: [What issue are you addressing]

Evidence of need:
- [Data point 1 with source]
- [Data point 2 with source]
- [Local/community context]

Population served: [Who benefits]

Geographic scope: [Where this happens]

Alignment with funder priorities:
[Explicitly connect to funder's stated goals]

PROJECT DESCRIPTION

Overview: [What you'll do in 2-3 sentences]

Goals:
1. [Specific goal]
2. [Specific goal]

Activities and timeline:

Month 1-3:
- [Activity]
- [Milestone]

Month 4-6:
- [Activity]
- [Milestone]

[Continue through project period...]

Methodology: [How you'll do this work]

Beneficiaries: [Number and description of who benefits]

EXPECTED OUTCOMES & EVALUATION

Measurable outcomes:
1. [Outcome]: [X people will achieve Y by when]
   How measured: [Data collection method]

2. [Outcome]: [Specific measurable change]
   How measured: [Method]

Evaluation plan:
- [What you'll track]
- [How often you'll measure]
- [Who will conduct evaluation]

Success criteria:
- [What success looks like]

ORGANIZATIONAL CAPACITY

Organization background:
[Brief history and mission - 2-3 sentences]

Relevant experience:
- [Past project 1]: [Outcome achieved]
- [Past project 2]: [Outcome achieved]

Key personnel:
- [Name, Role]: [Relevant qualification]
- [Name, Role]: [Relevant qualification]

Current funding/partners:
- [Major funder or partner demonstrating credibility]

BUDGET

Personnel:
- [Role]: [Hours/FTE] × [Rate] = [Amount]
Total personnel: [Amount]

Program expenses:
- [Item]: [Justification] = [Amount]
- [Item]: [Justification] = [Amount]
Total program: [Amount]

Indirect/Administrative: [X% of total] = [Amount]

TOTAL REQUEST: [Amount]

Budget narrative:
[Explain major line items and why costs are reasonable]

Other funding:
- [Confirmed/Pending amounts from other sources]

SUSTAINABILITY
[How project will continue beyond grant period:
- Additional funding sources being pursued
- Earned revenue potential
- Capacity building for long-term impact]

CONCLUSION
[2-3 sentences reinforcing impact and alignment]

Project: {NAME}
Amount: {AMOUNT}
Funder: {FUNDER_NAME}`,
  variations: [
    "Add letters of support section.",
    "Include logic model (inputs → activities → outputs → outcomes).",
    "Make it research-specific (academic grant format).",
    "Add community partnership details.",
  ],
  modelCompatibility: ["GPT", "Claude", "Gemini"],
  tags: ["grants", "fundraising", "nonprofit"],
  updatedAtISO: "2026-02-03",
},
{
  id: "p33",
  slug: "api-documentation-generator",
  title: "API Documentation Generator (Developer-Friendly Reference)",
  purpose: "Create clear API documentation that helps developers integrate successfully.",
  description: "This prompt generates comprehensive API documentation with clear endpoint descriptions, request/response examples, authentication details, and error handling. It balances technical accuracy with usability, helping developers understand and implement APIs quickly.",
  whenToUse: "Use when documenting REST APIs, GraphQL APIs, webhooks, SDKs, or any developer-facing interfaces. Essential for external APIs, internal microservices, or partner integrations.",
  howItWorks: "The prompt structures documentation with: overview and authentication, endpoint reference with parameters, request/response examples in multiple languages, error codes and handling, rate limits and best practices, and quickstart guide for common use cases.",
  bestPractices: "Start with quickstart for common use case. Provide working code examples in popular languages. Show both success and error responses. Document all parameters including optional ones. Include rate limits and authentication upfront. Keep examples up to date with API changes.",
  commonMistakes: "Assuming too much developer knowledge. Only documenting happy path, ignoring errors. Outdated examples that don't work. Missing authentication details. No explanation of why parameters exist. Jargon without explanation. Not testing examples before publishing.",
  expectedOutput: "API documentation containing: overview and base URL, authentication guide with examples, endpoint reference with all parameters, request/response examples in multiple formats, error code reference, rate limiting details, common use case tutorials, and changelog for updates.",
  limitations: "Can't replace actually testing the API. Requires technical accuracy which must be verified. May need developer review for completeness. Examples may need language-specific updates. Can't cover every possible integration scenario.",
  technicalRequirements: "Compatible with all major models. GPT creates clear parameter tables. Claude provides thorough examples. Gemini sometimes suggests helpful code snippets. Works for any API type or protocol.",
  realWorldApplications: "Platform teams use this for public APIs. Backend engineers use it for internal services. Developer advocates use it for partner integrations. SaaS companies use it for programmatic access. Open source projects use it for contributor onboarding.",
  successMetrics: "Successful docs mean developers integrate successfully without support tickets, time-to-first-API-call decreases, error rates are low due to clear guidance, and developers reference docs repeatedly. High support volume on basics signals doc gaps.",
  relatedPrompts: "Use Technical Explainer for concept documentation. Pair with Tutorial Writer for integration guides. Follow with SDK documentation if applicable.",
  prompt: `Generate API documentation for {API_NAME}.

Input:
- API name: {API_NAME}
- API type: {TYPE} (REST/GraphQL/WebSocket)
- Base URL: {BASE_URL}
- Authentication: {AUTH_METHOD}
- Key endpoints: {ENDPOINTS}

Rules:
- Start with quickstart example
- Include request/response for every endpoint
- Document all parameters and their types
- Show error responses
- Provide code examples in multiple languages

Output format:

# {API_NAME} API Documentation

## Overview
[Brief description of what this API does]

Base URL: \`{BASE_URL}\`
Version: [Current version]
Protocol: [REST/GraphQL/etc.]

## Quickstart

Get started in 5 minutes:

\`\`\`bash
# 1. Get your API key from [where]
# 2. Make your first request
curl -X GET "{BASE_URL}/endpoint" \\
  -H "Authorization: Bearer YOUR_API_KEY"
\`\`\`

Expected response:
\`\`\`json
{
  "status": "success",
  "data": {...}
}
\`\`\`

## Authentication

This API uses [authentication method].

### Getting your API key
1. [Step to obtain key]
2. [Step to activate]

### Making authenticated requests

\`\`\`javascript
// JavaScript example
const response = await fetch('{BASE_URL}/endpoint', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});
\`\`\`

\`\`\`python
# Python example
import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}
response = requests.get('{BASE_URL}/endpoint', headers=headers)
\`\`\`

## Endpoints

### [Endpoint 1: Description]

\`GET /endpoint/path\`

Description: [What this endpoint does]

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| param1 | string | Yes | [What this is] |
| param2 | integer | No | [What this is]. Default: [X] |

#### Request example

\`\`\`bash
curl -X GET "{BASE_URL}/endpoint?param1=value&param2=123" \\
  -H "Authorization: Bearer YOUR_API_KEY"
\`\`\`

#### Response example (200 OK)

\`\`\`json
{
  "status": "success",
  "data": {
    "field1": "value",
    "field2": 123
  },
  "meta": {
    "timestamp": "2026-02-03T10:00:00Z"
  }
}
\`\`\`

#### Error responses

**400 Bad Request**
\`\`\`json
{
  "status": "error",
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "param1 is required"
  }
}
\`\`\`

**401 Unauthorized**
\`\`\`json
{
  "status": "error",
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or missing API key"
  }
}
\`\`\`

### [Endpoint 2: Description]
[Repeat structure...]

## Error Codes

| Code | HTTP Status | Description | Resolution |
|------|-------------|-------------|------------|
| UNAUTHORIZED | 401 | Invalid API key | Check your API key |
| RATE_LIMITED | 429 | Too many requests | Wait before retrying |
| INVALID_PARAMETER | 400 | Bad request parameter | Check parameter format |

## Rate Limiting

- Limit: [X requests per minute]
- Headers returned:
  - \`X-RateLimit-Limit\`: Total allowed
  - \`X-RateLimit-Remaining\`: Remaining in window
  - \`X-RateLimit-Reset\`: Unix timestamp when limit resets

When rate limited:
\`\`\`json
{
  "status": "error",
  "error": {
    "code": "RATE_LIMITED",
    "message": "Rate limit exceeded. Retry after 60 seconds."
  }
}
\`\`\`

## Best Practices

1. **Use appropriate HTTP methods**: GET for reading, POST for creating, etc.
2. **Handle rate limits**: Implement exponential backoff
3. **Cache responses**: When data doesn't change frequently
4. **Monitor errors**: Log all 4xx and 5xx responses

## Common Use Cases

### Use case: [Common task]
\`\`\`javascript
// Complete example showing how to [accomplish task]
async function doCommonTask() {
  // Step 1: [Do this]
  const step1 = await fetch(...);
  
  // Step 2: [Then do this]
  const step2 = await fetch(...);
  
  return result;
}
\`\`\`

## Changelog

**v1.1** (2026-02-01)
- Added [new endpoint]
- Improved [existing feature]

**v1.0** (2026-01-01)
- Initial release

## Support

- Documentation: [URL]
- Issues: [GitHub/Support email]
- Status page: [URL]

API: {API_NAME}
Type: {TYPE}`,
  variations: [
    "Add webhook documentation section.",
    "Include SDK examples if available.",
    "Make it GraphQL-specific (schema, queries, mutations).",
    "Add interactive API explorer links.",
  ],
  modelCompatibility: ["GPT", "Claude", "Gemini"],
  tags: ["API", "documentation", "developer-tools"],
  updatedAtISO: "2026-02-03",
},
{
  id: "p34",
  slug: "training-curriculum-designer",
  title: "Training Curriculum Designer (Skills-Based Learning Paths)",
  purpose: "Design effective training programs that build skills progressively and measurably.",
  description: "This prompt creates structured training curricula that move learners from current state to desired competency. It sequences learning objectives, balances theory and practice, includes assessments, and provides clear completion criteria. Works for employee training, customer education, or skill development.",
  whenToUse: "Use when onboarding employees, training teams on new tools, creating customer certification programs, developing leadership programs, or building any structured learning experience. Essential for scalable knowledge transfer.",
  howItWorks: "The prompt designs curricula with: learning objectives and outcomes, prerequisite assessment, modular content sequenced by difficulty, mix of formats (reading, practice, assessment), knowledge checks throughout, and practical application opportunities.",
  bestPractices: "Start with clear learning objectives tied to job performance. Build progressively from basics to advanced. Mix learning formats for engagement. Include hands-on practice, not just theory. Assess frequently to catch gaps early. Gather feedback to improve over time.",
  commonMistakes: "Information dump without learning objectives. All theory, no practice. Content too advanced for audience. No assessment to verify learning. One-size-fits-all for different skill levels. Not updating as tools or processes change.",
  expectedOutput: "A training curriculum containing: target audience and prerequisites, measurable learning objectives, module sequence with time estimates, diverse learning activities and formats, assessments and success criteria, practical exercises or projects, and resources for continued learning.",
  limitations: "Can't replace hands-on mentorship for complex skills. Effectiveness depends on learner motivation. Requires subject matter expertise to create content. May need iteration based on learner feedback. Can't guarantee retention without reinforcement.",
  technicalRequirements: "Compatible with all major models. GPT creates clear learning sequences. Claude provides thorough assessment design. Gemini sometimes suggests creative learning activities. Works for any skill or knowledge domain.",
  realWorldApplications: "L&D teams use this for employee development. Product teams use it for user education. Consultants use it for client training. Customer success teams use it for onboarding. Schools use it for course design.",
  successMetrics: "Successful curricula mean learners achieve stated objectives, can apply skills on the job, completion rates are high, post-training performance improves, and feedback is positive. If learners can't perform after training, curriculum has gaps.",
  relatedPrompts: "Use Tutorial Writer for individual lessons. Pair with Onboarding Checklist for new hire programs. Follow with Assessment Design for measuring outcomes.",
  prompt: `Design a training curriculum for {SKILL/TOPIC}.

Input:
- Skill/Topic: {TOPIC}
- Target audience: {AUDIENCE} (role, experience level)
- Current state: {CURRENT_STATE}
- Desired state: {DESIRED_STATE}
- Time available: {DURATION}

Rules:
- Define measurable learning objectives
- Sequence from basics to advanced
- Mix learning formats (read, watch, practice)
- Include assessments throughout
- Provide practical application opportunities

Output format:

CURRICULUM OVERVIEW

Topic: {TOPIC}
Target audience: [Who this is for]
Duration: [Total hours/days]
Format: [In-person/online/hybrid/self-paced]

LEARNING OBJECTIVES

By the end of this curriculum, learners will be able to:
1. [Specific, measurable objective]
2. [Specific, measurable objective]
3. [Specific, measurable objective]

PREREQUISITES

Required knowledge:
- [Concept or skill learner must have]
- [Tool or access needed]

Pre-assessment:
[Quick quiz or questionnaire to verify readiness]

CURRICULUM STRUCTURE

Module 1: [Foundation Topic]
Duration: [X hours]
Format: [Video + Reading + Exercise]

Learning objectives:
- [Specific outcome from this module]

Content:
1. [Lesson 1]: [Topic] (30 min)
   - [Key concept covered]
   - [Activity or example]

2. [Lesson 2]: [Topic] (45 min)
   - [Key concept covered]
   - [Hands-on practice]

Assessment:
- [Quiz or exercise to check understanding]
- Passing criteria: [What learner must demonstrate]

Module 2: [Building on Basics]
Duration: [X hours]
[Repeat structure, progressively harder...]

Module 3: [Advanced Application]
Duration: [X hours]
[Continue...]

LEARNING ACTIVITIES

Reading materials:
- [Article/Doc 1]: [Why this matters]
- [Article/Doc 2]: [What to focus on]

Video content:
- [Video 1]: [What learner will see] (X min)

Hands-on exercises:
- Exercise 1: [Task description]
  Expected outcome: [What success looks like]
  Time: [X min]

- Exercise 2: [Task description]
  Difficulty: [Beginner/Intermediate/Advanced]

Capstone project:
[Comprehensive project applying all skills learned]
Requirements: [What must be included]
Evaluation: [How it will be assessed]

ASSESSMENTS

Knowledge checks (Module completion):
- [Type]: [Format and passing criteria]

Skills assessment (Mid-point):
- [Practical task to demonstrate ability]
- Rubric: [How performance is evaluated]

Final assessment:
- [Comprehensive evaluation]
- Passing score: [Percentage or criteria]

FACILITATION NOTES (if instructor-led)

Module 1:
- Common misconceptions: [What to clarify]
- Difficult concepts: [Where learners struggle]
- Time management: [Pace guidance]

RESOURCES

Required tools:
- [Tool or platform needed]

Recommended reading:
- [Book/Resource for deeper learning]

Support:
- [Where to get help during training]

CERTIFICATION (if applicable)
- Requirements: [What learner must complete]
- Validity: [How long certification lasts]

REINFORCEMENT & NEXT STEPS

30-day check-in:
- [Quick refresher or Q&A]

Advanced learning path:
- [Next topic to master]
- [Additional certifications]

Topic: {TOPIC}
Audience: {AUDIENCE}
Duration: {DURATION}`,
  variations: [
    "Add microlearning version (5-10 min modules).",
    "Include learning management system (LMS) structure.",
    "Make it certification-focused (exam prep).",
    "Add peer learning and collaboration components.",
  ],
  modelCompatibility: ["GPT", "Claude", "Gemini"],
  tags: ["training", "education", "curriculum"],
  updatedAtISO: "2026-02-03",
},
{
  id: "p35",
  slug: "negotiation-preparation-framework",
  title: "Negotiation Preparation Framework (Strategy & Tactics)",
  purpose: "Prepare for negotiations by identifying leverage, alternatives, and strategy.",
  description: "This prompt helps prepare for business negotiations by analyzing interests on both sides, identifying BATNA (best alternative to negotiated agreement), defining walkaway points, and planning tactics for different scenarios. Increases odds of favorable outcomes through preparation.",
  whenToUse: "Use before salary negotiations, vendor contracts, partnership agreements, job offers, real estate deals, or any situation requiring negotiation. Essential when stakes are high or relationships matter long-term.",
  howItWorks: "The prompt structures preparation around: clarifying your interests and theirs, determining BATNA and walkaway point, identifying sources of leverage, planning opening positions and concessions, anticipating objections, and defining success criteria.",
  bestPractices: "Research the other party's interests and constraints. Know your BATNA before entering. Separate relationship from substance. Plan concessions you can give. Practice active listening. Focus on interests, not positions. Be willing to walk away if it doesn't meet your criteria.",
  commonMistakes: "Entering without knowing BATNA. Revealing walkaway point too early. Making unilateral concessions. Taking things personally. Focusing on winning instead of good outcome. Not preparing for different scenarios. Ignoring the relationship for short-term gains.",
  expectedOutput: "A negotiation prep document containing: situation overview and parties involved, your interests and their likely interests, your BATNA and walkaway point, sources of leverage on both sides, opening position and concession strategy, anticipated objections and responses, and success criteria.",
  limitations: "Can't predict other party's exact behavior. Assumes rational actors (emotions complicate). Requires good intelligence about other party. Works best when time permits preparation. Can't guarantee outcomes even with good preparation.",
  technicalRequirements: "Compatible with all major models. Claude provides nuanced interest analysis. GPT creates clear strategy frameworks. Gemini sometimes suggests creative leverage points. Works for any negotiation type.",
  realWorldApplications: "Sales teams use this for deal negotiations. Hiring managers use it for salary discussions. Procurement teams use it for vendor contracts. Business development teams use it for partnerships. Individuals use it for job offers or major purchases.",
  successMetrics: "Successful preparation means achieving your key objectives, maintaining relationship quality, avoiding agreements worse than BATNA, feeling confident during negotiation, and reaching mutually beneficial outcomes. Walking away from bad deals is also success.",
  relatedPrompts: "Use Competitive Analysis to understand market rates. Pair with Business Proposal Writer for value articulation. Follow with Contract Review for finalization.",
  prompt: `Prepare negotiation strategy for {NEGOTIATION}.

Input:
- Negotiation: {TOPIC}
- Other party: {COUNTERPARTY}
- Your role: {YOUR_POSITION}
- Context: {BACKGROUND}
- Timeline: {DEADLINE}

Rules:
- Identify interests, not just positions
- Define clear BATNA and walkaway point
- Anticipate their perspective and constraints
- Plan concession strategy
- Keep relationship considerations in mind

Output format:

SITUATION OVERVIEW

What's being negotiated: [Topic]
Parties involved: [You, Counterparty, others]
Timeline: [When this must be resolved]
Relationship importance: [One-time/Long-term partner]
Power dynamic: [Who needs this more]

YOUR INTERESTS (what you really want)

Primary interests:
1. [Core need]: [Why this matters]
2. [Core need]: [Why this matters]

Secondary interests:
- [Nice to have]
- [Additional consideration]

THEIR INTERESTS (what they likely want)

Primary interests:
1. [What they probably need]: [Why]
2. [What they probably need]: [Why]

Constraints they face:
- [Budget limitation]
- [Timeline pressure]
- [Political consideration]

YOUR BATNA (Best Alternative to Negotiated Agreement)

If this negotiation fails, your alternative is:
[Specific alternative option]

Value of BATNA: [How good is this alternative]
Strength: [Better/Worse/Equal to negotiated deal]

WALKAWAY POINT

You will walk away if:
- [Specific condition that's unacceptable]
- [Deal-breaker criterion]

This is based on: [Rationale]

THEIR BATNA (estimated)

Their alternative if deal fails:
[What you think they'll do]

Strength of their BATNA: [How desperate are they]

LEVERAGE ANALYSIS

Your leverage:
- [Source of power 1]: [Why this gives you advantage]
- [Source of power 2]: [Market condition, unique value, etc.]

Their leverage:
- [Their power source]: [Why this constrains you]

OPENING POSITION

Your opening offer:
[Initial position - should be ambitious but defensible]

Justification:
[How you'll support this number/position]

Expected opening from them:
[What they'll probably start with]

NEGOTIATION ZONES

Your ideal outcome: [Best realistic result]
Your target outcome: [What you're aiming for]
Your acceptable range: [Zone of possible agreement]
Your walkaway point: [Floor/ceiling you won't cross]

Zone of Possible Agreement (ZOPA):
[Overlap between your acceptable range and their likely range]

CONCESSION STRATEGY

Concessions you can make (in order):
1. [Minor concession]: Give if they [what they give]
2. [Medium concession]: Only if they [significant give]
3. [Major concession]: Last resort if [condition]

Concessions you'll request:
1. [Priority ask]
2. [Secondary ask]

Concession pacing:
[Start high, concede slowly, make them work for it]

ANTICIPATED OBJECTIONS & RESPONSES

Objection 1: "Your price is too high"
Response: [How you'll justify value and/or reframe]

Objection 2: "[Likely pushback]"
Response: [Prepared response]

TACTICS TO USE

Building rapport:
- [How to establish connection]

Creating urgency:
- [If applicable - competing offers, deadlines]

Anchoring:
- [Going first with strong position OR letting them go first]

Questions to ask:
- "[Open question to understand their constraints]"
- "[Question to reveal their priorities]"

TACTICS TO AVOID
- [Hard-line approach if relationship matters]
- [Revealing your walkaway point]
- [Making first concession without reciprocity]

SUCCESS CRITERIA

Must have (deal-breakers):
- [Non-negotiable element]

Should have (important):
- [High priority item]

Nice to have (bonus):
- [Additional value if possible]

PREPARATION CHECKLIST

Research completed:
□ Understand their business/constraints
□ Know market rates/comparables
□ Confirmed your BATNA

Strategy set:
□ Opening position prepared
□ Concession plan ready
□ Responses to objections drafted

Logistics:
□ Time/place confirmed
□ Decision-maker will be present
□ Any documents/data needed

POST-NEGOTIATION

If deal reached:
- Document agreement immediately
- [Next steps to formalize]

If no deal:
- Activate BATNA: [How]
- Leave door open if: [Relationship worth preserving]

Negotiation: {TOPIC}
Counterparty: {COUNTERPARTY}`,
  variations: [
    "Add cross-cultural negotiation considerations.",
    "Include game theory analysis for complex multi-party negotiations.",
    "Make it salary-specific (compensation negotiation).",
    "Add mediation strategy if third party involved.",
  ],
  modelCompatibility: ["GPT", "Claude", "Gemini"],
  tags: ["negotiation", "strategy", "business"],
  updatedAtISO: "2026-02-03",
},
{
  id: "p36",
  slug: "content-strategy-planner",
  title: "Content Strategy Planner (Audience-First, Goal-Driven)",
  purpose: "Design content strategies that attract, engage, and convert target audiences.",
  description: "This prompt creates comprehensive content strategies aligned with business goals and audience needs. It defines content pillars, maps content to customer journey stages, establishes formats and channels, sets success metrics, and creates editorial calendars for consistent execution.",
  whenToUse: "Use when launching content marketing, repositioning brand voice, planning campaigns, building thought leadership, or optimizing underperforming content. Essential for marketing teams and content creators.",
  howItWorks: "The prompt structures strategy around: audience analysis and needs, business goals and success metrics, content pillars and themes, content-to-journey mapping, format and channel selection, editorial calendar, and measurement framework.",
  bestPractices: "Start with deep audience understanding, not just demographics. Align content to business goals (awareness/leads/retention). Create content for each funnel stage. Mix formats for different consumption preferences. Be consistent with publishing. Measure performance and iterate based on data.",
  commonMistakes: "Creating content for yourself, not audience. No clear goals or metrics. Publishing inconsistently. Only top-of-funnel content. All promotional, no value. Not optimizing for search or distribution. Creating one-offs instead of series. Ignoring performance data.",
  expectedOutput: "A content strategy containing: audience personas and needs, business objectives and KPIs, content pillars and key themes, content mapped to funnel stages, format recommendations (blog/video/podcast/social), distribution channels, 90-day editorial calendar, and measurement plan.",
  limitations: "Can't guarantee content will go viral or perform. Requires ongoing execution and resources. Takes time to show results. Competitive landscape constantly changes. Quality execution matters as much as strategy.",
  technicalRequirements: "Compatible with all major models. Claude provides thorough audience analysis. GPT creates clear calendar structures. Gemini sometimes suggests creative content angles. Works for B2B, B2C, or personal brands.",
  realWorldApplications: "Marketing teams use this for quarterly planning. Content creators use it for consistent publishing. Startups use it for thought leadership. Agencies use it for client campaigns. Individuals use it for personal brand building.",
  successMetrics: "Successful strategies mean measurable progress toward goals (traffic, leads, engagement), audience growth, increased brand authority, content that ranks and gets shared, and efficient content production. If content sits unused or doesn't move metrics, strategy needs revision.",
  relatedPrompts: "Use Customer Journey Map to inform content needs. Pair with SEO Strategy for organic reach. Follow with Editorial Calendar for execution planning.",
  prompt: `Create a content strategy for {BRAND/PRODUCT}.

Input:
- Brand/Product: {NAME}
- Target audience: {AUDIENCE}
- Business goals: {GOALS}
- Current content: {CURRENT_STATE}
- Timeframe: {PERIOD} (e.g., Q1, 6 months, year)

Rules:
- Start with audience needs, not what you want to say
- Align content to business goals
- Cover full funnel (awareness → consideration → decision)
- Mix content formats
- Make it executable with resources available

Output format:

STRATEGY OVERVIEW

Brand: {NAME}
Timeframe: [Period]
Primary goal: [Awareness/Leads/Retention/Thought leadership]

AUDIENCE ANALYSIS

Primary audience: [Segment name]
Demographics: [Age, role, industry if B2B]
Psychographics: [Values, motivations, challenges]

Content needs:
- [Question they're asking]: [Stage in journey]
- [Problem they have]: [Stage in journey]
- [Information they seek]: [Stage in journey]

Current content consumption:
- Preferred formats: [Blog, video, podcast, social]
- Platforms they use: [Where to reach them]
- Content gaps: [What they can't find now]

Secondary audience: [If applicable]
[Repeat analysis...]

BUSINESS OBJECTIVES & METRICS

Primary goal: [e.g., Generate 500 qualified leads]

Supporting objectives:
1. [Objective]: [Metric to track]
2. [Objective]: [Metric to track]

Key Performance Indicators:
- [KPI 1]: Current [X] → Target [Y]
- [KPI 2]: Current [X] → Target [Y]
- [KPI 3]: Current [X] → Target [Y]

CONTENT PILLARS (3-5 core themes)

Pillar 1: [Theme name]
Description: [What this covers]
Why it matters to audience: [Relevance]
Business connection: [How this supports goals]
Keywords/Topics: [SEO terms or subject areas]

Pillar 2: [Theme name]
[Repeat...]

CONTENT BY FUNNEL STAGE

AWARENESS (Top of Funnel)
Audience: [People with problem, not solution-aware]
Content goal: [Educate, build trust, attract]

Content types:
- [Format 1]: [Topic examples]
- [Format 2]: [Topic examples]

Distribution:
- [Channel 1]: [Why this reaches audience]
- [Channel 2]: [Social, SEO, paid]

Example content:
- "[Content title idea]" - [Format] addressing [audience need]

CONSIDERATION (Middle of Funnel)
Audience: [Evaluating solutions]
Content goal: [Demonstrate expertise, build preference]

Content types:
- [Format]: [Topic examples]

Example content:
- "[Content idea]"

DECISION (Bottom of Funnel)
Audience: [Ready to choose solution]
Content goal: [Overcome objections, drive conversion]

Content types:
- [Format]: [Topic examples]

Example content:
- "[Content idea]"

RETENTION/ADVOCACY
Audience: [Current customers]
Content goal: [Drive adoption, reduce churn, encourage advocacy]

Content types:
- [Format]: [Topic examples]

CONTENT FORMATS & CHANNELS

Primary formats:
1. [Format]: [Frequency] on [Platform]
   Why: [Fits audience preference and goals]
   Resource needs: [Team or tools required]

2. [Format]: [Frequency]
   [Continue...]

Content repurposing strategy:
[How to maximize each piece of content across formats]
Example: Blog post → Social snippets → Email → Podcast discussion

EDITORIAL CALENDAR (90 days)

Week 1:
- [Content piece 1]: [Format, Pillar, Funnel stage, Owner, Publish date]
- [Content piece 2]: [Details]

Week 2:
[Continue weekly breakdown...]

Month 2:
[Monthly themes and key pieces]

Month 3:
[Continue...]

Content production workflow:
- Week -3: [Ideation and assignment]
- Week -2: [First draft]
- Week -1: [Editing and design]
- Week 0: [Publish and promote]

DISTRIBUTION & PROMOTION

Owned channels:
- [Blog/Website]: [How to optimize]
- [Email list]: [How to leverage]

Earned channels:
- [SEO strategy]: [Key tactics]
- [PR/Guest posting]: [Target publications]

Paid channels:
- [Platform]: [Budget allocation and strategy]

Social promotion plan:
- [Platform 1]: [Frequency and approach]
- [Platform 2]: [Frequency and approach]

MEASUREMENT FRAMEWORK

Content performance metrics:
- [Metric]: [How to track, what indicates success]
- [Engagement metric]: [Benchmark]

Reporting cadence: [Weekly/Monthly]

Success criteria:
- [What good performance looks like by end of period]

Optimization process:
- Review metrics [frequency]
- Double down on [what's working]
- Sunset or revise [what's not working]

RESOURCES & ROLES

Content team:
- [Role]: [Responsibility]
- [Role]: [Responsibility]

Tools needed:
- [Content management]
- [Design/Production]
- [Analytics]

Budget: [If applicable - paid promotion, tools, contractors]

COMPETITIVE LANDSCAPE

What competitors are doing well:
- [Competitor]: [Their content strength]

White space opportunities:
- [Content angle they're missing]
- [Format underutilized in space]

Brand: {NAME}
Audience: {AUDIENCE}
Goals: {GOALS}`,
  variations: [
    "Add SEO keyword strategy and research.",
    "Include influencer partnership plan.",
    "Make it video-first (YouTube/TikTok strategy).",
    "Add crisis communication and brand safety protocols.",
  ],
  modelCompatibility: ["GPT", "Claude", "Gemini"],
  tags: ["content-strategy", "marketing", "planning"],
  updatedAtISO: "2026-02-03",
},
{
  id: "p37",
  slug: "risk-assessment-matrix",
  title: "Risk Assessment Matrix (Identify, Prioritize, Mitigate)",
  purpose: "Systematically identify and prioritize risks to make better decisions about where to invest in mitigation.",
  description: "This prompt creates comprehensive risk assessments that identify potential threats, evaluate likelihood and impact, prioritize by severity, and propose mitigation strategies. It helps teams anticipate problems before they become crises and allocate resources wisely to reduce risk.",
  whenToUse: "Use when planning projects, launching products, making strategic decisions, preparing for audits, or any situation with significant downside risk. Essential for project management, compliance, and strategic planning.",
  howItWorks: "The prompt structures assessment with: risk identification across categories, likelihood and impact evaluation, priority scoring (likelihood × impact), detailed mitigation strategies for high-priority risks, ownership assignment, and monitoring approach.",
  bestPractices: "Include diverse perspectives in risk identification. Be realistic about likelihood and impact. Focus mitigation on highest priority risks first. Assign clear owners for monitoring. Update regularly as situations change. Don't just identify risks—actually implement mitigations.",
  commonMistakes: "Only considering obvious risks. All risks rated as high priority (everything is critical = nothing is). Vague mitigation strategies without owners. Creating the assessment but not acting on it. Not updating as projects progress. Optimism bias (underestimating likelihood or impact).",
  expectedOutput: "A risk assessment containing: comprehensive risk inventory across categories, likelihood and impact ratings, priority matrix showing highest risks, detailed mitigation plans for top risks with owners and timelines, residual risk after mitigation, and monitoring approach.",
  limitations: "Can't predict all possible risks or black swan events. Ratings involve subjective judgment. Effectiveness depends on team's experience and honesty. Can't eliminate all risk, only manage it. Requires ongoing maintenance.",
  realWorldApplications: "Project managers use this for initiative planning. Compliance teams use it for regulatory risk. Product teams use it for launch readiness. Finance teams use it for strategic decisions. Operations teams use it for business continuity.",
  successMetrics: "Successful assessments mean risks are identified before becoming problems, highest risks have active mitigations, surprises decrease over time, and stakeholders understand risk profile. If crises still happen from known risk categories, assessment or mitigation failed.",
  relatedPrompts: "Use Crisis Response Plan for high-impact risks. Pair with Project Plan for mitigation execution. Follow with Incident Postmortem when risks materialize.",
  prompt: `Create a risk assessment for {PROJECT/INITIATIVE}.

Input:
- Project/Initiative: {NAME}
- Scope: {SCOPE}
- Timeline: {TIMELINE}
- Stakeholders: {STAKEHOLDERS}
- Known concerns: {CONCERNS}

Rules:
- Identify risks across multiple categories
- Rate likelihood (1-5) and impact (1-5) consistently
- Prioritize by severity score (likelihood × impact)
- Propose specific, actionable mitigations
- Assign owners to monitor and mitigate

Output format:

RISK ASSESSMENT OVERVIEW

Project: {NAME}
Assessment date: [Date]
Assessed by: [Team/Person]
Review frequency: [How often to update]

RISK IDENTIFICATION

Technical Risks:
- [Risk description]
- [Risk description]

Resource Risks:
- [Risk description]

Schedule Risks:
- [Risk description]

External/Market Risks:
- [Risk description]

Compliance/Legal Risks:
- [Risk description]

Operational Risks:
- [Risk description]

DETAILED RISK ANALYSIS

Risk 1: [Clear description of what could go wrong]

Category: [Technical/Resource/Schedule/etc.]

Likelihood: [1-5]
- 1 = Very unlikely (<10%)
- 2 = Unlikely (10-30%)
- 3 = Possible (30-50%)
- 4 = Likely (50-75%)
- 5 = Very likely (>75%)

Rating: [X/5]
Rationale: [Why this likelihood]

Impact: [1-5]
- 1 = Negligible (minor inconvenience)
- 2 = Low (small delays or costs)
- 3 = Medium (moderate impact on schedule/budget/quality)
- 4 = High (significant impact, major delays)
- 5 = Critical (project failure, major loss)

Rating: [X/5]
Impact if occurs: [Specific consequence]

Severity Score: [Likelihood × Impact = X/25]

[Repeat for each identified risk...]

RISK PRIORITY MATRIX

Critical Risks (Score 15-25):
1. [Risk name]: Score [X]
2. [Risk name]: Score [X]

High Risks (Score 10-14):
1. [Risk name]: Score [X]

Medium Risks (Score 5-9):
1. [Risk name]: Score [X]

Low Risks (Score 1-4):
1. [Risk name]: Score [X]

MITIGATION STRATEGIES (for high-priority risks)

Risk: [Name of critical/high risk]
Current severity: [Score]

Mitigation strategy:
[Specific actions to reduce likelihood or impact]

Actions:
1. [Specific action]: Owner [Name], Due [Date]
2. [Specific action]: Owner [Name], Due [Date]

Monitoring approach:
[How we'll track if this risk is materializing]
Leading indicators: [Early warning signs]

Contingency plan:
[What we'll do if risk occurs despite mitigation]

Residual risk after mitigation:
Likelihood: [New rating/5]
Impact: [New rating/5]
New severity: [Score/25]

[Repeat for each high-priority risk...]

RISK OWNERSHIP

| Risk | Owner | Mitigation Status | Review Date |
|------|-------|------------------|-------------|
| [Name] | [Person] | [Not started/In progress/Complete] | [Date] |

MONITORING & REVIEW

Review schedule: [Frequency]
Escalation triggers:
- [Condition that requires immediate attention]

Risk dashboard:
[How risk status will be communicated to stakeholders]

ASSUMPTIONS & CONSTRAINTS

Assumptions made in this assessment:
- [Assumption that could invalidate analysis]

Constraints affecting mitigation:
- [Budget/Timeline/Resource limitation]

Project: {NAME}
Scope: {SCOPE}`,
  variations: [
    "Add quantitative risk analysis (Monte Carlo for schedule/budget).",
    "Include opportunity analysis (positive risks).",
    "Make it cybersecurity-focused (threat modeling).",
    "Add risk appetite and tolerance levels.",
  ],
  modelCompatibility: ["GPT", "Claude", "Gemini"],
  tags: ["risk-management", "planning", "project-management"],
  updatedAtISO: "2026-02-03",
},
{
  id: "p38",
  slug: "survey-design-framework",
  title: "Survey Design Framework (Insights Without Bias)",
  purpose: "Design surveys that collect actionable insights while avoiding common bias and quality issues.",
  description: "This prompt helps create well-designed surveys with clear objectives, unbiased questions, appropriate scales, logical flow, and analysis plans. It ensures surveys collect reliable data that actually informs decisions rather than confirming assumptions or confusing respondents.",
  whenToUse: "Use when collecting customer feedback, measuring employee satisfaction, conducting market research, gathering product feedback, or any time you need structured data collection. Essential for research and data-driven decision making.",
  howItWorks: "The prompt structures surveys with: clear research objectives, appropriate question types and scales, logical question sequencing, bias-free wording, skip logic where needed, realistic length, and analysis approach planned upfront.",
  bestPractices: "Start with specific research questions. Keep it as short as possible while meeting objectives. Use clear, neutral language. Avoid leading questions. Test with small group first. Mix question types appropriately. Plan analysis before launching. Ensure anonymity if asking sensitive questions.",
  commonMistakes: "Asking what you want to hear (leading questions). Too long (survey fatigue). Confusing scales or double-barreled questions. No neutral option when needed. All open-ended (hard to analyze) or all closed-ended (miss nuance). Not piloting before launch. No plan for using results.",
  expectedOutput: "A survey design containing: research objectives and hypotheses, respondent targeting and sample size, complete question set with appropriate types and scales, logical flow with skip logic, introduction explaining purpose and estimated time, and analysis plan for interpreting results.",
  limitations: "Can't force honest responses or eliminate all bias. Response rates may be low without incentives. Self-reported data may differ from behavior. Survey fatigue is real. Can't capture full context like interviews can. Analysis quality depends on design quality.",
  technicalRequirements: "Compatible with all major models. GPT creates clear question structures. Claude provides thorough bias checking. Gemini sometimes suggests creative question angles. Works for any survey type or platform.",
  realWorldApplications: "Product teams use this for feature prioritization. HR teams use it for engagement surveys. Researchers use it for academic studies. Marketing teams use it for customer insights. Customer success teams use it for NPS and satisfaction.",
  successMetrics: "Successful surveys have high completion rates, produce actionable insights, data is clean and analyzable, results inform actual decisions, and findings are statistically valid for the sample. If surveys get abandoned or produce confusing data, design failed.",
  relatedPrompts: "Use User Research Synthesis to analyze qualitative responses. Pair with Data Storytelling to present findings. Follow with Product Requirements to act on insights.",
  prompt: `Design a survey for {RESEARCH_OBJECTIVE}.

Input:
- Research objective: {OBJECTIVE}
- Target respondents: {AUDIENCE}
- Decisions this will inform: {DECISIONS}
- Target sample size: {SAMPLE_SIZE}

Rules:
- Start with clear research questions
- Use unbiased, neutral wording
- Mix question types appropriately
- Keep it as short as possible
- Plan analysis approach upfront

Output format:

SURVEY DESIGN BRIEF

Research objective: [What you're trying to learn]

Key research questions:
1. [Specific question you need answered]
2. [Specific question you need answered]

Hypotheses (if applicable):
- [What you expect to find]

Target respondents: [Who will take this]
Sample size goal: [Number needed for validity]
Estimated completion time: [X minutes]

SURVEY INTRODUCTION (what respondents see)

"[Survey title]

Thank you for taking the time to complete this survey. Your feedback will help us [purpose].

This survey will take approximately [X] minutes to complete. All responses are [anonymous/confidential] and will only be used for [purpose].

Please answer honestly—there are no right or wrong answers."

SURVEY QUESTIONS

Section 1: [Section name, e.g., "Background"]
Purpose: [What this section establishes]

Q1: [Question text]
Type: [Multiple choice / Rating scale / Open-ended / etc.]
Options: [If applicable]
- Option 1
- Option 2
- Prefer not to answer [if sensitive]

Required: [Yes/No]
Rationale: [Why asking this]

Q2: [Question]
Type: Likert scale
Scale: Strongly disagree (1) to Strongly agree (5)
Statement: "[Neutral statement to rate]"

[Continue all questions...]

Section 2: [Section name]
Purpose: [What this section measures]

Q5: [Question]
Skip logic: [If Q4 = X, show this; otherwise skip]

[Continue...]

QUESTION TYPE GUIDANCE USED

Rating scales:
- Using consistent 1-5 scales throughout
- Labels on endpoints for clarity
- Neutral midpoint included

Multiple choice:
- Mutually exclusive options
- "Other" with text box where appropriate
- "None of the above" or "Prefer not to answer" when needed

Open-ended:
- Limited to [X] questions to avoid fatigue
- Used only when quantitative won't capture needed nuance

BIAS MITIGATION

Leading questions avoided:
- Instead of "How much do you love our product?" asking "How satisfied are you with [product]?"

Double-barreled questions avoided:
- Not asking "Is our product fast and reliable?" (two questions)

Neutral language:
- Not assuming positive or negative sentiment

Randomization:
- [If applicable] Question order randomized to reduce order bias
- [If applicable] Answer options randomized

SURVEY FLOW DIAGRAM

[Describe logical flow]
All respondents: Q1-Q4
If [condition]: Q5-Q7
If [condition]: Q8-Q10
All respondents: Q11-Q13 (demographics)

ANALYSIS PLAN

For quantitative questions:
- [How you'll analyze - e.g., "Calculate mean satisfaction score overall and by segment"]
- [Statistical tests if applicable]

For qualitative questions:
- [How you'll code and categorize responses]

Segmentation approach:
- [How you'll break down data - by user type, tenure, etc.]

Success criteria:
- [What findings would be significant]
- [Minimum response rate needed: X%]

SURVEY METADATA

Survey platform: [SurveyMonkey / Google Forms / Qualtrics / etc.]
Distribution method: [Email / In-app / Web link]
Incentive: [If offering - e.g., "$10 gift card" or "None"]
Launch date: [Date]
Close date: [Date]
Reminder cadence: [When to send reminders]

TESTING PLAN

Pilot group: [5-10 people from target audience]
Test for:
- Unclear questions
- Technical issues
- Time to complete
- Any missing response options

Revise based on: [Feedback from pilot]

SAMPLE SURVEY QUESTIONS (formatted for platform)

Q1: How often do you use [product]?
○ Daily
○ Weekly
○ Monthly
○ Rarely
○ Never

Q2: How satisfied are you with [product]?
Very dissatisfied  1  2  3  4  5  Very satisfied

Q3: What is the primary reason you use [product]? (Select one)
○ [Reason 1]
○ [Reason 2]
○ Other: __________

Q4: What could we improve? (Open-ended)
[Text box]

Objective: {OBJECTIVE}
Audience: {AUDIENCE}
Sample size: {SAMPLE_SIZE}`,
  variations: [
    "Add conjoint analysis for feature prioritization.",
    "Include Net Promoter Score (NPS) methodology.",
    "Make it employee-focused (engagement or pulse survey).",
    "Add MaxDiff questions for ranking preferences.",
  ],
  modelCompatibility: ["GPT", "Claude", "Gemini"],
  tags: ["research", "surveys", "data-collection"],
  updatedAtISO: "2026-02-03",
},

{
  id: "p39",
  slug: "technical-interview-prep",
  title: "Interview Prep Coach (Technical Deep Dives)",
  purpose: "Prepare for technical interviews by covering real scenarios, edge cases, and explaining your thought process clearly.",
  description: "This prompt simulates a technical interviewer who asks progressively harder questions, challenges your solutions, and coaches you on communication. It covers problem-solving approach, code quality, optimization, and how to articulate your thinking under pressure.",
  whenToUse: "Use before coding interviews, system design interviews, or any technical screening. Effective 2-3 days before the actual interview as a confidence builder and knowledge check.",
  howItWorks: "The prompt presents a coding problem or system design challenge, evaluates your solution, asks clarifying questions, suggests optimizations, and provides real feedback on communication. It simulates the collaborative aspect of technical interviews, not just problem-solving.",
  bestPractices: "Work through problems out loud—articulate your thinking. Start with clarifying questions about requirements. Propose a brute-force solution first, then optimize. Walk through your code step-by-step. Handle edge cases. Admit when you don't know something. Prepare follow-up questions about the role.",
  commonMistakes: "Jumping to optimization before solving the base case. Not asking clarifying questions. Writing code without explaining your approach first. Not testing edge cases. Being defensive about feedback. Forgetting the human side—enthusiasm and fit matter as much as technical chops.",
  expectedOutput: "Interactive interview session including: a real-world problem or scenario, feedback on your initial approach, 3-5 follow-up questions testing depth of understanding, suggested optimizations, discussion of trade-offs, and specific feedback on how you communicated your solution.",
  limitations: "Can't perfectly simulate a live interview's pressure and personality. Limited to text-based explanation of visual design problems. Can't evaluate code execution or performance in actual systems. Follow-up questions based on text may miss some nuances.",
  technicalRequirements: "Works best with GPT-4 and Claude for complex technical reasoning. Provide complete code or detailed descriptions of your approach. Specify the programming language and any framework constraints. Include any relevant requirements or edge cases from the problem.",
  realWorldApplications: "Career changers use this to brush up on interview fundamentals. Senior engineers use this when switching companies. Hiring managers use this to create interview questions. Students use this when preparing for first tech jobs.",
  successMetrics: "You can explain your approach clearly before coding. You catch your own edge cases. You can optimize solutions and discuss trade-offs. The interviewer's feedback no longer surprises you. You feel confident articulating your technical thinking.",
  relatedPrompts: "Use Explain Like a Tutor for foundational concepts you're shaky on. Combine with Career Positioning to articulate your experience clearly. Reference Real-World Problem Solver for practice with open-ended challenges.",
  prompt: `You are a technical interviewer coaching someone for their first interview (or brushing up after years away).

Their background: {BACKGROUND}
Interview type: {TYPE} (e.g., "phone screen", "coding round", "system design")
Topics to focus on: {TOPICS}

Rules:
- Start with a realistic problem or scenario
- Ask about approach before code
- Challenge edge cases and assumptions
- Ask how they'd optimize after initial solution
- Give honest, actionable feedback
- Simulate the collaborative nature of real interviews

Interview scenario:

[Present the problem or scenario clearly]

Now walk me through:
1. Your approach (before coding)
2. The code or design
3. How you'd test it
4. How you'd optimize it

Then we'll discuss trade-offs and I'll ask follow-up questions.`,
  variations: [
    "Make it system design instead of coding.",
    "Include a tricky requirement reveal halfway through.",
    "Focus on communication and explaining under pressure.",
    "Add real-time feedback as I code.",
  ],
  modelCompatibility: ["GPT", "Claude"],
  tags: ["career", "interview", "technical-skills"],
  updatedAtISO: "2026-02-03",
},

{
  id: "p40",
  slug: "content-calendar-planner",
  title: "Content Calendar Planner (Strategy to Schedule)",
  purpose: "Create a quarterly content calendar with strategy, themes, distribution channels, and specific pieces all coordinated.",
  description: "This prompt builds aligned content calendars that balance strategy with execution. It ensures content serves business goals, spreads consistency across channels, and creates enough variety to stay interesting without spinning wheels on random ideas.",
  whenToUse: "Use at the start of each quarter, when launching a new product or brand initiative, or when your content feels scattered. Most valuable when you want content that actually connects to business outcomes, not just 'posting consistently.'",
  howItWorks: "The prompt defines business goals and audience, creates monthly themes that ladder to those goals, maps specific content pieces to channels and formats, and ensures distribution timing maximizes reach. It outputs a structured calendar you can immediately publish to a tool like Asana or Notion.",
  bestPractices: "Start with clear business goals—'increase brand awareness' is vague, 'reach 5,000 new engineering managers with content about scaling teams' is actionable. Define your audience specifically. Include content types that work for your platform. Plan 10% more ideas than you'll publish to keep flexibility.",
  commonMistakes: "No connection between content and business goals—just posting because 'we need content.' Overloading one channel while ignoring others. Not batching content creation with a content calendar mindset. Ignoring seasonal trends and company events. No measurement plan tied to the calendar.",
  expectedOutput: "A complete quarterly calendar including: business goals and success metrics, audience profile and preferred formats, monthly themes with narratives, 60-90 specific content pieces with dates, channels, and distribution strategy, content format mix (blog, video, social, email, etc.), and a simple measurement plan.",
  limitations: "Calendar is only a plan—execution quality matters more. Content preferences change month-to-month based on trends and feedback. Can't predict viral moments or account for breaking news. Calendar is a constraint that enables consistency, not a cage.",
  technicalRequirements: "Works with all major models. GPT tends to create clear, structured calendars. Claude provides thematically cohesive content ideas. Gemini sometimes suggests unexpected but effective content angles. Export-ready for spreadsheets, Asana, or Notion.",
  realWorldApplications: "Marketing teams use this to coordinate campaigns across channels. Content creators use it to plan blogs and social consistently. Product teams use it for feature announcements and user education. Community managers use this for engagement initiatives.",
  successMetrics: "Team executes 80%+ of the calendar without last-minute scrambling. Content feels cohesive across channels. Engagement and traffic increase compared to previous quarter. Business goals are measurable and achieved.",
  relatedPrompts: "Use Rewrite for Clarity to refine calendar content. Combine with Audience Persona Builder to define who you're reaching. Follow with Email Sequence Designer if implementing email content.",
  prompt: `Create a quarterly content calendar aligned with business goals.

Business context:
- Company/Creator: {COMPANY}
- Primary goal this quarter: {GOAL}
- Secondary goals: {SECONDARY}

Audience:
- Who we're reaching: {AUDIENCE}
- What formats they prefer: {FORMATS}
- Where they hang out: {CHANNELS}

Output a complete content calendar with:

QUARTERLY OVERVIEW

Primary success metric: [What success looks like]
Content formats breakdown: [60% blog, 20% video, 20% social]
Publishing schedule: [3x blog per week, 2x social per day, 1x email per week]

MONTHLY THEMES

Month 1: [Theme] - [How it connects to business goal]
Month 2: [Theme] - [How it connects to business goal]
Month 3: [Theme] - [How it connects to business goal]

WEEK-BY-WEEK CONTENT BLOCKS

Week 1 of Month 1:
Topic: [Specific topic]
Format: [Blog / Video / Social / Email]
Channel: [Where it goes]
Call-to-action: [What you want them to do]
Publish date: [Date]
Owner: [Who creates]

[Continue for all 13 weeks...]

DISTRIBUTION STRATEGY

Blog (3x per week):
- Monday: [Topic type]
- Wednesday: [Topic type]
- Friday: [Topic type]
- Promotion: [How promoted on social]

Social media (daily):
- Focus: [What kind of content does well]
- Format: [Threads / Carousels / Reels / etc.]
- Engagement goal: [Comment prompts / Question types]

Email (weekly):
- Day: [When sent]
- Type: [Newsletter / Promotional / Educational]
- Segment: [If applicable]

Paid amplification:
- Budget: [If allocated]
- What gets promoted: [Top-performing organic content]

CONTENT PRODUCTION CHECKLIST

Essential supplies:
- [Templates, lists, tools needed]

Content batch schedule:
- Record videos on: [Day]
- Write blogs on: [Day]
- Create graphics on: [Day]
- Schedule social on: [Day]

Holidays/Events to plan:
- [Major events to tie content to]

MEASUREMENT PLAN

Track weekly:
- Page views by format
- Social engagement rate
- Email open/click rate

Track monthly:
- Leads generated
- Sales attributed to content
- Brand mentions increase

Success criteria:
- [Specific, measurable goals for the quarter]

Goal: {GOAL}
Channels: {CHANNELS}`,
  variations: [
    "Add customer case study schedule throughout.",
    "Focus on SEO content strategy (target keywords per piece).",
    "Create a launch-specific calendar (one-month blitz).",
    "Build a personal brand content calendar instead.",
  ],
  modelCompatibility: ["GPT", "Claude", "Gemini"],
  tags: ["marketing", "content", "strategy"],
  updatedAtISO: "2026-02-03",
},

{
  id: "p41",
  slug: "real-world-problem-solver",
  title: "Real-World Problem Solver (Constraints + Tradeoffs)",
  purpose: "Think through messy real problems with competing constraints and find practical, implementable solutions.",
  description: "This prompt helps solve problems that have no clean answer—where speed conflicts with quality, where different stakeholders want different things, where perfect isn't possible. It forces uncomfortable tradeoff conversations upfront rather than discovering conflicts later.",
  whenToUse: "Use when facing decisions with competing priorities (shipping fast vs. shipping right), complex projects with multiple stakeholders, resource constraints that force choices, or strategic decisions where different departments disagree.",
  howItWorks: "The prompt frames the problem, lists all constraints and stakeholders, evaluates options against tradeoffs systematically, and forces a decision with clear reasoning. It doesn't pretend there's a perfect answer—it surfaces the real tension and forces conscious choice.",
  bestPractices: "List all constraints honestly, including uncomfortable truths. Name who cares about what outcome. Think through second-order effects (short-term fix that breaks long-term goals). Document the tradeoff for future reference so people understand why you chose what you did.",
  commonMistakes: "Pretending constraints don't exist or avoiding the hard conversation. Optimizing for the loudest stakeholder instead of the business goal. Making decisions in a vacuum without explicit stakeholder input. Changing course when the original tradeoff is re-examined without new information.",
  expectedOutput: "A decision brief with: problem statement, all stakeholders and their priorities, complete list of constraints, 3-4 viable options with pros/cons, explicit tradeoffs explained clearly, recommended decision with reasoning, implementation plan, and a success metric to validate the choice.",
  limitations: "Can't make the decision for you—forces you to make it consciously. Can't predict all future consequences. Doesn't remove the need for human judgment. Complex organizational politics may override 'logical' choices.",
  technicalRequirements: "Works well with all major models. Claude often surfaces nuance in stakeholder conflicts. GPT tends toward structured decision matrices. Gemini might suggest creative options you hadn't considered. Clear problem framing is key.",
  realWorldApplications: "Product teams use this for feature prioritization decisions. Engineering teams use it for technical debt vs. new features. Startups use this for go-to-market decisions. Organizations use this for difficult people or process decisions.",
  successMetrics: "All stakeholders understand why the decision was made, even if it's not their preferred outcome. Implementation proceeds without constant re-negotiation. If you need to revisit the decision, new information clearly justifies the change.",
  relatedPrompts: "Use Stakeholder Communication Plan after deciding how to communicate the tradeoff. Combine with Project Management Framework for implementation. Reference Data Storytelling to present the analysis to leadership.",
  prompt: `Help me think through a real-world problem with competing priorities.

PROBLEM STATEMENT
{PROBLEM}

THE CONSTRAINTS (be honest about these)
1. {CONSTRAINT_1}
2. {CONSTRAINT_2}
3. {CONSTRAINT_3}

THE STAKEHOLDERS & WHAT THEY WANT
- {STAKEHOLDER_1}: wants {WANT_1}
- {STAKEHOLDER_2}: wants {WANT_2}
- {STAKEHOLDER_3}: wants {WANT_3}

THE SITUATION
- Time pressure: {TIME}
- Budget: {BUDGET}
- Resource availability: {RESOURCES}
- Business impact if we get it wrong: {IMPACT}

NOW: Help me think through this by:

1) Reframing the problem (what's the actual issue)
2) Listing all viable options (including ones I haven't thought of)
3) For each option, showing:
   - What each stakeholder gets
   - What they lose
   - The business impact
   - Implementation difficulty
   - Any unexpected consequences

4) Recommending the best path with clear reasoning
5) One-paragraph explanation of tradeoffs for stakeholders
6) Implementation roadmap to reduce friction

Problem: {PROBLEM}
Context: {CONTEXT}`,
  variations: [
    "Frame it as a decision matrix comparing 5+ options.",
    "Add a 'what happens if we change course later' analysis.",
    "Include a risk analysis for the recommended solution.",
    "Focus on stakeholder communication strategy.",
  ],
  modelCompatibility: ["GPT", "Claude"],
  tags: ["strategy", "decision-making", "business"],
  updatedAtISO: "2026-02-03",
},

{
  id: "p42",
  slug: "code-review-accelerator",
  title: "Code Review Accelerator (Fast, Fair, Actionable)",
  purpose: "Conduct thorough code reviews efficiently, catching real issues while respecting developers' time with clear, actionable feedback.",
  description: "This prompt helps you review code critically without being nitpicky, surface architectural issues early, and communicate feedback that helps developers improve rather than frustrate them. It balances rigor with speed.",
  whenToUse: "Use when reviewing pull requests, especially in fast-moving teams where reviews can become bottlenecks. Most valuable when you want consistency in standards and clear communication.",
  howItWorks: "The prompt reviews code for correctness, performance, maintainability, and security. It separates critical issues from nice-to-haves, explains the 'why' behind suggestions, and proposes concrete improvements. It avoids pedantic style comments in favor of meaningful feedback.",
  bestPractices: "Read for function first, style second. Ask 'why' if something looks odd rather than assuming it's wrong. Suggest improvements, don't demand them. Acknowledge good solutions and learning progress. Check tests before diving into code. Keep feedback constructive and actionable.",
  commonMistakes: "Bikeshedding on variable names instead of logic. Reviewing style instead of substance. Long feedback threads that overwhelm the developer. Not acknowledging context (maybe there's a good reason for the approach). Blocking on improvement suggestions that aren't bugs.",
  expectedOutput: "A structured code review with: brief summary of what the code does, any critical issues blocking approval, architectural or performance concerns to address, specific improvement suggestions with examples, stylistic observations and standards enforcement, and the reviewer's confidence level in the code.",
  limitations: "Can't see the full system context or understand long-term architectural plans. Doesn't replace pair programming for complex logic. Can't evaluate user-facing impact without seeing it. Suggestions need to be weighed against project momentum.",
  technicalRequirements: "Works best with GPT-4 and Claude for code-heavy reviews. Provide complete code in markdown blocks with language specified. Mention the code's purpose and any relevant context. Include test code if available.",
  realWorldApplications: "Senior engineers use this to review junior developers' code while being educational. Teams use this for consistent code quality standards. Open-source projects use this to review community contributions fairly. Technical leads use this for architectural consistency.",
  successMetrics: "Code quality improves over time. Developers feel feedback is fair and educational. Review cycle time decreases. Fewer bugs make it to production from these components.",
  relatedPrompts: "Use Technical Documentation Writer to document complex code. Combine with Bug Hunter if reviewing error handling. Reference Testing Framework Designer for robust test coverage.",
  prompt: `Review this code carefully and fairly. Separate real issues from style opinions.

CODE PURPOSE: {PURPOSE}
PROGRAMMING LANGUAGE: {LANGUAGE}
CONTEXT: {CONTEXT}

CODE TO REVIEW:
{CODE}

RELEVANT TESTS:
{TESTS}

Review this code for:

1) CORRECTNESS (does it do what it's supposed to?)
   - Does it handle edge cases?
   - Are there any logic errors?
   - Does it match the branch description?

2) PERFORMANCE & SCALABILITY
   - Any obvious performance issues?
   - Will it scale with expected load?
   - Could it be optimized?

3) MAINTAINABILITY & CLARITY
   - Is it clear what it does?
   - Could future developers understand this?
   - Is there duplication that could be extracted?

4) SECURITY & SAFETY
   - Any security vulnerabilities?
   - Proper error handling?
   - Any dangerous assumptions?

5) TESTING
   - Is test coverage adequate?
   - Do tests cover edge cases?
   - Are tests clear?

PROVIDED FEEDBACK FORMAT:

SUMMARY
[One paragraph overview]

CRITICAL ISSUES (block approval)
- Issue: [What the problem is]
  Why: [Why this matters]
  Fix: [Specific suggestion]

IMPORTANT IMPROVEMENTS (should fix before merge)
- Suggestion: [What to improve]
  Why: [Why this is important]
  Example: [How to implement]

NICE-TO-HAVE OBSERVATIONS (consider for next refactor)
- Note: [Observation]
  Alternative: [Different approach]

STYLE & STANDARDS
[Any consistency notes]

CONFIDENCE LEVEL
[Your confidence in this code going to production]

Approval: [approve / request changes / comment]

Purpose: {PURPOSE}
Language: {LANGUAGE}`,
  variations: [
    "Focus only on architecture, ignore implementation details.",
    "Make it educational—explain the 'why' behind each suggestion.",
    "Add security-focused review focusing on vulnerabilities.",
    "Create a checklist-style review for consistency.",
  ],
  modelCompatibility: ["GPT", "Claude"],
  tags: ["dev", "code-review", "collaboration"],
  updatedAtISO: "2026-02-03",
},

{
  id: "p43",
  slug: "data-storytelling-distiller",
  title: "Data Storytelling Distiller (Insights → Impact)",
  purpose: "Transform raw data analysis into compelling narratives that convince stakeholders and drive decisions.",
  description: "This prompt turns numbers into stories that people care about, starting with the insight (not the data), then building evidence. It prevents the common mistake of overwhelming people with analysis when they need clarity on what it means.",
  whenToUse: "Use when presenting analysis to stakeholders, writing reports, or when you've found something important but struggle to make others care. Essential for communicating findings that will drive decisions.",
  howItWorks: "The prompt extracts the insight first (what matters), then frames data as evidence for that insight. It includes objections to pre-empt, provides context for why this matters now, and suggests actions based on findings. It structures narrative flow, not just bullet points.",
  bestPractices: "Lead with the insight, not the data. Use comparisons to make numbers meaningful (not 'revenue grew 23%' but 'revenue grew more than industry average'). Show change where it matters. Anticipate objections and address them upfront. Connect to business goals the audience cares about.",
  commonMistakes: "Dumping all data then drawing a conclusion. Using jargon that makes simple ideas complicated. Cherry-picking data to support a desired conclusion. Not providing enough context to understand significance. Overwhelming with options instead of recommending action.",
  expectedOutput: "A structured narrative including: headline insight in plain language, context showing why it matters, the data evidence supporting it, comparison points for perspective, anticipated objections with responses, clear recommendation or next steps, and a single visual that captures the insight.",
  limitations: "Can't make boring data interesting if there's nothing meaningful there. Storytelling doesn't replace data quality—bad data told well is still bad data. Stakeholders may still disagree with interpretation. Short narratives force you to leave things out.",
  technicalRequirements: "Works well with all major models. Claude excels at narrative storytelling. GPT is strong at structured evidence presentation. Gemini often suggests unexpected but effective framings. Include all relevant numbers and context.",
  realWorldApplications: "Analysts use this to communicate findings to executives. Marketers use this to justify ad spend. Product teams use this to argue for feature prioritization. Finance teams use this to sell budget requests. Researchers use this for compelling reports.",
  successMetrics: "Stakeholders understand the insight in the first 60 seconds. They remember the core finding afterward. They take the recommended action. Data convinces rather than confuses.",
  relatedPrompts: "Use Real-World Problem Solver if the data should influence a key decision. Combine with Content Calendar Planner to turn data into shareable insights. Reference Rewrite for Clarity if narrative feels clunky.",
  prompt: `Transform this analysis into a story that will convince stakeholders to care and act.

RAW ANALYSIS:
The data/analysis: {ANALYSIS}
Sample size: {SAMPLE}
Time period: {PERIOD}

CONTEXT:
Who's the audience: {AUDIENCE}
What do they care about: {GOALS}
What's the business impact: {IMPACT}
What decision should this influence: {DECISION}

TURN THIS INTO A COMPELLING NARRATIVE:

HEADLINE (what really matters here)
[One sentence capturing the insight]

THE CONTEXT (why should they care NOW)
[Paragraph setting up relevance]

THE INSIGHT (in plain English)
[Explain what the data shows, why it's noteworthy]

THE EVIDENCE (here's the data backing this up)
[Specific numbers with comparisons for perspective]
- [Number] compared to [baseline/industry/previous]
- [Number] meaning [what it represents]
- [Number] showing [the change]

WHY THIS MATTERS (so what?)
[How this connects to their goals]
[What's the opportunity or risk]
[Why timing matters]

ANTICIPATED OBJECTIONS & RESPONSES
Q: Skeptic might ask: "[Skeptical question]"
A: "[Direct, evidence-based response]"

[Address 2-3 key objections]

THE RECOMMENDATION
[Clear, specific call-to-action]
[What success looks like]
[Timeline if applicable]

ONE SUPPORTING VISUAL
[Describe a single chart/graph that captures this insight—clarity over complexity]

Data points: {DATA}
Audience: {AUDIENCE}`,
  variations: [
    "Format as a one-page executive summary.",
    "Create a 5-minute presentation outline.",
    "Focus on surprising insights that contradict assumptions.",
    "Build a case for a major strategic shift based on data.",
  ],
  modelCompatibility: ["GPT", "Claude", "Gemini"],
  tags: ["data", "communication", "business"],
  updatedAtISO: "2026-02-03",
},

{
  id: "p44",
  slug: "email-sequence-designer",
  title: "Email Sequence Designer (Welcome → Value → Convert)",
  purpose: "Create email sequences that guide readers from welcome to action without feeling pushy or repetitive.",
  description: "This prompt designs multi-email sequences with clear progression—each email serves a purpose, moves readers closer to action, and respects their inbox. It balances education with appeal to prevent the common pitfalls of email marketing (too salesy, too frequent, irrelevant).",
  whenToUse: "Use when launching an email list, onboarding new customers, or converting prospects. Most effective when you have a clear action you want readers to take and a genuinely valuable reason for them to take it.",
  howItWorks: "The prompt maps sequence stages (welcome, education, engagement, conversion, retention) and creates specific emails for each. It ensures each email provides value upfront, includes a clear next step, and maintains engagement without over-sending.",
  bestPractices: "Email 1 should deliver value immediately. Space emails strategically—no daily blasts unless you're a news outlet. Every email should have a single, clear next step. Test subject lines for open rates. Segment if you can—different people have different needs. Measure engagement to refine.",
  commonMistakes: "First email is purely pitchy with no value. Too many emails too fast (email fatigue). Every email is a sales pitch (people unsubscribe fast). Subject lines are clickbait (destroys trust). Not providing unsubscribe clearly. Sending to a disengaged list.",
  expectedOutput: "A complete email sequence with 5-8 emails including: subject line, preview text, email copy with clear sections, call-to-action, sending timing, and segmentation notes. Each email is ready to draft and send.",
  limitations: "Email design/layout not included—just copy. Can't account for unique brand voice variations (personalization). Needs testing and iteration—won't be perfect first try. Spam filters are outside your control.",
  technicalRequirements: "Works well with all models. GPT creates clear structure. Claude excels at conversational tone. Provide your goal, audience, and typical actions you want. Format: plain copy, ready for email platform HTML.",
  realWorldApplications: "Startups use this to build email funnels. SaaS companies use this for onboarding flows. Creators use this to convert subscribers to paying. Agencies use this for client nurture sequences.",
  successMetrics: "Email open rates 25%+, click rates 5%+, conversion on final CTA 2%+ depending on industry. Low unsubscribe rate. Steady growth in engaged list. Action rates increase with each email in sequence.",
  relatedPrompts: "Use Rewrite for Clarity if email copy feels stiff. Combine with Content Calendar Planner if building weekly nurture. Reference Data Storytelling for analytics-driven emails.",
  prompt: `Design an email sequence that guides readers to {ACTION}.

SEQUENCE PURPOSE
What action do you want? {ACTION}
Who's the reader? {AUDIENCE}
Why should they care? {VALUE}

BUSINESS GOAL
What succeeds: {SUCCESS}
What fails: {FAILURE}
Timeframe: {TIMEFRAME}

OUTPUT A SEQUENCE:

EMAIL 1: WELCOME + INSTANT VALUE
Send: Immediately on signup
Subject line: [Intriguing, benefit-driven]
Preview: [First 50 chars matter]

Body:
[Greeting - use their name if available]

[Quick value upfront—deliver on signup promise]

[Why this matters / what they'll get]

[CTA: Next step]

[Signature]

EMAIL 2: ENGAGEMENT + DEEPER VALUE
Send: 2 days after Email 1
Subject: [Continue the conversation]

Body:
[Reference Email 1 briefly]

[New valuable insight / resource]

[Story or example]

[CTA: Explore more / Watch / Read]

EMAIL 3: SOCIAL PROOF + CREDIBILITY
Send: 4 days after Email 2
Subject: [What others are doing...]

Body:
[Real result or testimonial]

[Why this works (the mechanism)]

[Common objection + honest response]

[CTA: See how / Learn more]

EMAIL 4: URGENCY + FINAL PITCH
Send: 6 days after Email 3
Subject: [Limited / Last chance / Final invitation]

Body:
[Quick recap of emails 1-3]

[Why now matters (deadline, scarcity, etc.)]

[What they'll get from taking action]

[CTA: Let's go / Claim your spot]

[P.S. Address biggest objection here]

[Optional: add Email 5 RETENTION (24 hours after conversion) to thank and set expectations]

SEQUENCE METADATA

Target list: {AUDIENCE}
Sending frequency: {FREQUENCY}
Best send time: {SEND_TIME}
Unsubscribe message: [Always include clear unsubscribe]
A/B test: [What to test—subject lines, CTA text, send time]

Goal: {ACTION}
Audience: {AUDIENCE}`,
  variations: [
    "Add a re-engagement sequence for inactive subscribers.",
    "Create a post-purchase onboarding sequence.",
    "Build a weekly educational sequence (long-term nurture).",
    "Design a seasonal/event-triggered sequence.",
  ],
  modelCompatibility: ["GPT", "Claude", "Gemini"],
  tags: ["email", "marketing", "conversion"],
  updatedAtISO: "2026-02-03",
},

{
  id: "p45",
  slug: "product-requirements-generator",
  title: "Product Requirements Generator (Spec → Build)",
  purpose: "Turn product ideas into clear specifications that engineering can build without constant clarification meetings.",
  description: "This prompt creates comprehensive product requirements that include the 'why,' detailed user flows, technical constraints, and acceptance criteria. It prevents the common problem where requirements are vague until engineering starts building and discovers missing details.",
  whenToUse: "Use before handing a project to engineering, when committing to a new feature, or when you want clarity on scope before starting. Most valuable for preventing 'wait, I didn't mean that' moments.",
  howItWorks: "The prompt structures requirements with: problem statement and goals, user personas and flows, detailed feature breakdown, edge cases and error handling, technical constraints, and clear acceptance criteria for done-ness.",
  bestPractices: "Start with the problem you're solving, not the solution. Involve engineering early to understand technical feasibility. Define success metrics upfront. Test with real users if possible before building. Document assumptions explicitly.",
  commonMistakes: "Vague requirements ('make it better'). Forgetting edge cases and error states. No acceptance criteria (how do you know it's done?). Constraints discovered mid-build. Missing why this matters (context for engineering).",
  expectedOutput: "A specification document including: problem statement, goals and success metrics, complete user flows with mockup descriptions, feature breakdown, technical requirements, edge cases and error handling, acceptance criteria, and dependencies.",
  limitations: "Specs never capture everything—engineering will discover questions. User feedback may change specs mid-build. Perfect specs slow down iteration. Shipping often reveals what specs missed.",
  technicalRequirements: "Works with all models. Claude creates thorough specs. GPT structures them well. Provide your feature idea, target impact, and any constraints you know. Format: detailed narrative, technically feasible.",
  realWorldApplications: "SaaS companies use this for feature specs. Product managers use this to brief engineering. Startups use this to clarify MVP scope. Teams use this to reduce build ambiguity.",
  successMetrics: "Engineering builds it right the first time with minimal questions. QA can test against clear acceptance criteria. Launch meets the original goals. Negative scope creep during build.",
  relatedPrompts: "Use Real-World Problem Solver if facing scope tradeoffs. Combine with Project Management Framework for timeline. Reference Data Storytelling to justify the requirements.",
  prompt: `Create a product specification for: {FEATURE}

PROBLEM STATEMENT
What problem does this solve? {PROBLEM}
For whom? {USERS}
Why is it urgent? {URGENCY}

BUSINESS GOALS
Success means: {SUCCESS_METRIC}
This will increase: {IMPACT}
Timeline: {TIMELINE}

THE FEATURE: {FEATURE}

COMPLETE SPECIFICATION:

OVERVIEW
[1 sentence what this is]

GOALS FOR THIS FEATURE
- Goal 1: [Specific, measurable]
- Goal 2: [Specific, measurable]
- Goal 3: [Specific, measurable]

USER PERSONAS & FLOWS
[For each main user type:]

Persona: {PERSONA}
Pain point: [What they struggle with]

User flow: "{PERSONA}"
[Step 1: User does X]
[Step 2: System shows Y]
[Step 3: User takes action Z]
[Step 4: Outcome/success state]

FEATURE BREAKDOWN
[Specific components/functionality]

Component 1: {DESCRIPTION}
- What it does
- Where it appears
- How users interact with it

Component 2: {DESCRIPTION}
[Continue...]

EDGE CASES & ERROR HANDLING
- If [condition], then [system does]
- Error: [What could go wrong] → [Recovery]
- Edge case: [Unusual but possible scenario] → [How handled]

TECHNICAL REQUIREMENTS
Platform: {PLATFORM}
Technology constraints: {CONSTRAINTS}
Integration needs: {INTEGRATIONS}
Performance needs: {PERFORMANCE}

ACCEPTANCE CRITERIA
The feature is done when:
- [ ] User can [action 1]
- [ ] System shows [outcome 1]
- [ ] [Edge case] is handled correctly
- [ ] Performance is [metric]
- [ ] All error states show helpful messages
- [ ] [Integration] works end-to-end

DEPENDENCIES
- Does this depend on [X]? Timeline: [when]
- Does [Y] depend on this? Timeline: [when]

Feature: {FEATURE}
Users: {USERS}`,
  variations: [
    "Format as user stories (As a [user], I want [feature], so [benefit]).",
    "Add technical architecture diagram.",
    "Include data model changes required.",
    "Create a phased rollout plan.",
  ],
  modelCompatibility: ["GPT", "Claude"],
  tags: ["product", "specs", "technical"],
  updatedAtISO: "2026-02-03",
},

{
  id: "p46",
  slug: "audience-persona-builder",
  title: "Audience Persona Builder (Research → Action)",
  purpose: "Create detailed audience personas grounded in real research, not assumptions, so marketing and product decisions are data-driven.",
  description: "This prompt transforms research data (interviews, surveys, analytics) into practical personas that include goals, pain points, behaviors, and media consumption. These aren't vague descriptions—they're specific enough to guide decisions.",
  whenToUse: "Use when starting a marketing initiative, building a new product, or when current strategies aren't working and you suspect you're targeting the wrong audience. Most valuable when you have some customer data to start from.",
  howItWorks: "The prompt synthesizes research into detailed personas including: demographics, psychographics, goals, pain points, objections, media habits, and buying process. Each persona includes enough detail to feel real and guide real decisions.",
  bestPractices: "Base personas on actual customer research, not hunches. Interview 10-15 customers to find patterns. Look for anxieties and aspirations, not just surface wants. Create 3-5 personas, not 20 (personas become useless if too many). Regularly update with new data.",
  commonMistakes: "Creating personas from assumptions ('I think young people like memes'). Too many personas that blur together. Personas that are too vague to guide decisions. Ignoring that personas change as your market changes. Not using personas once created.",
  expectedOutput: "3-5 detailed personas each including: name and photo, demographics, role/job context, primary goal and secondary goals, main pain points, objections to your solution, media consumption, buying process, and 2-3 key insights for messaging.",
  limitations: "Personas are generalizations—real people are messier. Personas can codify bias if research was biased. Market changes faster than personas update. Personas guide strategy but don't replace talking to real customers.",
  technicalRequirements: "Works with all models. Claude creates nuanced personas. GPT creates structured, actionable personas. Provide customer interviews, survey data, or behavioral data. Format: narrative with supporting details.",
  realWorldApplications: "Marketers use personas for messaging strategy. Product teams use personas for feature prioritization. Sales teams use personas to tailor pitches. Designers use personas for UX decisions.",
  successMetrics: "Marketing campaigns resonate better with the target audience. Product decisions align with persona needs. Conversion rates improve. Customer acquisition cost decreases. Team alignment increases (everyone understands who's buying).",
  relatedPrompts: "Use Content Calendar Planner to create content for specific personas. Combine with Email Sequence Designer to build persona-specific flows. Reference Data Storytelling to present personas to stakeholders.",
  prompt: `Build audience personas from research data: {RESEARCH_DATA}

RESEARCH INPUT
Customer interviews: [Number and summaries]
Survey data: [Key findings]
Behavioral data: [Purchase/usage patterns]
Market segment: {SEGMENT}

CREATE DETAILED PERSONAS:

PERSONA 1: {PERSONA_NAME}

DEMOGRAPHICS & CONTEXT
Age: [Range]
Role/Title: [Job or situation]
Industry/Context: [Where they work/operate]
Experience level: [Expertise in domain]
Income range: [If relevant]

PSYCHOGRAPHICS
Values: [What matters to them]
Aspirations: [What do they want to achieve]
Anxieties: [What worries them most]
Identity: [How they see themselves]

PRIMARY GOAL
[What they're trying to accomplish]
Why it matters: [Why they care]
Current approach: [How they try to solve it now]
Frustrations: [What's not working]

SECONDARY GOALS
- Goal 1: [What else matters]
- Goal 2: [What else matters]

PAIN POINTS (the hard parts)
1. [Specific challenge]
   Impact: [How it affects them]
   Attempted solutions: [What they've tried]

2. [Specific challenge]
   Impact: [How it affects them]
   Attempted solutions: [What they've tried]

KEY OBJECTIONS TO YOUR SOLUTION
- "I already have a solution" → [Overcome with]
- "This seems complicated" → [Overcome with]
- "I'm not sure it's worth it" → [Overcome with]

MEDIA CONSUMPTION
Where they go:
- Websites/publications they read: {WEBSITES}
- Social platforms: {PLATFORMS}
- Podcasts/content they follow: {CONTENT}
- How they learn: {LEARNING}

BUYING PROCESS
Decision maker? [Yes/No/Sometimes]
Budget available? [Yes/No/Sometimes]
Timeline: [Fast / Considered / Slow]
Research process: [How they evaluate options]
Influencers: [Who influences the decision]

MESSAGING & POSITIONING
In one sentence, {PERSONA_NAME} wants to [goal] so they can [outcome].

Key messaging angles:
- Angle 1: [Specific value prop for this persona]
- Angle 2: [Specific value prop for this persona]
- Angle 3: [Specific value prop for this persona]

DO NOT say: [Messaging that won't resonate]

PERSONA 2: {PERSONA_NAME}
[Repeat structure]

RESEARCH: {RESEARCH_DATA}
Market: {SEGMENT}`,
  variations: [
    "Add buying committee personas (for B2B).",
    "Include anti-persona (who is NOT your customer).",
    "Create seasonal or lifecycle personas.",
    "Build personas for different product tiers.",
  ],
  modelCompatibility: ["GPT", "Claude", "Gemini"],
  tags: ["audience", "marketing", "research"],
  updatedAtISO: "2026-02-03",
},
{
  id: "p47",
  slug: "seo-content-refresh-brief",
  title: "SEO Content Refresh Brief (Traffic Decay to Update Plan)",
  purpose: "Turn aging pages into clear refresh plans that improve usefulness, depth, and ranking potential.",
  description: "This prompt creates a page-specific SEO refresh brief that focuses on content quality, missing intent coverage, weak sections, internal linking gaps, and opportunities to make a page more differentiated. It is built for updating existing content, not churning out disposable rewrites.",
  whenToUse: "Use this when a page has impressions but weak clicks, traffic has declined over time, Search Console shows pages as crawled but not indexed, or your content feels thin compared with stronger competitors. Most valuable for existing pages with some search demand already.",
  decisionContext: "Refreshing content works best when the page already has a viable topic and some evidence of demand. If the topic is irrelevant or the page has no unique angle, a refresh may not be enough. This prompt helps you decide what to deepen, remove, restructure, or add so the page becomes more useful and more index-worthy.",
  howItWorks: "The prompt audits the current page against search intent, user value, structure, and evidence of originality. It then turns those findings into a prioritized refresh brief covering title/H1 opportunities, section upgrades, missing FAQs, internal links, schema opportunities, and specific editorial additions that make the page stronger instead of simply longer.",
  bestPractices: "Include the current page copy, target keyword, Search Console patterns, and at least a short note on competing pages. Ask the model to prioritize recommendations by impact so you avoid spending time polishing low-value sections first. Use the output as an editor's brief, not a blind rewrite command.",
  commonMistakes: "Refreshing pages by just adding words. Stuffing keywords into headings. Rewriting sections that were already fine while ignoring missing intent coverage. Updating title tags without improving the actual content. Treating refreshes as technical SEO only when the main problem is page value.",
  expectedOutput: "A refresh brief containing: page diagnosis, likely indexing or ranking blockers, sections to rewrite, sections to add, internal links to create, FAQ ideas, metadata improvements, schema suggestions, and a prioritized execution plan.",
  limitations: "A refresh cannot rescue a page targeting a weak topic, duplicated topic, or query that has no realistic demand. It also cannot replace genuine expertise or examples if the page has nothing original to say. Search performance still depends on competition and site-wide trust.",
  technicalRequirements: "Works with GPT, Claude, and Gemini. Claude is strong at editorial diagnosis, GPT is strong at structure and action plans, and Gemini can be useful for broader SERP-pattern brainstorming. Provide page content and keyword context for best results.",
  realWorldApplications: "SEO teams use this for updating decayed blog posts. Niche site owners use it to improve thin affiliate or tool pages. Editorial teams use it before quarterly refresh sprints. Agencies use it to turn vague improve-this-page tasks into execution-ready briefs.",
  successMetrics: "A successful refresh increases click-through rate, improves coverage of user questions, reduces thin sections, and creates more internal routes into the page. In Search Console, you should expect stronger impression-to-click performance over time and fewer obviously weak indexed pages.",
  specificRecommendations: "Ask for a before-and-after outline so the new structure is obvious. Request three truly new sections instead of generic filler. If the page is already indexed, ask for changes that improve differentiation rather than total reinvention.",
  relatedPrompts: "Use Search Console Triage to decide which pages deserve refresh priority. Pair with Comparison Page Outline for decision-heavy topics. Follow with Content Repurposing to turn the upgraded page into supporting assets.",
  whenToIgnore: "Skip a refresh when the page should really be merged, redirected, or deleted instead of improved.",
  prompt: `Create an SEO refresh brief for this page.

PAGE URL: {URL}
PRIMARY QUERY: {KEYWORD}
SEARCH CONSOLE SIGNS: {SEARCH_CONSOLE_DATA}
CURRENT PAGE COPY:
{PAGE_CONTENT}

OPTIONAL COMPETITOR NOTES:
{COMPETITOR_NOTES}

Rules:
- Diagnose likely quality or indexing weaknesses first
- Focus on usefulness, differentiation, and intent coverage
- Do not recommend keyword stuffing
- Prioritize highest-impact changes

Output format:
1) Page diagnosis
2) Likely blockers
3) Refresh strategy
4) New sections to add
5) Sections to rewrite or compress
6) Internal links to add
7) Metadata + schema ideas
8) 7-day implementation plan`,
  variations: [
    "Make the brief specific for a tool review page.",
    "Make the brief specific for a prompt page.",
    "Add a section for pages marked Crawled - currently not indexed.",
    "Create a version optimized for affiliate or money pages.",
  ],
  modelCompatibility: ["GPT", "Claude", "Gemini"],
  tags: ["seo", "content", "refresh", "search"],
  updatedAtISO: "2026-04-10",
},

{
  id: "p48",
  slug: "topical-authority-cluster-planner",
  title: "Topical Authority Cluster Planner (Pillar + Support Pages)",
  purpose: "Turn a broad topic into a practical cluster strategy with pillar pages, support content, and internal-link logic.",
  description: "This prompt designs a content cluster around a topic by mapping high-intent pages, supporting articles, comparisons, FAQs, and tag-like supporting assets. It helps publishers create topic depth instead of isolated posts that never reinforce each other.",
  whenToUse: "Use this when entering a new niche, expanding a category, building a content moat around a topic, or trying to improve internal link structure across related pages. Especially useful when your site has scattered posts but no visible topic system.",
  decisionContext: "Topical authority is not just publishing more pages. It comes from covering adjacent user intents clearly and connecting them through useful internal links. This prompt helps define what deserves a pillar page, what should be a comparison, what should be a best list, and what should remain a lighter support page.",
  howItWorks: "The prompt starts with a root topic, then expands it into sub-intents such as definitions, comparisons, tools, use cases, workflows, buyer questions, and troubleshooting angles. It organizes those into a prioritized cluster and proposes internal links so the site structure supports both crawling and user navigation.",
  bestPractices: "Pick a topic narrow enough that one cluster can feel cohesive. Ask for intent labels on each page idea so you do not create overlap. Use the output to identify a few strong pages first rather than publishing the entire cluster at once.",
  commonMistakes: "Confusing volume with authority. Creating pages that target the same intent with slightly different keywords. Forgetting internal links. Publishing support pages before defining the main pillar. Making every page informational when some should be decisional or transactional.",
  expectedOutput: "A topic cluster map including: pillar page, comparison pages, best pages, support content, FAQ opportunities, tag or taxonomy ideas, and internal linking guidance showing how pages should reinforce each other.",
  limitations: "A good cluster plan does not guarantee rankings if the site lacks trust, execution quality, or useful differentiation. It also needs editorial judgment to merge or remove overlapping ideas.",
  technicalRequirements: "Works with all major models. Best results come when you provide the root topic, target audience, business goal, and any existing pages you already have.",
  realWorldApplications: "Niche publishers use this to plan category expansion. SEO teams use it for topic maps. Startup content teams use it to build educational libraries that support product-led growth. Agencies use it to justify content roadmaps to clients.",
  successMetrics: "A successful cluster reduces orphan pages, increases internal link density, creates clear page roles, and makes the site easier to navigate by topic. Over time, that should improve crawl efficiency and strengthen topic-level performance.",
  relatedPrompts: "Use SEO Content Refresh Brief to upgrade weak pages inside the cluster. Pair with Search Console Triage to prioritize what to build first. Follow with Comparison Page Outline for the most valuable decision pages.",
  prompt: `Build a topical authority cluster for this root topic.

ROOT TOPIC: {TOPIC}
AUDIENCE: {AUDIENCE}
BUSINESS GOAL: {GOAL}
EXISTING PAGES: {EXISTING_CONTENT}

Rules:
- Separate informational, decisional, and commercial intent
- Avoid overlapping page ideas
- Include pillar, support, comparison, and best-list opportunities
- Show how pages should internally link

Output format:
1) Cluster overview
2) Pillar page
3) Support pages
4) Comparison / best-list pages
5) FAQ and glossary opportunities
6) Internal linking map
7) Publishing priority order`,
  variations: [
    "Make the cluster specifically for an AI tools site.",
    "Make the cluster specifically for an SEO niche site.",
    "Include tag-page recommendations and when not to index them.",
    "Create a lean 10-page starter cluster instead of a full map.",
  ],
  modelCompatibility: ["GPT", "Claude", "Gemini"],
  tags: ["seo", "strategy", "topical-authority", "content"],
  updatedAtISO: "2026-04-10",
},

{
  id: "p49",
  slug: "search-console-triage",
  title: "Search Console Triage (Coverage Issue to Action Plan)",
  purpose: "Turn Search Console coverage and performance problems into prioritized actions instead of vague SEO anxiety.",
  description: "This prompt analyzes Search Console patterns and converts them into a triage plan covering which pages to improve, merge, noindex, redirect, or leave alone. It is designed for messy real-world sites where not every issue deserves the same amount of work.",
  whenToUse: "Use this when Search Console shows coverage issues like Crawled - currently not indexed, when clicks are flat despite impressions, when indexing changes after a content migration, or when you need to prioritize SEO tasks for limited time.",
  decisionContext: "Search Console reports are signals, not instructions. Some pages should be improved, others should be merged, and some should never have been indexed in the first place. This prompt helps separate high-value opportunities from low-value cleanup.",
  howItWorks: "The prompt groups pages by likely root cause, such as thin content, duplicate intent, weak internal links, stale content, or low search value. It then assigns an action type and priority so you can move through the backlog systematically instead of randomly.",
  bestPractices: "Provide examples of affected URLs, page type, impressions, clicks, and a short note on content quality. Ask for actions grouped by impact and effort. Use the output to drive batches of fixes rather than reacting to each URL one by one.",
  commonMistakes: "Trying to force every page into the index. Treating all coverage issues as technical. Spending hours on pages with no real value. Ignoring internal linking and site structure. Looking only at affected URLs without grouping them by template or type.",
  expectedOutput: "A triage plan containing: issue categories, likely causes, which pages to improve versus prune, what templates need attention, what should be submitted for reindexing, and a practical order of operations.",
  limitations: "The prompt cannot see the live site or SERP by itself. It depends on the quality of the examples and notes you provide. Final decisions still need judgment about business value and content quality.",
  technicalRequirements: "Works well with all major models. Best results come when you include Search Console notes, sample URLs, and a short explanation of what each page type is trying to do.",
  realWorldApplications: "Solo site owners use this to prioritize cleanup. Agencies use it to turn audit data into a plan. Editorial teams use it after publishing sprints to understand what templates are underperforming. Product content sites use it to decide whether thin taxonomy pages should remain indexable.",
  successMetrics: "Successful triage means fewer low-value URLs competing for crawl budget, clearer page priorities, and a sharper roadmap for improving the pages that actually matter. You should end up with fewer random SEO tasks and more template-level fixes.",
  relatedPrompts: "Use SEO Content Refresh Brief for the pages marked improve. Pair with Topical Authority Cluster Planner when the issue is weak site structure rather than isolated pages. Follow with redirect planning for pages marked merge or remove.",
  prompt: `Analyze these Search Console issues and create a triage plan.

SITE TYPE: {SITE_TYPE}
MAIN PAGE TYPES: {PAGE_TYPES}
ISSUES OBSERVED: {SEARCH_CONSOLE_ISSUES}
SAMPLE URLS: {URL_EXAMPLES}
KNOWN CONTEXT: {CONTEXT}

Rules:
- Group by likely root cause
- Prioritize business value and page quality
- Distinguish improve vs merge vs noindex vs ignore
- Focus on practical actions, not generic SEO advice

Output format:
1) Core diagnosis
2) Issue categories
3) URL groups and recommended action
4) Template-level fixes
5) Reindexing priority list
6) 14-day action plan`,
  variations: [
    "Make the plan specific for an AI tools directory.",
    "Add a section for tag and taxonomy pages.",
    "Focus only on coverage issues, not performance.",
    "Focus only on the highest-impact 20 percent of URLs.",
  ],
  modelCompatibility: ["GPT", "Claude", "Gemini"],
  tags: ["seo", "search-console", "triage", "indexing"],
  updatedAtISO: "2026-04-10",
},
{
  id: "p50",
  slug: "comparison-page-outline-builder",
  title: "Comparison Page Outline Builder (Decision-Heavy SEO Pages)",
  purpose: "Create stronger comparison-page outlines that help users choose instead of repeating vendor marketing copy.",
  description: "This prompt builds a comparison-page structure around buyer questions, tradeoffs, verdicts, and real evaluation criteria. It is useful for sites that want more clicks from decision-stage searches and need pages that feel editorial rather than templated.",
  whenToUse: "Use this when creating versus pages, alternative pages, or tool comparisons where the user is actively deciding between options. It works best when you already know the contenders and want a stronger page structure before drafting.",
  decisionContext: "Comparison pages are valuable because they sit closer to action than broad informational content. The problem is that many comparison pages are shallow grids with no real verdict. This prompt is built to prevent that.",
  howItWorks: "The prompt asks for the compared options, target audience, and decision scenario, then turns those into criteria, verdict framing, objections, FAQs, and a page structure that supports stronger internal links.",
  bestPractices: "Feed in real constraints such as budget, team size, technical skill, or content workflow. Ask for explicit recommendation rules so each page has a clear point of view.",
  commonMistakes: "Making every contender sound equally good. Comparing features without context. Ignoring switching costs. Writing only for keywords instead of the actual decision the reader is trying to make.",
  expectedOutput: "A structured comparison-page brief with intro angle, decision criteria, who each option fits, verdict sections, FAQs, and internal-link opportunities.",
  limitations: "The output is only as strong as the product understanding you provide. It still needs real evaluation and fact-checking before publication.",
  technicalRequirements: "Works with all major models. Best results come when you provide product names, audience type, and the key reason people compare them.",
  realWorldApplications: "Affiliate sites use this for money pages. SaaS marketing teams use it for competitor comparisons. Tool directories use it to turn broad topic traffic into higher-intent landing pages.",
  successMetrics: "A successful output creates pages with clearer verdicts, better internal-link targets, and more decisive copy that supports commercial clicks.",
  relatedPrompts: "Use Topical Authority Cluster Planner to find which comparisons deserve pages. Pair with SEO Content Refresh Brief to upgrade underperforming comparison pages.",
  prompt: `Create a comparison-page outline that helps users choose between options.

CONTENDERS: {CONTENDERS}
AUDIENCE: {AUDIENCE}
DECISION CONTEXT: {DECISION_CONTEXT}
KEY CONSTRAINTS: {CONSTRAINTS}

Rules:
- Prioritize decision value over filler
- Include clear criteria and verdict logic
- Distinguish who each option is best for
- Add FAQs and internal-link opportunities

Output format:
1) Search intent and page angle
2) Comparison criteria
3) Recommended page structure
4) Verdict sections
5) FAQ block
6) Internal links to supporting pages`,
  variations: [
    "Make it specific for AI tool comparisons.",
    "Create a softer tone for editorial review sites.",
    "Add a section for switching costs and migration pain.",
    "Make the outline better for affiliate content."
  ],
  modelCompatibility: ["GPT", "Claude", "Gemini"],
  tags: ["seo", "comparisons", "content", "money-pages"],
  updatedAtISO: "2026-04-10",
},
{
  id: "p51",
  slug: "faq-schema-content-expander",
  title: "FAQ + Schema Content Expander",
  purpose: "Turn thin pages into richer, more useful resources with better FAQ coverage and structured-answer planning.",
  description: "This prompt expands a page with user-facing questions, concise answers, supporting angles, and schema-friendly FAQ ideas. It is especially helpful for tool pages, best pages, and category pages that feel too sparse.",
  whenToUse: "Use this when a page covers the basic topic but still feels thin, lacks question coverage, or misses obvious supporting queries from users.",
  decisionContext: "Many weak pages are not broken because of a technical issue. They are weak because they stop too early and fail to answer the practical questions a user still has before leaving.",
  howItWorks: "The prompt takes a page topic plus page type, then expands likely user questions, answer angles, follow-up sections, and schema-friendly FAQ coverage that can be added without turning the page into fluff.",
  bestPractices: "Ask for questions grouped by reader intent. Remove any FAQs that do not add value. Use the output to improve the page, not just to append filler at the bottom.",
  commonMistakes: "Adding repetitive FAQs. Writing vague answers. Treating schema as the goal instead of page usefulness. Stuffing in questions that do not match the page's purpose.",
  expectedOutput: "A prioritized list of FAQs, answer angles, supporting sub-sections, and notes on which items should be turned into visible content versus optional schema.",
  limitations: "This does not replace first-hand expertise. The generated FAQs still need editorial review and factual validation.",
  technicalRequirements: "Works with all major models. Best results come when you supply the page topic, reader type, and a short summary of the existing page.",
  realWorldApplications: "SEO teams use this to strengthen underperforming pages. Publishers use it to deepen review pages. Tool directories use it to make item pages and best pages more complete.",
  successMetrics: "Successful outputs lead to pages that cover more practical questions, feel less thin, and create stronger supporting signals for search and user satisfaction.",
  relatedPrompts: "Use Search Console Triage to identify which pages need expansion first. Pair with SEO Content Refresh Brief for a full rewrite plan.",
  prompt: `Expand this page with better FAQ and supporting-content coverage.

PAGE TYPE: {PAGE_TYPE}
PAGE TOPIC: {TOPIC}
AUDIENCE: {AUDIENCE}
CURRENT PAGE SUMMARY: {CURRENT_SUMMARY}

Rules:
- Focus on useful questions, not filler
- Separate visible-page sections from optional schema items
- Keep answers concise and practical
- Suggest only sections that fit the page type

Output format:
1) Gaps in current coverage
2) Priority FAQs
3) Strong answer angles
4) Supporting sections to add
5) Schema-friendly FAQ shortlist`,
  variations: [
    "Make it specific for tool pages.",
    "Make it specific for best-of list pages.",
    "Focus on buyer objections and trust questions.",
    "Create a version for taxonomy or tag pages."
  ],
  modelCompatibility: ["GPT", "Claude", "Gemini"],
  tags: ["seo", "faq", "schema", "content"],
  updatedAtISO: "2026-04-10",
},
];

