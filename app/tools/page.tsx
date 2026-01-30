import type { Metadata } from "next";
import ToolsIndexClient from "./tools-index-client";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: {
    canonical: absoluteUrl("/tools"),
  },
};

export default function Page() {
  return <ToolsIndexClient />;
}
