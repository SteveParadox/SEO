import type { Prompt } from "@/lib/data-types";

/**
 * Second curated set of search-task-focused prompt workflows.
 * Demand, rankings, and search volume are not asserted by these templates.
 */
export const highIntentExpansionPrompts: Prompt[] = [
  {
    "id": "xp3101",
    "slug": "resume-professional-summary-generator",
    "title": "Resume Professional Summary Generator",
    "purpose": "Write a concise role-specific resume summary using verified achievements instead of generic self-praise.",
    "description": "Write a concise role-specific resume summary using verified achievements instead of generic self-praise. This practical career workflow asks for relevant evidence, spells out how to use it, and produces a reviewable output instead of generic suggestions or invented details.",
    "whenToUse": "Use this template when your immediate task is write a concise role-specific resume summary using verified achievements instead of generic self-praise. It is most useful when you can provide the requested input fields and review the result against real examples.",
    "howItWorks": "The workflow anchors its reasoning in the supplied material, organizes the user's goal, and executes this task-specific process: Extract the target role's most relevant requirements; prioritize proven expertise and outcomes; draft three honest two-to-four-line summaries; avoid invented job titles or metrics; show differences between concise and keyword-oriented versions.",
    "bestPractices": "Provide the target role and actual experience, not a generic career objective. Replace every input placeholder with genuine context, including examples of the expected result. Review the first draft against your own constraints before reusing it.",
    "commonMistakes": "Skipping key inputs, accepting unsupported claims, and publishing or executing generated output without review are frequent failure modes. In this task especially: Never manufacture years of experience, certifications, seniority, hiring outcomes, or numbers.",
    "expectedOutput": "The response should contain three summaries, a match-to-role rationale, and a list of unverified claims to remove. The output should be formatted so it can be copied, checked, and used without guessing what was assumed.",
    "limitations": "Never manufacture years of experience, certifications, seniority, hiring outcomes, or numbers. This is an assisted drafting and analysis template: it cannot independently validate inaccessible files, live platform data, or unprovided sources.",
    "technicalRequirements": "Works with GPT, Claude, and Gemini. Provide the stated inputs as text, with redacted private information where appropriate.",
    "realWorldApplications": "Suitable for people using AI to write a concise role-specific resume summary using verified achievements instead of generic self-praise in routine career workflows, with manual verification before reuse.",
    "successMetrics": "The strongest summary sounds specific, is supported by the resume, and helps a recruiter see fit quickly. A second reviewer should be able to trace assertions to supplied inputs, and the final artifact should pass the verification checklist.",
    "relatedPrompts": "Explore related prompts in the career category when you need adjacent tasks, reviews, or follow-up work.",
    "prompt": "You are a specialist assisting with resume professional summary generator. Produce a practical, evidence-led result from the inputs below.\n\nTARGET ROLE: {TARGET_ROLE}\nCURRENT EXPERIENCE: {CURRENT_EXPERIENCE}\nVERIFIED SKILLS: {VERIFIED_SKILLS}\nKEY ACHIEVEMENTS: {KEY_ACHIEVEMENTS}\nCAREER STAGE: {CAREER_STAGE}\n\nTask workflow:\n1. Extract the target role's most relevant requirements.\n2. Prioritize proven expertise and outcomes.\n3. Draft three honest two-to-four-line summaries.\n4. Avoid invented job titles or metrics.\n5. Show differences between concise and keyword-oriented versions..\n\nAccuracy and safety rules:\n- Only use facts present in my inputs or explicitly identified as checked references; distinguish facts from assumptions.\n- If a required item is missing, mark it unknown and explain the minimum verification needed. Do not fabricate examples as if they were real.\n- Never manufacture years of experience, certifications, seniority, hiring outcomes, or numbers.\n- Explain important tradeoffs and any limitation caused by my stated format, platform, or audience.\n- Avoid padding, repetitive claims, fake metrics, and promises of guaranteed ranking, performance, admission, or success.\n- Clearly label ready-to-use material versus suggestions that still need verification.\n\nDeliverables:\n1. Three summaries\n2. A match-to-role rationale\n3. And a list of unverified claims to remove.\n5. Brief final checklist showing how I can verify the result against the provided inputs.\n\nBefore finalizing, check the work for contradictions, unsupported facts, and any missing edge cases. Prefer specific, useful instructions over generic advice.",
    "variations": [
      "Make the response shorter while keeping all required evidence and verification steps for Resume Professional Summary.",
      "Produce a beginner-friendly version that defines specialized terms and includes a concrete example for Resume Professional Summary.",
      "Use a professional, implementation-ready format with explicit edge cases, constraints, and acceptance criteria for Resume Professional Summary."
    ],
    "modelCompatibility": [
      "GPT",
      "Claude",
      "Gemini"
    ],
    "tags": [
      "resume",
      "career",
      "professional-summary",
      "job-search"
    ],
    "updatedAtISO": "2026-11-05"
  },
  {
    "id": "xp3102",
    "slug": "salary-negotiation-email-template",
    "title": "Salary Negotiation Email Template",
    "purpose": "Write a professional compensation negotiation message with a specific, respectful ask.",
    "description": "Write a professional compensation negotiation message with a specific, respectful ask. This practical career workflow asks for relevant evidence, spells out how to use it, and produces a reviewable output instead of generic suggestions or invented details.",
    "whenToUse": "Use this template when your immediate task is write a professional compensation negotiation message with a specific, respectful ask. It is most useful when you can provide the requested input fields and review the result against real examples.",
    "howItWorks": "The workflow anchors its reasoning in the supplied material, organizes the user's goal, and executes this task-specific process: Separate the confirmed offer terms from external compensation benchmarks; explain an evidence-based request; write a warm negotiation email plus a short reply to a counteroffer; avoid ultimatums; propose benefits only where negotiable.",
    "bestPractices": "Provide the actual written offer, region, and any dated sources for comparable compensation. Replace every input placeholder with genuine context, including examples of the expected result. Review the first draft against your own constraints before reusing it.",
    "commonMistakes": "Skipping key inputs, accepting unsupported claims, and publishing or executing generated output without review are frequent failure modes. In this task especially: Unverified salary benchmarks are not facts; laws, benefits, and bargaining norms vary by market.",
    "expectedOutput": "The response should contain a ready-to-edit email, a counteroffer response, and a checklist of details to confirm. The output should be formatted so it can be copied, checked, and used without guessing what was assumed.",
    "limitations": "Unverified salary benchmarks are not facts; laws, benefits, and bargaining norms vary by market. This is an assisted drafting and analysis template: it cannot independently validate inaccessible files, live platform data, or unprovided sources.",
    "technicalRequirements": "Works with GPT, Claude, and Gemini. Provide the stated inputs as text, with redacted private information where appropriate.",
    "realWorldApplications": "Suitable for people using AI to write a professional compensation negotiation message with a specific, respectful ask in routine career workflows, with manual verification before reuse.",
    "successMetrics": "The request is clear, defensible, and relationship-preserving even if declined. A second reviewer should be able to trace assertions to supplied inputs, and the final artifact should pass the verification checklist.",
    "relatedPrompts": "Explore related prompts in the career category when you need adjacent tasks, reviews, or follow-up work.",
    "prompt": "You are a specialist assisting with salary negotiation email template. Produce a practical, evidence-led result from the inputs below.\n\nJOB OFFER: {JOB_OFFER}\nCURRENT TERMS: {CURRENT_TERMS}\nTARGET RANGE: {TARGET_RANGE}\nVERIFIED MARKET EVIDENCE: {VERIFIED_MARKET_EVIDENCE}\nROLE SCOPE: {ROLE_SCOPE}\nNEGOTIABLE BENEFITS: {NEGOTIABLE_BENEFITS}\n\nTask workflow:\n1. Separate the confirmed offer terms from external compensation benchmarks.\n2. Explain an evidence-based request.\n3. Write a warm negotiation email plus a short reply to a counteroffer.\n4. Avoid ultimatums.\n5. Propose benefits only where negotiable..\n\nAccuracy and safety rules:\n- Only use facts present in my inputs or explicitly identified as checked references; distinguish facts from assumptions.\n- If a required item is missing, mark it unknown and explain the minimum verification needed. Do not fabricate examples as if they were real.\n- Unverified salary benchmarks are not facts; laws, benefits, and bargaining norms vary by market.\n- Explain important tradeoffs and any limitation caused by my stated format, platform, or audience.\n- Avoid padding, repetitive claims, fake metrics, and promises of guaranteed ranking, performance, admission, or success.\n- Clearly label ready-to-use material versus suggestions that still need verification.\n\nDeliverables:\n1. A ready-to-edit email\n2. A counteroffer response\n3. And a checklist of details to confirm.\n5. Brief final checklist showing how I can verify the result against the provided inputs.\n\nBefore finalizing, check the work for contradictions, unsupported facts, and any missing edge cases. Prefer specific, useful instructions over generic advice.",
    "variations": [
      "Make the response shorter while keeping all required evidence and verification steps for Salary Negotiation Email.",
      "Produce a beginner-friendly version that defines specialized terms and includes a concrete example for Salary Negotiation Email.",
      "Use a professional, implementation-ready format with explicit edge cases, constraints, and acceptance criteria for Salary Negotiation Email."
    ],
    "modelCompatibility": [
      "GPT",
      "Claude",
      "Gemini"
    ],
    "tags": [
      "salary",
      "negotiation",
      "email",
      "career"
    ],
    "updatedAtISO": "2026-11-05"
  },
  {
    "id": "xp3103",
    "slug": "mock-job-interview-questions-generator",
    "title": "Mock Job Interview Questions and Answer Practice",
    "purpose": "Prepare realistic role-specific interview questions and practice truthful answers aloud.",
    "description": "Prepare realistic role-specific interview questions and practice truthful answers aloud. This practical career workflow asks for relevant evidence, spells out how to use it, and produces a reviewable output instead of generic suggestions or invented details.",
    "whenToUse": "Use this template when your immediate task is prepare realistic role-specific interview questions and practice truthful answers aloud. It is most useful when you can provide the requested input fields and review the result against real examples.",
    "howItWorks": "The workflow anchors its reasoning in the supplied material, organizes the user's goal, and executes this task-specific process: Extract role competencies; create technical, behavioral, situational, and role-specific questions; give evaluation criteria rather than made-up ideal answers; offer follow-up probes; design a timed mock session and self-scoring rubric.",
    "bestPractices": "Supply the job advertisement and interview format so questions reflect the actual role. Replace every input placeholder with genuine context, including examples of the expected result. Review the first draft against your own constraints before reusing it.",
    "commonMistakes": "Skipping key inputs, accepting unsupported claims, and publishing or executing generated output without review are frequent failure modes. In this task especially: Interview questions and hiring decisions depend on the employer; any company-specific claims need proof.",
    "expectedOutput": "The response should contain fifteen prioritized interview questions, preparation notes, follow-up prompts, and a rubric. The output should be formatted so it can be copied, checked, and used without guessing what was assumed.",
    "limitations": "Interview questions and hiring decisions depend on the employer; any company-specific claims need proof. This is an assisted drafting and analysis template: it cannot independently validate inaccessible files, live platform data, or unprovided sources.",
    "technicalRequirements": "Works with GPT, Claude, and Gemini. Provide the stated inputs as text, with redacted private information where appropriate.",
    "realWorldApplications": "Suitable for people using AI to prepare realistic role-specific interview questions and practice truthful answers aloud in routine career workflows, with manual verification before reuse.",
    "successMetrics": "The practice reveals evidence gaps and improves answer clarity without rehearsing fictional stories. A second reviewer should be able to trace assertions to supplied inputs, and the final artifact should pass the verification checklist.",
    "relatedPrompts": "Explore related prompts in the career category when you need adjacent tasks, reviews, or follow-up work.",
    "prompt": "You are a specialist assisting with mock job interview questions and answer practice. Produce a practical, evidence-led result from the inputs below.\n\nTARGET ROLE: {TARGET_ROLE}\nJOB DESCRIPTION: {JOB_DESCRIPTION}\nRESUME: {RESUME}\nINTERVIEW TYPE: {INTERVIEW_TYPE}\nSENIORITY: {SENIORITY}\nWEAK AREAS: {WEAK_AREAS}\n\nTask workflow:\n1. Extract role competencies.\n2. Create technical, behavioral, situational, and role-specific questions.\n3. Give evaluation criteria rather than made-up ideal answers.\n4. Offer follow-up probes.\n5. Design a timed mock session and self-scoring rubric..\n\nAccuracy and safety rules:\n- Only use facts present in my inputs or explicitly identified as checked references; distinguish facts from assumptions.\n- If a required item is missing, mark it unknown and explain the minimum verification needed. Do not fabricate examples as if they were real.\n- Interview questions and hiring decisions depend on the employer; any company-specific claims need proof.\n- Explain important tradeoffs and any limitation caused by my stated format, platform, or audience.\n- Avoid padding, repetitive claims, fake metrics, and promises of guaranteed ranking, performance, admission, or success.\n- Clearly label ready-to-use material versus suggestions that still need verification.\n\nDeliverables:\n1. Fifteen prioritized interview questions\n2. Preparation notes\n3. Follow-up prompts\n4. And a rubric.\n5. Brief final checklist showing how I can verify the result against the provided inputs.\n\nBefore finalizing, check the work for contradictions, unsupported facts, and any missing edge cases. Prefer specific, useful instructions over generic advice.",
    "variations": [
      "Make the response shorter while keeping all required evidence and verification steps for Mock Job Interview Questions and Answer Practice.",
      "Produce a beginner-friendly version that defines specialized terms and includes a concrete example for Mock Job Interview Questions and Answer Practice.",
      "Use a professional, implementation-ready format with explicit edge cases, constraints, and acceptance criteria for Mock Job Interview Questions and Answer Practice."
    ],
    "modelCompatibility": [
      "GPT",
      "Claude",
      "Gemini"
    ],
    "tags": [
      "interview",
      "career",
      "job-search",
      "practice"
    ],
    "updatedAtISO": "2026-11-05"
  },
  {
    "id": "xp3104",
    "slug": "portfolio-case-study-writer",
    "title": "Professional Portfolio Case Study Writer",
    "purpose": "Turn a real project into a structured portfolio story showing scope, decisions, and outcomes.",
    "description": "Turn a real project into a structured portfolio story showing scope, decisions, and outcomes. This practical career workflow asks for relevant evidence, spells out how to use it, and produces a reviewable output instead of generic suggestions or invented details.",
    "whenToUse": "Use this template when your immediate task is turn a real project into a structured portfolio story showing scope, decisions, and outcomes. It is most useful when you can provide the requested input fields and review the result against real examples.",
    "howItWorks": "The workflow anchors its reasoning in the supplied material, organizes the user's goal, and executes this task-specific process: Identify project context and your specific contribution; explain goals, process, constraints, decisions and lessons; separate team achievements from personal ownership; propose screenshots or artifacts only if available; create concise and extended versions.",
    "bestPractices": "Use project artifacts and state exactly what you personally delivered. Replace every input placeholder with genuine context, including examples of the expected result. Review the first draft against your own constraints before reusing it.",
    "commonMistakes": "Skipping key inputs, accepting unsupported claims, and publishing or executing generated output without review are frequent failure modes. In this task especially: Never expose confidential data or invent project metrics, customer testimonials, or screenshots.",
    "expectedOutput": "The response should contain a case study with section headings, a short portfolio card, evidence checklist, and redaction notes. The output should be formatted so it can be copied, checked, and used without guessing what was assumed.",
    "limitations": "Never expose confidential data or invent project metrics, customer testimonials, or screenshots. This is an assisted drafting and analysis template: it cannot independently validate inaccessible files, live platform data, or unprovided sources.",
    "technicalRequirements": "Works with GPT, Claude, and Gemini. Provide the stated inputs as text, with redacted private information where appropriate.",
    "realWorldApplications": "Suitable for people using AI to turn a real project into a structured portfolio story showing scope, decisions, and outcomes in routine career workflows, with manual verification before reuse.",
    "successMetrics": "Readers can understand the problem, your role, decision process, and defensible outcome. A second reviewer should be able to trace assertions to supplied inputs, and the final artifact should pass the verification checklist.",
    "relatedPrompts": "Explore related prompts in the career category when you need adjacent tasks, reviews, or follow-up work.",
    "prompt": "You are a specialist assisting with professional portfolio case study writer. Produce a practical, evidence-led result from the inputs below.\n\nPROJECT BRIEF: {PROJECT_BRIEF}\nYOUR ROLE: {YOUR_ROLE}\nPROCESS AND TRADEOFFS: {PROCESS_AND_TRADEOFFS}\nEVIDENCE: {EVIDENCE}\nRESULTS: {RESULTS}\nCONFIDENTIALITY LIMITS: {CONFIDENTIALITY_LIMITS}\n\nTask workflow:\n1. Identify project context and your specific contribution.\n2. Explain goals, process, constraints, decisions and lessons.\n3. Separate team achievements from personal ownership.\n4. Propose screenshots or artifacts only if available.\n5. Create concise and extended versions..\n\nAccuracy and safety rules:\n- Only use facts present in my inputs or explicitly identified as checked references; distinguish facts from assumptions.\n- If a required item is missing, mark it unknown and explain the minimum verification needed. Do not fabricate examples as if they were real.\n- Never expose confidential data or invent project metrics, customer testimonials, or screenshots.\n- Explain important tradeoffs and any limitation caused by my stated format, platform, or audience.\n- Avoid padding, repetitive claims, fake metrics, and promises of guaranteed ranking, performance, admission, or success.\n- Clearly label ready-to-use material versus suggestions that still need verification.\n\nDeliverables:\n1. A case study with section headings\n2. A short portfolio card\n3. Evidence checklist\n4. And redaction notes.\n5. Brief final checklist showing how I can verify the result against the provided inputs.\n\nBefore finalizing, check the work for contradictions, unsupported facts, and any missing edge cases. Prefer specific, useful instructions over generic advice.",
    "variations": [
      "Make the response shorter while keeping all required evidence and verification steps for Professional Portfolio Case Study Writer.",
      "Produce a beginner-friendly version that defines specialized terms and includes a concrete example for Professional Portfolio Case Study Writer.",
      "Use a professional, implementation-ready format with explicit edge cases, constraints, and acceptance criteria for Professional Portfolio Case Study Writer."
    ],
    "modelCompatibility": [
      "GPT",
      "Claude",
      "Gemini"
    ],
    "tags": [
      "portfolio",
      "case-study",
      "career",
      "projects"
    ],
    "updatedAtISO": "2026-11-05"
  },
  {
    "id": "xp3105",
    "slug": "career-change-roadmap-builder",
    "title": "Career Change Roadmap and Skills Gap Planner",
    "purpose": "Plan a realistic career transition using a current skills inventory and target role requirements.",
    "description": "Plan a realistic career transition using a current skills inventory and target role requirements. This practical career workflow asks for relevant evidence, spells out how to use it, and produces a reviewable output instead of generic suggestions or invented details.",
    "whenToUse": "Use this template when your immediate task is plan a realistic career transition using a current skills inventory and target role requirements. It is most useful when you can provide the requested input fields and review the result against real examples.",
    "howItWorks": "The workflow anchors its reasoning in the supplied material, organizes the user's goal, and executes this task-specific process: Map transferable skills and evidence; distinguish must-have competencies from optional tools; propose staged learning and portfolio projects; choose a realistic weekly schedule; set measurable checkpoints and honest application milestones.",
    "bestPractices": "Provide representative target job listings and available hours per week. Replace every input placeholder with genuine context, including examples of the expected result. Review the first draft against your own constraints before reusing it.",
    "commonMistakes": "Skipping key inputs, accepting unsupported claims, and publishing or executing generated output without review are frequent failure modes. In this task especially: Role requirements vary by geography and employer; course or job-market claims need dated sources.",
    "expectedOutput": "The response should contain a skill-gap matrix, 30/60/90-day roadmap, portfolio project ideas, and verification milestones. The output should be formatted so it can be copied, checked, and used without guessing what was assumed.",
    "limitations": "Role requirements vary by geography and employer; course or job-market claims need dated sources. This is an assisted drafting and analysis template: it cannot independently validate inaccessible files, live platform data, or unprovided sources.",
    "technicalRequirements": "Works with GPT, Claude, and Gemini. Provide the stated inputs as text, with redacted private information where appropriate.",
    "realWorldApplications": "Suitable for people using AI to plan a realistic career transition using a current skills inventory and target role requirements in routine career workflows, with manual verification before reuse.",
    "successMetrics": "Every milestone yields demonstrable evidence and fits the stated constraints. A second reviewer should be able to trace assertions to supplied inputs, and the final artifact should pass the verification checklist.",
    "relatedPrompts": "Explore related prompts in the career category when you need adjacent tasks, reviews, or follow-up work.",
    "prompt": "You are a specialist assisting with career change roadmap and skills gap planner. Produce a practical, evidence-led result from the inputs below.\n\nCURRENT BACKGROUND: {CURRENT_BACKGROUND}\nTARGET ROLE: {TARGET_ROLE}\nJOB REQUIREMENTS: {JOB_REQUIREMENTS}\nAVAILABLE TIME: {AVAILABLE_TIME}\nBUDGET: {BUDGET}\nPROOF OF SKILLS: {PROOF_OF_SKILLS}\n\nTask workflow:\n1. Map transferable skills and evidence.\n2. Distinguish must-have competencies from optional tools.\n3. Propose staged learning and portfolio projects.\n4. Choose a realistic weekly schedule.\n5. Set measurable checkpoints and honest application milestones..\n\nAccuracy and safety rules:\n- Only use facts present in my inputs or explicitly identified as checked references; distinguish facts from assumptions.\n- If a required item is missing, mark it unknown and explain the minimum verification needed. Do not fabricate examples as if they were real.\n- Role requirements vary by geography and employer; course or job-market claims need dated sources.\n- Explain important tradeoffs and any limitation caused by my stated format, platform, or audience.\n- Avoid padding, repetitive claims, fake metrics, and promises of guaranteed ranking, performance, admission, or success.\n- Clearly label ready-to-use material versus suggestions that still need verification.\n\nDeliverables:\n1. A skill-gap matrix\n2. 30/60/90-day roadmap\n3. Portfolio project ideas\n4. And verification milestones.\n5. Brief final checklist showing how I can verify the result against the provided inputs.\n\nBefore finalizing, check the work for contradictions, unsupported facts, and any missing edge cases. Prefer specific, useful instructions over generic advice.",
    "variations": [
      "Make the response shorter while keeping all required evidence and verification steps for Career Change Roadmap and Skills Gap.",
      "Produce a beginner-friendly version that defines specialized terms and includes a concrete example for Career Change Roadmap and Skills Gap.",
      "Use a professional, implementation-ready format with explicit edge cases, constraints, and acceptance criteria for Career Change Roadmap and Skills Gap."
    ],
    "modelCompatibility": [
      "GPT",
      "Claude",
      "Gemini"
    ],
    "tags": [
      "career-change",
      "upskilling",
      "career",
      "learning"
    ],
    "updatedAtISO": "2026-11-05"
  },
  {
    "id": "xp3106",
    "slug": "nextjs-error-debugging-prompt",
    "title": "Next.js Error Debugging Assistant for App Router",
    "purpose": "Diagnose a Next.js error using logs, route structure, and minimal testable fixes.",
    "description": "Diagnose a Next.js error using logs, route structure, and minimal testable fixes. This practical engineering workflow asks for relevant evidence, spells out how to use it, and produces a reviewable output instead of generic suggestions or invented details.",
    "whenToUse": "Use this template when your immediate task is diagnose a Next.js error using logs, route structure, and minimal testable fixes. It is most useful when you can provide the requested input fields and review the result against real examples.",
    "howItWorks": "The workflow anchors its reasoning in the supplied material, organizes the user's goal, and executes this task-specific process: Distinguish build-time, runtime, server/client boundary, hydration, cache, and configuration causes; rank evidence-backed hypotheses; suggest minimal patches rather than speculative rewrites; require version-specific docs checks and focused regression tests.",
    "bestPractices": "Provide the full error stack and relevant route components, layouts, and config. Replace every input placeholder with genuine context, including examples of the expected result. Review the first draft against your own constraints before reusing it.",
    "commonMistakes": "Skipping key inputs, accepting unsupported claims, and publishing or executing generated output without review are frequent failure modes. In this task especially: Do not invent framework behavior, filenames, versions, or claim a patch was executed.",
    "expectedOutput": "The response should contain a diagnosis table, minimal candidate patch, reproduction plan, and test commands. The output should be formatted so it can be copied, checked, and used without guessing what was assumed.",
    "limitations": "Do not invent framework behavior, filenames, versions, or claim a patch was executed. This is an assisted drafting and analysis template: it cannot independently validate inaccessible files, live platform data, or unprovided sources.",
    "technicalRequirements": "Works with GPT, Claude, and Gemini. Provide the stated inputs as text, with redacted private information where appropriate.",
    "realWorldApplications": "Suitable for people using AI to diagnose a Next.js error using logs, route structure, and minimal testable fixes in routine development workflows, with manual verification before reuse.",
    "successMetrics": "A root cause is reproducible and the regression test fails before the fix and passes afterward. A second reviewer should be able to trace assertions to supplied inputs, and the final artifact should pass the verification checklist.",
    "relatedPrompts": "Explore related prompts in the development category when you need adjacent tasks, reviews, or follow-up work.",
    "prompt": "You are a specialist assisting with next.js error debugging assistant for app router. Produce a practical, evidence-led result from the inputs below.\n\nERROR LOG: {ERROR_LOG}\nNEXT VERSION: {NEXT_VERSION}\nROUTE FILES: {ROUTE_FILES}\nRELEVANT CODE: {RELEVANT_CODE}\nREPRODUCTION STEPS: {REPRODUCTION_STEPS}\nDEPLOYMENT ENV: {DEPLOYMENT_ENV}\n\nTask workflow:\n1. Distinguish build-time, runtime, server/client boundary, hydration, cache, and configuration causes.\n2. Rank evidence-backed hypotheses.\n3. Suggest minimal patches rather than speculative rewrites.\n4. Require version-specific docs checks and focused regression tests..\n\nAccuracy and safety rules:\n- Only use facts present in my inputs or explicitly identified as checked references; distinguish facts from assumptions.\n- If a required item is missing, mark it unknown and explain the minimum verification needed. Do not fabricate examples as if they were real.\n- Do not invent framework behavior, filenames, versions, or claim a patch was executed.\n- Explain important tradeoffs and any limitation caused by my stated format, platform, or audience.\n- Avoid padding, repetitive claims, fake metrics, and promises of guaranteed ranking, performance, admission, or success.\n- Clearly label ready-to-use material versus suggestions that still need verification.\n\nDeliverables:\n1. A diagnosis table\n2. Minimal candidate patch\n3. Reproduction plan\n4. And test commands.\n5. Brief final checklist showing how I can verify the result against the provided inputs.\n\nBefore finalizing, check the work for contradictions, unsupported facts, and any missing edge cases. Prefer specific, useful instructions over generic advice.",
    "variations": [
      "Make the response shorter while keeping all required evidence and verification steps for Next.js Error Debugging for App Router.",
      "Produce a beginner-friendly version that defines specialized terms and includes a concrete example for Next.js Error Debugging for App Router.",
      "Use a professional, implementation-ready format with explicit edge cases, constraints, and acceptance criteria for Next.js Error Debugging for App Router."
    ],
    "modelCompatibility": [
      "GPT",
      "Claude",
      "Gemini"
    ],
    "tags": [
      "development",
      "nextjs",
      "debugging",
      "react",
      "web-development"
    ],
    "updatedAtISO": "2026-11-05"
  },
  {
    "id": "xp3107",
    "slug": "accessible-react-component-generator",
    "title": "Accessible React Component Generator With TypeScript",
    "purpose": "Generate a reusable React component with keyboard support and explicit accessibility behavior.",
    "description": "Generate a reusable React component with keyboard support and explicit accessibility behavior. This practical engineering workflow asks for relevant evidence, spells out how to use it, and produces a reviewable output instead of generic suggestions or invented details.",
    "whenToUse": "Use this template when your immediate task is generate a reusable React component with keyboard support and explicit accessibility behavior. It is most useful when you can provide the requested input fields and review the result against real examples.",
    "howItWorks": "The workflow anchors its reasoning in the supplied material, organizes the user's goal, and executes this task-specific process: Define component API, props, states, and accessibility semantics; implement controlled interactions without unnecessary dependencies; address keyboard focus and labels; include loading, empty, error, and disabled states as needed; write representative tests.",
    "bestPractices": "Describe the actual design system and supported UI library, if any. Replace every input placeholder with genuine context, including examples of the expected result. Review the first draft against your own constraints before reusing it.",
    "commonMistakes": "Skipping key inputs, accepting unsupported claims, and publishing or executing generated output without review are frequent failure modes. In this task especially: Automated checks cannot guarantee accessibility; keyboard and screen-reader review remain necessary.",
    "expectedOutput": "The response should contain a typed component, usage snippet, accessibility notes, and unit or interaction tests. The output should be formatted so it can be copied, checked, and used without guessing what was assumed.",
    "limitations": "Automated checks cannot guarantee accessibility; keyboard and screen-reader review remain necessary. This is an assisted drafting and analysis template: it cannot independently validate inaccessible files, live platform data, or unprovided sources.",
    "technicalRequirements": "Works with GPT, Claude, and Gemini. Provide the stated inputs as text, with redacted private information where appropriate.",
    "realWorldApplications": "Suitable for people using AI to generate a reusable React component with keyboard support and explicit accessibility behavior in routine development workflows, with manual verification before reuse.",
    "successMetrics": "The component behaves correctly under keyboard navigation, states, and expected props. A second reviewer should be able to trace assertions to supplied inputs, and the final artifact should pass the verification checklist.",
    "relatedPrompts": "Explore related prompts in the development category when you need adjacent tasks, reviews, or follow-up work.",
    "prompt": "You are a specialist assisting with accessible react component generator with typescript. Produce a practical, evidence-led result from the inputs below.\n\nCOMPONENT REQUIREMENTS: {COMPONENT_REQUIREMENTS}\nUSER INTERACTIONS: {USER_INTERACTIONS}\nDESIGN SYSTEM: {DESIGN_SYSTEM}\nREACT VERSION: {REACT_VERSION}\nTYPESCRIPT CONSTRAINTS: {TYPESCRIPT_CONSTRAINTS}\nTEST FRAMEWORK: {TEST_FRAMEWORK}\n\nTask workflow:\n1. Define component API, props, states, and accessibility semantics.\n2. Implement controlled interactions without unnecessary dependencies.\n3. Address keyboard focus and labels.\n4. Include loading, empty, error, and disabled states as needed.\n5. Write representative tests..\n\nAccuracy and safety rules:\n- Only use facts present in my inputs or explicitly identified as checked references; distinguish facts from assumptions.\n- If a required item is missing, mark it unknown and explain the minimum verification needed. Do not fabricate examples as if they were real.\n- Automated checks cannot guarantee accessibility; keyboard and screen-reader review remain necessary.\n- Explain important tradeoffs and any limitation caused by my stated format, platform, or audience.\n- Avoid padding, repetitive claims, fake metrics, and promises of guaranteed ranking, performance, admission, or success.\n- Clearly label ready-to-use material versus suggestions that still need verification.\n\nDeliverables:\n1. A typed component\n2. Usage snippet\n3. Accessibility notes\n4. And unit or interaction tests.\n5. Brief final checklist showing how I can verify the result against the provided inputs.\n\nBefore finalizing, check the work for contradictions, unsupported facts, and any missing edge cases. Prefer specific, useful instructions over generic advice.",
    "variations": [
      "Make the response shorter while keeping all required evidence and verification steps for Accessible React Component.",
      "Produce a beginner-friendly version that defines specialized terms and includes a concrete example for Accessible React Component.",
      "Use a professional, implementation-ready format with explicit edge cases, constraints, and acceptance criteria for Accessible React Component."
    ],
    "modelCompatibility": [
      "GPT",
      "Claude",
      "Gemini"
    ],
    "tags": [
      "development",
      "react",
      "typescript",
      "accessibility",
      "frontend"
    ],
    "updatedAtISO": "2026-11-05"
  },
  {
    "id": "xp3108",
    "slug": "rest-api-client-generator",
    "title": "REST API Client Generator With Error Handling",
    "purpose": "Implement an API client from verified endpoint documentation and response examples.",
    "description": "Implement an API client from verified endpoint documentation and response examples. This practical engineering workflow asks for relevant evidence, spells out how to use it, and produces a reviewable output instead of generic suggestions or invented details.",
    "whenToUse": "Use this template when your immediate task is implement an API client from verified endpoint documentation and response examples. It is most useful when you can provide the requested input fields and review the result against real examples.",
    "howItWorks": "The workflow anchors its reasoning in the supplied material, organizes the user's goal, and executes this task-specific process: Model request and response types; handle authentication safely; validate malformed and non-success responses; respect documented pagination, retries, and idempotency; build test doubles from supplied examples only.",
    "bestPractices": "Provide the official API contract and a redacted sample response. Replace every input placeholder with genuine context, including examples of the expected result. Review the first draft against your own constraints before reusing it.",
    "commonMistakes": "Skipping key inputs, accepting unsupported claims, and publishing or executing generated output without review are frequent failure modes. In this task especially: Do not guess undocumented endpoints or infer rate limits; handle secrets out of source control.",
    "expectedOutput": "The response should contain a typed client skeleton, usage examples, error-handling rules, and tests. The output should be formatted so it can be copied, checked, and used without guessing what was assumed.",
    "limitations": "Do not guess undocumented endpoints or infer rate limits; handle secrets out of source control. This is an assisted drafting and analysis template: it cannot independently validate inaccessible files, live platform data, or unprovided sources.",
    "technicalRequirements": "Works with GPT, Claude, and Gemini. Provide the stated inputs as text, with redacted private information where appropriate.",
    "realWorldApplications": "Suitable for people using AI to implement an API client from verified endpoint documentation and response examples in routine development workflows, with manual verification before reuse.",
    "successMetrics": "Successful and failure responses follow the supplied contract with no hidden assumptions. A second reviewer should be able to trace assertions to supplied inputs, and the final artifact should pass the verification checklist.",
    "relatedPrompts": "Explore related prompts in the development category when you need adjacent tasks, reviews, or follow-up work.",
    "prompt": "You are a specialist assisting with rest api client generator with error handling. Produce a practical, evidence-led result from the inputs below.\n\nAPI DOCUMENTATION: {API_DOCUMENTATION}\nAUTH METHOD: {AUTH_METHOD}\nREQUEST EXAMPLES: {REQUEST_EXAMPLES}\nRESPONSE SCHEMA: {RESPONSE_SCHEMA}\nLANGUAGE: {LANGUAGE}\nRATE LIMITS: {RATE_LIMITS}\n\nTask workflow:\n1. Model request and response types.\n2. Handle authentication safely.\n3. Validate malformed and non-success responses.\n4. Respect documented pagination, retries, and idempotency.\n5. Build test doubles from supplied examples only..\n\nAccuracy and safety rules:\n- Only use facts present in my inputs or explicitly identified as checked references; distinguish facts from assumptions.\n- If a required item is missing, mark it unknown and explain the minimum verification needed. Do not fabricate examples as if they were real.\n- Do not guess undocumented endpoints or infer rate limits; handle secrets out of source control.\n- Explain important tradeoffs and any limitation caused by my stated format, platform, or audience.\n- Avoid padding, repetitive claims, fake metrics, and promises of guaranteed ranking, performance, admission, or success.\n- Clearly label ready-to-use material versus suggestions that still need verification.\n\nDeliverables:\n1. A typed client skeleton\n2. Usage examples\n3. Error-handling rules\n4. And tests.\n5. Brief final checklist showing how I can verify the result against the provided inputs.\n\nBefore finalizing, check the work for contradictions, unsupported facts, and any missing edge cases. Prefer specific, useful instructions over generic advice.",
    "variations": [
      "Make the response shorter while keeping all required evidence and verification steps for REST API Client.",
      "Produce a beginner-friendly version that defines specialized terms and includes a concrete example for REST API Client.",
      "Use a professional, implementation-ready format with explicit edge cases, constraints, and acceptance criteria for REST API Client."
    ],
    "modelCompatibility": [
      "GPT",
      "Claude",
      "Gemini"
    ],
    "tags": [
      "development",
      "api",
      "rest",
      "typescript",
      "coding"
    ],
    "updatedAtISO": "2026-11-05"
  },
  {
    "id": "xp3109",
    "slug": "docker-compose-error-diagnostic",
    "title": "Docker Compose Error Diagnostic and Repair Prompt",
    "purpose": "Troubleshoot failed containers, builds, DNS, and volumes with reversible diagnostic steps.",
    "description": "Troubleshoot failed containers, builds, DNS, and volumes with reversible diagnostic steps. This practical engineering workflow asks for relevant evidence, spells out how to use it, and produces a reviewable output instead of generic suggestions or invented details.",
    "whenToUse": "Use this template when your immediate task is troubleshoot failed containers, builds, DNS, and volumes with reversible diagnostic steps. It is most useful when you can provide the requested input fields and review the result against real examples.",
    "howItWorks": "The workflow anchors its reasoning in the supplied material, organizes the user's goal, and executes this task-specific process: Classify the failure by image resolution, DNS, build dependency, networking, permissions, environment or health checks; propose non-destructive inspection commands first; avoid deleting volumes; show narrow fixes and validation steps.",
    "bestPractices": "Supply redacted Compose config, exact errors, and container statuses. Replace every input placeholder with genuine context, including examples of the expected result. Review the first draft against your own constraints before reusing it.",
    "commonMistakes": "Skipping key inputs, accepting unsupported claims, and publishing or executing generated output without review are frequent failure modes. In this task especially: Never recommend deleting data volumes or exposing secrets as a default diagnostic step.",
    "expectedOutput": "The response should contain a ranked diagnosis, read-only commands, targeted fixes, and post-fix health checks. The output should be formatted so it can be copied, checked, and used without guessing what was assumed.",
    "limitations": "Never recommend deleting data volumes or exposing secrets as a default diagnostic step. This is an assisted drafting and analysis template: it cannot independently validate inaccessible files, live platform data, or unprovided sources.",
    "technicalRequirements": "Works with GPT, Claude, and Gemini. Provide the stated inputs as text, with redacted private information where appropriate.",
    "realWorldApplications": "Suitable for people using AI to troubleshoot failed containers, builds, DNS, and volumes with reversible diagnostic steps in routine development workflows, with manual verification before reuse.",
    "successMetrics": "The fix addresses observed evidence and preserves state and data. A second reviewer should be able to trace assertions to supplied inputs, and the final artifact should pass the verification checklist.",
    "relatedPrompts": "Explore related prompts in the development category when you need adjacent tasks, reviews, or follow-up work.",
    "prompt": "You are a specialist assisting with docker compose error diagnostic and repair prompt. Produce a practical, evidence-led result from the inputs below.\n\nDOCKER VERSION: {DOCKER_VERSION}\nCOMPOSE FILE: {COMPOSE_FILE}\nSERVICE LOGS: {SERVICE_LOGS}\nERROR TEXT: {ERROR_TEXT}\nHOST OS: {HOST_OS}\nNETWORK AND VOLUME DETAILS: {NETWORK_AND_VOLUME_DETAILS}\n\nTask workflow:\n1. Classify the failure by image resolution, DNS, build dependency, networking, permissions, environment or health checks.\n2. Propose non-destructive inspection commands first.\n3. Avoid deleting volumes.\n4. Show narrow fixes and validation steps..\n\nAccuracy and safety rules:\n- Only use facts present in my inputs or explicitly identified as checked references; distinguish facts from assumptions.\n- If a required item is missing, mark it unknown and explain the minimum verification needed. Do not fabricate examples as if they were real.\n- Never recommend deleting data volumes or exposing secrets as a default diagnostic step.\n- Explain important tradeoffs and any limitation caused by my stated format, platform, or audience.\n- Avoid padding, repetitive claims, fake metrics, and promises of guaranteed ranking, performance, admission, or success.\n- Clearly label ready-to-use material versus suggestions that still need verification.\n\nDeliverables:\n1. A ranked diagnosis\n2. Read-only commands\n3. Targeted fixes\n4. And post-fix health checks.\n5. Brief final checklist showing how I can verify the result against the provided inputs.\n\nBefore finalizing, check the work for contradictions, unsupported facts, and any missing edge cases. Prefer specific, useful instructions over generic advice.",
    "variations": [
      "Make the response shorter while keeping all required evidence and verification steps for Docker Compose Error.",
      "Produce a beginner-friendly version that defines specialized terms and includes a concrete example for Docker Compose Error.",
      "Use a professional, implementation-ready format with explicit edge cases, constraints, and acceptance criteria for Docker Compose Error."
    ],
    "modelCompatibility": [
      "GPT",
      "Claude",
      "Gemini"
    ],
    "tags": [
      "development",
      "docker",
      "docker-compose",
      "devops",
      "troubleshooting"
    ],
    "updatedAtISO": "2026-11-05"
  },
  {
    "id": "xp3110",
    "slug": "github-actions-workflow-debugger",
    "title": "GitHub Actions Workflow Failure Debugger",
    "purpose": "Find whether a failing CI job was never scheduled, could not start, or failed in a step.",
    "description": "Find whether a failing CI job was never scheduled, could not start, or failed in a step. This practical engineering workflow asks for relevant evidence, spells out how to use it, and produces a reviewable output instead of generic suggestions or invented details.",
    "whenToUse": "Use this template when your immediate task is find whether a failing CI job was never scheduled, could not start, or failed in a step. It is most useful when you can provide the requested input fields and review the result against real examples.",
    "howItWorks": "The workflow anchors its reasoning in the supplied material, organizes the user's goal, and executes this task-specific process: Separate workflow trigger and runner provisioning failures from test failures; inspect permissions, environment, dependencies, secrets availability and cache; propose smallest verifiable YAML or script changes; never advise bypassing required safety checks.",
    "bestPractices": "Include the failing workflow YAML, run URL or logs, and relevant event. Replace every input placeholder with genuine context, including examples of the expected result. Review the first draft against your own constraints before reusing it.",
    "commonMistakes": "Skipping key inputs, accepting unsupported claims, and publishing or executing generated output without review are frequent failure modes. In this task especially: Missing runner logs cannot be treated as evidence that application tests failed.",
    "expectedOutput": "The response should contain a failure classification, evidence checklist, minimal workflow patch, and safe rerun path. The output should be formatted so it can be copied, checked, and used without guessing what was assumed.",
    "limitations": "Missing runner logs cannot be treated as evidence that application tests failed. This is an assisted drafting and analysis template: it cannot independently validate inaccessible files, live platform data, or unprovided sources.",
    "technicalRequirements": "Works with GPT, Claude, and Gemini. Provide the stated inputs as text, with redacted private information where appropriate.",
    "realWorldApplications": "Suitable for people using AI to find whether a failing CI job was never scheduled, could not start, or failed in a step in routine development workflows, with manual verification before reuse.",
    "successMetrics": "The proposed fix has a measurable CI verification step and does not weaken controls. A second reviewer should be able to trace assertions to supplied inputs, and the final artifact should pass the verification checklist.",
    "relatedPrompts": "Explore related prompts in the development category when you need adjacent tasks, reviews, or follow-up work.",
    "prompt": "You are a specialist assisting with github actions workflow failure debugger. Produce a practical, evidence-led result from the inputs below.\n\nWORKFLOW YAML: {WORKFLOW_YAML}\nRUN STATUS: {RUN_STATUS}\nJOB LOGS: {JOB_LOGS}\nTRIGGER EVENT: {TRIGGER_EVENT}\nRUNNER ENV: {RUNNER_ENV}\nRECENT CHANGES: {RECENT_CHANGES}\n\nTask workflow:\n1. Separate workflow trigger and runner provisioning failures from test failures.\n2. Inspect permissions, environment, dependencies, secrets availability and cache.\n3. Propose smallest verifiable YAML or script changes.\n4. Never advise bypassing required safety checks..\n\nAccuracy and safety rules:\n- Only use facts present in my inputs or explicitly identified as checked references; distinguish facts from assumptions.\n- If a required item is missing, mark it unknown and explain the minimum verification needed. Do not fabricate examples as if they were real.\n- Missing runner logs cannot be treated as evidence that application tests failed.\n- Explain important tradeoffs and any limitation caused by my stated format, platform, or audience.\n- Avoid padding, repetitive claims, fake metrics, and promises of guaranteed ranking, performance, admission, or success.\n- Clearly label ready-to-use material versus suggestions that still need verification.\n\nDeliverables:\n1. A failure classification\n2. Evidence checklist\n3. Minimal workflow patch\n4. And safe rerun path.\n5. Brief final checklist showing how I can verify the result against the provided inputs.\n\nBefore finalizing, check the work for contradictions, unsupported facts, and any missing edge cases. Prefer specific, useful instructions over generic advice.",
    "variations": [
      "Make the response shorter while keeping all required evidence and verification steps for GitHub Actions Workflow Failure Debugger.",
      "Produce a beginner-friendly version that defines specialized terms and includes a concrete example for GitHub Actions Workflow Failure Debugger.",
      "Use a professional, implementation-ready format with explicit edge cases, constraints, and acceptance criteria for GitHub Actions Workflow Failure Debugger."
    ],
    "modelCompatibility": [
      "GPT",
      "Claude",
      "Gemini"
    ],
    "tags": [
      "development",
      "github-actions",
      "ci-cd",
      "devops",
      "debugging"
    ],
    "updatedAtISO": "2026-11-05"
  },
  {
    "id": "xp3111",
    "slug": "xlookup-vlookup-formula-builder",
    "title": "Excel XLOOKUP and VLOOKUP Formula Builder",
    "purpose": "Write a dependable lookup formula for a real Excel table and its exact keys.",
    "description": "Write a dependable lookup formula for a real Excel table and its exact keys. This practical spreadsheet workflow asks for relevant evidence, spells out how to use it, and produces a reviewable output instead of generic suggestions or invented details.",
    "whenToUse": "Use this template when your immediate task is write a dependable lookup formula for a real Excel table and its exact keys. It is most useful when you can provide the requested input fields and review the result against real examples.",
    "howItWorks": "The workflow anchors its reasoning in the supplied material, organizes the user's goal, and executes this task-specific process: Identify lookup and return ranges; select XLOOKUP or an older-version fallback; handle missing values, repeated keys, blank rows, and exact-match behavior; demonstrate expected outputs with supplied examples.",
    "bestPractices": "Give actual column letters, headers, and examples including a missing key. Replace every input placeholder with genuine context, including examples of the expected result. Review the first draft against your own constraints before reusing it.",
    "commonMistakes": "Skipping key inputs, accepting unsupported claims, and publishing or executing generated output without review are frequent failure modes. In this task especially: Not all Excel versions support dynamic-array or XLOOKUP functions; no live workbook is assumed.",
    "expectedOutput": "The response should contain primary formula, compatible alternative, sample result checks, and pitfalls. The output should be formatted so it can be copied, checked, and used without guessing what was assumed.",
    "limitations": "Not all Excel versions support dynamic-array or XLOOKUP functions; no live workbook is assumed. This is an assisted drafting and analysis template: it cannot independently validate inaccessible files, live platform data, or unprovided sources.",
    "technicalRequirements": "Works with GPT, Claude, and Gemini. Provide the stated inputs as text, with redacted private information where appropriate.",
    "realWorldApplications": "Suitable for people using AI to write a dependable lookup formula for a real Excel table and its exact keys in routine spreadsheets workflows, with manual verification before reuse.",
    "successMetrics": "The formula returns the correct record and handles no-match cases explicitly. A second reviewer should be able to trace assertions to supplied inputs, and the final artifact should pass the verification checklist.",
    "relatedPrompts": "Explore related prompts in the spreadsheets category when you need adjacent tasks, reviews, or follow-up work.",
    "prompt": "You are a specialist assisting with excel xlookup and vlookup formula builder. Produce a practical, evidence-led result from the inputs below.\n\nLOOKUP GOAL: {LOOKUP_GOAL}\nSOURCE TABLE: {SOURCE_TABLE}\nLOOKUP VALUE: {LOOKUP_VALUE}\nRETURN COLUMN: {RETURN_COLUMN}\nSAMPLE ROWS: {SAMPLE_ROWS}\nEXCEL VERSION: {EXCEL_VERSION}\n\nTask workflow:\n1. Identify lookup and return ranges.\n2. Select XLOOKUP or an older-version fallback.\n3. Handle missing values, repeated keys, blank rows, and exact-match behavior.\n4. Demonstrate expected outputs with supplied examples..\n\nAccuracy and safety rules:\n- Only use facts present in my inputs or explicitly identified as checked references; distinguish facts from assumptions.\n- If a required item is missing, mark it unknown and explain the minimum verification needed. Do not fabricate examples as if they were real.\n- Not all Excel versions support dynamic-array or XLOOKUP functions; no live workbook is assumed.\n- Explain important tradeoffs and any limitation caused by my stated format, platform, or audience.\n- Avoid padding, repetitive claims, fake metrics, and promises of guaranteed ranking, performance, admission, or success.\n- Clearly label ready-to-use material versus suggestions that still need verification.\n\nDeliverables:\n1. Primary formula\n2. Compatible alternative\n3. Sample result checks\n4. And pitfalls.\n5. Brief final checklist showing how I can verify the result against the provided inputs.\n\nBefore finalizing, check the work for contradictions, unsupported facts, and any missing edge cases. Prefer specific, useful instructions over generic advice.",
    "variations": [
      "Make the response shorter while keeping all required evidence and verification steps for Excel XLOOKUP and VLOOKUP Formula.",
      "Produce a beginner-friendly version that defines specialized terms and includes a concrete example for Excel XLOOKUP and VLOOKUP Formula.",
      "Use a professional, implementation-ready format with explicit edge cases, constraints, and acceptance criteria for Excel XLOOKUP and VLOOKUP Formula."
    ],
    "modelCompatibility": [
      "GPT",
      "Claude",
      "Gemini"
    ],
    "tags": [
      "spreadsheets",
      "xlookup",
      "vlookup",
      "excel",
      "formula"
    ],
    "updatedAtISO": "2026-11-05"
  },
  {
    "id": "xp3112",
    "slug": "excel-pivot-table-analysis-plan",
    "title": "Excel Pivot Table Analysis Planner",
    "purpose": "Choose pivot rows, columns, values, and filters to answer a specific business question.",
    "description": "Choose pivot rows, columns, values, and filters to answer a specific business question. This practical spreadsheet workflow asks for relevant evidence, spells out how to use it, and produces a reviewable output instead of generic suggestions or invented details.",
    "whenToUse": "Use this template when your immediate task is choose pivot rows, columns, values, and filters to answer a specific business question. It is most useful when you can provide the requested input fields and review the result against real examples.",
    "howItWorks": "The workflow anchors its reasoning in the supplied material, organizes the user's goal, and executes this task-specific process: Map questions to appropriate aggregations; identify dimensions and measure types; warn about sums of rates, unique counts, missing data, and time grouping; outline pivot configuration and sanity checks.",
    "bestPractices": "Provide field types and define each metric's calculation rules. Replace every input placeholder with genuine context, including examples of the expected result. Review the first draft against your own constraints before reusing it.",
    "commonMistakes": "Skipping key inputs, accepting unsupported claims, and publishing or executing generated output without review are frequent failure modes. In this task especially: Sample data cannot prove full-dataset totals; complex calculated measures may need data model features.",
    "expectedOutput": "The response should contain an analysis-to-pivot mapping table, setup instructions, and validation checks. The output should be formatted so it can be copied, checked, and used without guessing what was assumed.",
    "limitations": "Sample data cannot prove full-dataset totals; complex calculated measures may need data model features. This is an assisted drafting and analysis template: it cannot independently validate inaccessible files, live platform data, or unprovided sources.",
    "technicalRequirements": "Works with GPT, Claude, and Gemini. Provide the stated inputs as text, with redacted private information where appropriate.",
    "realWorldApplications": "Suitable for people using AI to choose pivot rows, columns, values, and filters to answer a specific business question in routine spreadsheets workflows, with manual verification before reuse.",
    "successMetrics": "Each pivot directly answers a stated question with interpretable aggregates. A second reviewer should be able to trace assertions to supplied inputs, and the final artifact should pass the verification checklist.",
    "relatedPrompts": "Explore related prompts in the spreadsheets category when you need adjacent tasks, reviews, or follow-up work.",
    "prompt": "You are a specialist assisting with excel pivot table analysis planner. Produce a practical, evidence-led result from the inputs below.\n\nBUSINESS QUESTIONS: {BUSINESS_QUESTIONS}\nCOLUMN HEADERS: {COLUMN_HEADERS}\nSAMPLE DATA: {SAMPLE_DATA}\nDATE FIELDS: {DATE_FIELDS}\nMETRIC DEFINITIONS: {METRIC_DEFINITIONS}\nEXCEL VERSION: {EXCEL_VERSION}\n\nTask workflow:\n1. Map questions to appropriate aggregations.\n2. Identify dimensions and measure types.\n3. Warn about sums of rates, unique counts, missing data, and time grouping.\n4. Outline pivot configuration and sanity checks..\n\nAccuracy and safety rules:\n- Only use facts present in my inputs or explicitly identified as checked references; distinguish facts from assumptions.\n- If a required item is missing, mark it unknown and explain the minimum verification needed. Do not fabricate examples as if they were real.\n- Sample data cannot prove full-dataset totals; complex calculated measures may need data model features.\n- Explain important tradeoffs and any limitation caused by my stated format, platform, or audience.\n- Avoid padding, repetitive claims, fake metrics, and promises of guaranteed ranking, performance, admission, or success.\n- Clearly label ready-to-use material versus suggestions that still need verification.\n\nDeliverables:\n1. An analysis-to-pivot mapping table\n2. Setup instructions\n3. And validation checks.\n5. Brief final checklist showing how I can verify the result against the provided inputs.\n\nBefore finalizing, check the work for contradictions, unsupported facts, and any missing edge cases. Prefer specific, useful instructions over generic advice.",
    "variations": [
      "Make the response shorter while keeping all required evidence and verification steps for Excel Pivot Table Analysis.",
      "Produce a beginner-friendly version that defines specialized terms and includes a concrete example for Excel Pivot Table Analysis.",
      "Use a professional, implementation-ready format with explicit edge cases, constraints, and acceptance criteria for Excel Pivot Table Analysis."
    ],
    "modelCompatibility": [
      "GPT",
      "Claude",
      "Gemini"
    ],
    "tags": [
      "spreadsheets",
      "pivot-table",
      "excel",
      "data-analysis",
      "reporting"
    ],
    "updatedAtISO": "2026-11-05"
  },
  {
    "id": "xp3113",
    "slug": "google-sheets-dashboard-planner",
    "title": "Google Sheets KPI Dashboard Planner",
    "purpose": "Design a maintainable Sheets dashboard using real data columns and clearly defined metrics.",
    "description": "Design a maintainable Sheets dashboard using real data columns and clearly defined metrics. This practical spreadsheet workflow asks for relevant evidence, spells out how to use it, and produces a reviewable output instead of generic suggestions or invented details.",
    "whenToUse": "Use this template when your immediate task is design a maintainable Sheets dashboard using real data columns and clearly defined metrics. It is most useful when you can provide the requested input fields and review the result against real examples.",
    "howItWorks": "The workflow anchors its reasoning in the supplied material, organizes the user's goal, and executes this task-specific process: Choose a compact KPI set; define formulas and filters; explain source and calculation tab separation; select appropriate charts; add freshness and missing-data checks; specify an update workflow.",
    "bestPractices": "Provide true date, numeric, and categorical columns and stakeholder questions. Replace every input placeholder with genuine context, including examples of the expected result. Review the first draft against your own constraints before reusing it.",
    "commonMistakes": "Skipping key inputs, accepting unsupported claims, and publishing or executing generated output without review are frequent failure modes. In this task especially: Cannot infer actual trend or chart values from absent data or refresh data automatically.",
    "expectedOutput": "The response should contain a dashboard wireframe, KPI formula plan, chart mapping, and QA checklist. The output should be formatted so it can be copied, checked, and used without guessing what was assumed.",
    "limitations": "Cannot infer actual trend or chart values from absent data or refresh data automatically. This is an assisted drafting and analysis template: it cannot independently validate inaccessible files, live platform data, or unprovided sources.",
    "technicalRequirements": "Works with GPT, Claude, and Gemini. Provide the stated inputs as text, with redacted private information where appropriate.",
    "realWorldApplications": "Suitable for people using AI to design a maintainable Sheets dashboard using real data columns and clearly defined metrics in routine spreadsheets workflows, with manual verification before reuse.",
    "successMetrics": "Viewers can trace every KPI to source data and understand freshness. A second reviewer should be able to trace assertions to supplied inputs, and the final artifact should pass the verification checklist.",
    "relatedPrompts": "Explore related prompts in the spreadsheets category when you need adjacent tasks, reviews, or follow-up work.",
    "prompt": "You are a specialist assisting with google sheets kpi dashboard planner. Produce a practical, evidence-led result from the inputs below.\n\nREPORTING GOALS: {REPORTING_GOALS}\nSHEET SCHEMA: {SHEET_SCHEMA}\nSAMPLE ROWS: {SAMPLE_ROWS}\nMETRIC DEFINITIONS: {METRIC_DEFINITIONS}\nUPDATE FREQUENCY: {UPDATE_FREQUENCY}\nVIEWERS: {VIEWERS}\n\nTask workflow:\n1. Choose a compact KPI set.\n2. Define formulas and filters.\n3. Explain source and calculation tab separation.\n4. Select appropriate charts.\n5. Add freshness and missing-data checks.\n6. Specify an update workflow..\n\nAccuracy and safety rules:\n- Only use facts present in my inputs or explicitly identified as checked references; distinguish facts from assumptions.\n- If a required item is missing, mark it unknown and explain the minimum verification needed. Do not fabricate examples as if they were real.\n- Cannot infer actual trend or chart values from absent data or refresh data automatically.\n- Explain important tradeoffs and any limitation caused by my stated format, platform, or audience.\n- Avoid padding, repetitive claims, fake metrics, and promises of guaranteed ranking, performance, admission, or success.\n- Clearly label ready-to-use material versus suggestions that still need verification.\n\nDeliverables:\n1. A dashboard wireframe\n2. KPI formula plan\n3. Chart mapping\n4. And QA checklist.\n5. Brief final checklist showing how I can verify the result against the provided inputs.\n\nBefore finalizing, check the work for contradictions, unsupported facts, and any missing edge cases. Prefer specific, useful instructions over generic advice.",
    "variations": [
      "Make the response shorter while keeping all required evidence and verification steps for Google Sheets KPI Dashboard.",
      "Produce a beginner-friendly version that defines specialized terms and includes a concrete example for Google Sheets KPI Dashboard.",
      "Use a professional, implementation-ready format with explicit edge cases, constraints, and acceptance criteria for Google Sheets KPI Dashboard."
    ],
    "modelCompatibility": [
      "GPT",
      "Claude",
      "Gemini"
    ],
    "tags": [
      "spreadsheets",
      "google-sheets",
      "dashboard",
      "kpi",
      "spreadsheet"
    ],
    "updatedAtISO": "2026-11-05"
  },
  {
    "id": "xp3114",
    "slug": "csv-dataset-analysis-prompt",
    "title": "CSV Dataset Analysis Prompt for Descriptive Insights",
    "purpose": "Analyze a tabular dataset with explicit data checks before drawing conclusions.",
    "description": "Analyze a tabular dataset with explicit data checks before drawing conclusions. This practical spreadsheet workflow asks for relevant evidence, spells out how to use it, and produces a reviewable output instead of generic suggestions or invented details.",
    "whenToUse": "Use this template when your immediate task is analyze a tabular dataset with explicit data checks before drawing conclusions. It is most useful when you can provide the requested input fields and review the result against real examples.",
    "howItWorks": "The workflow anchors its reasoning in the supplied material, organizes the user's goal, and executes this task-specific process: Profile fields and missingness; identify suitable grouping, summaries, and visualizations; calculate only with accessible rows; distinguish observed results from hypothetical analyses; flag correlation versus causation.",
    "bestPractices": "Provide full anonymized data for real calculations or label partial samples clearly. Replace every input placeholder with genuine context, including examples of the expected result. Review the first draft against your own constraints before reusing it.",
    "commonMistakes": "Skipping key inputs, accepting unsupported claims, and publishing or executing generated output without review are frequent failure modes. In this task especially: A sample cannot justify full-file statistics; protect personal data and avoid causal leaps.",
    "expectedOutput": "The response should contain a data quality report, prioritized analysis questions, reproducible steps, and chart suggestions. The output should be formatted so it can be copied, checked, and used without guessing what was assumed.",
    "limitations": "A sample cannot justify full-file statistics; protect personal data and avoid causal leaps. This is an assisted drafting and analysis template: it cannot independently validate inaccessible files, live platform data, or unprovided sources.",
    "technicalRequirements": "Works with GPT, Claude, and Gemini. Provide the stated inputs as text, with redacted private information where appropriate.",
    "realWorldApplications": "Suitable for people using AI to analyze a tabular dataset with explicit data checks before drawing conclusions in routine spreadsheets workflows, with manual verification before reuse.",
    "successMetrics": "Every reported statistic is computable from supplied rows and assumptions are declared. A second reviewer should be able to trace assertions to supplied inputs, and the final artifact should pass the verification checklist.",
    "relatedPrompts": "Explore related prompts in the spreadsheets category when you need adjacent tasks, reviews, or follow-up work.",
    "prompt": "You are a specialist assisting with csv dataset analysis prompt for descriptive insights. Produce a practical, evidence-led result from the inputs below.\n\nDATASET DESCRIPTION: {DATASET_DESCRIPTION}\nCOLUMN HEADERS: {COLUMN_HEADERS}\nSAMPLE OR FULL CSV: {SAMPLE_OR_FULL_CSV}\nANALYSIS QUESTIONS: {ANALYSIS_QUESTIONS}\nDATA DICTIONARY: {DATA_DICTIONARY}\nSENSITIVE FIELDS: {SENSITIVE_FIELDS}\n\nTask workflow:\n1. Profile fields and missingness.\n2. Identify suitable grouping, summaries, and visualizations.\n3. Calculate only with accessible rows.\n4. Distinguish observed results from hypothetical analyses.\n5. Flag correlation versus causation..\n\nAccuracy and safety rules:\n- Only use facts present in my inputs or explicitly identified as checked references; distinguish facts from assumptions.\n- If a required item is missing, mark it unknown and explain the minimum verification needed. Do not fabricate examples as if they were real.\n- A sample cannot justify full-file statistics; protect personal data and avoid causal leaps.\n- Explain important tradeoffs and any limitation caused by my stated format, platform, or audience.\n- Avoid padding, repetitive claims, fake metrics, and promises of guaranteed ranking, performance, admission, or success.\n- Clearly label ready-to-use material versus suggestions that still need verification.\n\nDeliverables:\n1. A data quality report\n2. Prioritized analysis questions\n3. Reproducible steps\n4. And chart suggestions.\n5. Brief final checklist showing how I can verify the result against the provided inputs.\n\nBefore finalizing, check the work for contradictions, unsupported facts, and any missing edge cases. Prefer specific, useful instructions over generic advice.",
    "variations": [
      "Make the response shorter while keeping all required evidence and verification steps for CSV Dataset Analysis Prompt for Descriptive Insights.",
      "Produce a beginner-friendly version that defines specialized terms and includes a concrete example for CSV Dataset Analysis Prompt for Descriptive Insights.",
      "Use a professional, implementation-ready format with explicit edge cases, constraints, and acceptance criteria for CSV Dataset Analysis Prompt for Descriptive Insights."
    ],
    "modelCompatibility": [
      "GPT",
      "Claude",
      "Gemini"
    ],
    "tags": [
      "spreadsheets",
      "csv",
      "data-analysis",
      "statistics",
      "spreadsheet"
    ],
    "updatedAtISO": "2026-11-05"
  },
  {
    "id": "xp3115",
    "slug": "excel-monthly-budget-tracker-builder",
    "title": "Excel Monthly Budget Tracker With Formulas",
    "purpose": "Design a monthly budget worksheet with clear categories, balances, and variance formulas.",
    "description": "Design a monthly budget worksheet with clear categories, balances, and variance formulas. This practical spreadsheet workflow asks for relevant evidence, spells out how to use it, and produces a reviewable output instead of generic suggestions or invented details.",
    "whenToUse": "Use this template when your immediate task is design a monthly budget worksheet with clear categories, balances, and variance formulas. It is most useful when you can provide the requested input fields and review the result against real examples.",
    "howItWorks": "The workflow anchors its reasoning in the supplied material, organizes the user's goal, and executes this task-specific process: Define transaction and budget tables; include category totals, remaining budget, variance, and roll-forward checks; prevent double-counting transfers; explain how to reconcile actuals to source records.",
    "bestPractices": "Give example categories and define how transfers, refunds, and irregular bills work. Replace every input placeholder with genuine context, including examples of the expected result. Review the first draft against your own constraints before reusing it.",
    "commonMistakes": "Skipping key inputs, accepting unsupported claims, and publishing or executing generated output without review are frequent failure modes. In this task especially: Missing or miscategorized transactions make totals wrong; do not infer transactions or banking data.",
    "expectedOutput": "The response should contain sheet layout, formula examples, reconciliation checks, and a setup checklist. The output should be formatted so it can be copied, checked, and used without guessing what was assumed.",
    "limitations": "Missing or miscategorized transactions make totals wrong; do not infer transactions or banking data. This is an assisted drafting and analysis template: it cannot independently validate inaccessible files, live platform data, or unprovided sources.",
    "technicalRequirements": "Works with GPT, Claude, and Gemini. Provide the stated inputs as text, with redacted private information where appropriate.",
    "realWorldApplications": "Suitable for people using AI to design a monthly budget worksheet with clear categories, balances, and variance formulas in routine spreadsheets workflows, with manual verification before reuse.",
    "successMetrics": "Monthly totals reconcile and the variance clearly separates overspend from underspend. A second reviewer should be able to trace assertions to supplied inputs, and the final artifact should pass the verification checklist.",
    "relatedPrompts": "Explore related prompts in the spreadsheets category when you need adjacent tasks, reviews, or follow-up work.",
    "prompt": "You are a specialist assisting with excel monthly budget tracker with formulas. Produce a practical, evidence-led result from the inputs below.\n\nINCOME CATEGORIES: {INCOME_CATEGORIES}\nEXPENSE CATEGORIES: {EXPENSE_CATEGORIES}\nSAMPLE TRANSACTIONS: {SAMPLE_TRANSACTIONS}\nCURRENCY: {CURRENCY}\nBUDGET PERIOD: {BUDGET_PERIOD}\nEXCEL VERSION: {EXCEL_VERSION}\n\nTask workflow:\n1. Define transaction and budget tables.\n2. Include category totals, remaining budget, variance, and roll-forward checks.\n3. Prevent double-counting transfers.\n4. Explain how to reconcile actuals to source records..\n\nAccuracy and safety rules:\n- Only use facts present in my inputs or explicitly identified as checked references; distinguish facts from assumptions.\n- If a required item is missing, mark it unknown and explain the minimum verification needed. Do not fabricate examples as if they were real.\n- Missing or miscategorized transactions make totals wrong; do not infer transactions or banking data.\n- Explain important tradeoffs and any limitation caused by my stated format, platform, or audience.\n- Avoid padding, repetitive claims, fake metrics, and promises of guaranteed ranking, performance, admission, or success.\n- Clearly label ready-to-use material versus suggestions that still need verification.\n\nDeliverables:\n1. Sheet layout\n2. Formula examples\n3. Reconciliation checks\n4. And a setup checklist.\n5. Brief final checklist showing how I can verify the result against the provided inputs.\n\nBefore finalizing, check the work for contradictions, unsupported facts, and any missing edge cases. Prefer specific, useful instructions over generic advice.",
    "variations": [
      "Make the response shorter while keeping all required evidence and verification steps for Excel Monthly Budget Tracker.",
      "Produce a beginner-friendly version that defines specialized terms and includes a concrete example for Excel Monthly Budget Tracker.",
      "Use a professional, implementation-ready format with explicit edge cases, constraints, and acceptance criteria for Excel Monthly Budget Tracker."
    ],
    "modelCompatibility": [
      "GPT",
      "Claude",
      "Gemini"
    ],
    "tags": [
      "spreadsheets",
      "excel",
      "budget",
      "personal-finance",
      "formulas"
    ],
    "updatedAtISO": "2026-11-05"
  },
  {
    "id": "xp3116",
    "slug": "seo-meta-title-description-optimizer",
    "title": "SEO Meta Title and Description Optimizer",
    "purpose": "Write distinct title tags and meta descriptions around real page intent and content.",
    "description": "Write distinct title tags and meta descriptions around real page intent and content. This practical search-optimization workflow asks for relevant evidence, spells out how to use it, and produces a reviewable output instead of generic suggestions or invented details.",
    "whenToUse": "Use this template when your immediate task is write distinct title tags and meta descriptions around real page intent and content. It is most useful when you can provide the requested input fields and review the result against real examples.",
    "howItWorks": "The workflow anchors its reasoning in the supplied material, organizes the user's goal, and executes this task-specific process: Summarize page purpose; draft multiple accurate titles and descriptions; prefer useful differentiation over exact-match repetition; account for title truncation heuristics without claiming universal pixel limits; flag overlap with sibling pages.",
    "bestPractices": "Provide actual page text and neighboring page titles to prevent duplication. Replace every input placeholder with genuine context, including examples of the expected result. Review the first draft against your own constraints before reusing it.",
    "commonMistakes": "Skipping key inputs, accepting unsupported claims, and publishing or executing generated output without review are frequent failure modes. In this task especially: Search engines may rewrite snippets; copy changes do not guarantee visibility or CTR.",
    "expectedOutput": "The response should contain five title candidates, five descriptions, a recommended pair, and an accuracy checklist. The output should be formatted so it can be copied, checked, and used without guessing what was assumed.",
    "limitations": "Search engines may rewrite snippets; copy changes do not guarantee visibility or CTR. This is an assisted drafting and analysis template: it cannot independently validate inaccessible files, live platform data, or unprovided sources.",
    "technicalRequirements": "Works with GPT, Claude, and Gemini. Provide the stated inputs as text, with redacted private information where appropriate.",
    "realWorldApplications": "Suitable for people using AI to write distinct title tags and meta descriptions around real page intent and content in routine seo workflows, with manual verification before reuse.",
    "successMetrics": "Metadata matches the page promise and is distinct from competing site pages. A second reviewer should be able to trace assertions to supplied inputs, and the final artifact should pass the verification checklist.",
    "relatedPrompts": "Explore related prompts in the seo category when you need adjacent tasks, reviews, or follow-up work.",
    "prompt": "You are a specialist assisting with seo meta title and description optimizer. Produce a practical, evidence-led result from the inputs below.\n\nPAGE URL: {PAGE_URL}\nVISIBLE PAGE COPY: {VISIBLE_PAGE_COPY}\nPRIMARY SEARCH INTENT: {PRIMARY_SEARCH_INTENT}\nTARGET AUDIENCE: {TARGET_AUDIENCE}\nRELATED SITE PAGES: {RELATED_SITE_PAGES}\nBRAND RULES: {BRAND_RULES}\n\nTask workflow:\n1. Summarize page purpose.\n2. Draft multiple accurate titles and descriptions.\n3. Prefer useful differentiation over exact-match repetition.\n4. Account for title truncation heuristics without claiming universal pixel limits.\n5. Flag overlap with sibling pages..\n\nAccuracy and safety rules:\n- Only use facts present in my inputs or explicitly identified as checked references; distinguish facts from assumptions.\n- If a required item is missing, mark it unknown and explain the minimum verification needed. Do not fabricate examples as if they were real.\n- Search engines may rewrite snippets; copy changes do not guarantee visibility or CTR.\n- Explain important tradeoffs and any limitation caused by my stated format, platform, or audience.\n- Avoid padding, repetitive claims, fake metrics, and promises of guaranteed ranking, performance, admission, or success.\n- Clearly label ready-to-use material versus suggestions that still need verification.\n\nDeliverables:\n1. Five title candidates\n2. Five descriptions\n3. A recommended pair\n4. And an accuracy checklist.\n5. Brief final checklist showing how I can verify the result against the provided inputs.\n\nBefore finalizing, check the work for contradictions, unsupported facts, and any missing edge cases. Prefer specific, useful instructions over generic advice.",
    "variations": [
      "Make the response shorter while keeping all required evidence and verification steps for SEO Meta Title and Description.",
      "Produce a beginner-friendly version that defines specialized terms and includes a concrete example for SEO Meta Title and Description.",
      "Use a professional, implementation-ready format with explicit edge cases, constraints, and acceptance criteria for SEO Meta Title and Description."
    ],
    "modelCompatibility": [
      "GPT",
      "Claude",
      "Gemini"
    ],
    "tags": [
      "seo",
      "meta-description",
      "title-tag",
      "on-page-seo"
    ],
    "updatedAtISO": "2026-11-05"
  },
  {
    "id": "xp3117",
    "slug": "technical-seo-audit-checklist",
    "title": "Technical SEO Audit Checklist From Crawl Findings",
    "purpose": "Turn actual site crawl and indexing observations into a prioritized technical SEO repair plan.",
    "description": "Turn actual site crawl and indexing observations into a prioritized technical SEO repair plan. This practical search-optimization workflow asks for relevant evidence, spells out how to use it, and produces a reviewable output instead of generic suggestions or invented details.",
    "whenToUse": "Use this template when your immediate task is turn actual site crawl and indexing observations into a prioritized technical SEO repair plan. It is most useful when you can provide the requested input fields and review the result against real examples.",
    "howItWorks": "The workflow anchors its reasoning in the supplied material, organizes the user's goal, and executes this task-specific process: Classify discovered issues in crawlability, robots, canonicals, redirects, status codes, rendering, structured data, and internal links; prioritize impact by evidence; propose verification steps and rollback risk for each change.",
    "bestPractices": "Supply dated crawl exports and specific URL examples instead of a vague domain name. Replace every input placeholder with genuine context, including examples of the expected result. Review the first draft against your own constraints before reusing it.",
    "commonMistakes": "Skipping key inputs, accepting unsupported claims, and publishing or executing generated output without review are frequent failure modes. In this task especially: Cannot assert a site has errors without crawl, HTTP, or Search Console evidence.",
    "expectedOutput": "The response should contain issue triage table, implementation order, expected tests, and monitoring plan. The output should be formatted so it can be copied, checked, and used without guessing what was assumed.",
    "limitations": "Cannot assert a site has errors without crawl, HTTP, or Search Console evidence. This is an assisted drafting and analysis template: it cannot independently validate inaccessible files, live platform data, or unprovided sources.",
    "technicalRequirements": "Works with GPT, Claude, and Gemini. Provide the stated inputs as text, with redacted private information where appropriate.",
    "realWorldApplications": "Suitable for people using AI to turn actual site crawl and indexing observations into a prioritized technical SEO repair plan in routine seo workflows, with manual verification before reuse.",
    "successMetrics": "Issues are observable before fixes and independently verifiable afterward. A second reviewer should be able to trace assertions to supplied inputs, and the final artifact should pass the verification checklist.",
    "relatedPrompts": "Explore related prompts in the seo category when you need adjacent tasks, reviews, or follow-up work.",
    "prompt": "You are a specialist assisting with technical seo audit checklist from crawl findings. Produce a practical, evidence-led result from the inputs below.\n\nSITE URL: {SITE_URL}\nCRAWL EXPORT: {CRAWL_EXPORT}\nINDEXING REPORT: {INDEXING_REPORT}\nROBOTS AND SITEMAP: {ROBOTS_AND_SITEMAP}\nPLATFORM: {PLATFORM}\nBUSINESS PRIORITY: {BUSINESS_PRIORITY}\n\nTask workflow:\n1. Classify discovered issues in crawlability, robots, canonicals, redirects, status codes, rendering, structured data, and internal links.\n2. Prioritize impact by evidence.\n3. Propose verification steps and rollback risk for each change..\n\nAccuracy and safety rules:\n- Only use facts present in my inputs or explicitly identified as checked references; distinguish facts from assumptions.\n- If a required item is missing, mark it unknown and explain the minimum verification needed. Do not fabricate examples as if they were real.\n- Cannot assert a site has errors without crawl, HTTP, or Search Console evidence.\n- Explain important tradeoffs and any limitation caused by my stated format, platform, or audience.\n- Avoid padding, repetitive claims, fake metrics, and promises of guaranteed ranking, performance, admission, or success.\n- Clearly label ready-to-use material versus suggestions that still need verification.\n\nDeliverables:\n1. Issue triage table\n2. Implementation order\n3. Expected tests\n4. And monitoring plan.\n5. Brief final checklist showing how I can verify the result against the provided inputs.\n\nBefore finalizing, check the work for contradictions, unsupported facts, and any missing edge cases. Prefer specific, useful instructions over generic advice.",
    "variations": [
      "Make the response shorter while keeping all required evidence and verification steps for Technical SEO Audit Checklist From Crawl Findings.",
      "Produce a beginner-friendly version that defines specialized terms and includes a concrete example for Technical SEO Audit Checklist From Crawl Findings.",
      "Use a professional, implementation-ready format with explicit edge cases, constraints, and acceptance criteria for Technical SEO Audit Checklist From Crawl Findings."
    ],
    "modelCompatibility": [
      "GPT",
      "Claude",
      "Gemini"
    ],
    "tags": [
      "technical-seo",
      "seo",
      "site-audit",
      "indexing"
    ],
    "updatedAtISO": "2026-11-05"
  },
  {
    "id": "xp3118",
    "slug": "seo-internal-linking-opportunity-finder",
    "title": "SEO Internal Linking Opportunity Finder",
    "purpose": "Map genuinely relevant internal links among existing pages without creating link spam.",
    "description": "Map genuinely relevant internal links among existing pages without creating link spam. This practical search-optimization workflow asks for relevant evidence, spells out how to use it, and produces a reviewable output instead of generic suggestions or invented details.",
    "whenToUse": "Use this template when your immediate task is map genuinely relevant internal links among existing pages without creating link spam. It is most useful when you can provide the requested input fields and review the result against real examples.",
    "howItWorks": "The workflow anchors its reasoning in the supplied material, organizes the user's goal, and executes this task-specific process: Identify reader tasks and topical relationships; suggest descriptive contextual anchors; prefer navigation improvements where appropriate; detect orphaned pages and excessive repetitive links; prioritize links by relevance, not arbitrary quotas.",
    "bestPractices": "Provide real URLs and short summaries of their current content. Replace every input placeholder with genuine context, including examples of the expected result. Review the first draft against your own constraints before reusing it.",
    "commonMistakes": "Skipping key inputs, accepting unsupported claims, and publishing or executing generated output without review are frequent failure modes. In this task especially: No tool can verify all live links without a complete site crawl; anchors require editorial judgment.",
    "expectedOutput": "The response should contain a source-to-target linking map, suggested anchors, contextual reasons, and an audit checklist. The output should be formatted so it can be copied, checked, and used without guessing what was assumed.",
    "limitations": "No tool can verify all live links without a complete site crawl; anchors require editorial judgment. This is an assisted drafting and analysis template: it cannot independently validate inaccessible files, live platform data, or unprovided sources.",
    "technicalRequirements": "Works with GPT, Claude, and Gemini. Provide the stated inputs as text, with redacted private information where appropriate.",
    "realWorldApplications": "Suitable for people using AI to map genuinely relevant internal links among existing pages without creating link spam in routine seo workflows, with manual verification before reuse.",
    "successMetrics": "Suggested links help readers reach a relevant next step, without misleading anchors. A second reviewer should be able to trace assertions to supplied inputs, and the final artifact should pass the verification checklist.",
    "relatedPrompts": "Explore related prompts in the seo category when you need adjacent tasks, reviews, or follow-up work.",
    "prompt": "You are a specialist assisting with seo internal linking opportunity finder. Produce a practical, evidence-led result from the inputs below.\n\nSOURCE PAGES: {SOURCE_PAGES}\nTARGET PAGES: {TARGET_PAGES}\nPAGE SUMMARIES: {PAGE_SUMMARIES}\nSITE NAVIGATION: {SITE_NAVIGATION}\nTOPIC CLUSTERS: {TOPIC_CLUSTERS}\nLINKING CONSTRAINTS: {LINKING_CONSTRAINTS}\n\nTask workflow:\n1. Identify reader tasks and topical relationships.\n2. Suggest descriptive contextual anchors.\n3. Prefer navigation improvements where appropriate.\n4. Detect orphaned pages and excessive repetitive links.\n5. Prioritize links by relevance, not arbitrary quotas..\n\nAccuracy and safety rules:\n- Only use facts present in my inputs or explicitly identified as checked references; distinguish facts from assumptions.\n- If a required item is missing, mark it unknown and explain the minimum verification needed. Do not fabricate examples as if they were real.\n- No tool can verify all live links without a complete site crawl; anchors require editorial judgment.\n- Explain important tradeoffs and any limitation caused by my stated format, platform, or audience.\n- Avoid padding, repetitive claims, fake metrics, and promises of guaranteed ranking, performance, admission, or success.\n- Clearly label ready-to-use material versus suggestions that still need verification.\n\nDeliverables:\n1. A source-to-target linking map\n2. Suggested anchors\n3. Contextual reasons\n4. And an audit checklist.\n5. Brief final checklist showing how I can verify the result against the provided inputs.\n\nBefore finalizing, check the work for contradictions, unsupported facts, and any missing edge cases. Prefer specific, useful instructions over generic advice.",
    "variations": [
      "Make the response shorter while keeping all required evidence and verification steps for SEO Internal Linking Opportunity Finder.",
      "Produce a beginner-friendly version that defines specialized terms and includes a concrete example for SEO Internal Linking Opportunity Finder.",
      "Use a professional, implementation-ready format with explicit edge cases, constraints, and acceptance criteria for SEO Internal Linking Opportunity Finder."
    ],
    "modelCompatibility": [
      "GPT",
      "Claude",
      "Gemini"
    ],
    "tags": [
      "internal-linking",
      "seo",
      "content-audit",
      "website"
    ],
    "updatedAtISO": "2026-11-05"
  },
  {
    "id": "xp3119",
    "slug": "google-business-profile-optimization-prompt",
    "title": "Google Business Profile Optimization Checklist",
    "purpose": "Improve a local business listing using verified business details and policies.",
    "description": "Improve a local business listing using verified business details and policies. This practical search-optimization workflow asks for relevant evidence, spells out how to use it, and produces a reviewable output instead of generic suggestions or invented details.",
    "whenToUse": "Use this template when your immediate task is improve a local business listing using verified business details and policies. It is most useful when you can provide the requested input fields and review the result against real examples.",
    "howItWorks": "The workflow anchors its reasoning in the supplied material, organizes the user's goal, and executes this task-specific process: Audit name and category consistency; write accurate business descriptions, service summaries, and Q&A drafts; plan photos and updates; recommend review responses that do not invent customer experiences; flag business eligibility and verification questions.",
    "bestPractices": "Provide a genuine customer-facing business, current listing fields, and actual service geography. Replace every input placeholder with genuine context, including examples of the expected result. Review the first draft against your own constraints before reusing it.",
    "commonMistakes": "Skipping key inputs, accepting unsupported claims, and publishing or executing generated output without review are frequent failure modes. In this task especially: Google listing rules and local ranking vary; do not promise rankings or suggest fake reviews.",
    "expectedOutput": "The response should contain a profile-field improvement plan, factual copy drafts, and a verification checklist. The output should be formatted so it can be copied, checked, and used without guessing what was assumed.",
    "limitations": "Google listing rules and local ranking vary; do not promise rankings or suggest fake reviews. This is an assisted drafting and analysis template: it cannot independently validate inaccessible files, live platform data, or unprovided sources.",
    "technicalRequirements": "Works with GPT, Claude, and Gemini. Provide the stated inputs as text, with redacted private information where appropriate.",
    "realWorldApplications": "Suitable for people using AI to improve a local business listing using verified business details and policies in routine seo workflows, with manual verification before reuse.",
    "successMetrics": "Every field is accurate, consistent, and supports a real customer decision. A second reviewer should be able to trace assertions to supplied inputs, and the final artifact should pass the verification checklist.",
    "relatedPrompts": "Explore related prompts in the seo category when you need adjacent tasks, reviews, or follow-up work.",
    "prompt": "You are a specialist assisting with google business profile optimization checklist. Produce a practical, evidence-led result from the inputs below.\n\nBUSINESS NAME: {BUSINESS_NAME}\nBUSINESS CATEGORY: {BUSINESS_CATEGORY}\nVERIFIED ADDRESS AND HOURS: {VERIFIED_ADDRESS_AND_HOURS}\nSERVICES: {SERVICES}\nSERVICE AREA: {SERVICE_AREA}\nPROFILE CONTENT: {PROFILE_CONTENT}\n\nTask workflow:\n1. Audit name and category consistency.\n2. Write accurate business descriptions, service summaries, and Q&A drafts.\n3. Plan photos and updates.\n4. Recommend review responses that do not invent customer experiences.\n5. Flag business eligibility and verification questions..\n\nAccuracy and safety rules:\n- Only use facts present in my inputs or explicitly identified as checked references; distinguish facts from assumptions.\n- If a required item is missing, mark it unknown and explain the minimum verification needed. Do not fabricate examples as if they were real.\n- Google listing rules and local ranking vary; do not promise rankings or suggest fake reviews.\n- Explain important tradeoffs and any limitation caused by my stated format, platform, or audience.\n- Avoid padding, repetitive claims, fake metrics, and promises of guaranteed ranking, performance, admission, or success.\n- Clearly label ready-to-use material versus suggestions that still need verification.\n\nDeliverables:\n1. A profile-field improvement plan\n2. Factual copy drafts\n3. And a verification checklist.\n5. Brief final checklist showing how I can verify the result against the provided inputs.\n\nBefore finalizing, check the work for contradictions, unsupported facts, and any missing edge cases. Prefer specific, useful instructions over generic advice.",
    "variations": [
      "Make the response shorter while keeping all required evidence and verification steps for Google Business Profile Optimization Checklist.",
      "Produce a beginner-friendly version that defines specialized terms and includes a concrete example for Google Business Profile Optimization Checklist.",
      "Use a professional, implementation-ready format with explicit edge cases, constraints, and acceptance criteria for Google Business Profile Optimization Checklist."
    ],
    "modelCompatibility": [
      "GPT",
      "Claude",
      "Gemini"
    ],
    "tags": [
      "seo",
      "local-seo",
      "google-business-profile",
      "small-business",
      "marketing"
    ],
    "updatedAtISO": "2026-11-05"
  },
  {
    "id": "xp3120",
    "slug": "ecommerce-category-seo-content-plan",
    "title": "E-commerce Category Page SEO Content Planner",
    "purpose": "Create useful category-page guidance that supports product discovery and comparisons.",
    "description": "Create useful category-page guidance that supports product discovery and comparisons. This practical search-optimization workflow asks for relevant evidence, spells out how to use it, and produces a reviewable output instead of generic suggestions or invented details.",
    "whenToUse": "Use this template when your immediate task is create useful category-page guidance that supports product discovery and comparisons. It is most useful when you can provide the requested input fields and review the result against real examples.",
    "howItWorks": "The workflow anchors its reasoning in the supplied material, organizes the user's goal, and executes this task-specific process: Define the shopping task; organize filters and buyer criteria; write concise explanatory copy grounded in products on sale; identify duplicate category/filter URL risk; plan natural internal links to subcategories and item pages.",
    "bestPractices": "Supply live inventory attributes and your current URL taxonomy. Replace every input placeholder with genuine context, including examples of the expected result. Review the first draft against your own constraints before reusing it.",
    "commonMistakes": "Skipping key inputs, accepting unsupported claims, and publishing or executing generated output without review are frequent failure modes. In this task especially: Cannot invent product availability, prices, shipping, or ranking potential.",
    "expectedOutput": "The response should contain category page outline, practical buyer guidance, metadata suggestions, and canonicalization questions. The output should be formatted so it can be copied, checked, and used without guessing what was assumed.",
    "limitations": "Cannot invent product availability, prices, shipping, or ranking potential. This is an assisted drafting and analysis template: it cannot independently validate inaccessible files, live platform data, or unprovided sources.",
    "technicalRequirements": "Works with GPT, Claude, and Gemini. Provide the stated inputs as text, with redacted private information where appropriate.",
    "realWorldApplications": "Suitable for people using AI to create useful category-page guidance that supports product discovery and comparisons in routine seo workflows, with manual verification before reuse.",
    "successMetrics": "Customers can confidently narrow choices without redundant SEO filler. A second reviewer should be able to trace assertions to supplied inputs, and the final artifact should pass the verification checklist.",
    "relatedPrompts": "Explore related prompts in the seo category when you need adjacent tasks, reviews, or follow-up work.",
    "prompt": "You are a specialist assisting with e-commerce category page seo content planner. Produce a practical, evidence-led result from the inputs below.\n\nCATEGORY NAME: {CATEGORY_NAME}\nPRODUCT CATALOG: {PRODUCT_CATALOG}\nFILTER OPTIONS: {FILTER_OPTIONS}\nBUYER QUESTIONS: {BUYER_QUESTIONS}\nEXISTING CATEGORY URLS: {EXISTING_CATEGORY_URLS}\nVERIFIED SPECS: {VERIFIED_SPECS}\n\nTask workflow:\n1. Define the shopping task.\n2. Organize filters and buyer criteria.\n3. Write concise explanatory copy grounded in products on sale.\n4. Identify duplicate category/filter URL risk.\n5. Plan natural internal links to subcategories and item pages..\n\nAccuracy and safety rules:\n- Only use facts present in my inputs or explicitly identified as checked references; distinguish facts from assumptions.\n- If a required item is missing, mark it unknown and explain the minimum verification needed. Do not fabricate examples as if they were real.\n- Cannot invent product availability, prices, shipping, or ranking potential.\n- Explain important tradeoffs and any limitation caused by my stated format, platform, or audience.\n- Avoid padding, repetitive claims, fake metrics, and promises of guaranteed ranking, performance, admission, or success.\n- Clearly label ready-to-use material versus suggestions that still need verification.\n\nDeliverables:\n1. Category page outline\n2. Practical buyer guidance\n3. Metadata suggestions\n4. And canonicalization questions.\n5. Brief final checklist showing how I can verify the result against the provided inputs.\n\nBefore finalizing, check the work for contradictions, unsupported facts, and any missing edge cases. Prefer specific, useful instructions over generic advice.",
    "variations": [
      "Make the response shorter while keeping all required evidence and verification steps for E-commerce Category Page SEO Content.",
      "Produce a beginner-friendly version that defines specialized terms and includes a concrete example for E-commerce Category Page SEO Content.",
      "Use a professional, implementation-ready format with explicit edge cases, constraints, and acceptance criteria for E-commerce Category Page SEO Content."
    ],
    "modelCompatibility": [
      "GPT",
      "Claude",
      "Gemini"
    ],
    "tags": [
      "ecommerce-seo",
      "category-page",
      "seo",
      "online-store"
    ],
    "updatedAtISO": "2026-11-05"
  },
  {
    "id": "xp3121",
    "slug": "customer-support-email-reply-writer",
    "title": "Customer Support Email Reply Generator",
    "purpose": "Write clear, empathetic support replies that follow a supplied company policy.",
    "description": "Write clear, empathetic support replies that follow a supplied company policy. This practical writing workflow asks for relevant evidence, spells out how to use it, and produces a reviewable output instead of generic suggestions or invented details.",
    "whenToUse": "Use this template when your immediate task is write clear, empathetic support replies that follow a supplied company policy. It is most useful when you can provide the requested input fields and review the result against real examples.",
    "howItWorks": "The workflow anchors its reasoning in the supplied material, organizes the user's goal, and executes this task-specific process: Identify the exact customer request; acknowledge the issue without admitting unverified facts; state feasible next steps and timeframes only when confirmed; distinguish eligible remedies from cases needing human review.",
    "bestPractices": "Provide the actual policy and permitted remedies; redact sensitive customer information. Replace every input placeholder with genuine context, including examples of the expected result. Review the first draft against your own constraints before reusing it.",
    "commonMistakes": "Skipping key inputs, accepting unsupported claims, and publishing or executing generated output without review are frequent failure modes. In this task especially: Never invent refunds, delivery dates, account actions, policy exceptions, or case outcomes.",
    "expectedOutput": "The response should contain a send-ready reply, a shorter variant, and internal case notes for follow-up. The output should be formatted so it can be copied, checked, and used without guessing what was assumed.",
    "limitations": "Never invent refunds, delivery dates, account actions, policy exceptions, or case outcomes. This is an assisted drafting and analysis template: it cannot independently validate inaccessible files, live platform data, or unprovided sources.",
    "technicalRequirements": "Works with GPT, Claude, and Gemini. Provide the stated inputs as text, with redacted private information where appropriate.",
    "realWorldApplications": "Suitable for people using AI to write clear, empathetic support replies that follow a supplied company policy in routine copywriting workflows, with manual verification before reuse.",
    "successMetrics": "The reply is respectful, accurate, and leaves the customer with a clear next step. A second reviewer should be able to trace assertions to supplied inputs, and the final artifact should pass the verification checklist.",
    "relatedPrompts": "Explore related prompts in the copywriting category when you need adjacent tasks, reviews, or follow-up work.",
    "prompt": "You are a specialist assisting with customer support email reply generator. Produce a practical, evidence-led result from the inputs below.\n\nCUSTOMER MESSAGE: {CUSTOMER_MESSAGE}\nVERIFIED ORDER OR CASE FACTS: {VERIFIED_ORDER_OR_CASE_FACTS}\nCOMPANY POLICY: {COMPANY_POLICY}\nAVAILABLE RESOLUTIONS: {AVAILABLE_RESOLUTIONS}\nESCALATION RULES: {ESCALATION_RULES}\nBRAND TONE: {BRAND_TONE}\n\nTask workflow:\n1. Identify the exact customer request.\n2. Acknowledge the issue without admitting unverified facts.\n3. State feasible next steps and timeframes only when confirmed.\n4. Distinguish eligible remedies from cases needing human review..\n\nAccuracy and safety rules:\n- Only use facts present in my inputs or explicitly identified as checked references; distinguish facts from assumptions.\n- If a required item is missing, mark it unknown and explain the minimum verification needed. Do not fabricate examples as if they were real.\n- Never invent refunds, delivery dates, account actions, policy exceptions, or case outcomes.\n- Explain important tradeoffs and any limitation caused by my stated format, platform, or audience.\n- Avoid padding, repetitive claims, fake metrics, and promises of guaranteed ranking, performance, admission, or success.\n- Clearly label ready-to-use material versus suggestions that still need verification.\n\nDeliverables:\n1. A send-ready reply\n2. A shorter variant\n3. And internal case notes for follow-up.\n5. Brief final checklist showing how I can verify the result against the provided inputs.\n\nBefore finalizing, check the work for contradictions, unsupported facts, and any missing edge cases. Prefer specific, useful instructions over generic advice.",
    "variations": [
      "Make the response shorter while keeping all required evidence and verification steps for Customer Support Email Reply.",
      "Produce a beginner-friendly version that defines specialized terms and includes a concrete example for Customer Support Email Reply.",
      "Use a professional, implementation-ready format with explicit edge cases, constraints, and acceptance criteria for Customer Support Email Reply."
    ],
    "modelCompatibility": [
      "GPT",
      "Claude",
      "Gemini"
    ],
    "tags": [
      "customer-service",
      "email",
      "copywriting",
      "support"
    ],
    "updatedAtISO": "2026-11-05"
  },
  {
    "id": "xp3122",
    "slug": "business-proposal-follow-up-email-template",
    "title": "Business Proposal Follow-Up Email Template",
    "purpose": "Follow up on a submitted proposal with a concise value reminder and low-pressure next step.",
    "description": "Follow up on a submitted proposal with a concise value reminder and low-pressure next step. This practical writing workflow asks for relevant evidence, spells out how to use it, and produces a reviewable output instead of generic suggestions or invented details.",
    "whenToUse": "Use this template when your immediate task is follow up on a submitted proposal with a concise value reminder and low-pressure next step. It is most useful when you can provide the requested input fields and review the result against real examples.",
    "howItWorks": "The workflow anchors its reasoning in the supplied material, organizes the user's goal, and executes this task-specific process: Reference the real prior proposal; restate the decision-relevant outcome; acknowledge timing uncertainty; avoid false urgency or invented read receipts; offer a simple question or next action.",
    "bestPractices": "Supply the original proposal facts and recent communication history. Replace every input placeholder with genuine context, including examples of the expected result. Review the first draft against your own constraints before reusing it.",
    "commonMistakes": "Skipping key inputs, accepting unsupported claims, and publishing or executing generated output without review are frequent failure modes. In this task especially: The model cannot know whether the recipient read or discussed the proposal.",
    "expectedOutput": "The response should contain first follow-up, short alternative, later check-in, and a personalization checklist. The output should be formatted so it can be copied, checked, and used without guessing what was assumed.",
    "limitations": "The model cannot know whether the recipient read or discussed the proposal. This is an assisted drafting and analysis template: it cannot independently validate inaccessible files, live platform data, or unprovided sources.",
    "technicalRequirements": "Works with GPT, Claude, and Gemini. Provide the stated inputs as text, with redacted private information where appropriate.",
    "realWorldApplications": "Suitable for people using AI to follow up on a submitted proposal with a concise value reminder and low-pressure next step in routine copywriting workflows, with manual verification before reuse.",
    "successMetrics": "The email creates an easy path to respond without distorting prior conversations. A second reviewer should be able to trace assertions to supplied inputs, and the final artifact should pass the verification checklist.",
    "relatedPrompts": "Explore related prompts in the copywriting category when you need adjacent tasks, reviews, or follow-up work.",
    "prompt": "You are a specialist assisting with business proposal follow-up email template. Produce a practical, evidence-led result from the inputs below.\n\nRECIPIENT CONTEXT: {RECIPIENT_CONTEXT}\nPROPOSAL SUMMARY: {PROPOSAL_SUMMARY}\nSENT DATE: {SENT_DATE}\nLAST VERIFIED INTERACTION: {LAST_VERIFIED_INTERACTION}\nKNOWN DECISION PROCESS: {KNOWN_DECISION_PROCESS}\nDESIRED ACTION: {DESIRED_ACTION}\n\nTask workflow:\n1. Reference the real prior proposal.\n2. Restate the decision-relevant outcome.\n3. Acknowledge timing uncertainty.\n4. Avoid false urgency or invented read receipts.\n5. Offer a simple question or next action..\n\nAccuracy and safety rules:\n- Only use facts present in my inputs or explicitly identified as checked references; distinguish facts from assumptions.\n- If a required item is missing, mark it unknown and explain the minimum verification needed. Do not fabricate examples as if they were real.\n- The model cannot know whether the recipient read or discussed the proposal.\n- Explain important tradeoffs and any limitation caused by my stated format, platform, or audience.\n- Avoid padding, repetitive claims, fake metrics, and promises of guaranteed ranking, performance, admission, or success.\n- Clearly label ready-to-use material versus suggestions that still need verification.\n\nDeliverables:\n1. First follow-up\n2. Short alternative\n3. Later check-in\n4. And a personalization checklist.\n5. Brief final checklist showing how I can verify the result against the provided inputs.\n\nBefore finalizing, check the work for contradictions, unsupported facts, and any missing edge cases. Prefer specific, useful instructions over generic advice.",
    "variations": [
      "Make the response shorter while keeping all required evidence and verification steps for Business Proposal Follow-Up Email.",
      "Produce a beginner-friendly version that defines specialized terms and includes a concrete example for Business Proposal Follow-Up Email.",
      "Use a professional, implementation-ready format with explicit edge cases, constraints, and acceptance criteria for Business Proposal Follow-Up Email."
    ],
    "modelCompatibility": [
      "GPT",
      "Claude",
      "Gemini"
    ],
    "tags": [
      "copywriting",
      "proposal",
      "email",
      "follow-up",
      "business"
    ],
    "updatedAtISO": "2026-11-05"
  },
  {
    "id": "xp3123",
    "slug": "product-launch-email-sequence-generator",
    "title": "Product Launch Email Sequence Generator",
    "purpose": "Write an evidence-led launch sequence that builds interest without misleading claims.",
    "description": "Write an evidence-led launch sequence that builds interest without misleading claims. This practical writing workflow asks for relevant evidence, spells out how to use it, and produces a reviewable output instead of generic suggestions or invented details.",
    "whenToUse": "Use this template when your immediate task is write an evidence-led launch sequence that builds interest without misleading claims. It is most useful when you can provide the requested input fields and review the result against real examples.",
    "howItWorks": "The workflow anchors its reasoning in the supplied material, organizes the user's goal, and executes this task-specific process: Segment pre-launch, launch, and reminder intent; sequence distinct benefits; keep offer and availability consistent; include subject, preview, body, and CTA; avoid false scarcity and unsupported superlatives.",
    "bestPractices": "Include confirmed launch date, pricing, target segment, and subscription permissions. Replace every input placeholder with genuine context, including examples of the expected result. Review the first draft against your own constraints before reusing it.",
    "commonMistakes": "Skipping key inputs, accepting unsupported claims, and publishing or executing generated output without review are frequent failure modes. In this task especially: Legal consent, suppression lists, and deliverability are operational requirements beyond the copy.",
    "expectedOutput": "The response should contain a three-email launch sequence, subject-line alternatives, and claim-review notes. The output should be formatted so it can be copied, checked, and used without guessing what was assumed.",
    "limitations": "Legal consent, suppression lists, and deliverability are operational requirements beyond the copy. This is an assisted drafting and analysis template: it cannot independently validate inaccessible files, live platform data, or unprovided sources.",
    "technicalRequirements": "Works with GPT, Claude, and Gemini. Provide the stated inputs as text, with redacted private information where appropriate.",
    "realWorldApplications": "Suitable for people using AI to write an evidence-led launch sequence that builds interest without misleading claims in routine copywriting workflows, with manual verification before reuse.",
    "successMetrics": "Each email serves a different reader need and all claims align with the offer. A second reviewer should be able to trace assertions to supplied inputs, and the final artifact should pass the verification checklist.",
    "relatedPrompts": "Explore related prompts in the copywriting category when you need adjacent tasks, reviews, or follow-up work.",
    "prompt": "You are a specialist assisting with product launch email sequence generator. Produce a practical, evidence-led result from the inputs below.\n\nPRODUCT AND AUDIENCE: {PRODUCT_AND_AUDIENCE}\nRELEASE DETAILS: {RELEASE_DETAILS}\nVERIFIED FEATURES: {VERIFIED_FEATURES}\nPRICE AND AVAILABILITY: {PRICE_AND_AVAILABILITY}\nPROOF: {PROOF}\nEMAIL SENDING RULES: {EMAIL_SENDING_RULES}\n\nTask workflow:\n1. Segment pre-launch, launch, and reminder intent.\n2. Sequence distinct benefits.\n3. Keep offer and availability consistent.\n4. Include subject, preview, body, and CTA.\n5. Avoid false scarcity and unsupported superlatives..\n\nAccuracy and safety rules:\n- Only use facts present in my inputs or explicitly identified as checked references; distinguish facts from assumptions.\n- If a required item is missing, mark it unknown and explain the minimum verification needed. Do not fabricate examples as if they were real.\n- Legal consent, suppression lists, and deliverability are operational requirements beyond the copy.\n- Explain important tradeoffs and any limitation caused by my stated format, platform, or audience.\n- Avoid padding, repetitive claims, fake metrics, and promises of guaranteed ranking, performance, admission, or success.\n- Clearly label ready-to-use material versus suggestions that still need verification.\n\nDeliverables:\n1. A three-email launch sequence\n2. Subject-line alternatives\n3. And claim-review notes.\n5. Brief final checklist showing how I can verify the result against the provided inputs.\n\nBefore finalizing, check the work for contradictions, unsupported facts, and any missing edge cases. Prefer specific, useful instructions over generic advice.",
    "variations": [
      "Make the response shorter while keeping all required evidence and verification steps for Product Launch Email Sequence.",
      "Produce a beginner-friendly version that defines specialized terms and includes a concrete example for Product Launch Email Sequence.",
      "Use a professional, implementation-ready format with explicit edge cases, constraints, and acceptance criteria for Product Launch Email Sequence."
    ],
    "modelCompatibility": [
      "GPT",
      "Claude",
      "Gemini"
    ],
    "tags": [
      "email-marketing",
      "product-launch",
      "copywriting",
      "campaign"
    ],
    "updatedAtISO": "2026-11-05"
  },
  {
    "id": "xp3124",
    "slug": "product-faq-content-generator",
    "title": "Product FAQ Page Generator From Customer Questions",
    "purpose": "Turn actual product questions and verified policy into useful FAQs that reduce support friction.",
    "description": "Turn actual product questions and verified policy into useful FAQs that reduce support friction. This practical writing workflow asks for relevant evidence, spells out how to use it, and produces a reviewable output instead of generic suggestions or invented details.",
    "whenToUse": "Use this template when your immediate task is turn actual product questions and verified policy into useful FAQs that reduce support friction. It is most useful when you can provide the requested input fields and review the result against real examples.",
    "howItWorks": "The workflow anchors its reasoning in the supplied material, organizes the user's goal, and executes this task-specific process: Cluster repeated questions by decision stage; answer only with available facts; mark unanswered issues; keep answers direct and scannable; avoid duplicating irrelevant schema markup or promising rich-result eligibility.",
    "bestPractices": "Use real support questions, policy documents, and current product information. Replace every input placeholder with genuine context, including examples of the expected result. Review the first draft against your own constraints before reusing it.",
    "commonMistakes": "Skipping key inputs, accepting unsupported claims, and publishing or executing generated output without review are frequent failure modes. In this task especially: Product facts and policy can change; FAQs need ownership and periodic checks.",
    "expectedOutput": "The response should contain a prioritized FAQ section, source mapping, unknowns, and maintenance recommendations. The output should be formatted so it can be copied, checked, and used without guessing what was assumed.",
    "limitations": "Product facts and policy can change; FAQs need ownership and periodic checks. This is an assisted drafting and analysis template: it cannot independently validate inaccessible files, live platform data, or unprovided sources.",
    "technicalRequirements": "Works with GPT, Claude, and Gemini. Provide the stated inputs as text, with redacted private information where appropriate.",
    "realWorldApplications": "Suitable for people using AI to turn actual product questions and verified policy into useful FAQs that reduce support friction in routine copywriting workflows, with manual verification before reuse.",
    "successMetrics": "Answers resolve common concerns without contradiction or invented policies. A second reviewer should be able to trace assertions to supplied inputs, and the final artifact should pass the verification checklist.",
    "relatedPrompts": "Explore related prompts in the copywriting category when you need adjacent tasks, reviews, or follow-up work.",
    "prompt": "You are a specialist assisting with product faq page generator from customer questions. Produce a practical, evidence-led result from the inputs below.\n\nCUSTOMER QUESTIONS: {CUSTOMER_QUESTIONS}\nPRODUCT SPECIFICATIONS: {PRODUCT_SPECIFICATIONS}\nPOLICY TEXT: {POLICY_TEXT}\nKNOWN LIMITATIONS: {KNOWN_LIMITATIONS}\nCHANNEL: {CHANNEL}\nBRAND VOICE: {BRAND_VOICE}\n\nTask workflow:\n1. Cluster repeated questions by decision stage.\n2. Answer only with available facts.\n3. Mark unanswered issues.\n4. Keep answers direct and scannable.\n5. Avoid duplicating irrelevant schema markup or promising rich-result eligibility..\n\nAccuracy and safety rules:\n- Only use facts present in my inputs or explicitly identified as checked references; distinguish facts from assumptions.\n- If a required item is missing, mark it unknown and explain the minimum verification needed. Do not fabricate examples as if they were real.\n- Product facts and policy can change; FAQs need ownership and periodic checks.\n- Explain important tradeoffs and any limitation caused by my stated format, platform, or audience.\n- Avoid padding, repetitive claims, fake metrics, and promises of guaranteed ranking, performance, admission, or success.\n- Clearly label ready-to-use material versus suggestions that still need verification.\n\nDeliverables:\n1. A prioritized FAQ section\n2. Source mapping\n3. Unknowns\n4. And maintenance recommendations.\n5. Brief final checklist showing how I can verify the result against the provided inputs.\n\nBefore finalizing, check the work for contradictions, unsupported facts, and any missing edge cases. Prefer specific, useful instructions over generic advice.",
    "variations": [
      "Make the response shorter while keeping all required evidence and verification steps for Product FAQ Page From Customer Questions.",
      "Produce a beginner-friendly version that defines specialized terms and includes a concrete example for Product FAQ Page From Customer Questions.",
      "Use a professional, implementation-ready format with explicit edge cases, constraints, and acceptance criteria for Product FAQ Page From Customer Questions."
    ],
    "modelCompatibility": [
      "GPT",
      "Claude",
      "Gemini"
    ],
    "tags": [
      "faq",
      "product-copy",
      "customer-support",
      "copywriting"
    ],
    "updatedAtISO": "2026-11-05"
  },
  {
    "id": "xp3125",
    "slug": "app-store-description-optimizer",
    "title": "App Store Description and Feature Copy Optimizer",
    "purpose": "Explain an app's actual benefits with a concise store listing and clear feature hierarchy.",
    "description": "Explain an app's actual benefits with a concise store listing and clear feature hierarchy. This practical writing workflow asks for relevant evidence, spells out how to use it, and produces a reviewable output instead of generic suggestions or invented details.",
    "whenToUse": "Use this template when your immediate task is explain an app's actual benefits with a concise store listing and clear feature hierarchy. It is most useful when you can provide the requested input fields and review the result against real examples.",
    "howItWorks": "The workflow anchors its reasoning in the supplied material, organizes the user's goal, and executes this task-specific process: Lead with the core use case; group meaningful features and onboarding benefits; draft alternative short descriptions and a clear long description; identify any store-specific character and policy limits needing verification.",
    "bestPractices": "Provide screenshots or product docs and the current store-specific text limits. Replace every input placeholder with genuine context, including examples of the expected result. Review the first draft against your own constraints before reusing it.",
    "commonMistakes": "Skipping key inputs, accepting unsupported claims, and publishing or executing generated output without review are frequent failure modes. In this task especially: Store ranking and conversion cannot be inferred; platform rules and fields differ.",
    "expectedOutput": "The response should contain app description, short subtitle ideas, feature bullets, and policy fact-check list. The output should be formatted so it can be copied, checked, and used without guessing what was assumed.",
    "limitations": "Store ranking and conversion cannot be inferred; platform rules and fields differ. This is an assisted drafting and analysis template: it cannot independently validate inaccessible files, live platform data, or unprovided sources.",
    "technicalRequirements": "Works with GPT, Claude, and Gemini. Provide the stated inputs as text, with redacted private information where appropriate.",
    "realWorldApplications": "Suitable for people using AI to explain an app's actual benefits with a concise store listing and clear feature hierarchy in routine copywriting workflows, with manual verification before reuse.",
    "successMetrics": "The listing is specific, accessible, and consistent with the shipped product. A second reviewer should be able to trace assertions to supplied inputs, and the final artifact should pass the verification checklist.",
    "relatedPrompts": "Explore related prompts in the copywriting category when you need adjacent tasks, reviews, or follow-up work.",
    "prompt": "You are a specialist assisting with app store description and feature copy optimizer. Produce a practical, evidence-led result from the inputs below.\n\nAPP NAME: {APP_NAME}\nPLATFORMS: {PLATFORMS}\nVERIFIED FEATURES: {VERIFIED_FEATURES}\nTARGET USERS: {TARGET_USERS}\nVALUE PROPOSITION: {VALUE_PROPOSITION}\nSTORE RULES: {STORE_RULES}\n\nTask workflow:\n1. Lead with the core use case.\n2. Group meaningful features and onboarding benefits.\n3. Draft alternative short descriptions and a clear long description.\n4. Identify any store-specific character and policy limits needing verification..\n\nAccuracy and safety rules:\n- Only use facts present in my inputs or explicitly identified as checked references; distinguish facts from assumptions.\n- If a required item is missing, mark it unknown and explain the minimum verification needed. Do not fabricate examples as if they were real.\n- Store ranking and conversion cannot be inferred; platform rules and fields differ.\n- Explain important tradeoffs and any limitation caused by my stated format, platform, or audience.\n- Avoid padding, repetitive claims, fake metrics, and promises of guaranteed ranking, performance, admission, or success.\n- Clearly label ready-to-use material versus suggestions that still need verification.\n\nDeliverables:\n1. App description\n2. Short subtitle ideas\n3. Feature bullets\n4. And policy fact-check list.\n5. Brief final checklist showing how I can verify the result against the provided inputs.\n\nBefore finalizing, check the work for contradictions, unsupported facts, and any missing edge cases. Prefer specific, useful instructions over generic advice.",
    "variations": [
      "Make the response shorter while keeping all required evidence and verification steps for App Store Description and Feature Copy.",
      "Produce a beginner-friendly version that defines specialized terms and includes a concrete example for App Store Description and Feature Copy.",
      "Use a professional, implementation-ready format with explicit edge cases, constraints, and acceptance criteria for App Store Description and Feature Copy."
    ],
    "modelCompatibility": [
      "GPT",
      "Claude",
      "Gemini"
    ],
    "tags": [
      "app-store",
      "app-marketing",
      "copywriting",
      "aso"
    ],
    "updatedAtISO": "2026-11-05"
  },
  {
    "id": "xp3126",
    "slug": "quiz-generator-from-study-notes",
    "title": "Quiz Generator From Study Notes With Answer Key",
    "purpose": "Create exam-style recall and application questions directly from supplied notes.",
    "description": "Create exam-style recall and application questions directly from supplied notes. This practical learning workflow asks for relevant evidence, spells out how to use it, and produces a reviewable output instead of generic suggestions or invented details.",
    "whenToUse": "Use this template when your immediate task is create exam-style recall and application questions directly from supplied notes. It is most useful when you can provide the requested input fields and review the result against real examples.",
    "howItWorks": "The workflow anchors its reasoning in the supplied material, organizes the user's goal, and executes this task-specific process: Map note concepts to learning objectives; mix factual recall with short application where possible; write unambiguous distractors; separate questions from answer explanations; flag unclear claims in notes.",
    "bestPractices": "Supply accurate source notes and specific syllabus outcomes. Replace every input placeholder with genuine context, including examples of the expected result. Review the first draft against your own constraints before reusing it.",
    "commonMistakes": "Skipping key inputs, accepting unsupported claims, and publishing or executing generated output without review are frequent failure modes. In this task especially: Cannot verify facts absent from the provided notes; questions should be teacher-reviewed.",
    "expectedOutput": "The response should contain a balanced quiz, separate answer key with rationales, and a coverage map. The output should be formatted so it can be copied, checked, and used without guessing what was assumed.",
    "limitations": "Cannot verify facts absent from the provided notes; questions should be teacher-reviewed. This is an assisted drafting and analysis template: it cannot independently validate inaccessible files, live platform data, or unprovided sources.",
    "technicalRequirements": "Works with GPT, Claude, and Gemini. Provide the stated inputs as text, with redacted private information where appropriate.",
    "realWorldApplications": "Suitable for people using AI to create exam-style recall and application questions directly from supplied notes in routine education workflows, with manual verification before reuse.",
    "successMetrics": "Questions test distinct concepts and answers are traceable to notes. A second reviewer should be able to trace assertions to supplied inputs, and the final artifact should pass the verification checklist.",
    "relatedPrompts": "Explore related prompts in the education category when you need adjacent tasks, reviews, or follow-up work.",
    "prompt": "You are a specialist assisting with quiz generator from study notes with answer key. Produce a practical, evidence-led result from the inputs below.\n\nSTUDY NOTES: {STUDY_NOTES}\nSTUDENT LEVEL: {STUDENT_LEVEL}\nLEARNING OBJECTIVES: {LEARNING_OBJECTIVES}\nQUESTION COUNT: {QUESTION_COUNT}\nQUESTION TYPES: {QUESTION_TYPES}\nDIFFICULTY: {DIFFICULTY}\n\nTask workflow:\n1. Map note concepts to learning objectives.\n2. Mix factual recall with short application where possible.\n3. Write unambiguous distractors.\n4. Separate questions from answer explanations.\n5. Flag unclear claims in notes..\n\nAccuracy and safety rules:\n- Only use facts present in my inputs or explicitly identified as checked references; distinguish facts from assumptions.\n- If a required item is missing, mark it unknown and explain the minimum verification needed. Do not fabricate examples as if they were real.\n- Cannot verify facts absent from the provided notes; questions should be teacher-reviewed.\n- Explain important tradeoffs and any limitation caused by my stated format, platform, or audience.\n- Avoid padding, repetitive claims, fake metrics, and promises of guaranteed ranking, performance, admission, or success.\n- Clearly label ready-to-use material versus suggestions that still need verification.\n\nDeliverables:\n1. A balanced quiz\n2. Separate answer key with rationales\n3. And a coverage map.\n5. Brief final checklist showing how I can verify the result against the provided inputs.\n\nBefore finalizing, check the work for contradictions, unsupported facts, and any missing edge cases. Prefer specific, useful instructions over generic advice.",
    "variations": [
      "Make the response shorter while keeping all required evidence and verification steps for Quiz From Study Notes.",
      "Produce a beginner-friendly version that defines specialized terms and includes a concrete example for Quiz From Study Notes.",
      "Use a professional, implementation-ready format with explicit edge cases, constraints, and acceptance criteria for Quiz From Study Notes."
    ],
    "modelCompatibility": [
      "GPT",
      "Claude",
      "Gemini"
    ],
    "tags": [
      "quiz",
      "study",
      "education",
      "exam-preparation"
    ],
    "updatedAtISO": "2026-11-05"
  },
  {
    "id": "xp3127",
    "slug": "teacher-lesson-plan-generator",
    "title": "Teacher Lesson Plan Generator With Activities",
    "purpose": "Turn one curriculum outcome into a teachable lesson with activities and assessment.",
    "description": "Turn one curriculum outcome into a teachable lesson with activities and assessment. This practical learning workflow asks for relevant evidence, spells out how to use it, and produces a reviewable output instead of generic suggestions or invented details.",
    "whenToUse": "Use this template when your immediate task is turn one curriculum outcome into a teachable lesson with activities and assessment. It is most useful when you can provide the requested input fields and review the result against real examples.",
    "howItWorks": "The workflow anchors its reasoning in the supplied material, organizes the user's goal, and executes this task-specific process: Define measurable learning goals; plan opening, modeling, guided practice, independent work, and exit ticket; include accessibility alternatives; allocate realistic time and materials.",
    "bestPractices": "Provide the actual age group, lesson length, and curriculum target. Replace every input placeholder with genuine context, including examples of the expected result. Review the first draft against your own constraints before reusing it.",
    "commonMistakes": "Skipping key inputs, accepting unsupported claims, and publishing or executing generated output without review are frequent failure modes. In this task especially: Educators must adapt activities for local curriculum and student needs; no assumptions about classroom resources.",
    "expectedOutput": "The response should contain a timed lesson plan, formative checks, differentiation options, and take-home follow-up. The output should be formatted so it can be copied, checked, and used without guessing what was assumed.",
    "limitations": "Educators must adapt activities for local curriculum and student needs; no assumptions about classroom resources. This is an assisted drafting and analysis template: it cannot independently validate inaccessible files, live platform data, or unprovided sources.",
    "technicalRequirements": "Works with GPT, Claude, and Gemini. Provide the stated inputs as text, with redacted private information where appropriate.",
    "realWorldApplications": "Suitable for people using AI to turn one curriculum outcome into a teachable lesson with activities and assessment in routine education workflows, with manual verification before reuse.",
    "successMetrics": "Most learners can demonstrate the stated objective by the exit activity. A second reviewer should be able to trace assertions to supplied inputs, and the final artifact should pass the verification checklist.",
    "relatedPrompts": "Explore related prompts in the education category when you need adjacent tasks, reviews, or follow-up work.",
    "prompt": "You are a specialist assisting with teacher lesson plan generator with activities. Produce a practical, evidence-led result from the inputs below.\n\nTOPIC: {TOPIC}\nGRADE LEVEL: {GRADE_LEVEL}\nCLASS DURATION: {CLASS_DURATION}\nCURRICULUM OUTCOME: {CURRICULUM_OUTCOME}\nCLASS RESOURCES: {CLASS_RESOURCES}\nSTUDENT NEEDS: {STUDENT_NEEDS}\n\nTask workflow:\n1. Define measurable learning goals.\n2. Plan opening, modeling, guided practice, independent work, and exit ticket.\n3. Include accessibility alternatives.\n4. Allocate realistic time and materials..\n\nAccuracy and safety rules:\n- Only use facts present in my inputs or explicitly identified as checked references; distinguish facts from assumptions.\n- If a required item is missing, mark it unknown and explain the minimum verification needed. Do not fabricate examples as if they were real.\n- Educators must adapt activities for local curriculum and student needs; no assumptions about classroom resources.\n- Explain important tradeoffs and any limitation caused by my stated format, platform, or audience.\n- Avoid padding, repetitive claims, fake metrics, and promises of guaranteed ranking, performance, admission, or success.\n- Clearly label ready-to-use material versus suggestions that still need verification.\n\nDeliverables:\n1. A timed lesson plan\n2. Formative checks\n3. Differentiation options\n4. And take-home follow-up.\n5. Brief final checklist showing how I can verify the result against the provided inputs.\n\nBefore finalizing, check the work for contradictions, unsupported facts, and any missing edge cases. Prefer specific, useful instructions over generic advice.",
    "variations": [
      "Make the response shorter while keeping all required evidence and verification steps for Teacher Lesson Plan.",
      "Produce a beginner-friendly version that defines specialized terms and includes a concrete example for Teacher Lesson Plan.",
      "Use a professional, implementation-ready format with explicit edge cases, constraints, and acceptance criteria for Teacher Lesson Plan."
    ],
    "modelCompatibility": [
      "GPT",
      "Claude",
      "Gemini"
    ],
    "tags": [
      "lesson-plan",
      "teaching",
      "education",
      "classroom"
    ],
    "updatedAtISO": "2026-11-05"
  },
  {
    "id": "xp3128",
    "slug": "practice-exam-paper-generator",
    "title": "Practice Exam Paper Generator With Marking Scheme",
    "purpose": "Build an original practice exam aligned to an explicit syllabus and grading criteria.",
    "description": "Build an original practice exam aligned to an explicit syllabus and grading criteria. This practical learning workflow asks for relevant evidence, spells out how to use it, and produces a reviewable output instead of generic suggestions or invented details.",
    "whenToUse": "Use this template when your immediate task is build an original practice exam aligned to an explicit syllabus and grading criteria. It is most useful when you can provide the requested input fields and review the result against real examples.",
    "howItWorks": "The workflow anchors its reasoning in the supplied material, organizes the user's goal, and executes this task-specific process: Allocate marks and timing across topics; vary difficulty; avoid unsupported claims about official exams; include a standalone marking scheme and sample solutions; check arithmetic of total marks.",
    "bestPractices": "Supply the exam board's actual publicly shareable requirements or your own syllabus. Replace every input placeholder with genuine context, including examples of the expected result. Review the first draft against your own constraints before reusing it.",
    "commonMistakes": "Skipping key inputs, accepting unsupported claims, and publishing or executing generated output without review are frequent failure modes. In this task especially: A generated practice paper is not an official past paper and may require subject expert correction.",
    "expectedOutput": "The response should contain a complete mock paper, marking guide, topic-to-question map, and quality-check list. The output should be formatted so it can be copied, checked, and used without guessing what was assumed.",
    "limitations": "A generated practice paper is not an official past paper and may require subject expert correction. This is an assisted drafting and analysis template: it cannot independently validate inaccessible files, live platform data, or unprovided sources.",
    "technicalRequirements": "Works with GPT, Claude, and Gemini. Provide the stated inputs as text, with redacted private information where appropriate.",
    "realWorldApplications": "Suitable for people using AI to build an original practice exam aligned to an explicit syllabus and grading criteria in routine education workflows, with manual verification before reuse.",
    "successMetrics": "The paper covers specified outcomes and has a consistent marking scheme. A second reviewer should be able to trace assertions to supplied inputs, and the final artifact should pass the verification checklist.",
    "relatedPrompts": "Explore related prompts in the education category when you need adjacent tasks, reviews, or follow-up work.",
    "prompt": "You are a specialist assisting with practice exam paper generator with marking scheme. Produce a practical, evidence-led result from the inputs below.\n\nSUBJECT: {SUBJECT}\nSYLLABUS TOPICS: {SYLLABUS_TOPICS}\nEXAM LEVEL: {EXAM_LEVEL}\nDURATION: {DURATION}\nTOTAL MARKS: {TOTAL_MARKS}\nQUESTION FORMATS: {QUESTION_FORMATS}\n\nTask workflow:\n1. Allocate marks and timing across topics.\n2. Vary difficulty.\n3. Avoid unsupported claims about official exams.\n4. Include a standalone marking scheme and sample solutions.\n5. Check arithmetic of total marks..\n\nAccuracy and safety rules:\n- Only use facts present in my inputs or explicitly identified as checked references; distinguish facts from assumptions.\n- If a required item is missing, mark it unknown and explain the minimum verification needed. Do not fabricate examples as if they were real.\n- A generated practice paper is not an official past paper and may require subject expert correction.\n- Explain important tradeoffs and any limitation caused by my stated format, platform, or audience.\n- Avoid padding, repetitive claims, fake metrics, and promises of guaranteed ranking, performance, admission, or success.\n- Clearly label ready-to-use material versus suggestions that still need verification.\n\nDeliverables:\n1. A complete mock paper\n2. Marking guide\n3. Topic-to-question map\n4. And quality-check list.\n5. Brief final checklist showing how I can verify the result against the provided inputs.\n\nBefore finalizing, check the work for contradictions, unsupported facts, and any missing edge cases. Prefer specific, useful instructions over generic advice.",
    "variations": [
      "Make the response shorter while keeping all required evidence and verification steps for Practice Exam Paper.",
      "Produce a beginner-friendly version that defines specialized terms and includes a concrete example for Practice Exam Paper.",
      "Use a professional, implementation-ready format with explicit edge cases, constraints, and acceptance criteria for Practice Exam Paper."
    ],
    "modelCompatibility": [
      "GPT",
      "Claude",
      "Gemini"
    ],
    "tags": [
      "practice-exam",
      "education",
      "assessment",
      "study"
    ],
    "updatedAtISO": "2026-11-05"
  },
  {
    "id": "xp3129",
    "slug": "study-notes-summarizer",
    "title": "Study Notes Summarizer With Key Concepts and Examples",
    "purpose": "Condense long notes into accurate revision material without losing essential definitions.",
    "description": "Condense long notes into accurate revision material without losing essential definitions. This practical learning workflow asks for relevant evidence, spells out how to use it, and produces a reviewable output instead of generic suggestions or invented details.",
    "whenToUse": "Use this template when your immediate task is condense long notes into accurate revision material without losing essential definitions. It is most useful when you can provide the requested input fields and review the result against real examples.",
    "howItWorks": "The workflow anchors its reasoning in the supplied material, organizes the user's goal, and executes this task-specific process: Extract the core claims and relationships; group them under meaningful headings; preserve equations and units; mark ambiguity or conflicting statements; include short retrieval questions and a source trace.",
    "bestPractices": "Provide source notes and indicate which units or formulas must be retained. Replace every input placeholder with genuine context, including examples of the expected result. Review the first draft against your own constraints before reusing it.",
    "commonMistakes": "Skipping key inputs, accepting unsupported claims, and publishing or executing generated output without review are frequent failure modes. In this task especially: Summarization can omit important exceptions; verify against the original material.",
    "expectedOutput": "The response should contain a compact revision sheet, glossary, misconceptions list, and self-test questions. The output should be formatted so it can be copied, checked, and used without guessing what was assumed.",
    "limitations": "Summarization can omit important exceptions; verify against the original material. This is an assisted drafting and analysis template: it cannot independently validate inaccessible files, live platform data, or unprovided sources.",
    "technicalRequirements": "Works with GPT, Claude, and Gemini. Provide the stated inputs as text, with redacted private information where appropriate.",
    "realWorldApplications": "Suitable for people using AI to condense long notes into accurate revision material without losing essential definitions in routine education workflows, with manual verification before reuse.",
    "successMetrics": "The shortened notes preserve critical distinctions and support active recall. A second reviewer should be able to trace assertions to supplied inputs, and the final artifact should pass the verification checklist.",
    "relatedPrompts": "Explore related prompts in the education category when you need adjacent tasks, reviews, or follow-up work.",
    "prompt": "You are a specialist assisting with study notes summarizer with key concepts and examples. Produce a practical, evidence-led result from the inputs below.\n\nSOURCE NOTES: {SOURCE_NOTES}\nCOURSE LEVEL: {COURSE_LEVEL}\nEXAM OBJECTIVES: {EXAM_OBJECTIVES}\nDESIRED LENGTH: {DESIRED_LENGTH}\nKEY TERMS: {KEY_TERMS}\nKNOWN GAPS: {KNOWN_GAPS}\n\nTask workflow:\n1. Extract the core claims and relationships.\n2. Group them under meaningful headings.\n3. Preserve equations and units.\n4. Mark ambiguity or conflicting statements.\n5. Include short retrieval questions and a source trace..\n\nAccuracy and safety rules:\n- Only use facts present in my inputs or explicitly identified as checked references; distinguish facts from assumptions.\n- If a required item is missing, mark it unknown and explain the minimum verification needed. Do not fabricate examples as if they were real.\n- Summarization can omit important exceptions; verify against the original material.\n- Explain important tradeoffs and any limitation caused by my stated format, platform, or audience.\n- Avoid padding, repetitive claims, fake metrics, and promises of guaranteed ranking, performance, admission, or success.\n- Clearly label ready-to-use material versus suggestions that still need verification.\n\nDeliverables:\n1. A compact revision sheet\n2. Glossary\n3. Misconceptions list\n4. And self-test questions.\n5. Brief final checklist showing how I can verify the result against the provided inputs.\n\nBefore finalizing, check the work for contradictions, unsupported facts, and any missing edge cases. Prefer specific, useful instructions over generic advice.",
    "variations": [
      "Make the response shorter while keeping all required evidence and verification steps for Study Notes Summarizer.",
      "Produce a beginner-friendly version that defines specialized terms and includes a concrete example for Study Notes Summarizer.",
      "Use a professional, implementation-ready format with explicit edge cases, constraints, and acceptance criteria for Study Notes Summarizer."
    ],
    "modelCompatibility": [
      "GPT",
      "Claude",
      "Gemini"
    ],
    "tags": [
      "study-notes",
      "summarizer",
      "revision",
      "education"
    ],
    "updatedAtISO": "2026-11-05"
  },
  {
    "id": "xp3130",
    "slug": "research-paper-outline-planner",
    "title": "Research Paper Outline and Evidence Planner",
    "purpose": "Develop an academic paper structure with explicit evidence gaps and citation discipline.",
    "description": "Develop an academic paper structure with explicit evidence gaps and citation discipline. This practical learning workflow asks for relevant evidence, spells out how to use it, and produces a reviewable output instead of generic suggestions or invented details.",
    "whenToUse": "Use this template when your immediate task is develop an academic paper structure with explicit evidence gaps and citation discipline. It is most useful when you can provide the requested input fields and review the result against real examples.",
    "howItWorks": "The workflow anchors its reasoning in the supplied material, organizes the user's goal, and executes this task-specific process: Clarify a defensible claim or research question; organize argument and counterargument; connect supplied sources to each section; separate evidence from interpretation; flag missing citations and ethical or methodological limits.",
    "bestPractices": "Supply the assignment instructions, bibliographic source details, and actual reading notes. Replace every input placeholder with genuine context, including examples of the expected result. Review the first draft against your own constraints before reusing it.",
    "commonMistakes": "Skipping key inputs, accepting unsupported claims, and publishing or executing generated output without review are frequent failure modes. In this task especially: Do not fabricate peer-reviewed sources, quotations, DOI identifiers, or empirical results.",
    "expectedOutput": "The response should contain a thesis options table, detailed outline, evidence matrix, and next research tasks. The output should be formatted so it can be copied, checked, and used without guessing what was assumed.",
    "limitations": "Do not fabricate peer-reviewed sources, quotations, DOI identifiers, or empirical results. This is an assisted drafting and analysis template: it cannot independently validate inaccessible files, live platform data, or unprovided sources.",
    "technicalRequirements": "Works with GPT, Claude, and Gemini. Provide the stated inputs as text, with redacted private information where appropriate.",
    "realWorldApplications": "Suitable for people using AI to develop an academic paper structure with explicit evidence gaps and citation discipline in routine education workflows, with manual verification before reuse.",
    "successMetrics": "Every central claim has an identified evidence need and the outline answers the question. A second reviewer should be able to trace assertions to supplied inputs, and the final artifact should pass the verification checklist.",
    "relatedPrompts": "Explore related prompts in the education category when you need adjacent tasks, reviews, or follow-up work.",
    "prompt": "You are a specialist assisting with research paper outline and evidence planner. Produce a practical, evidence-led result from the inputs below.\n\nRESEARCH QUESTION: {RESEARCH_QUESTION}\nDISCIPLINE: {DISCIPLINE}\nASSIGNMENT RUBRIC: {ASSIGNMENT_RUBRIC}\nSOURCES AND NOTES: {SOURCES_AND_NOTES}\nTHESIS IDEAS: {THESIS_IDEAS}\nCITATION STYLE: {CITATION_STYLE}\n\nTask workflow:\n1. Clarify a defensible claim or research question.\n2. Organize argument and counterargument.\n3. Connect supplied sources to each section.\n4. Separate evidence from interpretation.\n5. Flag missing citations and ethical or methodological limits..\n\nAccuracy and safety rules:\n- Only use facts present in my inputs or explicitly identified as checked references; distinguish facts from assumptions.\n- If a required item is missing, mark it unknown and explain the minimum verification needed. Do not fabricate examples as if they were real.\n- Do not fabricate peer-reviewed sources, quotations, DOI identifiers, or empirical results.\n- Explain important tradeoffs and any limitation caused by my stated format, platform, or audience.\n- Avoid padding, repetitive claims, fake metrics, and promises of guaranteed ranking, performance, admission, or success.\n- Clearly label ready-to-use material versus suggestions that still need verification.\n\nDeliverables:\n1. A thesis options table\n2. Detailed outline\n3. Evidence matrix\n4. And next research tasks.\n5. Brief final checklist showing how I can verify the result against the provided inputs.\n\nBefore finalizing, check the work for contradictions, unsupported facts, and any missing edge cases. Prefer specific, useful instructions over generic advice.",
    "variations": [
      "Make the response shorter while keeping all required evidence and verification steps for Research Paper Outline and Evidence.",
      "Produce a beginner-friendly version that defines specialized terms and includes a concrete example for Research Paper Outline and Evidence.",
      "Use a professional, implementation-ready format with explicit edge cases, constraints, and acceptance criteria for Research Paper Outline and Evidence."
    ],
    "modelCompatibility": [
      "GPT",
      "Claude",
      "Gemini"
    ],
    "tags": [
      "research-paper",
      "academic-writing",
      "education",
      "outline"
    ],
    "updatedAtISO": "2026-11-05"
  }
];
