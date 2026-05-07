"use server";

import { cookies, headers } from "next/headers";

export type FeedbackCategory = "feature" | "general";

export type SubmitInput = {
  category: FeedbackCategory;
  message: string;
  pageUrl?: string;
};

export async function submitFeedbackAction(
  input: SubmitInput,
): Promise<{ error?: string; success?: boolean }> {
  const cookieStore = await cookies();
  const hdrs = await headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const cookie = cookieStore.getAll()
    .map((c) => `${c.name}=${c.value}`).join("; ");

  const res = await fetch(`${proto}://${host}/api/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie },
    body: JSON.stringify(input),
    cache: "no-store",
  });
  if (!res.ok) {
    const j = (await res.json().catch(() => ({}))) as { error?: string };
    return { error: j.error ?? "Failed to send feedback." };
  }
  return { success: true };
}
