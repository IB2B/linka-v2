"use server";

import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";

import type { AssistResult } from "@/lib/inbox/assist.types";

type Result = { success: true } | { error: string };
type AssistOk = { success: true; data: AssistResult } | { error: string };

async function api(path: string, init: RequestInit = {}): Promise<Response> {
  const [cookieStore, hdrs] = await Promise.all([cookies(), headers()]);
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  return fetch(`${proto}://${host}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      cookie: cookieStore.toString(),
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });
}

export async function assistReplyAction(conversationId: string, accountId: string | null): Promise<AssistOk> {
  const qs = accountId ? `?accountId=${encodeURIComponent(accountId)}` : "";
  const res = await api(
    `/api/inbox/conversations/${encodeURIComponent(conversationId)}/assist${qs}`,
    { method: "POST" },
  );
  const body = (await res.json().catch(() => ({}))) as Partial<AssistResult> & { error?: string };
  if (!res.ok || typeof body.intent !== "string") {
    return { error: body.error ?? "Failed to suggest a reply." };
  }
  return {
    success: true,
    data: {
      intent: body.intent as AssistResult["intent"],
      confidence: body.confidence ?? 0,
      summary: (body as any).summary ?? "",
      replies: (body as any).replies ?? [],
      shouldAutoReply: Boolean(body.shouldAutoReply),
    },
  };
}

export async function uploadAttachmentAction(formData: FormData): Promise<{ url: string } | { error: string }> {
  const [cookieStore, hdrs] = await Promise.all([cookies(), headers()]);
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const res = await fetch(`${proto}://${host}/api/inbox/upload`, {
    method: "POST",
    headers: { cookie: cookieStore.toString() },
    body: formData,
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) return { error: body.error ?? "Upload failed." };
  return { url: body.url };
}

export async function sendReplyAction(
  conversationId: string, text: string, accountId: string | null, mediaUrl?: string,
): Promise<Result> {
  if (!text.trim() && !mediaUrl) return { error: "Message is empty." };
  const res = await api(
    `/api/inbox/conversations/${encodeURIComponent(conversationId)}/messages`,
    { method: "POST", body: JSON.stringify({ text: text.trim(), accountId, ...(mediaUrl ? { mediaUrl } : {}) }) },
  );
  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: "Failed to send." }));
    return { error: data.error ?? "Failed to send." };
  }
  revalidatePath("/dashboard/inbox");
  return { success: true };
}
