const cache = new Map<string, { url: string | null; at: number }>();
const SUCCESS_TTL = 6 * 60 * 60 * 1000;
const FAILURE_TTL = 5 * 60 * 1000;
const UA = "web:linka:v1.0 (avatar fetch)";

export async function fetchRedditAvatar(username: string): Promise<string | null> {
  const handle = username.replace(/^@/, "").trim();
  if (!handle) return null;
  const hit = cache.get(handle);
  if (hit) {
    const ttl = hit.url ? SUCCESS_TTL : FAILURE_TTL;
    if (Date.now() - hit.at < ttl) return hit.url;
  }

  try {
    const res = await fetch(`https://www.reddit.com/user/${handle}/about.json`, {
      headers: { "User-Agent": UA, Accept: "application/json" },
    });
    if (!res.ok) {
      cache.set(handle, { url: null, at: Date.now() });
      return null;
    }
    const json = await res.json() as {
      data?: { icon_img?: string; snoovatar_img?: string };
    };
    const raw = json.data?.snoovatar_img || json.data?.icon_img || "";
    const url = raw ? raw.split("?")[0] : null;
    cache.set(handle, { url, at: Date.now() });
    return url;
  } catch {
    cache.set(handle, { url: null, at: Date.now() });
    return null;
  }
}
