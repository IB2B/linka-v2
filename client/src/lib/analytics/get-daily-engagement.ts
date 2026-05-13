import { cookies, headers } from "next/headers";

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
  const hdrs = await headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const cookie = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");
  try {
    const res = await fetch(
      `${proto}://${host}/api/analytics/daily?days=${days}`,
      { headers: { cookie }, cache: "no-store" },
    );
    if (!res.ok) return [];
    const json = await res.json() as { series?: DailyEngagementRow[] };
    return json.series ?? [];
  } catch {
    return [];
  }
}
