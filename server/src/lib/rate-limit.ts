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
  const raw = STORE.get(key) ?? [];
  const bucket = raw.filter((t) => now - t < windowMs);
  if (bucket.length === 0 && raw.length > 0) STORE.delete(key);
  else if (bucket.length !== raw.length) STORE.set(key, bucket);
  if (bucket.length >= max) {
    const oldest = bucket[0] ?? now;
    return { allowed: false, retryAfterMs: windowMs - (now - oldest) };
  }
  bucket.push(now);
  STORE.set(key, bucket);
  return { allowed: true, retryAfterMs: 0 };
}
