import { cookies, headers } from "next/headers";
import type { PostMetrics } from "@/types/analytics";

export type AnalyticsSummaryItem = {
  postId: string;
  totals: PostMetrics | null;
};

export async function getAnalyticsSummary(): Promise<
  Map<string, PostMetrics>
> {
  const cookieStore = await cookies();
  const hdrs = await headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const cookie = cookieStore.getAll()
    .map((c) => `${c.name}=${c.value}`).join("; ");
  const map = new Map<string, PostMetrics>();
  try {
    const res = await fetch(`${proto}://${host}/api/analytics/summary`, {
      headers: { cookie }, cache: "no-store",
    });
    if (!res.ok) return map;
    const json = (await res.json()) as { items?: AnalyticsSummaryItem[] };
    for (const it of json.items ?? []) {
      if (it.totals) map.set(it.postId, it.totals);
    }
    return map;
  } catch {
    return map;
  }
}
