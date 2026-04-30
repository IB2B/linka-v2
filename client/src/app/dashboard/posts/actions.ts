"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";

type Result = { error?: string; success?: boolean };

async function api(path: string, init: RequestInit = {}): Promise<Response> {
  const cookieStore = await cookies();
  const hdrs = await headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const cookie = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");
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

export async function deletePostAction(id: string): Promise<Result> {
  const res = await api(`/api/posts/${id}`, { method: "DELETE" });
  if (!res.ok) return { error: await readError(res, "Failed to delete.") };
  revalidatePath("/dashboard/posts");
  return { success: true };
}

export async function schedulePostAction(
  id: string, scheduledFor: string, platforms: string[] = [],
): Promise<Result> {
  const res = await api(`/api/posts/${id}/schedule`, {
    method: "POST", body: JSON.stringify({ scheduledFor, platforms }),
  });
  if (!res.ok) return { error: await readError(res, "Failed to schedule.") };
  revalidatePath("/dashboard/posts");
  return { success: true };
}

export async function publishPostAction(
  id: string, platforms: string[] = [],
): Promise<Result> {
  const res = await api(`/api/posts/${id}/publish`, {
    method: "POST", body: JSON.stringify({ platforms }),
  });
  if (!res.ok) return { error: await readError(res, "Failed to publish.") };
  revalidatePath("/dashboard/posts");
  return { success: true };
}

export async function regenerateTextAction(id: string): Promise<Result> {
  const res = await api(`/api/posts/${id}/regenerate-text`, { method: "POST" });
  if (!res.ok) return { error: await readError(res, "Failed to regenerate.") };
  revalidatePath(`/dashboard/posts/${id}`);
  return { success: true };
}

export async function regenerateImageAction(id: string): Promise<Result> {
  const res = await api(`/api/posts/${id}/regenerate-image`, { method: "POST" });
  if (!res.ok) return { error: await readError(res, "Failed to regenerate image.") };
  revalidatePath(`/dashboard/posts/${id}`);
  return { success: true };
}
