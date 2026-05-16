import { cookies } from "next/headers";

const API_BASE = process.env.API_URL ?? "http://localhost:4000";

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
  const cookie = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");
  try {
    const res = await fetch(`${API_BASE}/api/analytics/platform-metrics`, {
      headers: { cookie }, cache: "no-store",
    });
    if (!res.ok) return [];
    const json = await res.json() as { platforms?: PlatformMetricRow[] };
    return json.platforms ?? [];
  } catch {
    return [];
  }
}
