import type { Metadata } from "next";
import { INDEXABLE_ROBOTS, absoluteUrl } from "@/lib/seo";
import ComparisonsIndexClient from "./comparisons-index-client";

export const metadata: Metadata = {
  title: "Comparisons — Xavkit",
  description:
    "Side-by-side comparisons highlighting strengths, limitations, and ideal use cases.",
  alternates: { canonical: absoluteUrl("/comparisons") },
  robots: INDEXABLE_ROBOTS,
};

export default function Page() {
  return <ComparisonsIndexClient />;
}
