import type { Metadata } from "next";
import ToolDropAI from "./home";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: {
    canonical: absoluteUrl("/"),
  },
};

export default function Page() {
  return <ToolDropAI />;
}
