// components/site-header.tsx
import Link from "next/link";
import { Sparkles, Newspaper } from "lucide-react";
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
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl border flex items-center justify-center shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-semibold">ToolDrop AI</div>
            <div className="text-xs text-muted-foreground">
              Daily AI tools, prompts, and model updates
            </div>
          </div>
        </Link>

        {/* Main nav */}
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

        {/* CTA */}
        <Button variant="outline" className="rounded-2xl" asChild>
          <Link href="/#newsletter" className="inline-flex items-center">
            <Newspaper className="h-4 w-4 mr-2" /> Get the weekly drop
          </Link>
        </Button>
      </div>

      <Breadcrumbs />
    </header>
  );
}