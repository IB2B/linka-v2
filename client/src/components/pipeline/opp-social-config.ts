import type { Platform } from "@/lib/zernio/zernio-account.types";
import type { SocialKey } from "@/types/pipeline";

export type SocialConfig = {
  key: SocialKey;
  label: string;
  iconPlatform: Platform;
  color: string;
  placeholder: string;
};

export const SOCIAL_PROFILES: SocialConfig[] = [
  { key: "socialUrl",    label: "LinkedIn",  iconPlatform: "linkedin",  color: "#0A66C2", placeholder: "https://linkedin.com/in/…" },
  { key: "facebookUrl",  label: "Facebook",  iconPlatform: "facebook",  color: "#1877F2", placeholder: "https://facebook.com/…" },
  { key: "instagramUrl", label: "Instagram", iconPlatform: "instagram", color: "#E4405F", placeholder: "https://instagram.com/…" },
  { key: "xUrl",         label: "X",         iconPlatform: "twitter",   color: "#000000", placeholder: "https://x.com/…" },
  { key: "tiktokUrl",    label: "TikTok",    iconPlatform: "tiktok",    color: "#010101", placeholder: "https://tiktok.com/@…" },
  { key: "threadsUrl",   label: "Threads",   iconPlatform: "threads",   color: "#000000", placeholder: "https://threads.net/@…" },
];
