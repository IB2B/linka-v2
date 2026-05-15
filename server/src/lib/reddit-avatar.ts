const cache = new Map<string, { url: string | null; at: number }>();
const TTL = 6 * 60 * 60 * 1000;

export async function fetchRedditAvatar(username: string): Promise<string | null> {
  const handle = username.replace(/^@/, "").trim();
  if (!handle) return null;
  const hit = cache.get(handle);
  if (hit && Date.now() - hit.at < TTL) return hit.url;

  try {
    const res = await fetch(`https://www.reddit.com/user/${handle}/about.json`, {
      headers: { "User-Agent": "linka-avatar/1.0" },
    });
    if (!res.ok) { cache.set(handle, { url: null, at: Date.now() }); return null; }
    const json = await res.json() as { data?: { icon_img?: string } };
    const raw = json.data?.icon_img ?? null;
    const url = raw ? raw.split("?")[0] : null;
    cache.set(handle, { url, at: Date.now() });
    return url;
  } catch {
    return null;
  }
}
