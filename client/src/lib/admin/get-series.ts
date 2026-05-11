import { adminApi } from "@/lib/admin/api";

export type SeriesPoint = { date: string; signups: number; posts: number };

export async function getAdminSeries(): Promise<SeriesPoint[]> {
  const res = await adminApi("/api/admin/stats/series");
  if (!res.ok) return [];
  const j = (await res.json()) as { days: SeriesPoint[] };
  return j.days ?? [];
}
