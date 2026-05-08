import { adminApi } from "@/lib/admin/api";
import type { AdminStats } from "@/types/admin";

export async function getAdminStats(): Promise<AdminStats | null> {
  const res = await adminApi("/api/admin/stats");
  if (!res.ok) return null;
  return (await res.json()) as AdminStats;
}
