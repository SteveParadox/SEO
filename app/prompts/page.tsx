import type { Metadata } from "next";
import PromptsIndexClient from "./prompts-index-client";
import { INDEXABLE_ROBOTS, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "AI Prompts - Xavkit",
  description:
    "Browse copy-paste prompts with deeper guidance, model fit, and practical usage notes.",
  alternates: { canonical: absoluteUrl("/prompts") },
  robots: INDEXABLE_ROBOTS,
  openGraph: {
    title: "AI Prompts - Xavkit",
    description:
      "Browse copy-paste prompts with deeper guidance, model fit, and practical usage notes.",
    url: absoluteUrl("/prompts"),
    siteName: "Xavkit",
    type: "website",
  },
};

export default function PromptsIndexPage() {
  return <PromptsIndexClient />;
}
