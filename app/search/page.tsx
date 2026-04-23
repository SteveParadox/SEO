import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchClient } from "./search-client";
import { NOINDEX_FOLLOW_ROBOTS, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Search - Xavkit",
  description: "Search Xavkit tools, prompts, updates, comparisons, and guides.",
  alternates: { canonical: absoluteUrl("/search") },
  robots: NOINDEX_FOLLOW_ROBOTS,
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="rounded-2xl border p-6 text-sm text-muted-foreground">
            Loading search...
          </div>
        </div>
      }
    >
      <SearchClient />
    </Suspense>
  );
}
