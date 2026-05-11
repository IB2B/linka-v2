"use server";

import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";

type Status = "new" | "triaged" | "closed";

export async function setFeedbackStatusAction(
  id: string, status: Status,
): Promise<{ success: true } | { error: string }> {
  const cookieStore = await cookies();
  const hdrs = await headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const cookie = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");

  const res = await fetch(`${proto}://${host}/api/admin/feedback/${id}/status`, {
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
