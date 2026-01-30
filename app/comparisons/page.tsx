import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import ComparisonsIndexClient from "./comparisons-index-client";

export const metadata: Metadata = {
  title: "Comparisons — ToolDrop AI",
  description:
    "Side-by-side comparisons highlighting strengths, limitations, and ideal use cases.",
  alternates: { canonical: absoluteUrl("/comparisons") },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <ComparisonsIndexClient />;
}
