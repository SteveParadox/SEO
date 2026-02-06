// components/site-header.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Sparkles, Newspaper, Menu, X, Search, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SavedCountBadge } from "@/components/saved-count-badge";
import { RecentCountBadge } from "@/components/recent-count-badge";

type NavItem = { href: string; label: string };

const NAV: NavItem[] = [
  { href: "/tools", label: "Tools" },
  { href: "/prompts", label: "Prompts" },
  { href: "/updates", label: "Updates" },
  { href: "/collections", label: "Collections" },
  { href: "/comparisons", label: "Comparisons" },
  { href: "/tags", label: "Tags" },
  { href: "/best", label: "Best" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <div className="h-9 w-9 rounded-2xl border flex items-center justify-center shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-semibold">XavKit</div>
            <div className="text-xs text-muted-foreground">
              Daily AI tools, prompts, and model updates
            </div>
          </div>
        </Link>

        {/* Main nav (desktop) */}
        <nav className="hidden md:flex items-center gap-4">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}

          {/* Library (Saved) */}
          <Link
            href="/saved"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <span>Library</span>
            <SavedCountBadge />
          </Link>

          {/* Recent */}
          <Link
            href="/recent"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <span>Recent</span>
            <RecentCountBadge />
          </Link>
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Search + Trending (desktop) */}
          <Button variant="outline" className="rounded-2xl hidden md:inline-flex" asChild>
            <Link href="/search" className="inline-flex items-center">
              <Search className="h-4 w-4 mr-2" /> Search
            </Link>
          </Button>

          <Button variant="outline" className="rounded-2xl hidden md:inline-flex" asChild>
            <Link href="/trending" className="inline-flex items-center">
              <Flame className="h-4 w-4 mr-2" /> Trending
            </Link>
          </Button>

          {/* Newsletter CTA: desktop */}
          <Button variant="outline" className="rounded-2xl hidden lg:inline-flex" asChild>
            <Link href="/#newsletter" className="inline-flex items-center">
              <Newspaper className="h-4 w-4 mr-2" /> Get the weekly drop
            </Link>
          </Button>

          {/* Mobile menu toggle */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden rounded-2xl"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open ? (
        <div className="md:hidden border-t bg-background">
          <div className="mx-auto max-w-6xl px-4 py-3 grid gap-2">
            {/* Primary nav */}
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-sm hover:bg-muted/50"
              >
                {item.label}
              </Link>
            ))}

            {/* Search + Trending (mobile) */}
            <Link
              href="/search"
              onClick={() => setOpen(false)}
              className="flex items-center rounded-xl px-3 py-2 text-sm hover:bg-muted/50"
            >
              <Search className="h-4 w-4 mr-2" /> Search
            </Link>

            <Link
              href="/trending"
              onClick={() => setOpen(false)}
              className="flex items-center rounded-xl px-3 py-2 text-sm hover:bg-muted/50"
            >
              <Flame className="h-4 w-4 mr-2" /> Trending
            </Link>

            {/* Library + Recent */}
            <Link
              href="/saved"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl px-3 py-2 text-sm hover:bg-muted/50"
            >
              <span>Library</span>
              <SavedCountBadge />
            </Link>

            <Link
              href="/recent"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl px-3 py-2 text-sm hover:bg-muted/50"
            >
              <span>Recent</span>
              <RecentCountBadge />
            </Link>

            {/* Newsletter */}
            <Link
              href="/#newsletter"
              onClick={() => setOpen(false)}
              className="flex items-center rounded-xl border px-3 py-2 text-sm hover:bg-muted/50"
            >
              <Newspaper className="h-4 w-4 mr-2" /> Get the weekly drop
            </Link>
          </div>
        </div>
      ) : null}

      <Breadcrumbs />
    </header>
  );
}