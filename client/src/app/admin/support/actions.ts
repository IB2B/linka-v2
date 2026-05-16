"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import type { SupportPriority, SupportStatus } from "@/types/admin-support";

const API_BASE = process.env.API_URL ?? "http://localhost:4000";

type Patch = { status?: SupportStatus; priority?: SupportPriority };

export async function updateTicketAction(
  id: string, patch: Patch,
): Promise<{ success: true } | { error: string }> {
  const cookieStore = await cookies();
  const cookie = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");

  const res = await fetch(`${API_BASE}/api/admin/support/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", cookie },
    body: JSON.stringify(patch),
    cache: "no-store",
  });
  if (!res.ok) {
    const j = (await res.json().catch(() => ({}))) as { error?: string };
    return { error: j.error ?? "Failed to update ticket" };
  }
  revalidatePath("/admin/support");
  return { success: true };
}

export async function replyToTicketAction(
  id: string, body: string, attachmentUrl?: string,
): Promise<{ success: true } | { error: string }> {
  const cookieStore = await cookies();
  const cookie = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");

  const res = await fetch(`${API_BASE}/api/admin/support/${id}/reply`, {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie },
    body: JSON.stringify({ body, attachmentUrl }),
    cache: "no-store",
  });
  if (!res.ok) {
    const j = (await res.json().catch(() => ({}))) as { error?: string };
    return { error: j.error ?? "Failed to send reply" };
  }
  revalidatePath(`/admin/support/${id}`);
  return { success: true };
}
