import { cookies } from "next/headers";

const API_BASE = process.env.API_URL ?? "http://localhost:4000";

export type DailyEngagementRow = {
  date: string;
  likes: number;
  comments: number;
  views: number;
  impressions: number;
  posts: number;
};

export async function getDailyEngagement(days = 30): Promise<DailyEngagementRow[]> {
  const cookieStore = await cookies();
  const cookie = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");
  try {
    const res = await fetch(
      `${API_BASE}/api/analytics/daily?days=${days}`,
      { headers: { cookie }, cache: "no-store" },
    );
    if (!res.ok) return [];
    const json = await res.json() as { series?: DailyEngagementRow[] };
    return json.series ?? [];
  } catch {
    return [];
  }
}
