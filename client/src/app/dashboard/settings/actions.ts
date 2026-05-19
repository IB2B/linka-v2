"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { forwardSetCookies } from "@/lib/server-actions/forward-set-cookie";

const API_BASE = process.env.API_URL ?? "http://localhost:4000";

type ActionResult = { error?: string; success?: boolean };

function revalidateSettings() {
  revalidatePath("/dashboard/settings");
  revalidatePath("/admin/settings");
}

async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const cookieStore = await cookies();
  const cookie = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");
  return fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", cookie, ...(init.headers ?? {}) },
    cache: "no-store",
  });
}

async function send(path: string, method: string, body: object): Promise<ActionResult> {
  const res = await apiFetch(path, { method, body: JSON.stringify(body) });
  await forwardSetCookies(res);
  if (res.ok) { revalidateSettings(); return { success: true }; }
  const json = (await res.json().catch(() => ({}))) as { error?: string };
  return { error: json.error ?? "Request failed." };
}

export async function updateProfileAction(formData: FormData): Promise<ActionResult> {
  return send("/api/users/me", "PATCH", {
    firstName: String(formData.get("firstName") ?? "").trim(),
    lastName: String(formData.get("lastName") ?? "").trim(),
  });
}

export async function changePasswordAction(formData: FormData): Promise<ActionResult> {
  const newPassword = String(formData.get("newPassword") ?? "");
  if (String(formData.get("confirmPassword") ?? "") !== newPassword) {
    return { error: "Passwords do not match." };
  }
  return send("/api/users/me/password", "POST", {
    currentPassword: String(formData.get("currentPassword") ?? ""),
    newPassword,
  });
}

export async function updateWorkProfileAction(formData: FormData): Promise<ActionResult> {
  return send("/api/users/me/profile", "PATCH", {
    jobTitle: String(formData.get("jobTitle") ?? "").trim(),
    industry: String(formData.get("industry") ?? "").trim(),
    bio: String(formData.get("headline") ?? "").trim(),
  });
}

export async function logoutAllDevicesAction(): Promise<ActionResult> {
  const res = await apiFetch("/api/auth/logout-all", { method: "POST" });
  await forwardSetCookies(res);
  redirect("/login");
}

export async function deleteAccountAction(): Promise<ActionResult> {
  const res = await apiFetch("/api/users/me", { method: "DELETE" });
  if (!res.ok) {
    const json = (await res.json().catch(() => ({}))) as { error?: string };
    return { error: json.error ?? "Failed to delete account." };
  }
  await forwardSetCookies(res);
  redirect("/login");
}
