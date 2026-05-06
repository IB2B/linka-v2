import { cookies, headers } from "next/headers";

export async function getPublishedPlatforms(
  postIds: string[],
): Promise<Map<string, string[]>> {
  const map = new Map<string, string[]>();
  if (postIds.length === 0) return map;
  const cookieStore = await cookies();
  const hdrs = await headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const cookie = cookieStore.getAll()
    .map((c) => `${c.name}=${c.value}`).join("; ");
  try {
    const url = `${proto}://${host}/api/posts/published-platforms`
      + `?ids=${encodeURIComponent(postIds.join(","))}`;
    const res = await fetch(url, { headers: { cookie }, cache: "no-store" });
    if (!res.ok) return map;
    const json = (await res.json()) as { map?: Record<string, string[]> };
    for (const [k, v] of Object.entries(json.map ?? {})) map.set(k, v);
    return map;
  } catch {
    return map;
  }
}
