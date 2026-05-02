"use server";

import { cookies, headers } from "next/headers";

import type { PostScore } from "@/types/post-score";

type Result = { success: true; data: PostScore } | { error: string };

export async function scorePostAction(id: string): Promise<Result> {
  const cookieStore = await cookies();
  const hdrs = await headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const cookie = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");
  const res = await fetch(`${proto}://${host}/api/posts/${id}/score`, {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie },
    cache: "no-store",
  });
  const body = (await res.json().catch(() => ({}))) as Partial<PostScore> & { error?: string };
  if (!res.ok || typeof body.score !== "number") {
    return { error: body.error ?? "Failed to score." };
  }
  return {
    success: true,
    data: {
      score: body.score,
      reasons: body.reasons ?? [],
      suggestions: body.suggestions ?? [],
    },
  };
}
