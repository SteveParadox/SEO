import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import UpdatesIndexClient from "./updates-index-client";

export const metadata: Metadata = {
  title: "Model Updates - Xavkit",
  description: "Browse model and ecosystem updates translated into plain English.",
  alternates: { canonical: absoluteUrl("/updates") },
  robots: { index: true, follow: true },
};

export default function UpdatesIndexPage() {
  return <UpdatesIndexClient />;
}
