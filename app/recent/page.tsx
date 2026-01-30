import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import RecentClient from "./recent-client";

export const metadata: Metadata = {
  title: "Recently Viewed — ToolDrop AI",
  description: "Quick access to content you've recently explored.",
  alternates: { canonical: absoluteUrl("/recent") },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <RecentClient />;
}
