import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { INDEXABLE_ROBOTS, siteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

const ADSENSE_CLIENT_ID = "ca-pub-7847727460275515";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Site-wide metadata
 * Individual pages override this via generateMetadata()
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "XavKit",
    template: "%s — Xavkit",
  },
  description:
    "Discover vetted AI tools, effective prompts, and significant model updates. Updated when new information has been verified.",
  robots: INDEXABLE_ROBOTS,
  // Optional: enter the verification token in Vercel to prove site ownership
  // to Google Search Console without changing any public page content.
  verification: process.env.GOOGLE_SITE_VERIFICATION?.trim()
    ? { google: process.env.GOOGLE_SITE_VERIFICATION.trim() }
    : undefined,
  openGraph: {
    siteName: "Xavkit",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon-32.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Xavkit",
    url: siteUrl(),
    description:
      "Discover vetted AI tools, effective prompts, and important model updates with practical guidance.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl()}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          src="https://quge5.com/88/tag.min.js"
          data-zone="305394"
          async
          data-cfasync="false"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          id="google-adsense"
          async
          crossOrigin="anonymous"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
        />
        <JsonLd data={websiteSchema} />
        <div className="min-h-screen flex flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
