import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 md:flex-row md:items-center">
        <div className="text-sm text-muted-foreground">
          Copyright {new Date().getFullYear()} XavKit. All rights reserved.
        </div>

        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/ai-stack-builder"
            className="text-muted-foreground transition hover:text-foreground"
          >
            AI Stack Builder
          </Link>
          <Link
            href="/privacy"
            className="text-muted-foreground transition hover:text-foreground"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-muted-foreground transition hover:text-foreground"
          >
            Terms of Service
          </Link>
          <Link
            href="/contact"
            className="text-muted-foreground transition hover:text-foreground"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
