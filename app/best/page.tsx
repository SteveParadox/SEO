import type { Metadata } from "next";
import { INDEXABLE_ROBOTS, absoluteUrl } from "@/lib/seo";
import BestIndexClient from "./best-index-client";

export const metadata: Metadata = {
  title: "Best AI Tool Lists - Xavkit",
  description: "High-intent tool lists: ranked picks, tradeoffs, and quick recommendations.",
  alternates: { canonical: absoluteUrl("/best") },
  robots: INDEXABLE_ROBOTS,
};

export default function BestIndexPage() {
  return <BestIndexClient />;
}
