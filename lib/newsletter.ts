export type NewsletterTopic = "tools" | "prompts" | "updates" | "comparisons";

export type NewsletterSubscription = {
  email: string;
  topics: NewsletterTopic[];
  subscribedAtISO: string;
  updatedAtISO: string;
};

export type NewsletterSaveResult =
  | { status: "created"; subscription: NewsletterSubscription }
  | { status: "updated"; subscription: NewsletterSubscription }
  | { status: "duplicate"; subscription: NewsletterSubscription };

export const NEWSLETTER_STORAGE_KEY = "xavkit_newsletter_v1";
export const NEWSLETTER_EVENT = "xavkit:newsletter-changed";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeNewsletterEmail(input: string) {
  return input.trim().toLowerCase();
}

export function isValidNewsletterEmail(input: string) {
  return EMAIL_PATTERN.test(normalizeNewsletterEmail(input));
}

function normalizeTopics(topics: NewsletterTopic[]) {
  return Array.from(new Set(topics)).sort() as NewsletterTopic[];
}

export function readNewsletterSubscription(): NewsletterSubscription | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(NEWSLETTER_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.email !== "string" || !Array.isArray(parsed.topics)) {
      return null;
    }

    return {
      email: normalizeNewsletterEmail(parsed.email),
      topics: normalizeTopics(parsed.topics as NewsletterTopic[]),
      subscribedAtISO: String(parsed.subscribedAtISO ?? new Date().toISOString()),
      updatedAtISO: String(parsed.updatedAtISO ?? parsed.subscribedAtISO ?? new Date().toISOString()),
    };
  } catch {
    return null;
  }
}

export function saveNewsletterSubscription(input: {
  email: string;
  topics: NewsletterTopic[];
}) {
  if (typeof window === "undefined") {
    throw new Error("Newsletter storage is only available in the browser.");
  }

  const email = normalizeNewsletterEmail(input.email);
  const topics = normalizeTopics(input.topics);
  const existing = readNewsletterSubscription();
  const now = new Date().toISOString();

  const next: NewsletterSubscription = {
    email,
    topics,
    subscribedAtISO: existing?.subscribedAtISO ?? now,
    updatedAtISO: now,
  };

  const existingTopics = existing?.topics.join(",") ?? "";
  const nextTopics = next.topics.join(",");

  const status: NewsletterSaveResult["status"] =
    !existing
      ? "created"
      : existing.email === email && existingTopics === nextTopics
      ? "duplicate"
      : "updated";

  window.localStorage.setItem(NEWSLETTER_STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(NEWSLETTER_EVENT));

  return {
    status,
    subscription: next,
  } as NewsletterSaveResult;
}
