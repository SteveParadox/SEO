import type { Metadata } from "next";
import ToolsIndexClient from "./tools-index-client";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Tools — Xavkit",
  description: "Explore a curated collection of AI tools across various categories.",
  alternates: {
    canonical: absoluteUrl("/tools"),
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <ToolsIndexClient />;
}
