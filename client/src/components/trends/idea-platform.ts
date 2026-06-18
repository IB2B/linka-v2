export const ALLOWED = ["linkedin", "twitter", "threads", "instagram", "facebook"] as const;
export type Platform = (typeof ALLOWED)[number];

// Trend ideas store a free-form platform string; map it to a supported one.
export function normalizePlatform(v: string | null): Platform {
  if (!v) return "linkedin";
  const lower = v.toLowerCase();
  if (lower === "x") return "twitter";
  return (ALLOWED as readonly string[]).includes(lower)
    ? (lower as Platform)
    : "linkedin";
}
