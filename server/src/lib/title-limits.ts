// Each platform enforces its own ceiling and cannot be talked out of it: YouTube
// rejects past 100, Reddit past 300 and the title can never be edited after
// posting. Everywhere else the title is ours — it heads the post in the app — so
// it is kept short enough to read as a headline rather than a first sentence.
const LIMITS: Record<string, number> = {
  youtube: 100,
  reddit: 300,
  pinterest: 100,
};

const DEFAULT_LIMIT = 80;

export function titleLimitFor(platform: string): number {
  return LIMITS[platform] ?? DEFAULT_LIMIT;
}

// Platforms that will not publish without one, so a missing title is a failure
// rather than a cosmetic gap.
const REQUIRES_TITLE = new Set(["reddit", "youtube", "pinterest"]);

export function requiresTitle(platform: string): boolean {
  return REQUIRES_TITLE.has(platform);
}
