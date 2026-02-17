import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import LibraryClient from "./library-client";

export const metadata: Metadata = {
  title: "Library — Xavkit",
  description: "Access your saved items and browsing history in one place.",
  alternates: { canonical: absoluteUrl("/library") },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <LibraryClient />;
}
