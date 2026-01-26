import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} ToolDrop AI. All rights reserved.
        </div>

        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/privacy"
            className="text-muted-foreground hover:text-foreground transition"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-muted-foreground hover:text-foreground transition"
          >
            Terms of Service
          </Link>
          <Link
            href="/contact"
            className="text-muted-foreground hover:text-foreground transition"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}