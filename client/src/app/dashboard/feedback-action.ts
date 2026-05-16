"use server";

import { cookies } from "next/headers";

const API_BASE = process.env.API_URL ?? "http://localhost:4000";

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
  const cookie = cookieStore.getAll()
    .map((c) => `${c.name}=${c.value}`).join("; ");

  const res = await fetch(`${API_BASE}/api/feedback`, {
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
