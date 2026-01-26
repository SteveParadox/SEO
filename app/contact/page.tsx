import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — ToolDrop AI",
  description: "Get in touch with ToolDrop AI for questions, feedback, or corrections.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Contact</h1>
      <p className="mt-3 text-muted-foreground">
        Questions, corrections, or something genuinely useful to say.
      </p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed">
        <p>
          ToolDrop AI is a curated directory, not a support desk for every AI tool
          on the internet. If something looks wrong or outdated, that’s fair.
          If you want us to fix your code, less fair.
        </p>

        <section>
          <h2 className="font-medium">What you can contact us about</h2>
          <ul className="mt-2 list-disc pl-5 text-muted-foreground">
            <li>Incorrect or outdated tool information</li>
            <li>Broken links or page issues</li>
            <li>General feedback about the site</li>
            <li>Legitimate partnership or listing requests</li>
          </ul>
        </section>

        <section>
          <h2 className="font-medium">What we don’t handle</h2>
          <ul className="mt-2 list-disc pl-5 text-muted-foreground">
            <li>Customer support for third-party tools</li>
            <li>Refunds, pricing disputes, or account issues</li>
            <li>“Which AI should I use for everything?” questions</li>
          </ul>
        </section>

        <section>
          <h2 className="font-medium">How to reach us</h2>
          <p className="mt-2 text-muted-foreground">
            Send an email to:
          </p>
          <p className="mt-1 font-medium">
            contact@tooldrop.ai
          </p>
          <p className="mt-2 text-muted-foreground">
            We read messages. We reply when it makes sense.
          </p>
        </section>
      </div>
    </div>
  );
      }
