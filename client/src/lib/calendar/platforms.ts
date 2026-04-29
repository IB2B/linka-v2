export const PLATFORMS = [
  "instagram",
  "facebook",
  "linkedin",
  "tiktok",
  "twitter",
  "threads",
] as const;

export type Platform = (typeof PLATFORMS)[number];
