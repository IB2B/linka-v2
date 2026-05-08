import { adminApi } from "@/lib/admin/api";
import type { AdminContentResult, ContentQuery } from "@/types/admin-content";

const EMPTY: AdminContentResult = {
  rows: [], total: 0,
  summary: {
    total: 0, thisMonth: 0, prevMonth: 0,
    posted: 0, scheduled: 0, failed: 0, drafts: 0, withImage: 0,
    byStatus: [], byPlatform: [],
  },
};

export async function getAdminContent(filters: ContentQuery = {}): Promise<AdminContentResult> {
  const qs = new URLSearchParams();
  if (filters.q) qs.set("q", filters.q);
  if (filters.status) qs.set("status", filters.status);
  if (filters.platform) qs.set("platform", filters.platform);
  const res = await adminApi(`/api/admin/content${qs.size ? `?${qs}` : ""}`);
  if (!res.ok) return EMPTY;
  return (await res.json()) as AdminContentResult;
}
