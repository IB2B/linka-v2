"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";

type Result = { error?: string; success?: boolean };
export type PlatformFailure = { platform: string; error: string | null };
type PublishResult = {
  error?: string; success?: boolean;
  publishedTo?: string[]; failed?: PlatformFailure[];
};

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

export async function bulkDeletePostsAction(
  ids: string[],
): Promise<{ error?: string; deleted?: number }> {
  if (ids.length === 0) return { deleted: 0 };
  const res = await api("/api/posts/bulk-delete", {
    method: "POST", body: JSON.stringify({ ids }),
  });
  if (!res.ok) return { error: await readError(res, "Failed to delete.") };
  const j = (await res.json().catch(() => ({}))) as { deleted?: number };
  revalidatePath("/dashboard/posts");
  return { deleted: j.deleted ?? 0 };
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
): Promise<PublishResult> {
  const res = await api(`/api/posts/${id}/publish`, {
    method: "POST", body: JSON.stringify({ platforms }),
  });
  if (!res.ok) return { error: await readError(res, "Failed to publish.") };
  const j = (await res.json().catch(() => ({}))) as {
    publishedTo?: string[]; failed?: PlatformFailure[];
  };
  revalidatePath("/dashboard/posts");
  return { success: true, publishedTo: j.publishedTo ?? [], failed: j.failed ?? [] };
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
