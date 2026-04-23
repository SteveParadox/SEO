import type { Metadata } from "next";
import { NOINDEX_FOLLOW_ROBOTS, absoluteUrl } from "@/lib/seo";
import RecentClient from "./recent-client";

export const metadata: Metadata = {
  title: "Recently Viewed — Xavkit",
  description: "Quick access to content you've recently explored.",
  alternates: { canonical: absoluteUrl("/recent") },
  robots: NOINDEX_FOLLOW_ROBOTS,
};

export default function Page() {
  return <RecentClient />;
}
