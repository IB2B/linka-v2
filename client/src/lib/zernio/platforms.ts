import type { Platform } from "./zernio-account.types";

export type InboxCapability = "dms" | "comments-only" | "none";

export type PlatformMeta = {
  slug: Platform;
  label: string;
  color: string;
  gradient?: string;
  inboxCapability: InboxCapability;
  inboxHint?: string;
};

export const PLATFORMS: PlatformMeta[] = [
  { slug: "linkedin", label: "LinkedIn", color: "#0A66C2",
    inboxCapability: "dms", inboxHint: "Sign in with LinkedIn" },
  { slug: "facebook", label: "Facebook", color: "#1877F2", inboxCapability: "dms" },
  { slug: "instagram", label: "Instagram", color: "#E1306C",
    gradient: "linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)",
    inboxCapability: "dms" },
  { slug: "twitter", label: "X", color: "#000000", inboxCapability: "dms" },
  { slug: "threads", label: "Threads", color: "#000000", inboxCapability: "comments-only" },
  { slug: "tiktok", label: "TikTok", color: "#000000", inboxCapability: "none" },
  { slug: "youtube", label: "YouTube", color: "#FF0000", inboxCapability: "comments-only" },
  { slug: "pinterest", label: "Pinterest", color: "#E60023", inboxCapability: "none" },
  { slug: "bluesky", label: "Bluesky", color: "#1185FE", inboxCapability: "dms" },
  { slug: "reddit", label: "Reddit", color: "#FF4500", inboxCapability: "dms" },
];

export function platformsWithDMs(): Platform[] {
  return PLATFORMS.filter((p) => p.inboxCapability === "dms").map((p) => p.slug);
}
