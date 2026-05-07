const cache = new Map<string, { url: string | null; at: number }>();
const TTL = 6 * 60 * 60 * 1000;

export async function fetchPinterestAvatar(
  username: string,
): Promise<string | null> {
  const handle = username.replace(/^@/, "").trim();
  if (!handle) return null;
  const hit = cache.get(handle);
  if (hit && Date.now() - hit.at < TTL) return hit.url;

  try {
    const res = await fetch(`https://www.pinterest.com/${handle}/`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; linka-avatar/1.0)",
        Accept: "text/html",
      },
    });
    if (!res.ok) {
      cache.set(handle, { url: null, at: Date.now() });
      return null;
    }
    const html = await res.text();
    const m =
      html.match(/"image_xlarge_url":"(https:\/\/i\.pinimg\.com\/[^"]+)"/) ??
      html.match(/"image_large_url":"(https:\/\/i\.pinimg\.com\/[^"]+)"/) ??
      html.match(/"image_medium_url":"(https:\/\/i\.pinimg\.com\/[^"]+)"/);
    const url = m?.[1]?.replace(/\\\//g, "/") ?? null;
    cache.set(handle, { url, at: Date.now() });
    return url;
  } catch {
    return null;
  }
}
