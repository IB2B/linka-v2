import { adminApi } from "@/lib/admin/api";
import type { ActivityEvent, ActivitySummary } from "@/types/admin";

export async function getActivity(limit = 100, type?: string): Promise<ActivityEvent[]> {
  const qs = new URLSearchParams({ limit: String(limit) });
  if (type) qs.set("type", type);
  const res = await adminApi(`/api/admin/activity?${qs.toString()}`);
  if (!res.ok) return [];
  const j = (await res.json()) as { events: ActivityEvent[] };
  return j.events;
}

export async function getActivitySummary(): Promise<ActivitySummary | null> {
  const res = await adminApi("/api/admin/activity/summary");
  if (!res.ok) return null;
  return (await res.json()) as ActivitySummary;
}
