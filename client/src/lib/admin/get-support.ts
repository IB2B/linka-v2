import { adminApi } from "@/lib/admin/api";
import type { SupportResult, SupportQuery } from "@/types/admin-support";

const EMPTY: SupportResult = {
  rows: [], total: 0,
  summary: {
    total: 0, open: 0, pending: 0, resolved: 0, closed: 0,
    urgent: 0, last7d: 0, byCategory: [],
  },
};

export async function getAdminSupport(
  filters: SupportQuery = {},
): Promise<SupportResult> {
  const qs = new URLSearchParams();
  if (filters.q) qs.set("q", filters.q);
  if (filters.status) qs.set("status", filters.status);
  if (filters.priority) qs.set("priority", filters.priority);
  if (filters.category) qs.set("category", filters.category);
  const res = await adminApi(`/api/admin/support${qs.size ? `?${qs}` : ""}`);
  if (!res.ok) return EMPTY;
  return (await res.json()) as SupportResult;
}
