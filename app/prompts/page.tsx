import type { Metadata } from "next";
import PromptsIndexClient from "./prompts-index-client";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "AI Prompts - Xavkit",
  description:
    "Browse copy-paste prompts with deeper guidance, model fit, and practical usage notes.",
  alternates: { canonical: absoluteUrl("/prompts") },
  robots: { index: true, follow: true },
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
