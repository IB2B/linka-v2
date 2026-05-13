import { cookies, headers } from "next/headers";

export type PlatformMetricRow = {
  platform: string;
  postCount: number;
  avgLikes: number;
  avgComments: number;
  avgShares: number;
  avgViews: number;
  avgImpressions: number;
  avgEngagementRate: number;
};

export async function getPlatformMetrics(): Promise<PlatformMetricRow[]> {
  const cookieStore = await cookies();
  const hdrs = await headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const cookie = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");
  try {
    const res = await fetch(`${proto}://${host}/api/analytics/platform-metrics`, {
      headers: { cookie }, cache: "no-store",
    });
    if (!res.ok) return [];
    const json = await res.json() as { platforms?: PlatformMetricRow[] };
    return json.platforms ?? [];
  } catch {
    return [];
  }
}
