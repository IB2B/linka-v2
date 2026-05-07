type Bucket = number[];

const STORE = new Map<string, Bucket>();

export type RateLimitResult = {
  allowed: boolean;
  retryAfterMs: number;
};

export function rateLimit(
  key: string, max: number, windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const bucket = (STORE.get(key) ?? []).filter((t) => now - t < windowMs);
  if (bucket.length >= max) {
    const oldest = bucket[0] ?? now;
    return { allowed: false, retryAfterMs: windowMs - (now - oldest) };
  }
  bucket.push(now);
  STORE.set(key, bucket);
  return { allowed: true, retryAfterMs: 0 };
}
