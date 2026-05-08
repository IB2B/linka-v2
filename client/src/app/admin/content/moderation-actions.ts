"use server";

import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";

type Action = "dismiss" | "hide" | "suspend";

export async function resolveFlagAction(
  flagId: string, action: Action,
): Promise<{ success: true } | { error: string }> {
  const cookieStore = await cookies();
  const hdrs = await headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const cookie = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");

  const res = await fetch(`${proto}://${host}/api/admin/moderation/${flagId}/resolve`, {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie },
    body: JSON.stringify({ action }),
    cache: "no-store",
  });
  if (!res.ok) {
    const j = (await res.json().catch(() => ({}))) as { error?: string };
    return { error: j.error ?? "Failed to resolve flag" };
  }
  revalidatePath("/admin/content");
  return { success: true };
}
