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
];
