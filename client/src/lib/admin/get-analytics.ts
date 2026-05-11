import { adminApi } from "@/lib/admin/api";
import type { AnalyticsOverview } from "@/types/admin-analytics";

export async function getAnalyticsOverview(days = 30): Promise<AnalyticsOverview | null> {
  const res = await adminApi(`/api/admin/analytics/overview?days=${days}`);
  if (!res.ok) return null;
  return (await res.json()) as AnalyticsOverview;
}
