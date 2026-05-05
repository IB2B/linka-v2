import type { PostAnalyticsResult } from "../types/analytics";

const TTL_MS = 60_000;
const cache = new Map<string, { result: PostAnalyticsResult; expires: number }>();

export function getCached(key: string): PostAnalyticsResult | null {
  const hit = cache.get(key);
  if (!hit) return null;
  if (hit.expires < Date.now()) {
    cache.delete(key);
    return null;
  }
  return hit.result;
}

export function setCached(key: string, result: PostAnalyticsResult): void {
  cache.set(key, { result, expires: Date.now() + TTL_MS });
}
