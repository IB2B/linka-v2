"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import type { RecycleSettings } from "@/types/recycler";

type Result = { error?: string; success?: boolean };

async function api(path: string, init: RequestInit = {}): Promise<Response> {
  const cookieStore = await cookies();
  const hdrs = await headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const cookie = cookieStore.getAll()
    .map((c) => `${c.name}=${c.value}`).join("; ");
  return fetch(`${proto}://${host}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", cookie, ...(init.headers ?? {}) },
    cache: "no-store",
  });
}

export async function setRecyclerEnabledAction(
  enabled: boolean,
): Promise<Result> {
  const cur = await api("/api/recycler/settings");
  if (!cur.ok) {
    const j = (await cur.json().catch(() => ({}))) as { error?: string };
    return { error: j.error ?? "Failed to load settings." };
  }
  const { settings } = (await cur.json()) as { settings: RecycleSettings };
  const res = await api("/api/recycler/settings", {
    method: "PUT",
    body: JSON.stringify({
      enabled,
      perWeek: settings.perWeek,
      minAgeDays: settings.minAgeDays,
    }),
  });
  if (!res.ok) {
    const j = (await res.json().catch(() => ({}))) as { error?: string };
    return { error: j.error ?? "Failed to save." };
  }
  revalidatePath("/dashboard", "layout");
  revalidatePath("/admin", "layout");
  return { success: true };
}
