import type { AdminUserDetail } from "@/types/admin";

export async function getUserDetail(id: string): Promise<AdminUserDetail | null> {
  const res = await fetch(`/api/admin/users/${id}/detail`, { cache: "no-store" });
  if (!res.ok) return null;
  return (await res.json()) as AdminUserDetail;
}
