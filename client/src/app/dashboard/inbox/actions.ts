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

export async function assistReplyAction(conversationId: string): Promise<AssistOk> {
  const res = await api(
    `/api/inbox/conversations/${encodeURIComponent(conversationId)}/assist`,
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
      reply: body.reply ?? "",
      shouldAutoReply: Boolean(body.shouldAutoReply),
    },
  };
}

export async function sendReplyAction(conversationId: string, text: string): Promise<Result> {
  if (!text.trim()) return { error: "Message is empty." };
  const [cookieStore, hdrs] = await Promise.all([cookies(), headers()]);
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";

  const res = await fetch(
    `${proto}://${host}/api/inbox/conversations/${encodeURIComponent(conversationId)}/messages`,
    {
      method: "POST",
      headers: { "content-type": "application/json", cookie: cookieStore.toString() },
      body: JSON.stringify({ text: text.trim() }),
    },
  );

  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: "Failed to send." }));
    return { error: data.error ?? "Failed to send." };
  }
  revalidatePath("/dashboard/inbox");
  return { success: true };
}
