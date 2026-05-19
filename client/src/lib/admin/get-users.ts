import { adminApi } from "@/lib/admin/api";
import type { AdminUserRow } from "@/types/admin";

export type AdminUsersResult = { users: AdminUserRow[]; total: number };

export type UsersQuery = { q?: string; role?: string; status?: string; sort?: string; dir?: string };

export async function getAdminUsers(filters: UsersQuery = {}): Promise<AdminUsersResult> {
  const qs = new URLSearchParams();
  if (filters.q) qs.set("q", filters.q);
  if (filters.role) qs.set("role", filters.role);
  if (filters.status) qs.set("status", filters.status);
  if (filters.sort) qs.set("sort", filters.sort);
  if (filters.dir) qs.set("dir", filters.dir);
  const res = await adminApi(`/api/admin/users${qs.size ? `?${qs}` : ""}`);
  if (!res.ok) return { users: [], total: 0 };
  return (await res.json()) as AdminUsersResult;
}
