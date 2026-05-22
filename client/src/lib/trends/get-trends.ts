import { cookies, headers } from "next/headers";

import type { TrendsPayload } from "@/types/trend";

const EMPTY: TrendsPayload = { trends: [], ideas: [], suggestedTopics: [] };

export async function getTrends(): Promise<TrendsPayload> {
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);
  const host = headerStore.get("host");
  const proto = headerStore.get("x-forwarded-proto") ?? "http";
  const res = await fetch(`${proto}://${host}/api/trends`, {
    headers: { cookie: cookieStore.toString() },
    cache: "no-store",
  });
  if (!res.ok) return EMPTY;
  return (await res.json()) as TrendsPayload;
}
