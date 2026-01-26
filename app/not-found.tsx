import Link from "next/link";
import { Sparkles, ArrowLeft, Search, Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function MemeBlob() {
  // Simple cartoon-ish “meme” SVG: harmless, original, and not stolen from the internet.
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="absolute inset-0 blur-2xl opacity-30 rounded-[2rem] bg-muted" />
      <svg
        viewBox="0 0 420 260"
        className="relative w-full rounded-[2rem] border bg-background shadow-sm"
        aria-hidden="true"
      >
        {/* blob */}
        <path
          d="M92,58 C140,10 240,10 300,54 C360,98 388,152 360,196 C332,240 246,252 186,238 C126,224 40,192 44,126 C48,80 64,76 92,58 Z"
          fill="currentColor"
          opacity="0.06"
        />
        {/* face */}
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
        {/* tiny sweat drop */}
        <path
          d="M315 90 C335 105, 332 125, 315 132 C298 125, 295 105, 315 90 Z"
          fill="currentColor"
          opacity="0.12"
        />
        <text x="26" y="242" fill="currentColor" opacity="0.35" fontSize="14">
          404: page went missing (like motivation on Monday)
        </text>
      </svg>
    </div>
  );
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      
      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="rounded-full">
                <Flame className="h-3.5 w-3.5 mr-1" /> Not trending
              </Badge>
              <Badge variant="outline" className="rounded-full">
                404
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              This page doesn’t exist.
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl">
              Either the link is wrong, the content isn’t published yet, or the internet is doing what it does best:
              wasting your time.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button className="rounded-2xl" asChild>
                <Link href="/" className="inline-flex items-center">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back to homepage
                </Link>
              </Button>

              <Button variant="outline" className="rounded-2xl" asChild>
                <Link href="/#trending" className="inline-flex items-center">
                  <Search className="h-4 w-4 mr-2" /> Browse trending
                </Link>
              </Button>
            </div>

            <Card className="mt-6 rounded-2xl shadow-sm">
              <CardHeader className="border-b">
                <CardTitle className="text-base">Common causes</CardTitle>
              </CardHeader>
              <CardContent className="p-5 text-sm text-muted-foreground space-y-2">
                <div>• You clicked a slug that isn’t in <code className="px-1 rounded bg-muted/40">DATA</code>.</div>
                <div>• You haven’t created the route file for that page type yet.</div>
                <div>• You renamed a slug and didn’t update links.</div>
              </CardContent>
            </Card>
          </div>

          <div className="md:pt-4">
            <MemeBlob />
          </div>
        </div>
      </main>
    </div>
  );
}
