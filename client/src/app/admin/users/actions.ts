"use server";

import { revalidatePath } from "next/cache";
import { adminApi, readError } from "@/lib/admin/api";
import type { UserRole } from "@/types/user-role";
import type { UserStatus } from "@/types/admin";

type Result = { error?: string; success?: boolean };

export async function setUserRoleAction(id: string, role: UserRole): Promise<Result> {
  const res = await adminApi(`/api/admin/users/${id}/role`, {
    method: "PATCH", body: JSON.stringify({ role }),
  });
  if (!res.ok) return { error: await readError(res, "Failed to update role.") };
  revalidatePath("/admin/users");
  return { success: true };
}

export async function setUserStatusAction(id: string, status: UserStatus): Promise<Result> {
  const res = await adminApi(`/api/admin/users/${id}/status`, {
    method: "PATCH", body: JSON.stringify({ status }),
  });
  if (!res.ok) return { error: await readError(res, "Failed to update status.") };
  revalidatePath("/admin/users");
  return { success: true };
}

export type CreateUserInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
};

export async function createUserAction(input: CreateUserInput): Promise<Result> {
  const res = await adminApi("/api/admin/users", {
    method: "POST", body: JSON.stringify(input),
  });
  if (!res.ok) return { error: await readError(res, "Failed to create user.") };
  revalidatePath("/admin/users");
  return { success: true };
}

export async function sendPasswordResetAction(id: string): Promise<Result> {
  const res = await adminApi(`/api/admin/users/${id}/password-reset`, {
    method: "POST",
  });
  if (!res.ok) return { error: await readError(res, "Failed to send reset email.") };
  return { success: true };
}

export async function deleteUserAction(id: string): Promise<Result> {
  const res = await adminApi(`/api/admin/users/${id}`, { method: "DELETE" });
  if (!res.ok) return { error: await readError(res, "Failed to delete user.") };
  revalidatePath("/admin/users");
  return { success: true };
}

export async function refundUserAction(id: string, chargeId: string): Promise<Result> {
  const res = await adminApi(`/api/admin/payments/refund-user/${id}`, {
    method: "POST", body: JSON.stringify({ chargeId }),
  });
  if (!res.ok) return { error: await readError(res, "Refund failed.") };
  revalidatePath(`/admin/users/${id}`);
  revalidatePath("/admin/users");
  return { success: true };
}
