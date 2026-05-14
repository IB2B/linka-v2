import { adminApi } from "@/lib/admin/api";
import type { AdminSubsResult, SubsQuery } from "@/types/admin-subscription";

const EMPTY: AdminSubsResult = {
  rows: [], total: 0,
  summary: {
    mrr: 0, arr: 0, paying: 0, free: 0, trialing: 0, canceledLast30d: 0,
    byTier: [], currency: "usd",
  },
};

export async function getAdminSubscriptions(filters: SubsQuery = {}): Promise<AdminSubsResult> {
  const qs = new URLSearchParams();
  if (filters.q) qs.set("q", filters.q);
  if (filters.status) qs.set("status", filters.status);
  if (filters.from) qs.set("from", filters.from);
  if (filters.to) qs.set("to", filters.to);
  const res = await adminApi(`/api/admin/subscriptions${qs.size ? `?${qs}` : ""}`);
  if (!res.ok) return EMPTY;
  return (await res.json()) as AdminSubsResult;
}
