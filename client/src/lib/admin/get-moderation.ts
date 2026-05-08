import { adminApi } from "@/lib/admin/api";
import type { ModerationResult, ModerationQuery } from "@/types/admin-moderation";

const EMPTY: ModerationResult = {
  rows: [], total: 0,
  summary: {
    pending: 0, reviewing: 0,
    actionedLast30d: 0, dismissedLast30d: 0,
    totalOpen: 0, byReason: [],
  },
};

export async function getAdminModeration(filters: ModerationQuery = {}): Promise<ModerationResult> {
  const qs = new URLSearchParams();
  if (filters.q) qs.set("q", filters.q);
  if (filters.status) qs.set("status", filters.status);
  if (filters.reason) qs.set("reason", filters.reason);
  const res = await adminApi(`/api/admin/moderation${qs.size ? `?${qs}` : ""}`);
  if (!res.ok) return EMPTY;
  return (await res.json()) as ModerationResult;
}
