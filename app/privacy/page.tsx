import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — ToolDrop AI",
  description: "How ToolDrop AI collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Privacy Policy</h1>
      <p className="mt-4 text-muted-foreground">
        Last updated: January 2026
      </p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed">
        <p>
          ToolDrop AI respects your privacy. This page explains what information
          we collect, how it is used, and what control you have over it.
        </p>

        <section>
          <h2 className="font-medium">Information we collect</h2>
          <p className="mt-2 text-muted-foreground">
            We collect minimal data required to operate the site effectively.
            This may include:
          </p>
          <ul className="mt-2 list-disc pl-5 text-muted-foreground">
            <li>Basic analytics data (pages visited, device type)</li>
            <li>Saved items or preferences (stored locally or anonymously)</li>
            <li>Contact information if you explicitly choose to provide it</li>
          </ul>
        </section>

        <section>
          <h2 className="font-medium">How we use information</h2>
          <ul className="mt-2 list-disc pl-5 text-muted-foreground">
            <li>To improve site performance and content relevance</li>
            <li>To understand which tools and pages are useful</li>
            <li>To respond to messages you send us</li>
          </ul>
        </section>

        <section>
          <h2 className="font-medium">Cookies and tracking</h2>
          <p className="mt-2 text-muted-foreground">
            We may use lightweight analytics tools. We do not sell personal data
            or run invasive third-party trackers.
          </p>
        </section>

        <section>
          <h2 className="font-medium">Third-party services</h2>
          <p className="mt-2 text-muted-foreground">
            ToolDrop AI may link to external tools and services. We are not
            responsible for their privacy practices.
          </p>
        </section>

        <section>
          <h2 className="font-medium">Your choices</h2>
          <p className="mt-2 text-muted-foreground">
            You can use this site without creating an account. You may block
            cookies via your browser settings at any time.
          </p>
        </section>

        <section>
          <h2 className="font-medium">Contact</h2>
          <p className="mt-2 text-muted-foreground">
            For privacy-related questions, contact us via the site contact page.
          </p>
        </section>
      </div>
    </div>
  );
          }
