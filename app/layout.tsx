import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";

/**
 * Site-wide metadata
 * Individual pages override this via generateMetadata()
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ToolDrop AI",
    template: "%s — ToolDrop AI",
  },
  description:
    "Discover vetted AI tools, effective prompts, and significant model updates. Curated daily to help you stay informed.",
  openGraph: {
    siteName: "ToolDrop AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
  <div className="min-h-screen flex flex-col">
    <SiteHeader />
    <main className="flex-1">{children}</main>
    <SiteFooter />
  </div>
</body>
    </html>
  );
}