import { adminApi } from "@/lib/admin/api";

export type RevenuePoint = { month: string; revenue: number };

export async function getMonthlyRevenue(): Promise<RevenuePoint[]> {
  const res = await adminApi("/api/admin/payments/revenue");
  if (!res.ok) return [];
  const j = (await res.json()) as { revenue: RevenuePoint[] };
  return j.revenue ?? [];
}
