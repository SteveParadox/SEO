// components/site-header.tsx
"use client";

import Link from "next/link";
import { useState, useEffect, type ComponentType } from "react";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Menu,
  X,
  Search,
  Flame,
  Bookmark,
  Clock,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SavedCountBadge } from "@/components/saved-count-badge";
import { RecentCountBadge } from "@/components/recent-count-badge";

interface NavItem {
  href: string;
  label: string;
  description: string;
}

interface UtilityItem {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

const PRIMARY_NAV: NavItem[] = [
  { href: "/tools", label: "Tools", description: "Browse vetted AI products by use case." },
  { href: "/prompts", label: "Prompts", description: "Find reusable prompts with real guidance." },
  { href: "/best", label: "Best", description: "Open ranked shortlists for decision-heavy searches." },
  { href: "/updates", label: "Updates", description: "Track meaningful model and ecosystem changes." },
  { href: "/comparisons", label: "Comparisons", description: "See side-by-side picks and tradeoffs." },
  { href: "/collections", label: "Collections", description: "Explore grouped workflows and resources." },
];

const SECONDARY_NAV: UtilityItem[] = [
  { href: "/tags", label: "Tags", icon: Tag },
  { href: "/trending", label: "Trending", icon: Flame },
];

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for enhanced header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b transition-all duration-200 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm"
            : "bg-background/80 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex min-h-16 items-center justify-between gap-4 py-3">
            {/* Logo & Brand */}
            <Link
              href="/"
              className="flex items-center gap-2.5 shrink-0 group"
              onClick={closeMobileMenu}
              aria-label="XavKit Home"
            >
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 flex items-center justify-center shadow-sm transition-all group-hover:shadow-md group-hover:scale-105">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>

              <div className="hidden sm:block">
                <div className="font-semibold text-base leading-tight">XavKit</div>
                <div className="text-xs text-muted-foreground">
                  AI tools & updates
                </div>
              </div>
            </Link>

            <div className="hidden min-w-0 flex-1 flex-col gap-2 lg:flex">
              <nav className="flex items-center gap-1">
                {PRIMARY_NAV.map((item) => {
                  const active = isActivePath(pathname, item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        active
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <nav className="flex items-center gap-1">
                {SECONDARY_NAV.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs transition-colors ${
                        active
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-lg"
                asChild
              >
                <Link href="/search" className="gap-2">
                  <Search className="h-4 w-4" />
                  <span className="hidden lg:inline">Search</span>
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="rounded-lg"
                asChild
              >
                <Link href="/saved" className="gap-2">
                  <Bookmark className="h-4 w-4" />
                  <SavedCountBadge />
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="rounded-lg relative"
                asChild
              >
                <Link href="/recent" className="gap-2">
                  <Clock className="h-4 w-4" />
                  <RecentCountBadge />
                </Link>
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
                asChild
              >
                <Link href="/search" aria-label="Search">
                  <Search className="h-5 w-5" />
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <Breadcrumbs />
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-16 right-0 z-40 h-[calc(100vh-4rem)] w-full max-w-sm bg-background border-l shadow-xl md:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col h-full overflow-y-auto">
          <div className="p-4 space-y-1 flex-1">
            <div className="pb-3">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Browse
              </div>
            </div>

            <div className="space-y-1">
              {PRIMARY_NAV.map((item) => {
                const active = isActivePath(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`block rounded-xl px-4 py-3 transition-colors ${
                      active ? "bg-muted" : "hover:bg-muted"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    <div className="text-base font-medium">{item.label}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{item.description}</div>
                  </Link>
                );
              })}
            </div>

            <div className="py-4">
              <div className="border-t" />
            </div>

            <div className="pb-3">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Utilities
              </div>
            </div>

            <div className="space-y-1">
              {SECONDARY_NAV.map((item) => {
                const active = isActivePath(pathname, item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                      active ? "bg-muted" : "hover:bg-muted"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-base font-medium">{item.label}</span>
                  </Link>
                );
              })}

              <Link
                href="/saved"
                onClick={closeMobileMenu}
                className="flex items-center justify-between px-4 py-3 text-base font-medium rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Bookmark className="h-5 w-5" />
                  <span>Library</span>
                </div>
                <SavedCountBadge />
              </Link>

              <Link
                href="/recent"
                onClick={closeMobileMenu}
                className="flex items-center justify-between px-4 py-3 text-base font-medium rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5" />
                  <span>Recent</span>
                </div>
                <RecentCountBadge />
              </Link>
            </div>
          </div>

          {/* Newsletter CTA - Bottom */}
          <div className="p-4 border-t bg-muted/30">
            <Link
              href="/#newsletter"
              onClick={closeMobileMenu}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              <span>Get the weekly drop</span>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
