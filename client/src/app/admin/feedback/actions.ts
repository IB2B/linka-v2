"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_BASE = process.env.API_URL ?? "http://localhost:4000";

type Status = "new" | "triaged" | "closed";

export async function setFeedbackStatusAction(
  id: string, status: Status,
): Promise<{ success: true } | { error: string }> {
  const cookieStore = await cookies();
  const cookie = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");

  const res = await fetch(`${API_BASE}/api/admin/feedback/${id}/status`, {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie },
    body: JSON.stringify({ status }),
    cache: "no-store",
  });
  if (!res.ok) {
    const j = (await res.json().catch(() => ({}))) as { error?: string };
    return { error: j.error ?? "Failed to update feedback" };
  }
  revalidatePath("/admin/feedback");
  return { success: true };
}
