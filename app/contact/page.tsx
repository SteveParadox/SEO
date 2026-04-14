import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | XavKit",
  description: "Get in touch with XavKit for questions, feedback, or corrections.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Contact</h1>
      <p className="mt-3 text-muted-foreground">
        Questions, corrections, or partnership inquiries.
      </p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed">
        <p>
          XavKit is a curated directory of AI tools, prompts, and related
          resources. If you spot outdated information, broken links, or content
          that needs a correction, we would like to hear about it.
        </p>

        <section>
          <h2 className="font-medium">What you can contact us about</h2>
          <ul className="mt-2 list-disc pl-5 text-muted-foreground">
            <li>Incorrect or outdated tool information</li>
            <li>Broken links or page issues</li>
            <li>General feedback about the site</li>
            <li>Partnership or listing requests</li>
          </ul>
        </section>

        <section>
          <h2 className="font-medium">What we do not handle</h2>
          <ul className="mt-2 list-disc pl-5 text-muted-foreground">
            <li>Customer support for third-party tools</li>
            <li>Refunds, pricing disputes, or account issues</li>
            <li>General consulting requests without project details</li>
          </ul>
        </section>

        <section>
          <h2 className="font-medium">How to reach us</h2>
          <p className="mt-2 text-muted-foreground">Send an email to:</p>
          <p className="mt-1 font-medium">contact@xavkit.com</p>
          <p className="mt-2 text-muted-foreground">
            We review every message and reply when a response is needed.
          </p>
        </section>
      </div>
    </div>
  );
}
