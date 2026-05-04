"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";

type Result = { success: true; refreshed: number } | { error: string };

export async function refreshTrendsAction(topic?: string): Promise<Result> {
  const [cookieStore, hdrs] = await Promise.all([cookies(), headers()]);
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const res = await fetch(`${proto}://${host}/api/trends/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: cookieStore.toString() },
    body: JSON.stringify({ topic }),
    cache: "no-store",
  });
  if (!res.ok) {
    const j = (await res.json().catch(() => ({}))) as { error?: string };
    return { error: j.error ?? "Refresh failed." };
  }
  const data = (await res.json()) as { refreshed: number };
  revalidatePath("/dashboard/trends");
  return { success: true, refreshed: data.refreshed };
}
