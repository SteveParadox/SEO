export type SearchDemandGuide = {
  id: string;
  slug: string;
  title: string;
  description: string;
  primaryQuery: string;
  category: string;
  intent: "informational";
  updatedAtISO: string;
  /** Set only when the actual production publication date is confirmed. */
  publishedAtISO?: string;
  answer: string;
  intro: string[];
  steps: { title: string; body: string; example: string }[];
  pitfalls: string[];
  faqs: { q: string; a: string }[];
  relatedLinks: { href: string; label: string }[];
  sources: { url: string; label: string }[];
};

/** AI-assisted editorial drafts covering plausible search-intent families.
 * These are hypotheses, NOT verified high-volume keywords or first-hand product tests.
 * Query-level search volumes are unmeasured. Dates change only for substantive revisions.
 */
export const SEARCH_DEMAND_GUIDES: readonly SearchDemandGuide[] = [
  {
    "id": "gd-2026-01",
    "slug": "summarize-pdf-with-ai-and-check-citations",
    "title": "How to Summarize a PDF With AI and Verify Key Details",
    "description": "A practical workflow for summarizing PDFs, checking cited page references, and spotting omissions or invented claims before relying on an AI summary.",
    "primaryQuery": "how to summarize a pdf with ai",
    "category": "Research and documents",
    "intent": "informational",
    "updatedAtISO": "2026-11-07",
    "answer": "Upload a PDF only where you have permission, request a section-by-section summary with quoted evidence and page references, then compare every important claim with the source. An AI summary is a reading aid, not a substitute for checking the document.",
    "intro": [
      "Long PDFs are difficult to skim because executive summaries can conceal exceptions, footnotes, and conflicting statements. A useful AI-assisted review preserves those distinctions instead of producing one confident paragraph.",
      "Start with a document you are authorized to share. Remove confidential or personal information when possible, especially when using an unfamiliar service. For scanned documents, check whether the tool can actually read the pages before requesting a complete summary."
    ],
    "steps": [
      {
        "title": "Define the decision the summary must support",
        "body": "Write one sentence explaining why you are reading the document: learn the main argument, compare vendor terms, find policy exceptions, or prepare discussion questions. Specify the audience and the acceptable length.",
        "example": "I need to compare these contract terms with another vendor. Highlight obligations, termination triggers, exceptions and unresolved clauses."
      },
      {
        "title": "Ask for a structural outline first",
        "body": "Request the table of contents, major sections, likely appendices, and any pages that are not readable. Check the outline against the PDF before proceeding. Chunk very long files by section if needed.",
        "example": "List the headings and the page ranges. State explicitly if any page is missing, image-only, or unreadable."
      },
      {
        "title": "Require traceable claims",
        "body": "Ask the assistant to separate verbatim short quotations from its interpretation. For each consequential claim, request the printed page number and a locating phrase; remember PDF viewer numbers and printed page numbers can differ.",
        "example": "For every obligation, give the clause heading, printed page, a short identifying quotation, and your plain-English interpretation."
      },
      {
        "title": "Test the summary against omissions",
        "body": "Independently sample at least three high-stakes claims, the conclusion, and one exception. Look up each in the original PDF. Challenge the model to name competing statements and unresolved ambiguity.",
        "example": "Which passages qualify or contradict your summary? Name the section rather than guessing a citation."
      },
      {
        "title": "Produce a useful final artifact",
        "body": "Ask for a concise summary, a table of decisions or open questions, and a separate list of claims you did not verify. Treat unavailable evidence as unknown rather than filling gaps.",
        "example": "Return executive summary, evidence table, open questions, and items that need human verification."
      }
    ],
    "pitfalls": [
      "Never trust page numbers, quotations, or citations until you locate them in the original file.",
      "Do not upload contracts, medical records, or confidential materials without the required authorization and privacy review.",
      "Scans, complex tables, images and footnotes may be skipped or misread; inspect them directly."
    ],
    "faqs": [
      {
        "q": "Can AI summarize a scanned PDF?",
        "a": "Sometimes, but it depends on the service and document quality. Check a page containing tables or diagrams first; if the model cannot read it, do not treat its summary as complete."
      },
      {
        "q": "How do I know whether a citation is real?",
        "a": "Open the original file, navigate to the cited page or section, and match the quote to the surrounding context. If you cannot locate it, mark the statement unverified."
      },
      {
        "q": "Should I use the AI summary instead of reading the PDF?",
        "a": "Use it to prioritize reading. For legal, financial, medical, or otherwise consequential decisions, check the controlling passages and involve the relevant qualified reviewer."
      }
    ],
    "relatedLinks": [
      {
        "href": "/best/best-ai-tools-for-research",
        "label": "Compare research-oriented AI tools"
      },
      {
        "href": "/prompts/source-grounded-research-brief",
        "label": "Use a source-grounded research prompt"
      }
    ],
    "sources": [
      {
        "label": "OpenAI: file uploads and supported file behavior",
        "url": "https://help.openai.com/en/articles/8555545-file-uploads-faq"
      }
    ]
  },
  {
    "id": "gd-2026-02",
    "slug": "analyze-csv-with-chatgpt-verify-results",
    "title": "How to Analyze CSV or Excel Data With ChatGPT and Verify the Results",
    "description": "Analyze CSV and Excel files with ChatGPT: inspect columns, check missing data, reproduce calculations, and make charts without invented numbers.",
    "primaryQuery": "how to analyze csv with chatgpt",
    "category": "Data and spreadsheets",
    "intent": "informational",
    "updatedAtISO": "2026-11-07",
    "answer": "Start by inspecting the dataset's columns and row counts, define an exact question, ask ChatGPT to show the calculation or code behind each result, and independently verify a sample of totals before using charts or conclusions.",
    "intro": [
      "Uploading a dataset does not make every number trustworthy. Column names can be ambiguous, missing values can change the denominator, and charts can make weak conclusions look precise.",
      "This workflow focuses on analysis you can reproduce. Remove personal identifiers, payment details, and credentials before uploading data, and use an approved environment for sensitive datasets."
    ],
    "steps": [
      {
        "title": "Create a data dictionary before plotting",
        "body": "Ask for column names, types, units, unique values for categories, missing-value counts, suspected duplicates, and date coverage. Compare the reported dimensions with the original file.",
        "example": "Inspect these columns only. Report shape, types, null rates, duplicates and ambiguities. Do not draw conclusions yet."
      },
      {
        "title": "Translate a question into a precise metric",
        "body": "Define what is being counted, what groups to compare, how missing rows are handled, which date window is used, and what outcome would answer the question.",
        "example": "For each calendar month, show unique orders and total revenue, excluding refunded orders. State the currency and whether returns are represented."
      },
      {
        "title": "Require executable or auditable calculations",
        "body": "Request the transformation steps or code, aggregation rules and example arithmetic. When code execution is unavailable, label outputs as illustrative rather than computed.",
        "example": "Show the pandas steps and the grouping formula. If you cannot execute against the actual file, do not report numerical results."
      },
      {
        "title": "Check denominators and edge cases",
        "body": "Recalculate at least one subtotal, grand total and percentage outside the model. Check date parsing, currency symbols, categorical spelling variants and outliers.",
        "example": "For this percentage, identify numerator, denominator, excluded rows and rounding rule."
      },
      {
        "title": "Choose the chart from the question",
        "body": "Use a line chart for a time trend, bars for category comparisons, scatter plots for two numeric variables and pie charts only for a few parts of one whole. Include units, period and caveats.",
        "example": "Create a monthly revenue line chart with the same filters used for the summary table; include the source row count."
      }
    ],
    "pitfalls": [
      "Do not let a model invent columns, numbers or correlations it did not compute.",
      "Do not treat correlation as a causal explanation; check confounders and definitions.",
      "Do not publish a chart without labels, units, filter criteria and a way to reproduce it."
    ],
    "faqs": [
      {
        "q": "Can ChatGPT calculate values from my file?",
        "a": "Data analysis capabilities vary by model, plan and tool availability. Ask to see the actual processing steps and verify a sample rather than assuming the model executed code."
      },
      {
        "q": "What chart should I use for monthly data?",
        "a": "A line chart is usually appropriate for a continuous time series. Use bars when comparing discrete months or separate categories matters more than the trend."
      },
      {
        "q": "What should I do with missing values?",
        "a": "Measure their amount and distribution before choosing exclusion or imputation. Document the rule because it can materially change totals and comparisons."
      }
    ],
    "relatedLinks": [
      {
        "href": "/best/best-ai-tools-for-data-analysis",
        "label": "Explore AI data-analysis tools"
      },
      {
        "href": "/prompts/csv-dataset-analysis-prompt",
        "label": "Copy a CSV analysis template"
      },
      {
        "href": "/prompts/excel-pivot-table-analysis-plan",
        "label": "Plan an Excel pivot-table analysis"
      }
    ],
    "sources": [
      {
        "label": "OpenAI: data analysis with ChatGPT",
        "url": "https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt"
      }
    ]
  },
  {
    "id": "gd-2026-03",
    "slug": "use-ai-for-keyword-research-with-real-data",
    "title": "How to Use AI for SEO Keyword Research Without Inventing Search Volume",
    "description": "Find useful search-intent clusters with Search Console, Trends and AI assistance, then map them to existing URLs without creating duplicate SEO pages.",
    "primaryQuery": "how to use ai for keyword research",
    "category": "SEO and content",
    "intent": "informational",
    "updatedAtISO": "2026-11-07",
    "answer": "Use AI to group and interpret keyword evidence, not to manufacture it. Export real queries from Search Console or Bing, compare trends by market, classify the searcher's task, and assign each cluster to one genuinely useful page.",
    "intro": [
      "Search-demand lists are full of branded navigational queries. A popular term does not automatically create a realistic editorial opportunity for a smaller website.",
      "AI is useful for clustering query variants, proposing outlines and highlighting missing answers—but estimated volume, ranking difficulty and performance must come from dated data sources or be marked unknown."
    ],
    "steps": [
      {
        "title": "Start with a narrow market and business task",
        "body": "Specify audience, region, language and what visitors should accomplish on your site. Write down current high-value URLs before researching new ones.",
        "example": "Our site helps developers choose AI tools. Target English-language comparisons and tutorials, not unrelated high-volume news searches."
      },
      {
        "title": "Export observed searches from owned properties",
        "body": "Use Search Console to collect queries, landing pages, clicks, impressions, CTR and average position. Add country and device where useful. If you cannot access these reports, clearly say the site's baseline is unknown.",
        "example": "Filter the last 28 and 90 days for pages with meaningful impressions and positions where improvement is plausible."
      },
      {
        "title": "Check market direction separately from volume",
        "body": "Use Google Trends to compare interest over time and geography. Remember Trends uses a normalized index, not absolute search counts. Use Bing Keyword Research or dated third-party estimates for directional volume clues.",
        "example": "Compare 'ai research assistant' and task-specific variants in the same region, then log which tool and time period provided each signal."
      },
      {
        "title": "Cluster intent and map to one canonical URL",
        "body": "Group synonyms and near-duplicate questions by the visitor's underlying job. For each cluster choose refresh, consolidate, publish or defer. Identify useful pages already covering the topic before planning another.",
        "example": "A question about verifying PDF citations deserves a tutorial; a comparison of AI research tools belongs on a comparison page."
      },
      {
        "title": "Write and measure an original answer",
        "body": "Publish first-hand examples, cited guidance, clear limitations and accurate internal links. Monitor query/page performance after indexing, and revise when the data points to a real gap.",
        "example": "Record query, purpose, target URL, source, snapshot date, outcome hypothesis and review date in the editorial queue."
      }
    ],
    "pitfalls": [
      "Google Trends scores are relative 0–100 values, not monthly search volume.",
      "Do not interpret traffic estimates from different providers as interchangeable or add them together.",
      "Do not generate a page per phrase when several phrases describe the same task."
    ],
    "faqs": [
      {
        "q": "Can AI tell me the exact monthly search volume?",
        "a": "Not by reasoning from a phrase alone. Use a dated keyword tool or an owned-site dataset and record the market, period and whether the number is observed or modeled."
      },
      {
        "q": "Should I target the most searched keywords?",
        "a": "Not automatically. Brand searches usually serve navigation. Prefer relevant questions that your content can answer better or differently, and that align with your audience."
      },
      {
        "q": "How can I prevent keyword cannibalization?",
        "a": "Audit existing URLs, group variants by intent and choose one primary destination per distinct task. Consolidate redundant pages rather than creating thin near-duplicates."
      }
    ],
    "relatedLinks": [
      {
        "href": "/prompts/keyword-research-and-search-intent-mapper",
        "label": "Use the keyword and intent mapping prompt"
      },
      {
        "href": "/best/best-ai-tools-for-seo",
        "label": "Explore AI tools for SEO"
      },
      {
        "href": "/prompts/seo-content-brief",
        "label": "Build an editorial content brief"
      }
    ],
    "sources": [
      {
        "label": "Google: how Google Trends data is normalized",
        "url": "https://support.google.com/trends/answer/4365533?hl=en"
      },
      {
        "label": "Google: Search Console performance report",
        "url": "https://support.google.com/webmasters/answer/7576553/performance-report-search"
      },
      {
        "label": "Bing: keyword research",
        "url": "https://www.bing.com/webmasters/help/keyword-research-628070b6"
      }
    ]
  },
  {
    "id": "gd-2026-04",
    "slug": "create-social-media-graphics-with-ai-and-canva",
    "title": "How to Plan Social Media Graphics With AI and Finish Them in Canva",
    "description": "Plan Canva-ready social graphics with AI: write clear briefs, check claims, make accessible layouts, and review image rights before publishing.",
    "primaryQuery": "how to use ai for social media graphics",
    "category": "Design and marketing",
    "intent": "informational",
    "updatedAtISO": "2026-11-07",
    "answer": "Use AI to draft the creative brief, headline options, layout requirements and caption; finish the visual in a design editor such as Canva, then review brand accuracy, image rights, text legibility and platform dimensions before publishing.",
    "intro": [
      "Design work starts with a communication problem, not an image prompt. An appealing graphic can still fail if the offer is unclear, the text is unreadable on phones, or the layout uses the wrong aspect ratio.",
      "Canva and similar editors provide a place to finish and export content. Available features, plan limits and rights terms can change, so check the current product documentation rather than relying on an old tutorial."
    ],
    "steps": [
      {
        "title": "Write a one-line creative objective",
        "body": "Specify the audience, one takeaway, channel, call to action and brand constraints. Do not ask the model to invent testimonials, prices or claims.",
        "example": "Audience: first-time users. Goal: announce a free tutorial. Channel: Instagram feed. CTA: read the guide. Tone: calm and helpful."
      },
      {
        "title": "Generate three distinct design directions",
        "body": "Ask for a concise headline, supporting text, layout hierarchy, imagery concept and color guidance. Compare clarity and originality before selecting a direction.",
        "example": "Give me three treatments: editorial typography, simple icon-led, and product screenshot-led. Each needs a headline under eight words."
      },
      {
        "title": "Create the asset at the actual destination size",
        "body": "In Canva or another editor, select a format appropriate to the channel. Keep important words away from crop-sensitive edges; check small-screen legibility and contrast.",
        "example": "Place one key message at the top, a supporting visual in the middle, and a modest CTA at the bottom."
      },
      {
        "title": "Audit claims, rights and accessibility",
        "body": "Review licensing for generated or imported assets, verify product details and add meaningful alternative text when the platform permits it. Check that the design makes sense without color alone.",
        "example": "Confirm exact dates and product claims against the original source. Replace generic AI imagery if it misrepresents the product."
      },
      {
        "title": "Measure the useful outcome, not just likes",
        "body": "Track an appropriate result such as clicks to a helpful page or qualified sign-ups, and compare one creative change at a time.",
        "example": "Test a benefit-led headline against a question-led headline while leaving the rest of the design consistent."
      }
    ],
    "pitfalls": [
      "Do not imply you tested a product or interviewed a customer unless you did.",
      "Do not assume AI-generated images, logos or brand assets are automatically cleared for every commercial use.",
      "Do not fill images with tiny text or use irrelevant hashtags simply to chase traffic."
    ],
    "faqs": [
      {
        "q": "Can AI make a finished Canva design?",
        "a": "Some services offer direct design tools, but capabilities vary. A reliable workflow is to use AI for the brief and first draft, then review and export the design in your editor."
      },
      {
        "q": "What should I write before generating a graphic?",
        "a": "State the audience, single message, destination channel, desired action, factual claims and brand constraints. Specific briefs make editing and review faster."
      },
      {
        "q": "Is a beautiful graphic enough to drive traffic?",
        "a": "No. It needs a relevant audience, clear value, correct destination and a measurable goal. Compare results with actual engagement or click data rather than visual preference alone."
      }
    ],
    "relatedLinks": [
      {
        "href": "/best/best-ai-tools-for-design",
        "label": "Compare AI design tools"
      },
      {
        "href": "/best/best-ai-tools-for-social-media",
        "label": "Explore social media AI tools"
      },
      {
        "href": "/prompts/social-content-repurposer",
        "label": "Repurpose existing content into social formats"
      }
    ],
    "sources": [
      {
        "label": "Canva official help and product documentation",
        "url": "https://www.canva.com/help/"
      }
    ]
  }
];

export function getSearchDemandGuide(slug: string) {
  return SEARCH_DEMAND_GUIDES.find((guide) => guide.slug === slug);
}

/** Return only tutorials intentionally linked to a related index, ranking or prompt. */
export function getGuidesRelatedToUrl(href: string): readonly SearchDemandGuide[] {
  return SEARCH_DEMAND_GUIDES.filter((guide) => guide.relatedLinks.some((link) => link.href === href));
}
