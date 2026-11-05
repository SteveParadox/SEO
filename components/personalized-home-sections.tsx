"use client";

import { RecentlyViewed } from "@/components/recently-viewed";
import { TrendingNow } from "@/components/trending-now";
import { ContinueExploring } from "@/components/continue-exploring";
import { RecommendedForYou } from "@/components/recommended-for-you";

/**
 * Personal, browser-storage-derived widgets are not crawlable editorial
 * content. Load them separately after visitors approach the section.
 */
export default function PersonalizedHomeSections() {
  return (
    <>
      <RecentlyViewed limit={6} />
      <TrendingNow limit={4} />
      <ContinueExploring limit={6} />
      <RecommendedForYou limit={6} />
    </>
  );
}
