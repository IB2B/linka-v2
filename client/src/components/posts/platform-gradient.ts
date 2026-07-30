import type { Platform } from "@/lib/zernio/zernio-account.types";

const GRADIENTS: Record<Platform, string> = {
  linkedin: "from-sky-500/25 via-blue-600/15 to-slate-700/30",
  facebook: "from-blue-500/25 via-indigo-500/15 to-blue-700/30",
  instagram: "from-fuchsia-500/30 via-orange-400/20 to-amber-400/25",
  twitter: "from-zinc-700/35 via-slate-800/25 to-zinc-900/40",
  threads: "from-zinc-800/35 via-zinc-900/30 to-black/40",
  tiktok: "from-rose-500/25 via-zinc-900/30 to-cyan-500/25",
  youtube: "from-red-500/30 via-red-600/25 to-zinc-900/35",
  pinterest: "from-rose-500/30 via-red-600/25 to-red-700/30",
  bluesky: "from-sky-400/30 via-sky-500/20 to-blue-600/30",
  reddit: "from-orange-500/30 via-red-500/25 to-orange-600/30",
};

const FALLBACK = "from-muted via-muted to-muted-foreground/10";

export function getPlatformGradient(platform: Platform | null): string {
  if (!platform) return FALLBACK;
  return GRADIENTS[platform];
}
