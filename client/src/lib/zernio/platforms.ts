import type { Platform } from "./zernio-account.types";

export type PlatformMeta = {
  slug: Platform;
  label: string;
  color: string;
};

export const PLATFORMS: PlatformMeta[] = [
  { slug: "linkedin", label: "LinkedIn", color: "#0A66C2" },
  { slug: "facebook", label: "Facebook", color: "#1877F2" },
  { slug: "instagram", label: "Instagram", color: "#E1306C" },
  { slug: "twitter", label: "X", color: "#000000" },
  { slug: "threads", label: "Threads", color: "#000000" },
  { slug: "tiktok", label: "TikTok", color: "#010101" },
  { slug: "pinterest", label: "Pinterest", color: "#E60023" },
  { slug: "bluesky", label: "Bluesky", color: "#1185FE" },
  { slug: "reddit", label: "Reddit", color: "#FF4500" },
];
