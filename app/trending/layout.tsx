import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NOINDEX_FOLLOW_ROBOTS } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Your Activity Picks",
  robots: NOINDEX_FOLLOW_ROBOTS,
};

export default function TrendingLayout({ children }: { children: ReactNode }) {
  return children;
}
