// In-memory per-user video generation budget. Resets every 24h.
// Video is far pricier than images, so the cap is much tighter.
// Single-instance only — replace with Redis when scaling out.

const MAX_PER_DAY = Number(process.env.VIDEO_MAX_PER_DAY ?? 3);
const WINDOW_MS = 24 * 60 * 60 * 1000;

type Entry = { count: number; resetAt: number };
const buckets = new Map<string, Entry>();

function bucket(userId: string): Entry {
  const existing = buckets.get(userId);
  if (existing && existing.resetAt > Date.now()) return existing;
  const fresh: Entry = { count: 0, resetAt: Date.now() + WINDOW_MS };
  buckets.set(userId, fresh);
  return fresh;
}

export type VideoRateCheck = { allowed: boolean; remaining: number; resetAt: Date };

export function checkVideoRateLimit(userId: string): VideoRateCheck {
  const b = bucket(userId);
  return {
    allowed: b.count < MAX_PER_DAY,
    remaining: Math.max(0, MAX_PER_DAY - b.count),
    resetAt: new Date(b.resetAt),
  };
}

export function incrementVideoCount(userId: string): void {
  bucket(userId).count += 1;
}
