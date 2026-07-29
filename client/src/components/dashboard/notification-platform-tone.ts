import type { Platform } from "@/lib/zernio/zernio-account.types";

export const PLATFORM_TONES: Record<Platform, string> = {
  linkedin: "bg-[#0A66C2]/10 text-[#0A66C2] dark:text-[#4A9AE3]",
  facebook: "bg-[#1877F2]/10 text-[#1877F2] dark:text-[#4A9AE3]",
  instagram: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  twitter: "bg-foreground/5 text-foreground",
  threads: "bg-foreground/5 text-foreground",
  tiktok: "bg-foreground/5 text-foreground",
  youtube: "bg-[#FF0000]/10 text-[#D90000] dark:text-[#FF4D4D]",
  pinterest: "bg-[#E60023]/10 text-[#E60023] dark:text-[#FF4458]",
  bluesky: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  reddit: "bg-[#FF4500]/10 text-[#FF4500] dark:text-[#FF6A33]",
};
