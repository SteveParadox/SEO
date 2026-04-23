import type { Metadata } from "next";
import ToolDropAI from "./home";
import { INDEXABLE_ROBOTS, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: {
    canonical: absoluteUrl("/"),
  },
  robots: INDEXABLE_ROBOTS,
};

export default function Page() {
  return <ToolDropAI />;
}
