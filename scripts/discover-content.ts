/**
 * Discovery-only adapter for authorized, official GitHub Releases endpoints.
 * No AI drafting, automatic publication or copying of release-note bodies.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

type Candidate = {
  id: string;
  source: "github-release";
  repository: string;
  product: string;
  releaseTag: string;
  title: string;
  announcedAtISO: string;
  sourceUrl: string;
  status: "pending_review";
};

const providers = [
  { repository: "openai/openai-agents-python", product: "OpenAI Agents SDK" },
  { repository: "anthropics/claude-code", product: "Claude Code" },
  { repository: "google-gemini/gemini-cli", product: "Gemini CLI" },
] as const;
const output = "content-review/github-releases.json";
const cutoff = new Date();
cutoff.setUTCDate(cutoff.getUTCDate() - 90);

async function existingCandidates(): Promise<Candidate[]> {
  try {
    const content = await readFile(output, "utf8");
    const decoded: unknown = JSON.parse(content);
    if (!Array.isArray(decoded)) throw new Error("Existing review queue must be an array");
    // Keep only structurally valid candidates from the existing review queue.
    return decoded.filter((item): item is Candidate =>
      item !== null && typeof item === "object" &&
      typeof item.id === "string" && item.source === "github-release" &&
      item.status === "pending_review" && typeof item.sourceUrl === "string"
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

async function fetchReleases(repository: string): Promise<Candidate[]> {
  const url = `https://api.github.com/repos/${repository}/releases?per_page=60`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "xavkit-editorial-discovery",
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
    },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`GitHub Releases ${repository}: HTTP ${response.status}`);
  const records: unknown = await response.json();
  if (!Array.isArray(records)) throw new Error(`Invalid GitHub Releases response: ${repository}`);
  const candidates: Candidate[] = [];
  for (const row of records) {
    if (!row || typeof row !== "object" || row.draft || row.prerelease) continue;
    if (typeof row.tag_name !== "string" || typeof row.published_at !== "string" ||
        typeof row.html_url !== "string") continue;
    const eventDate = new Date(row.published_at);
    if (Number.isNaN(eventDate.getTime()) || eventDate < cutoff || eventDate > new Date()) continue;
    const releaseUrl = new URL(row.html_url);
    if (releaseUrl.origin !== "https://github.com" ||
        !releaseUrl.pathname.startsWith(`/${repository}/releases/tag/`)) continue;
    const provider = providers.find((candidate) => candidate.repository === repository);
    if (!provider) throw new Error(`Unknown provider: ${repository}`);
    candidates.push({
      id: `${repository}@${row.tag_name}`,
      source: "github-release",
      repository,
      product: provider.product,
      releaseTag: row.tag_name,
      title: typeof row.name === "string" && row.name.trim() ? row.name.trim() : row.tag_name,
      announcedAtISO: eventDate.toISOString().slice(0, 10),
      sourceUrl: releaseUrl.toString(),
      status: "pending_review",
    });
  }
  return candidates;
}

async function main() {
  const existing = await existingCandidates();
  const unique = new Map(existing.map((entry) => [entry.id, entry]));
  let successfulSources = 0;
  const errors: string[] = [];
  for (const provider of providers) {
    try {
      for (const candidate of await fetchReleases(provider.repository)) {
        if (!unique.has(candidate.id)) unique.set(candidate.id, candidate);
      }
      successfulSources += 1;
    } catch (error) {
      errors.push(`${provider.repository}: ${String(error)}`);
    }
  }
  if (!successfulSources) throw new Error("Every discovery source failed: " + errors.join(" | "));
  if (errors.length) console.warn("Partial discovery failure:", errors.join(" | "));
  const records = [...unique.values()]
    .sort((a, b) => b.announcedAtISO.localeCompare(a.announcedAtISO) || a.id.localeCompare(b.id))
    .slice(0, 150);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, JSON.stringify(records, null, 2) + "\n", "utf8");
  console.log(`Collected ${records.length} distinct release candidates from ${successfulSources} provider sources.`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
