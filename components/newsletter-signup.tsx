"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NEWSLETTER_EVENT,
  type NewsletterTopic,
  isValidNewsletterEmail,
  readNewsletterSubscription,
  saveNewsletterSubscription,
} from "@/lib/newsletter";

const TOPICS: Array<{ id: NewsletterTopic; label: string }> = [
  { id: "tools", label: "Tools" },
  { id: "prompts", label: "Prompts" },
  { id: "updates", label: "Updates" },
  { id: "comparisons", label: "Comparisons" },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function NewsletterSignup() {
  const [email, setEmail] = React.useState("");
  const [topics, setTopics] = React.useState<NewsletterTopic[]>(["tools", "updates"]);
  const [message, setMessage] = React.useState<string | null>(null);
  const [existing, setExisting] = React.useState(() => readNewsletterSubscription());

  React.useEffect(() => {
    const refresh = () => setExisting(readNewsletterSubscription());
    window.addEventListener(NEWSLETTER_EVENT, refresh as EventListener);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener(NEWSLETTER_EVENT, refresh as EventListener);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  React.useEffect(() => {
    if (existing) {
      setEmail(existing.email);
      setTopics(existing.topics);
    }
  }, [existing]);

  const toggleTopic = (topic: NewsletterTopic) => {
    setTopics((current) =>
      current.includes(topic)
        ? current.filter((value) => value !== topic)
        : [...current, topic]
    );
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValidNewsletterEmail(email)) {
      setMessage("Enter a valid email address.");
      return;
    }

    if (topics.length === 0) {
      setMessage("Pick at least one topic.");
      return;
    }

    const result = saveNewsletterSubscription({ email, topics });
    setExisting(result.subscription);

    if (result.status === "created") {
      setMessage("Subscription saved on this device.");
      return;
    }

    if (result.status === "updated") {
      setMessage("Preferences updated on this device.");
      return;
    }

    setMessage("This device is already subscribed with those settings.");
  };

  return (
    <div className="relative p-8 text-center sm:p-12">
      <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.25em] text-background/50">
        Weekly digest
      </span>
      <h2 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
        Subscribe to weekly updates
      </h2>
      <p className="mb-6 text-sm text-background/60 sm:mb-8 sm:text-base">
        Save your email and topics locally so the digest preferences on this device stay consistent.
      </p>

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-12 flex-1 rounded-2xl border-background/20 bg-background/10 text-background placeholder:text-background/40 focus:border-background/60"
            autoComplete="email"
            inputMode="email"
            aria-label="Email address"
            required
          />
          <Button
            type="submit"
            className="h-12 rounded-2xl bg-background px-6 font-medium text-foreground hover:bg-background/90 sm:px-8"
          >
            {existing ? "Update preferences" : "Subscribe"}
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {TOPICS.map((topic) => {
            const active = topics.includes(topic.id);

            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => toggleTopic(topic.id)}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${
                  active
                    ? "border-background bg-background text-foreground"
                    : "border-background/20 text-background/75 hover:border-background/40 hover:text-background"
                }`}
                aria-pressed={active}
              >
                {topic.label}
              </button>
            );
          })}
        </div>
      </form>

      {existing ? (
        <p className="mt-4 text-xs text-background/55">
          Saved locally for {existing.email} since {formatDate(existing.subscribedAtISO)}.
        </p>
      ) : null}

      {message ? (
        <div
          role="status"
          aria-live="polite"
          className="mt-4 rounded-xl border border-background/20 bg-background/10 p-3 text-sm text-background/80"
        >
          {message}
        </div>
      ) : null}
    </div>
  );
}
