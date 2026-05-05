import { cookies, headers } from "next/headers";
import type { PostAnalyticsResult } from "@/types/analytics";

export async function getPostAnalytics(
  id: string,
): Promise<PostAnalyticsResult | null> {
  const cookieStore = await cookies();
  const hdrs = await headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const cookie = cookieStore.getAll()
    .map((c) => `${c.name}=${c.value}`).join("; ");
  try {
    const res = await fetch(
      `${proto}://${host}/api/analytics/posts/${id}`,
      { headers: { cookie }, cache: "no-store" },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as { analytics?: PostAnalyticsResult };
    return json.analytics ?? null;
  } catch {
    return null;
  }
}
