import type { Prompt } from "@/lib/data-types";

export type PromptTopic = {
  slug: string;
  title: string;
  summary: string;
  intro: [string, string];
  whatYouWillFind: [string, string, string];
  practicalAdvice: string;
  tags: string[];
};

export const PROMPT_TOPICS: readonly PromptTopic[] = [
  {
    slug: "careers",
    title: "AI Prompts for Resumes, Job Applications and Interviews",
    summary: "Improve real resumes, prepare interview answers and make career decisions using accurate, editable AI prompts.",
    intro: [
      "An AI assistant can help express genuine career experience more clearly, but it cannot invent the job history or qualifications that employers need to verify. Start with the actual job description and evidence of your work. Use a template to identify gaps, organize details and improve wording rather than claim skills you do not have.",
      "The prompts below cover different stages of the application process: planning a transition, strengthening a resume, writing to an employer, and preparing for interview questions. Choose the task you need to finish now, then review each generated claim against your own records before submitting anything."
    ],
    whatYouWillFind: [
      "Resume and cover-letter prompts that preserve truthful experience",
      "Interview practice, STAR answers and portfolio storytelling",
      "Career development, offer negotiation and transferable-skill planning"
    ],
    practicalAdvice: "Keep a source document of verified roles, dates, skills and outcomes. Reuse it across application materials, checking for conflicting claims.",
    tags: ["career", "job-search", "resume", "cover-letter", "interview", "portfolio", "career-change", "linkedin"],
  },
  {
    slug: "coding-and-development",
    title: "AI Coding Prompts for Debugging, React, Python and DevOps",
    summary: "Use structured AI coding prompts to diagnose errors, review changes and build software with checks and test cases.",
    intro: [
      "Coding prompts work best when they are given an exact failure, a reproducible example and a definition of what a successful fix should do. A generated patch is a hypothesis until it passes tests in your own environment. That is especially important for production builds, authentication, deployment and data-changing scripts.",
      "This directory groups workflows for building components, debugging code, designing API clients and investigating infrastructure problems. Use the most specific template for the job, keep changes small, and ask for verification instructions before accepting refactoring suggestions."
    ],
    whatYouWillFind: [
      "Code debugging and review prompts for focused diagnoses",
      "Front-end, Python and API implementation workflows",
      "CI, Docker and deployment troubleshooting with safe validation"
    ],
    practicalAdvice: "Include versions, complete error messages, a minimal reproduction and relevant configuration. Do not paste secrets or run destructive commands without review.",
    tags: ["development", "coding", "python", "react", "nextjs", "docker", "docker-compose", "devops", "debugging", "api", "typescript", "github-actions", "scripts"],
  },
  {
    slug: "spreadsheets-and-data",
    title: "AI Prompts for Excel Formulas, Google Sheets and Data Analysis",
    summary: "Write spreadsheet formulas, plan dashboards and clean tabular data with accurate column references and checks.",
    intro: [
      "A spreadsheet assistant is useful only when it understands what each column means and what the output is meant to represent. Include your real headers, a few sample records and expected calculations. A formula that looks plausible can still produce incorrect totals when keys are duplicated or dates, currencies and blanks are inconsistent.",
      "Browse prompts for formulas, lookups, pivot tables, data cleanup, dashboards and reproducible analysis. Work on a copy of important data, verify calculations against known cases, and distinguish metrics observed in the dataset from questions that still require the complete file."
    ],
    whatYouWillFind: [
      "Excel formulas and lookup operations with sample checks",
      "Google Sheets cleaning and KPI dashboard planning",
      "CSV data quality, visualizations and business reporting"
    ],
    practicalAdvice: "Define date formats, currency, missing values and duplicate rules before calculating. Preserve raw records until cleaned outputs have been validated.",
    tags: ["spreadsheets", "spreadsheet", "excel", "google-sheets", "csv", "data-analysis", "formula", "pivot-table", "dashboard", "kpi", "statistics"],
  },
  {
    slug: "seo-and-marketing",
    title: "AI Prompts for SEO Audits, Keywords and Content Marketing",
    summary: "Plan useful content, review technical SEO evidence, and improve page relevance without fabricated search metrics.",
    intro: [
      "Search visibility begins with a page that answers a real question and can be discovered, rendered and indexed. Prompts can organize keyword evidence, content briefs, audits and internal links, but they do not create search demand or prove that a ranking will improve. Check actual pages and dated search data before deciding which changes matter.",
      "Use these workflows to work through a specific marketing problem such as overlapping pages, incomplete metadata, an unclear landing-page promise or technical indexing issues. Prioritize fixing existing useful pages over generating multiple near-identical articles for every keyword variant."
    ],
    whatYouWillFind: [
      "Search intent, content briefs and competitive gap analysis",
      "On-page metadata, technical audits and internal-link planning",
      "Local and e-commerce SEO guidance grounded in real business information"
    ],
    practicalAdvice: "Use Search Console, site crawl results and verified sources to prioritize work. Avoid inventing search volume, competitor performance or expected traffic.",
    tags: ["seo", "technical-seo", "internal-linking", "local-seo", "ecommerce-seo", "search-intent", "on-page-seo", "content-writing", "blog-writing", "content-creation", "marketing", "ppc", "youtube"],
  },
  {
    slug: "business-copywriting",
    title: "AI Copywriting Prompts for Emails, Sales and Product Pages",
    summary: "Write business emails, product copy and landing pages that communicate verified offers and clear next steps.",
    intro: [
      "Effective business copy starts with the reader's problem, a credible benefit and a straightforward call to action. AI can help structure a message and test different angles, but it should not invent testimonials, customer numbers, guarantees, pricing or research about a recipient. Clear factual copy builds trust far better than vague hype.",
      "Choose a template for the communication you are preparing: an outreach message, product description, support reply, campaign, proposal or app listing. Supply brand voice and verified product or policy details, then confirm that each claim matches what the buyer will actually receive."
    ],
    whatYouWillFind: [
      "E-commerce, product and app-store description prompts",
      "Outreach, sales follow-up and product-launch email workflows",
      "Customer-support, landing-page and FAQ copywriting"
    ],
    practicalAdvice: "Use a single confirmed offer and one primary next step. Review your claims, unsubscribe requirements and customer-specific facts before publishing or sending.",
    tags: ["copywriting", "email", "email-marketing", "cold-email", "sales", "outreach", "ecommerce", "product-description", "landing-page", "customer-service", "product-copy", "business", "marketing", "app-store"],
  },
  {
    slug: "education-and-studying",
    title: "AI Study Prompts for Quizzes, Lesson Plans and Exam Practice",
    summary: "Turn notes and curriculum goals into useful revision questions, flashcards, lesson plans and research outlines.",
    intro: [
      "AI learning templates are most valuable when they help someone retrieve, apply and check knowledge rather than merely copy a summary. Provide notes, the course level and the learning outcomes that matter. Source mistakes can carry into generated flashcards and exam answers, so the material should always be compared with trusted references.",
      "This collection includes prompts for students preparing for tests and teachers designing practice activities. Choose between short quizzes, spaced-repetition cards, realistic practice exams, lesson sequencing and academic writing support. Each workflow should show what it tests and how answers can be checked."
    ],
    whatYouWillFind: [
      "Active recall, flashcards and revision-note templates",
      "Mock exam questions, marking schemes and study plans",
      "Classroom lesson planning and evidence-led research outlines"
    ],
    practicalAdvice: "Verify explanations and answer keys against the syllabus. Use AI practice as a supplement to learning and original work, not a substitute for either.",
    tags: ["education", "study", "learning", "teaching", "exam-preparation", "quiz", "anki", "flashcards", "classroom", "practice-exam", "research-paper", "study-notes", "revision"],
  },
] as const;

export function getPromptTopic(slug: string) {
  return PROMPT_TOPICS.find((topic) => topic.slug === slug);
}

export function promptsForTopic(topic: PromptTopic, prompts: readonly Prompt[]) {
  const aliases = new Set(topic.tags.map((tag) => tag.toLowerCase()));
  return prompts
    .filter((prompt) => prompt.tags.some((tag) => aliases.has(tag.trim().toLowerCase())))
    .sort((a, b) => a.title.localeCompare(b.title));
}
