// components/site-header.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Sparkles, Menu, X, Search, Flame, Bookmark, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SavedCountBadge } from "@/components/saved-count-badge";
import { RecentCountBadge } from "@/components/recent-count-badge";

interface NavItem {
  href: string;
  label: string;
  showOnMobile?: boolean;
}

const PRIMARY_NAV: NavItem[] = [
  { href: "/tools", label: "Tools", showOnMobile: true },
  { href: "/prompts", label: "Prompts", showOnMobile: true },
  { href: "/updates", label: "Updates", showOnMobile: true },
  { href: "/collections", label: "Collections", showOnMobile: false },
  { href: "/comparisons", label: "Comparisons", showOnMobile: false },
  { href: "/tags", label: "Tags", showOnMobile: false },
  { href: "/best", label: "Best", showOnMobile: true },
];

export function SiteHeader() {
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
          <div className="flex h-16 items-center justify-between gap-4">
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

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 flex-1 justify-center max-w-2xl">
              {PRIMARY_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

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
                <Link href="/trending" className="gap-2">
                  <Flame className="h-4 w-4" />
                  <span className="hidden lg:inline">Trending</span>
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="rounded-lg relative"
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
            {/* Primary Navigation */}
            <div className="space-y-1">
              {PRIMARY_NAV.filter((item) => item.showOnMobile !== false).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="flex items-center px-4 py-3 text-base font-medium rounded-lg hover:bg-muted transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="py-2">
              <div className="border-t" />
            </div>

            {/* Secondary Navigation */}
            <div className="space-y-1">
              <Link
                href="/trending"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg hover:bg-muted transition-colors"
              >
                <Flame className="h-5 w-5 text-orange-500" />
                <span>Trending</span>
              </Link>

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

              {/* Additional Mobile Items */}
              {PRIMARY_NAV.filter((item) => item.showOnMobile === false).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="flex items-center px-4 py-3 text-base rounded-lg hover:bg-muted transition-colors text-muted-foreground"
                >
                  {item.label}
                </Link>
              ))}
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
