import type { Metadata } from "next";
import PromptsIndexClient from "./prompts-index-client";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "AI Prompts — Xavkit",
  description: "Discover powerful, ready-to-use AI prompts for productivity, learning, coding, and more. Search and browse effective prompts designed to improve your results.",
  alternates: { canonical: absoluteUrl("/prompts") },
  robots: { index: true, follow: true },
  keywords: "AI prompts, prompt engineering, productivity prompts, ChatGPT prompts, learning prompts",
  openGraph: {
    title: "AI Prompts — Xavkit",
    description: "Discover powerful, ready-to-use AI prompts for productivity, learning, coding, and more.",
    url: absoluteUrl("/prompts"),
    type: "website",
  },
};

export default function PromptsIndexPage() {
  return <PromptsIndexClient />;
}
