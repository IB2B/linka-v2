import { adminApi } from "@/lib/admin/api";
import type { FeedbackResult, FeedbackQuery } from "@/types/admin-feedback";

const EMPTY: FeedbackResult = {
  rows: [], total: 0,
  summary: { total: 0, new: 0, triaged: 0, closed: 0, last7d: 0, byCategory: [] },
};

export async function getAdminFeedback(
  filters: FeedbackQuery = {},
): Promise<FeedbackResult> {
  const qs = new URLSearchParams();
  if (filters.q) qs.set("q", filters.q);
  if (filters.status) qs.set("status", filters.status);
  if (filters.category) qs.set("category", filters.category);
  const res = await adminApi(`/api/admin/feedback${qs.size ? `?${qs}` : ""}`);
  if (!res.ok) return EMPTY;
  return (await res.json()) as FeedbackResult;
}
