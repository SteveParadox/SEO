// lib/content/collections.ts
import type { Collection } from "@/lib/data-types";

export const collections: Collection[] = [
  {
    id: "c1",
    slug: "best-ai-tools-students-2026",
    title: "Best AI Tools for Students (2026)",
    description:
      "A practical stack for studying: understand faster, write cleaner, revise smarter. Minimal fluff, maximum grades.",
    longDescription: "This collection prioritizes learning over shortcuts. Start with prompts that help you actually understand concepts, then add tools that organize your knowledge and support revision. The goal is better grades through better understanding, not just faster outputs. Use these tools to learn more effectively, then prove you learned it by explaining concepts in your own words.",
    whoItsFor: "Students facing exams, handling complex coursework, or building study habits that scale beyond one semester. Works for high school through graduate level across subjects.",
    howToUse: "Begin with the tutor prompt to break down difficult concepts. Use the study plan prompt to organize your revision schedule. Deploy tools for research and note-taking. Always verify AI explanations against your course materials.",
    commonMistakes: "Using AI to write assignments instead of learning the material. Trusting AI summaries without reading primary sources. Skipping the practice questions thinking you understand after one explanation.",
    successMetrics: "You can explain concepts without referencing AI outputs. Your grades improve over time. You spend less time confused and more time practicing application.",
    items: [
      { kind: "prompt", id: "p1" }, // Explain like a tutor
      { kind: "prompt", id: "p5" }, // 7-day study plan
      { kind: "tool", id: "t2" },
      { kind: "tool", id: "t7" },
      { kind: "tool", id: "t9" },
    ],
    tags: ["students", "study", "productivity"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c2",
    slug: "prompt-pack-most-reused",
    title: "Prompt Pack: The Ones You'll Actually Reuse",
    description:
      "A small set of prompts for better output quality in real workflows: debugging, rewriting, and writing honestly.",
    longDescription: "These prompts solve recurring problems across different contexts. The bug hunter works for code, logic errors, and process failures. The rewrite prompt clarifies any unclear text. The review prompt helps you write balanced assessments. You'll return to these weekly if not daily once they're in your workflow.",
    whoItsFor: "Anyone who writes code, documents, or reviews regularly. Particularly useful for people who find themselves solving the same types of problems repeatedly.",
    howToUse: "Save these prompts somewhere accessible. Customize the placeholders for your context. Run them when you encounter their target problems. Iterate on outputs rather than accepting first results.",
    commonMistakes: "Using prompts once then forgetting about them. Not adapting prompts to your specific needs. Expecting perfect outputs without any editing.",
    successMetrics: "You reach for these prompts automatically when problems arise. Your outputs require fewer revisions. Colleagues ask for your prompts because they see the quality difference.",
    items: [
      { kind: "prompt", id: "p2" }, // Bug hunter
      { kind: "prompt", id: "p3" }, // Rewrite for clarity
      { kind: "prompt", id: "p6" }, // Product review brief
      { kind: "update", id: "u1" },
    ],
    tags: ["prompts", "templates", "workflow"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c3",
    slug: "creator-starter-pack",
    title: "Creator Starter Pack (Script → Voice → Publish)",
    description:
      "A simple, repeatable content pipeline: turn an idea into a script, polish it, and publish without overthinking.",
    longDescription: "Content creation requires consistent output without burning out. This collection provides a repeatable process: generate a structured script, add voice or polish, then publish. The workflow prevents blank page paralysis while maintaining your unique perspective through editing and personalization.",
    whoItsFor: "YouTube creators, podcasters, newsletter writers, or anyone building an audience through regular content. Works whether you're starting or scaling an existing channel.",
    howToUse: "Start with the script prompt to structure your idea. Edit the output to match your voice and add examples. Use voice tools for narration or keep it text. Publish consistently rather than perfectly.",
    commonMistakes: "Publishing AI scripts without personalization. Waiting for perfect content instead of shipping consistently. Not building a library of prompts that work for your style.",
    successMetrics: "You publish on schedule without stress. Your content maintains consistent quality and voice. Audience engagement remains high despite faster production.",
    items: [
      { kind: "prompt", id: "p4" }, // YouTube script
      { kind: "tool", id: "t4" },
      { kind: "tool", id: "t10" },
      { kind: "update", id: "u5" },
    ],
    tags: ["creator", "content", "workflow"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c4",
    slug: "dev-ai-stack-lite",
    title: "Developer AI Stack (Lite, Practical)",
    description:
      "A focused set of tools and prompts that reduce time-to-fix and time-to-ship, without turning your brain into a checklist.",
    longDescription: "Development AI tools work best when they handle routine work while you focus on architecture and design. This collection emphasizes debugging, code generation, and documentation—the tasks that consume time without requiring deep thought. Keep your problem-solving brain engaged on what matters.",
    whoItsFor: "Developers at any level who want productivity gains without sacrificing code quality or learning. Particularly useful for backend, full-stack, and infrastructure work.",
    howToUse: "Deploy the bug hunter prompt when stuck. Use coding tools for boilerplate and refactors. Review all generated code before committing. Learn from AI suggestions rather than blindly accepting them.",
    commonMistakes: "Trusting generated code without review. Using AI for critical logic without understanding it. Skipping tests because AI wrote the code. Not learning patterns from repeated AI outputs.",
    successMetrics: "You ship features faster without quality regression. Code reviews remain clean. You understand all code in your codebase. Bug rates stay stable or improve.",
    items: [
      { kind: "prompt", id: "p2" }, // Start with debugging workflow
      { kind: "tool", id: "t1" },
      { kind: "tool", id: "t6" },
      { kind: "update", id: "u3" },
    ],
    tags: ["dev", "llm", "agents"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c5",
    slug: "seo-playbook-ai-directory",
    title: "SEO Playbook for AI Directories",
    description:
      "How to build pages Google can index and humans actually share: structure, content patterns, and basic growth loops.",
    longDescription: "AI content sites need structure, not just volume. This collection teaches you to build interconnected pages that form a useful database rather than scattered blog posts. Focus on indexable pages, internal linking, and content that serves real search intent. Quality structure beats quantity of random posts.",
    whoItsFor: "Anyone building tool directories, comparison sites, or content-driven products where organic search matters. Essential for solo founders and small teams without big marketing budgets.",
    howToUse: "Start with the SEO update to understand strategy. Use prompts to create consistent, useful reviews. Build individual pages for each tool or topic. Interlink strategically. Ship collections that organize items logically.",
    commonMistakes: "Publishing isolated posts without internal linking. Creating thin content that duplicates what AI can summarize. Not standardizing page templates. Ignoring technical SEO basics.",
    successMetrics: "Google indexes new pages within days. Search traffic grows steadily month over month. Users navigate between pages following your internal links. Pages rank for long-tail keywords.",
    items: [
      { kind: "update", id: "u4" },
      { kind: "prompt", id: "p6" }, // Reviews that don't sound paid
      { kind: "tool", id: "t10" },
      { kind: "tool", id: "t2" },
    ],
    tags: ["seo", "content", "growth"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c6",
    slug: "ai-tools-for-writing-work",
    title: "AI for Writing at Work (Clear, Professional, Fast)",
    description:
      "Prompts and tools to write emails, docs, and updates that sound competent instead of generated.",
    longDescription: "Professional writing needs to be clear, concise, and credible. This collection helps you write faster without sounding like a bot. Use AI for structure and drafting, then edit to maintain your professional voice. The goal is efficient communication, not obvious AI usage.",
    whoItsFor: "Knowledge workers who write emails, reports, proposals, or documentation regularly. Managers, consultants, analysts, or anyone where writing quality affects professional perception.",
    howToUse: "Draft with AI tools to overcome blank page syndrome. Use the clarity prompt to tighten unclear writing. Review and personalize all outputs. Add specific examples and context AI can't provide.",
    commonMistakes: "Sending AI outputs verbatim. Using overly formal or generic phrasing. Not proofreading for accuracy. Losing your natural voice in pursuit of efficiency.",
    successMetrics: "You write faster without quality decline. Colleagues don't ask for clarification. Your writing maintains consistent professionalism. You spend less time staring at blank pages.",
    items: [
      { kind: "prompt", id: "p3" }, // Rewrite for clarity
      { kind: "prompt", id: "p6" }, // Balanced reviews (also useful for proposals/briefs)
      { kind: "tool", id: "t2" },
      { kind: "update", id: "u1" },
    ],
    tags: ["writing", "productivity", "work"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c7",
    slug: "exam-cram-kit",
    title: "Exam Cram Kit (Learn → Practice → Recall)",
    description:
      "A short loop that works: learn the concept, test yourself, then repeat until it sticks.",
    longDescription: "Effective studying requires active recall, not passive reading. This collection structures learning around understanding concepts, testing yourself, and identifying gaps. The tight feedback loop builds real understanding that survives exam pressure.",
    whoItsFor: "Students preparing for exams with limited time. Anyone learning complex material that requires genuine understanding rather than memorization.",
    howToUse: "Use the tutor prompt to understand difficult concepts. Create a study plan that includes daily review. Test yourself with generated quizzes. Focus extra time on topics where you struggle.",
    commonMistakes: "Reading explanations without testing yourself. Cramming everything the night before. Skipping topics you find difficult. Not spacing out review sessions.",
    successMetrics: "You can explain concepts to others without notes. Practice test scores improve steadily. You identify knowledge gaps before the exam. Exam performance matches or exceeds practice performance.",
    items: [
      { kind: "prompt", id: "p1" },
      { kind: "prompt", id: "p5" },
      { kind: "tool", id: "t7" },
      { kind: "tool", id: "t9" },
    ],
    tags: ["study", "students", "revision"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c8",
    slug: "build-content-consistently",
    title: "Post Consistently (Without Burning Out)",
    description:
      "A content workflow for creators who want output, not motivational quotes: idea → script → publish → improve.",
    longDescription: "Consistency beats perfection in content creation. This collection provides a sustainable workflow that produces regular output without creative burnout. Focus on shipping and iterating rather than agonizing over every detail.",
    whoItsFor: "Content creators, newsletter writers, or anyone building an audience through regular publishing. Works whether you're building authority or growing a business.",
    howToUse: "Batch ideas when inspiration strikes. Use prompts to structure rough ideas into drafts. Edit for your voice and perspective. Publish on schedule. Review performance and adjust.",
    commonMistakes: "Waiting for inspiration before creating. Perfectionism that prevents publishing. Not building a content calendar. Copying AI outputs without personalization.",
    successMetrics: "You publish on schedule consistently. Content quality remains high without stress. Audience engagement stays stable or grows. You maintain a backlog of ideas and drafts.",
    items: [
      { kind: "prompt", id: "p4" },
      { kind: "prompt", id: "p5" }, // planning applies to content too
      { kind: "tool", id: "t10" },
      { kind: "update", id: "u5" },
    ],
    tags: ["creator", "workflow", "planning"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c9",
    slug: "interview-prep-complete",
    title: "Interview Prep: Technical + Behavioral",
    description:
      "Practice questions, strong answers, and follow-ups. Stop winging it and start landing offers.",
    longDescription: "Interview preparation requires practicing both technical and behavioral questions with structured answers. This collection helps you prepare comprehensive responses, anticipate follow-ups, and practice delivery. The goal is confident competence, not memorized scripts.",
    whoItsFor: "Job seekers at any level preparing for interviews. Career changers who need to explain their background. Anyone who struggles with behavioral questions or technical interviews.",
    howToUse: "Use the interview prep prompt to generate practice questions for your role. Practice answers aloud, not just in your head. Prepare stories for behavioral questions. Review common mistakes for your field.",
    commonMistakes: "Memorizing answers word-for-word. Not practicing out loud. Skipping behavioral question prep. Not preparing questions to ask interviewers.",
    successMetrics: "You answer questions confidently without long pauses. Follow-up questions don't catch you off guard. Interviewers seem engaged with your responses. You receive positive feedback or offers.",
    items: [
      { kind: "prompt", id: "p10" },
      { kind: "prompt", id: "p1" }, // Use tutor prompt to learn topics you're weak on
      { kind: "tool", id: "t2" }, // Research companies and roles
      { kind: "tool", id: "t7" }, // Practice responses
    ],
    tags: ["career", "interview", "jobs"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c10",
    slug: "debugging-workflow-complete",
    title: "Debugging Workflow (Systematic, Not Random)",
    description:
      "Stop guessing. Find the bug, fix it properly, and prevent it from coming back.",
    longDescription: "Effective debugging requires systematic problem-solving, not random code changes. This collection provides structure for identifying root causes, implementing minimal fixes, and preventing regression. Learn from bugs instead of just patching symptoms.",
    whoItsFor: "Developers at any level who want to debug more efficiently. Teams tired of bugs that keep coming back. Anyone who finds debugging frustrating and time-consuming.",
    howToUse: "Start with the bug hunter prompt to generate hypotheses. Test hypotheses systematically. Implement minimal fixes first. Add tests to prevent regression. Document what you learned.",
    commonMistakes: "Making random changes hoping something works. Not reproducing bugs consistently. Implementing complex solutions when simple ones work. Skipping tests after fixing bugs.",
    successMetrics: "You find bugs faster with less frustration. Fixed bugs stay fixed. Your debugging skills improve over time. You build a mental library of common bug patterns.",
    items: [
      { kind: "prompt", id: "p2" },
      { kind: "tool", id: "t1" }, // AI coding assistant
      { kind: "tool", id: "t6" }, // Documentation and research
      { kind: "update", id: "u3" }, // Agent debugging wisdom
    ],
    tags: ["dev", "debugging", "workflow"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c11",
    slug: "research-to-writing-pipeline",
    title: "Research → Writing Pipeline (No Plagiarism)",
    description:
      "Find sources, understand them, then write in your own words. Works for papers, articles, and reports.",
    longDescription: "Good research writing requires understanding sources deeply, not just summarizing them. This collection structures the process: find quality sources, extract key insights, synthesize understanding, then write original analysis. AI speeds up research without replacing your thinking.",
    whoItsFor: "Students writing research papers, journalists investigating stories, analysts producing reports, or anyone whose writing requires source-based authority.",
    howToUse: "Start with research tools to find quality sources. Use the tutor prompt to understand difficult material. Take notes in your own words. Write your analysis first, then add supporting citations.",
    commonMistakes: "Copying AI summaries of sources. Not reading original sources. Writing by stitching together quotes. Trusting AI citations without verification.",
    successMetrics: "Your writing demonstrates genuine understanding. Citations are accurate and relevant. Your analysis adds value beyond source material. Writing passes plagiarism checks naturally.",
    items: [
      { kind: "tool", id: "t2" }, // Research and source discovery
      { kind: "prompt", id: "p1" }, // Understanding complex material
      { kind: "prompt", id: "p3" }, // Clarifying your own writing
      { kind: "tool", id: "t9" }, // Note organization
    ],
    tags: ["research", "writing", "academic"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c12",
    slug: "sql-data-analysis-kit",
    title: "SQL + Data Analysis Kit (From Question to Insight)",
    description:
      "Write queries, analyze results, and present findings. For analysts who want speed without sacrificing accuracy.",
    longDescription: "Data analysis requires translating business questions into queries, validating results, and communicating findings clearly. This collection helps you work faster while maintaining analytical rigor. Use AI for query construction and initial analysis, then apply business context and verification.",
    whoItsFor: "Data analysts, business analysts, or developers who work with databases regularly. Anyone who needs to answer questions with data quickly and accurately.",
    howToUse: "Use the SQL prompt to generate queries from requirements. Test queries on sample data first. Validate results against expectations. Use clarity prompts to explain findings to non-technical stakeholders.",
    commonMistakes: "Running AI-generated queries without review. Not validating results against known data. Over-complicating queries. Presenting findings without context.",
    successMetrics: "You write queries faster with fewer errors. Results match business expectations. Stakeholders understand your analysis. You catch data issues before they become problems.",
    items: [
      { kind: "prompt", id: "p8" }, // SQL query builder
      { kind: "tool", id: "t2" }, // Research and verification
      { kind: "prompt", id: "p3" }, // Clarifying technical explanations
      { kind: "tool", id: "t10" }, // Presenting findings
    ],
    tags: ["data", "sql", "analysis"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c13",
    slug: "decision-making-framework",
    title: "Decision Framework (Compare Options, Pick Confidently)",
    description:
      "Stop overthinking. Structure your options, evaluate systematically, and make defendable decisions.",
    longDescription: "Good decisions require structured evaluation, not endless deliberation. This collection helps you compare options objectively, understand tradeoffs, and choose confidently. The goal is defendable decisions made efficiently, not perfect choices made slowly.",
    whoItsFor: "Anyone making important decisions about tools, careers, purchases, or strategies. Particularly useful for people who struggle with analysis paralysis or second-guessing.",
    howToUse: "Use the comparison prompt to structure your options. Define criteria that matter to your situation. Score honestly, don't game the results. Make a decision and move forward.",
    commonMistakes: "Comparing options without clear criteria. Changing criteria to justify preferred choices. Ignoring gut feelings entirely. Not considering context and constraints.",
    successMetrics: "You make decisions faster with less stress. Decisions stay made without constant revisiting. You can defend choices to skeptics. Outcomes match or exceed expectations.",
    items: [
      { kind: "prompt", id: "p7" }, // Compare and pick
      { kind: "tool", id: "t2" }, // Research options
      { kind: "prompt", id: "p6" }, // Evaluating options honestly
      { kind: "tool", id: "t3" }, // Documenting decisions
    ],
    tags: ["decision", "productivity", "strategy"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c14",
    slug: "landing-page-copy-kit",
    title: "Landing Page Copy Kit (Clear Value, No Hype)",
    description:
      "Write copy that explains what you do and why it matters. Skip the buzzwords.",
    longDescription: "Landing pages need to communicate value clearly and quickly. This collection helps you write copy that converts without sounding like every other AI-generated landing page. Focus on clarity, specificity, and genuine value propositions.",
    whoItsFor: "Founders, marketers, or product people building landing pages. Anyone who needs to explain their product clearly to drive conversions.",
    howToUse: "Use the copy audit prompt to improve existing pages. Focus on clarity over cleverness. Test multiple headline variations. Remove jargon and buzzwords ruthlessly.",
    commonMistakes: "Using generic AI marketing speak. Making claims without proof. Burying the value proposition. Writing for yourself instead of your audience.",
    successMetrics: "Visitors understand what you do within five seconds. Bounce rate decreases. Conversion rate improves. Visitors can explain your product to others.",
    items: [
      { kind: "prompt", id: "p9" }, // Landing page copy audit
      { kind: "prompt", id: "p3" }, // Clarity rewrite
      { kind: "tool", id: "t2" }, // Competitor research
      { kind: "update", id: "u4" }, // SEO structure
    ],
    tags: ["copywriting", "marketing", "conversion"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c15",
    slug: "meeting-notes-action-items",
    title: "Meeting Notes → Action Items (Actually Useful)",
    description:
      "Turn rambling meetings into clear notes and trackable action items. Stop wondering what was decided.",
    longDescription: "Effective meeting notes capture decisions and action items, not transcripts. This collection helps you process meeting content into useful documentation that drives follow-through. The goal is clarity and accountability, not comprehensive transcription.",
    whoItsFor: "Anyone who attends meetings regularly and needs to track decisions and action items. Particularly useful for project managers, team leads, and coordinators.",
    howToUse: "Record or take rough notes during meetings. Use AI to structure notes into clear sections. Extract action items with owners and deadlines. Share immediately after meetings.",
    commonMistakes: "Trying to transcribe everything instead of capturing key points. Not assigning clear owners to action items. Waiting days to process notes. Not sharing notes with attendees.",
    successMetrics: "Action items get completed on time. Team members reference notes when questions arise. Decisions stay decided. Meetings feel productive rather than wasteful.",
    items: [
      { kind: "tool", id: "t3" }, // Notion for organization
      { kind: "prompt", id: "p3" }, // Clarity and structure
      { kind: "tool", id: "t18" }, // Processing transcripts
      { kind: "tool", id: "t28" }, // Automation for distribution
    ],
    tags: ["productivity", "meetings", "workflow"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c16",
    slug: "email-newsletter-system",
    title: "Email Newsletter System (Write, Schedule, Grow)",
    description:
      "Consistent newsletter output without panic. Ideas, drafts, and distribution handled.",
    longDescription: "Successful newsletters require consistent output and gradual improvement. This collection provides a sustainable system for generating ideas, writing drafts, and maintaining publishing schedules. Focus on serving your audience, not just filling their inbox.",
    whoItsFor: "Newsletter creators at any stage, from first issue to thousands of subscribers. Content creators building owned audiences. Professionals establishing thought leadership.",
    howToUse: "Maintain an idea backlog. Use prompts to structure drafts from ideas. Edit for your voice and perspective. Schedule ahead rather than writing under deadline pressure.",
    commonMistakes: "Writing the night before sending. Not maintaining an idea backlog. Copying AI outputs without personalization. Ignoring reader feedback.",
    successMetrics: "You publish consistently without stress. Open rates remain stable or grow. Subscribers reply with genuine engagement. You maintain a comfortable publishing buffer.",
    items: [
      { kind: "prompt", id: "p4" }, // Content structure
      { kind: "prompt", id: "p3" }, // Clarity and editing
      { kind: "tool", id: "t3" }, // Planning and organization
      { kind: "tool", id: "t10" }, // Distribution
    ],
    tags: ["newsletter", "writing", "creator"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c17",
    slug: "product-documentation-stack",
    title: "Product Documentation Stack (Actually Helpful)",
    description:
      "Write docs people actually read and reference. Technical accuracy meets user clarity.",
    longDescription: "Good documentation balances technical accuracy with user clarity. This collection helps you write, organize, and maintain documentation that users actually find helpful. The goal is reducing support tickets through better self-service.",
    whoItsFor: "Product teams, technical writers, or developers responsible for documentation. Anyone whose product complexity requires clear explanation.",
    howToUse: "Structure documentation by user journey, not feature list. Use AI for initial drafts and consistency. Test documentation with actual users. Update based on support tickets.",
    commonMistakes: "Writing for developers instead of users. Not updating docs when product changes. Assuming users know technical context. Organizing by internal logic instead of user needs.",
    successMetrics: "Support tickets reference docs instead of asking questions. Users successfully complete tasks using documentation. Docs pages have high engagement. Search queries find relevant answers.",
    items: [
      { kind: "prompt", id: "p3" }, // Clarity for technical writing
      { kind: "prompt", id: "p1" }, // Explaining complex concepts
      { kind: "tool", id: "t3" }, // Organization and structure
      { kind: "update", id: "u4" }, // Structure and navigation
    ],
    tags: ["documentation", "product", "technical-writing"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c18",
    slug: "social-media-content-batch",
    title: "Social Media Batch Production (1 Hour, 2 Weeks of Content)",
    description:
      "Create two weeks of social content in one focused session. Stop posting reactively.",
    longDescription: "Batching social content reduces context switching and improves consistency. This collection provides a system for generating, scheduling, and optimizing social posts efficiently. Focus on regular presence over viral moments.",
    whoItsFor: "Creators, marketers, or business owners managing social media. Anyone tired of scrambling for daily posts or struggling with consistency.",
    howToUse: "Block dedicated time for content creation. Generate variations for each platform. Schedule everything at once. Review performance and adjust in next batch.",
    commonMistakes: "Publishing AI content verbatim. Not adapting content for different platforms. Over-scheduling without monitoring performance. Ignoring engagement in pursuit of posting volume.",
    successMetrics: "You post consistently without daily stress. Engagement rates remain stable. You maintain presence across platforms. Time spent on social media decreases overall.",
    items: [
      { kind: "prompt", id: "p4" }, // Content structure
      { kind: "tool", id: "t18" }, // Content generation
      { kind: "tool", id: "t22" }, // Visual content
      { kind: "tool", id: "t28" }, // Scheduling automation
    ],
    tags: ["social-media", "content", "batch"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c19",
    slug: "competitive-research-analysis",
    title: "Competitive Research & Analysis (Know Your Landscape)",
    description:
      "Understand what competitors are doing, why it works, and where opportunities hide.",
    longDescription: "Competitive analysis requires understanding what competitors do, why it resonates, and where gaps exist. This collection helps you research systematically, analyze objectively, and identify opportunities. The goal is strategic insight, not copying competitors.",
    whoItsFor: "Product managers, founders, marketers, or strategists who need competitive intelligence. Anyone making positioning or feature decisions.",
    howToUse: "Research competitors systematically using search and comparison tools. Document findings in structured format. Analyze patterns across competitors. Identify underserved needs and positioning opportunities.",
    commonMistakes: "Only researching direct competitors. Copying features without understanding strategy. Not updating research regularly. Focusing on what competitors do instead of why it works.",
    successMetrics: "You identify opportunities competitors missed. Product decisions incorporate competitive context. You spot competitive moves early. Your positioning clearly differentiates.",
    items: [
      { kind: "tool", id: "t2" }, // Research and discovery
      { kind: "prompt", id: "p7" }, // Structured comparison
      { kind: "prompt", id: "p6" }, // Honest evaluation
      { kind: "tool", id: "t3" }, // Documentation
    ],
    tags: ["strategy", "research", "competitive"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c20",
    slug: "customer-support-efficiency",
    title: "Customer Support Efficiency Kit (Fast, Helpful, Human)",
    description:
      "Handle more tickets without sounding like a bot. Speed meets empathy.",
    longDescription: "Efficient support requires balancing speed with genuine helpfulness. This collection helps you respond faster while maintaining empathy and accuracy. Use AI for drafting and organization, not replacing human judgment.",
    whoItsFor: "Support teams, customer success managers, or anyone handling customer inquiries regularly. Particularly useful for small teams with growing ticket volume.",
    howToUse: "Use AI to draft responses for common issues. Personalize drafts with customer-specific context. Maintain response templates for frequent questions. Track patterns in tickets to improve product or documentation.",
    commonMistakes: "Sending AI drafts without personalization. Using overly formal or robotic language. Not updating templates as product evolves. Prioritizing speed over accuracy.",
    successMetrics: "Response time decreases without satisfaction decline. Customers feel heard, not processed. Ticket resolution rate improves. Team handles higher volume without burning out.",
    items: [
      { kind: "tool", id: "t18" }, // Response drafting
      { kind: "prompt", id: "p3" }, // Clear communication
      { kind: "tool", id: "t3" }, // Knowledge base
      { kind: "tool", id: "t28" }, // Workflow automation
    ],
    tags: ["support", "customer-service", "efficiency"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c21",
    slug: "freelancer-client-management",
    title: "Freelancer Client Management (Professional, Not Pushy)",
    description:
      "Proposals, contracts, updates, and invoicing that get you hired and paid on time.",
    longDescription: "Successful freelancing requires clear communication, professional documentation, and systematic follow-up. This collection provides templates and workflows for the business side of freelancing—proposals that win work, contracts that protect you, updates that build trust, and invoicing that gets paid promptly.",
    whoItsFor: "Freelancers, consultants, or contractors managing multiple clients. Anyone transitioning from employee to independent work. Service providers who need better client communication systems.",
    howToUse: "Use proposal templates to respond to opportunities quickly. Adapt contract language for your services. Send regular progress updates without being prompted. Invoice immediately after milestones with clear payment terms.",
    commonMistakes: "Underselling in proposals. Working without contracts. Going silent between milestones. Delayed invoicing that delays payment. Not tracking client communication systematically.",
    successMetrics: "You win proposals at reasonable rates. Clients pay on time without chasing. Scope creep is minimal. Clients refer you to others. You maintain healthy work-life boundaries.",
    items: [
      { kind: "prompt", id: "p11" }, // Email to executive for proposals
      { kind: "prompt", id: "p3" }, // Clear communication
      { kind: "tool", id: "t42" }, // Notion for client tracking
      { kind: "tool", id: "t39" }, // Stripe for invoicing
    ],
    tags: ["freelance", "business", "clients"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c22",
    slug: "startup-mvp-builder",
    title: "Startup MVP Builder (Ship Fast, Learn Faster)",
    description:
      "Build and launch your first version in weeks, not months. Validate before perfecting.",
    longDescription: "MVPs succeed when they test core assumptions quickly with minimal investment. This collection focuses on rapid prototyping, no-code solutions where possible, and learning from real users. The goal is validation, not perfection—ship something people can actually use and judge.",
    whoItsFor: "Founders building their first product. Technical cofounders who need to move fast. Non-technical founders who need to ship without a dev team. Anyone validating a product idea.",
    howToUse: "Start with feature specs to define must-haves only. Use no-code tools where possible. Build rough but functional. Launch to small audience. Iterate based on actual usage data.",
    commonMistakes: "Building features users didn't ask for. Perfecting design before validating concept. Waiting for everything to be ready. Not talking to users during build. Over-engineering the first version.",
    successMetrics: "You launch within target timeframe. Users actually use the product. You learn what to build next from real usage. Technical debt is manageable. You avoid rebuilding from scratch.",
    items: [
      { kind: "prompt", id: "p17" }, // Feature spec template
      { kind: "tool", id: "t44" }, // Vercel for deployment
      { kind: "tool", id: "t45" }, // Supabase for backend
      { kind: "tool", id: "t10" }, // Framer for landing page
    ],
    tags: ["startup", "mvp", "product"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c23",
    slug: "technical-writing-system",
    title: "Technical Writing System (Clear, Complete, Maintainable)",
    description:
      "Write docs, specs, and guides that engineers and users both understand.",
    longDescription: "Technical writing requires balancing accuracy with accessibility. This collection helps you document systems, write specifications, create guides, and maintain documentation that serves both technical and non-technical audiences. Focus on clarity without sacrificing precision.",
    whoItsFor: "Technical writers, developers documenting features, DevRel creating guides, or anyone responsible for technical documentation. Product managers writing specs for engineering teams.",
    howToUse: "Start with clear structure and audience definition. Use diagrams where helpful. Write in layers—overview first, details second. Test documentation with actual users. Update docs when product changes.",
    commonMistakes: "Writing only for experts. Assuming too much context. Not providing examples. Letting documentation drift from reality. Using jargon without definition.",
    successMetrics: "Support tickets decrease. Users successfully complete tasks using docs. Engineers can onboard using documentation. Docs stay current with product. Search finds relevant information.",
    items: [
      { kind: "prompt", id: "p13" }, // Technical explainer
      { kind: "prompt", id: "p19" }, // Tutorial writer
      { kind: "prompt", id: "p3" }, // Clarity rewrite
      { kind: "tool", id: "t42" }, // Documentation platform
    ],
    tags: ["documentation", "technical-writing", "dev"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c24",
    slug: "remote-team-coordination",
    title: "Remote Team Coordination (Async-First, Meeting-Light)",
    description:
      "Keep remote teams aligned without drowning in Zoom calls and Slack noise.",
    longDescription: "Remote work succeeds with clear communication rhythms, good documentation, and intentional synchronous time. This collection provides systems for async updates, focused meetings, and team alignment that respects time zones and deep work.",
    whoItsFor: "Remote team managers, distributed teams, async-first companies, or anyone coordinating across time zones. Teams tired of meeting overload.",
    howToUse: "Establish async update rhythms. Document decisions in written form. Use meetings only for collaboration and discussion. Record important meetings for absent members. Create clear communication channels.",
    commonMistakes: "Defaulting to meetings for everything. Not documenting decisions. Expecting instant responses. Scheduling across too many time zones. Unclear communication ownership.",
    successMetrics: "Meeting time decreases. Team reports feeling less interrupted. Decisions get made without everyone present. Documentation stays current. Team velocity improves.",
    items: [
      { kind: "prompt", id: "p12" }, // Meeting agendas
      { kind: "prompt", id: "p11" }, // Clear async updates
      { kind: "tool", id: "t42" }, // Notion for documentation
      { kind: "tool", id: "t43" }, // Loom for async video
    ],
    tags: ["remote", "management", "async"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c25",
    slug: "personal-brand-building",
    title: "Personal Brand Building (Authentic, Not Cringe)",
    description:
      "Build authority and audience without turning into a LinkedIn influencer parody.",
    longDescription: "Personal branding works when it's genuine expertise shared consistently, not motivational quotes and humble brags. This collection focuses on demonstrating knowledge through teaching, building in public, and creating valuable content that serves your audience.",
    whoItsFor: "Professionals building thought leadership. Job seekers standing out. Founders establishing credibility. Anyone wanting to be known for their expertise.",
    howToUse: "Pick one platform to focus on. Share what you're learning publicly. Create content that helps others solve problems. Engage authentically with your field. Stay consistent for months, not weeks.",
    commonMistakes: "Posting only wins without process. Writing for algorithms instead of people. Not being consistent. Copying other creators' voice. Expecting immediate results.",
    successMetrics: "People reach out about your expertise. Job opportunities find you. Your content gets referenced by others. You build genuine professional relationships. Audience engagement grows steadily.",
    items: [
      { kind: "prompt", id: "p4" }, // Content structure
      { kind: "tool", id: "t43" }, // Loom for video
      { kind: "tool", id: "t42" }, // Notion for content planning
      { kind: "prompt", id: "p3" }, // Clarity rewrite
    ],
    tags: ["personal-brand", "content", "career"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c26",
    slug: "api-documentation-complete",
    title: "API Documentation Complete (Devs Can Actually Use It)",
    description:
      "Document APIs so developers succeed on first try, not third support ticket.",
    longDescription: "Good API documentation means developers can integrate successfully without contacting support. This collection covers reference docs, integration guides, example code, and error handling—everything needed for smooth developer experience.",
    whoItsFor: "Developer experience teams, API product managers, backend engineers documenting endpoints, or anyone building developer-facing products.",
    howToUse: "Start with quick start guide for common use case. Provide complete reference documentation. Include real example code. Document errors and edge cases. Keep documentation current with API changes.",
    commonMistakes: "Reference docs without examples. Examples that don't run. Outdated documentation. Missing error codes and meanings. No migration guides for breaking changes.",
    successMetrics: "Integration time decreases. Support tickets about usage decrease. Developers successfully integrate without contacting support. API adoption increases. Positive developer sentiment.",
    items: [
      { kind: "prompt", id: "p19" }, // Tutorial writer
      { kind: "prompt", id: "p13" }, // Technical explainer
      { kind: "tool", id: "t42" }, // Documentation platform
      { kind: "prompt", id: "p2" }, // Debug examples
    ],
    tags: ["api", "documentation", "developer-experience"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c27",
    slug: "lead-generation-system",
    title: "Lead Generation System (Inbound, Not Annoying)",
    description:
      "Attract and qualify leads through content and tools, not cold outreach spam.",
    longDescription: "Inbound lead generation builds trust through valuable content, clear positioning, and helpful tools. This collection focuses on creating content that attracts your ideal customers, lead magnets that qualify interest, and nurture sequences that build relationships.",
    whoItsFor: "B2B marketers, SaaS founders, consultants, or anyone selling complex products where trust and education matter. Teams moving from outbound to inbound.",
    howToUse: "Create content addressing customer pain points. Build calculators or tools that provide value. Capture leads with genuine value exchange. Nurture with educational content. Track engagement to identify hot leads.",
    commonMistakes: "Creating content about yourself not customers. Gating everything behind forms. Not nurturing captured leads. Ignoring lead scoring. Following up too aggressively.",
    successMetrics: "Qualified lead volume increases. Lead quality improves. Conversion rate from lead to customer increases. Sales team spends less time qualifying. Customer acquisition cost decreases.",
    items: [
      { kind: "prompt", id: "p9" }, // Landing page copy
      { kind: "prompt", id: "p4" }, // Content creation
      { kind: "tool", id: "t37" }, // Webflow for landing pages
      { kind: "tool", id: "t28" }, // Zapier for automation
    ],
    tags: ["marketing", "leads", "growth"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c28",
    slug: "data-dashboard-builder",
    title: "Data Dashboard Builder (Insights, Not Just Charts)",
    description:
      "Build dashboards that answer questions and drive decisions, not just look pretty.",
    longDescription: "Effective dashboards surface insights and enable action, not just display data. This collection focuses on understanding stakeholder questions, choosing right metrics, designing for clarity, and building dashboards people actually use.",
    whoItsFor: "Data analysts, product managers, business intelligence teams, or anyone building dashboards for stakeholders. Teams moving from static reports to self-service analytics.",
    howToUse: "Start by understanding what decisions the dashboard should inform. Choose metrics that matter. Design for scanability. Add context to numbers. Make dashboards interactive where helpful. Iterate based on usage.",
    commonMistakes: "Showing too many metrics. Not providing context for numbers. Building dashboards nobody asked for. Making dashboards too complex. Not maintaining data quality.",
    successMetrics: "Stakeholders use dashboards regularly. Questions get answered without manual analysis. Decisions reference dashboard data. Ad-hoc analysis requests decrease. Dashboard loading time stays fast.",
    items: [
      { kind: "prompt", id: "p8" }, // SQL for data
      { kind: "prompt", id: "p13" }, // Technical explainer
      { kind: "tool", id: "t47" }, // PostHog for analytics
      { kind: "tool", id: "t42" }, // Notion for documentation
    ],
    tags: ["data", "analytics", "dashboards"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c29",
    slug: "code-review-system",
    title: "Code Review System (Helpful Feedback, Not Nitpicks)",
    description:
      "Review code that improves quality, teaches developers, and ships faster.",
    longDescription: "Good code review balances quality standards with velocity and learning. This collection provides frameworks for constructive feedback, automated checks for style issues, and review processes that teach rather than block.",
    whoItsFor: "Engineering leads, senior developers, tech leads, or anyone responsible for code quality. Teams wanting to improve review culture and velocity.",
    howToUse: "Automate style and formatting checks. Focus reviews on logic, architecture, and edge cases. Ask questions instead of demanding changes. Explain reasoning behind feedback. Prioritize blocking versus non-blocking feedback.",
    commonMistakes: "Nitpicking style issues humans shouldn't review. Not explaining the why behind feedback. Blocking PRs for non-critical issues. Not reviewing promptly. Inconsistent standards across reviewers.",
    successMetrics: "PR cycle time decreases. Code quality remains high. Junior developers improve faster. Review feedback is constructive. Team doesn't dread code review.",
    items: [
      { kind: "prompt", id: "p2" }, // Bug hunter for review
      { kind: "prompt", id: "p3" }, // Clear communication
      { kind: "tool", id: "t1" }, // AI coding for review assistance
      { kind: "prompt", id: "p15" }, // Postmortem for major issues
    ],
    tags: ["dev", "code-review", "quality"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c30",
    slug: "workshop-facilitation-kit",
    title: "Workshop Facilitation Kit (Productive Sessions, Real Outcomes)",
    description:
      "Run workshops that generate ideas, make decisions, and align teams.",
    longDescription: "Effective workshops require clear goals, structured activities, good facilitation, and concrete outputs. This collection provides frameworks for ideation, decision-making, and alignment sessions that produce usable results.",
    whoItsFor: "Product managers running feature prioritization. Design leads facilitating brainstorms. Managers running team planning. Anyone facilitating collaborative work sessions.",
    howToUse: "Define clear workshop goals and outputs upfront. Design activities that serve the goal. Facilitate actively to keep momentum. Document decisions in real-time. Follow up with action items.",
    commonMistakes: "Vague workshop goals. Too many activities in too little time. Not managing dominant voices. Failing to capture decisions. No follow-up after workshop.",
    successMetrics: "Workshops produce concrete decisions or outputs. Participants feel time was well spent. Decided actions actually happen. Teams align on direction. Future meetings reference workshop decisions.",
    items: [
      { kind: "prompt", id: "p14" }, // Brainstorm facilitator
      { kind: "prompt", id: "p12" }, // Meeting agendas
      { kind: "tool", id: "t8" }, // Excalidraw for collaboration
      { kind: "tool", id: "t31" }, // Figma for design workshops
    ],
    tags: ["facilitation", "workshop", "collaboration"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c31",
    slug: "sales-demo-preparation",
    title: "Sales Demo Preparation (Show Value, Not Features)",
    description:
      "Prepare demos that connect product capabilities to customer problems.",
    longDescription: "Winning demos demonstrate how your product solves the prospect's specific problems, not just showcasing features. This collection focuses on discovery, demo customization, handling objections, and following up effectively.",
    whoItsFor: "Sales engineers, account executives, founders doing sales, or anyone demoing products to prospects. Teams wanting to improve demo conversion rates.",
    howToUse: "Research prospect before demo. Customize demo to their use case. Start with their problem, not your features. Show specific value for their situation. Leave time for questions. Follow up with clear next steps.",
    commonMistakes: "Generic feature tours. Not researching prospect. Talking too much. Not handling objections. Weak follow-up. Demoing everything instead of relevant features.",
    successMetrics: "Demo-to-opportunity conversion increases. Prospects engage actively during demo. Technical objections decrease. Sales cycle length decreases. Win rate from demo stage improves.",
    items: [
      { kind: "prompt", id: "p13" }, // Technical explainer
      { kind: "prompt", id: "p11" }, // Clear communication
      { kind: "tool", id: "t43" }, // Loom for demo recordings
      { kind: "prompt", id: "p10" }, // Anticipate objections
    ],
    tags: ["sales", "demo", "conversion"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c32",
    slug: "learning-new-programming-language",
    title: "Learning New Programming Language (Practical, Not Academic)",
    description:
      "Master a new language by building, not reading. Projects over textbooks.",
    longDescription: "Language learning accelerates through building real projects that expose you to common patterns. This collection provides a project-based learning path, focuses on practical patterns over theory, and builds muscle memory through repetition.",
    whoItsFor: "Developers learning new languages for work. Engineers exploring new technology stacks. Students moving beyond introductory courses. Anyone wanting practical proficiency fast.",
    howToUse: "Start with small working project. Learn syntax as needed. Build increasingly complex projects. Read others' code. Solve practical problems, not puzzles. Focus on language idioms and patterns.",
    commonMistakes: "Reading documentation without coding. Building toy projects forever. Not reading production code. Learning theory before practice. Trying to learn everything before building.",
    successMetrics: "You build working projects in the new language. Code feels idiomatic not translated. You debug effectively. You read others' code without struggling. You choose appropriate language features.",
    items: [
      { kind: "prompt", id: "p1" }, // Explain like tutor
      { kind: "prompt", id: "p2" }, // Debug new language code
      { kind: "tool", id: "t1" }, // Cursor for learning
      { kind: "prompt", id: "p19" }, // Tutorial writer
    ],
    tags: ["learning", "programming", "dev"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c33",
    slug: "user-research-synthesis",
    title: "User Research Synthesis (Insights to Action)",
    description:
      "Turn user interviews and feedback into clear insights and product decisions.",
    longDescription: "Research synthesis transforms raw data into actionable insights. This collection helps you analyze interview transcripts, identify patterns, extract insights, and communicate findings that drive product decisions.",
    whoItsFor: "Product managers, UX researchers, designers, or anyone conducting user research. Teams wanting to make research more actionable.",
    howToUse: "Review all research data systematically. Tag common themes and patterns. Extract specific quotes supporting insights. Prioritize insights by impact and confidence. Present findings with recommendations.",
    commonMistakes: "Cherry-picking quotes supporting preconceptions. Not distinguishing between what users say and do. Overwhelming stakeholders with too many findings. Not connecting insights to actions.",
    successMetrics: "Research directly influences product decisions. Team references research in prioritization. User problems are understood deeply. Research findings are actionable. Stakeholders trust research quality.",
    items: [
      { kind: "prompt", id: "p3" }, // Synthesize clearly
      { kind: "prompt", id: "p18" }, // Executive summary
      { kind: "tool", id: "t42" }, // Notion for organization
      { kind: "prompt", id: "p7" }, // Compare patterns
    ],
    tags: ["research", "product", "ux"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c34",
    slug: "crisis-communication-plan",
    title: "Crisis Communication Plan (Transparent, Not Defensive)",
    description:
      "Communicate during incidents, outages, or mistakes with honesty and speed.",
    longDescription: "Crisis communication requires acknowledging problems quickly, communicating transparently, and following through on commitments. This collection provides templates for incident updates, customer communications, and internal coordination.",
    whoItsFor: "Product managers handling outages. Support teams during incidents. Communications teams managing crises. Anyone responsible for customer communication during problems.",
    howToUse: "Acknowledge issue immediately. Provide regular updates on progress. Be honest about impact and timeline. Follow up after resolution. Document what happened and what changed.",
    commonMistakes: "Going silent during crisis. Being overly defensive. Over-promising on timeline. Not communicating to all affected parties. Forgetting follow-up after resolution.",
    successMetrics: "Customers feel informed during incidents. Churn doesn't spike after problems. Team coordinates effectively during crisis. Updates are timely and accurate. Post-crisis trust recovers quickly.",
    items: [
      { kind: "prompt", id: "p15" }, // Postmortem
      { kind: "prompt", id: "p11" }, // Clear communication
      { kind: "prompt", id: "p3" }, // Clarity under pressure
      { kind: "tool", id: "t42" }, // Notion for coordination
    ],
    tags: ["crisis", "communication", "incident"],
    updatedAtISO: "2026-01-24",
  },

  {
    id: "c35",
    slug: "performance-optimization-workflow",
    title: "Performance Optimization Workflow (Measure, Fix, Verify)",
    description:
      "Make things faster through data, not guessing. Profile, optimize, benchmark.",
    longDescription: "Performance optimization requires measuring before and after, identifying real bottlenecks, and verifying improvements. This collection provides systematic approach to finding and fixing performance issues.",
    whoItsFor: "Backend engineers optimizing services. Frontend developers improving page speed. Database engineers tuning queries. Anyone responsible for system performance.",
    howToUse: "Profile to identify real bottlenecks. Focus on highest impact optimizations first. Implement changes incrementally. Benchmark before and after. Monitor production impact. Document optimizations for team.",
    commonMistakes: "Optimizing without profiling. Premature optimization. Not measuring impact. Making changes that hurt readability for minimal gain. Not considering real-world usage patterns.",
    successMetrics: "Performance metrics improve measurably. User experience improves noticeably. Infrastructure costs decrease. Team maintains performance gains over time. Optimization decisions are data-driven.",
    items: [
      { kind: "prompt", id: "p2" }, // Debug performance issues
      { kind: "prompt", id: "p8" }, // SQL query optimization
      { kind: "tool", id: "t6" }, // Langfuse for LLM performance
      { kind: "prompt", id: "p15" }, // Document learnings
    ],
    tags: ["performance", "optimization", "dev"],
    updatedAtISO: "2026-01-24",
  },
];
