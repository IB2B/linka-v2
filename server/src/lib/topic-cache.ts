type Entry = { topics: string[]; timestamp: number };

const cache = new Map<string, Entry>();
const TTL_MS = 5 * 60 * 1000;

export function getCached(key: string): string[] | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry.topics;
}

export function setCached(key: string, topics: string[]): void {
  cache.set(key, { topics, timestamp: Date.now() });
}
