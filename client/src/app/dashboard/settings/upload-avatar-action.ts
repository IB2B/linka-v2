"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const API_BASE = process.env.API_URL ?? "http://localhost:4000";

type ActionResult = { error?: string; success?: boolean; avatarUrl?: string };

export async function uploadAvatarAction(formData: FormData): Promise<ActionResult> {
  const cookieStore = await cookies();
  const cookie = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");

  const res = await fetch(`${API_BASE}/api/users/me/avatar`, {
    method: "POST",
    headers: { cookie },
    body: formData,
    cache: "no-store",
  });
  const json = (await res.json().catch(() => ({}))) as ActionResult;
  if (!res.ok) return { error: json.error ?? "Upload failed." };
  revalidatePath("/dashboard/settings");
  revalidatePath("/admin/settings");
  return { success: true, avatarUrl: json.avatarUrl };
}
