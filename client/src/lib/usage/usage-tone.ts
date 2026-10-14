import type { UsageSummary } from "@/types/usage";

export type UsageTone = "ok" | "warning" | "danger";

export function usagePct(used: number, limit: number): number {
  return limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 0;
}

// Amber from 80% so users get time to act; red once a quota is spent.
export function usageTone(pct: number): UsageTone {
  return pct >= 100 ? "danger" : pct >= 80 ? "warning" : "ok";
}

// The fullest quota decides the header ring, so any limit running low shows.
export function peakUsagePct({ posts, images, videos }: UsageSummary): number {
  const all = [usagePct(posts.used, posts.limit), usagePct(images.used, images.limit)];
  if (videos.allowed) all.push(usagePct(videos.used, videos.limit));
  return Math.max(...all);
}

export const TONE_TEXT: Record<UsageTone, string> = {
  ok: "text-primary",
  warning: "text-yellow-500",
  danger: "text-destructive",
};

export const TONE_BG: Record<UsageTone, string> = {
  ok: "bg-primary",
  warning: "bg-yellow-500",
  danger: "bg-destructive",
};
