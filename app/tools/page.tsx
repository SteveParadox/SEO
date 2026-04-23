import type { Metadata } from "next";
import ToolsIndexClient from "./tools-index-client";
import { INDEXABLE_ROBOTS, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Tools — Xavkit",
  description: "Explore a curated collection of AI tools across various categories.",
  alternates: {
    canonical: absoluteUrl("/tools"),
  },
  robots: INDEXABLE_ROBOTS,
};

export default function Page() {
  return <ToolsIndexClient />;
}
