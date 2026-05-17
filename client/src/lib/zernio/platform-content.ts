import type { Platform } from "./zernio-account.types";

export type PlatformContent = { category: string; description: string };

export const PLATFORM_CONTENT: Record<Platform, PlatformContent> = {
  linkedin: { category: "Professional network", description: "Share posts to your professional network." },
  facebook: { category: "Social network", description: "Reach friends, family, and followers on Facebook." },
  instagram: { category: "Photo & video", description: "Publish photos, reels, and stories to Instagram." },
  twitter: { category: "Microblog", description: "Send short updates and replies on X." },
  threads: { category: "Microblog", description: "Post text-first updates on Threads." },
  tiktok: { category: "Short video", description: "Schedule short-form videos to TikTok." },
  pinterest: { category: "Visual discovery", description: "Pin images and ideas to your boards." },
  bluesky: { category: "Microblog", description: "Post to the decentralized Bluesky network." },
  reddit: { category: "Community", description: "Cross-post to your favorite subreddits." },
};
