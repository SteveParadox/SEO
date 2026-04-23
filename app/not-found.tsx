import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Flame, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NOINDEX_FOLLOW_ROBOTS } from "@/lib/seo";

export const metadata: Metadata = {
  title: "404 - Page not found | XavKit",
  robots: NOINDEX_FOLLOW_ROBOTS,
};

function IllustrationBlob() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="absolute inset-0 rounded-[2rem] bg-muted opacity-30 blur-2xl" />
      <svg
        viewBox="0 0 420 260"
        className="relative w-full rounded-[2rem] border bg-background shadow-sm"
        aria-hidden="true"
      >
        <path
          d="M92,58 C140,10 240,10 300,54 C360,98 388,152 360,196 C332,240 246,252 186,238 C126,224 40,192 44,126 C48,80 64,76 92,58 Z"
          fill="currentColor"
          opacity="0.06"
        />
        <circle cx="150" cy="120" r="18" fill="currentColor" opacity="0.18" />
        <circle cx="270" cy="120" r="18" fill="currentColor" opacity="0.18" />
        <circle cx="150" cy="120" r="7" fill="currentColor" opacity="0.45" />
        <circle cx="270" cy="120" r="7" fill="currentColor" opacity="0.45" />
        <path
          d="M165 175 C195 205, 225 205, 255 175"
          stroke="currentColor"
          strokeWidth="10"
          opacity="0.35"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M315 90 C335 105, 332 125, 315 132 C298 125, 295 105, 315 90 Z"
          fill="currentColor"
          opacity="0.12"
        />
        <text x="26" y="242" fill="currentColor" opacity="0.35" fontSize="14">
          404: page not found
        </text>
      </svg>
    </div>
  );
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid items-start gap-6 md:grid-cols-2">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge variant="secondary" className="rounded-full">
                <Flame className="mr-1 h-3.5 w-3.5" /> Page unavailable
              </Badge>
              <Badge variant="outline" className="rounded-full">
                404
              </Badge>
            </div>

            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              This page does not exist.
            </h1>

            <p className="mt-4 max-w-xl text-muted-foreground">
              The link may be outdated, the page may have moved, or the content
              may no longer be available.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button className="rounded-2xl" asChild>
                <Link href="/" className="inline-flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to homepage
                </Link>
              </Button>

              <Button variant="outline" className="rounded-2xl" asChild>
                <Link href="/search" className="inline-flex items-center">
                  <Search className="mr-2 h-4 w-4" /> Search the site
                </Link>
              </Button>
            </div>

            <Card className="mt-6 rounded-2xl shadow-sm">
              <CardHeader className="border-b">
                <CardTitle className="text-base">Helpful next steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 p-5 text-sm text-muted-foreground">
                <div>- Browse the latest tools, prompts, and best-of pages.</div>
                <div>- Use site search to find the topic or product you wanted.</div>
                <div>- Head back to the homepage to continue exploring.</div>
              </CardContent>
            </Card>
          </div>

          <div className="md:pt-6">
            <IllustrationBlob />
          </div>
        </div>
      </main>
    </div>
  );
}
