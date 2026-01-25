import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} ToolDrop AI. Built with the ancient art of
          “filtering the noise.”
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Link className="text-muted-foreground hover:text-foreground" href="/privacy">
            Privacy
          </Link>
          <Link className="text-muted-foreground hover:text-foreground" href="/terms">
            Terms
          </Link>
          <Link className="text-muted-foreground hover:text-foreground" href="/contact">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}