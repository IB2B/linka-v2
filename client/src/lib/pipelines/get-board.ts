import { cookies, headers } from "next/headers";

import type { Board } from "@/types/pipeline";

const EMPTY: Board = { pipeline: null, stages: [], opportunities: [] };

export async function getBoard(): Promise<Board> {
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);
  const host = headerStore.get("host");
  const proto = headerStore.get("x-forwarded-proto") ?? "http";
  const res = await fetch(`${proto}://${host}/api/pipelines`, {
    headers: { cookie: cookieStore.toString() },
    cache: "no-store",
  });
  if (!res.ok) return EMPTY;
  return (await res.json()) as Board;
}
