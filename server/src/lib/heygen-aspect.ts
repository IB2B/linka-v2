// HeyGen aspect_ratio per platform. LinkedIn/X/Facebook take more feed height as
// a 4:5 portrait; the short-video surfaces need full-bleed 9:16.
export type Aspect = "16:9" | "9:16" | "4:5" | "1:1";

const BY_PLATFORM: Record<string, Aspect> = {
  linkedin: "4:5",
  twitter: "4:5",
  facebook: "4:5",
  instagram: "9:16",
  threads: "9:16",
  tiktok: "9:16",
};

export function aspectFor(platform: string): Aspect {
  return BY_PLATFORM[platform.toLowerCase()] ?? "4:5";
}
