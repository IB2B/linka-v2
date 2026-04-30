"use server";

import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";

type Result = { success: true } | { error: string };

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
