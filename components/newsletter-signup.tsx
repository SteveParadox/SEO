import Link from "next/link";

// No server-backed newsletter provider is configured. Do not collect email
// addresses or tell visitors they subscribed when nothing would be delivered.
export function NewsletterSignup() {
  return (
    <div className="relative p-8 text-center sm:p-12">
      <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.25em] text-background/50">
        AI updates
      </span>
      <h2 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
        Keep up with verified AI releases
      </h2>
      <p className="mb-6 text-sm text-background/60 sm:mb-8 sm:text-base">
        Browse new model and tool updates, with links to the original announcements. Email delivery is not available yet.
      </p>
      <Link
        href="/updates"
        className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-background px-6 font-medium text-foreground transition hover:bg-background/90"
      >
        Browse model updates
      </Link>
    </div>
  );
}
