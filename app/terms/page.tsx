import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms & Conditions — ToolDrop AI",
  description: "Rules, responsibilities, and limitations for using ToolDrop AI.",
  alternates: { canonical: absoluteUrl("/terms") },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Terms & Conditions</h1>
      <p className="mt-4 text-muted-foreground">Last updated: January 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed">
        <p>
          By using ToolDrop AI, you agree to the following terms. If you do not agree,
          please stop using the site. Simple.
        </p>

        <section>
          <h2 className="font-medium">Purpose of the site</h2>
          <p className="mt-2 text-muted-foreground">
            ToolDrop AI provides curated information about AI tools, prompts, updates,
            and comparisons for educational and informational purposes only.
          </p>
        </section>

        <section>
          <h2 className="font-medium">No guarantees</h2>
          <p className="mt-2 text-muted-foreground">
            We do not guarantee accuracy, completeness, or outcomes. AI tools change fast.
            You are responsible for verifying anything important.
          </p>
        </section>

        <section>
          <h2 className="font-medium">External links</h2>
          <p className="mt-2 text-muted-foreground">
            ToolDrop AI links to third-party tools and services. We do not control them and
            are not responsible for their behavior, pricing, or policies.
          </p>
        </section>

        <section>
          <h2 className="font-medium">Acceptable use</h2>
          <ul className="mt-2 list-disc pl-5 text-muted-foreground">
            <li>Do not misuse the site or attempt to disrupt it</li>
            <li>Do not scrape or republish content without permission</li>
            <li>Do not rely on this site as legal, financial, or medical advice</li>
          </ul>
        </section>

        <section>
          <h2 className="font-medium">Changes to terms</h2>
          <p className="mt-2 text-muted-foreground">
            These terms may change over time. Continued use of the site means you accept the
            latest version.
          </p>
        </section>

        <section>
          <h2 className="font-medium">Contact</h2>
          <p className="mt-2 text-muted-foreground">
            Questions about these terms can be sent via the contact page.
          </p>
        </section>
      </div>
    </div>
  );
}
