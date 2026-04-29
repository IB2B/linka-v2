// In-memory per-user image generation budget. Resets every 24h.
// Single-instance only — replace with Redis when scaling out.

const MAX_PER_DAY = 20;
const WINDOW_MS = 24 * 60 * 60 * 1000;

type Entry = { count: number; resetAt: number };
const buckets = new Map<string, Entry>();

function now(): number { return Date.now(); }

function bucket(userId: string): Entry {
  const existing = buckets.get(userId);
  if (existing && existing.resetAt > now()) return existing;
  const fresh: Entry = { count: 0, resetAt: now() + WINDOW_MS };
  buckets.set(userId, fresh);
  return fresh;
}

export type ImageRateCheck = {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
};

export function checkImageRateLimit(userId: string): ImageRateCheck {
  const b = bucket(userId);
  return {
    allowed: b.count < MAX_PER_DAY,
    remaining: Math.max(0, MAX_PER_DAY - b.count),
    resetAt: new Date(b.resetAt),
  };
}

export function incrementImageCount(userId: string): void {
  bucket(userId).count += 1;
}
