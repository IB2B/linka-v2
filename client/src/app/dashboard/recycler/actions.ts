"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import type { RecycleSettings } from "@/types/recycler";

type Result = { error?: string; success?: boolean; draftId?: string };
type SettingsResult = { error?: string; settings?: RecycleSettings };

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

async function readError(res: Response, fallback: string): Promise<string> {
  const j = (await res.json().catch(() => ({}))) as { error?: string };
  return j.error ?? fallback;
}

export async function regenerateRecycledAction(
  postId: string,
): Promise<Result> {
  const res = await api("/api/recycler/regenerate", {
    method: "POST", body: JSON.stringify({ postId }),
  });
  if (!res.ok) return { error: await readError(res, "Failed to regenerate.") };
  const j = (await res.json()) as { post?: { id: string } };
  revalidatePath("/dashboard/posts");
  revalidatePath("/dashboard/recycler");
  return { success: true, draftId: j.post?.id };
}

export async function updateRecycleSettingsAction(
  s: Omit<RecycleSettings, "lastRunAt">,
): Promise<SettingsResult> {
  const res = await api("/api/recycler/settings", {
    method: "PUT", body: JSON.stringify(s),
  });
  if (!res.ok) return { error: await readError(res, "Failed to save.") };
  const j = (await res.json()) as { settings?: RecycleSettings };
  revalidatePath("/dashboard/recycler");
  return { settings: j.settings };
}
