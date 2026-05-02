import { cookies, headers } from "next/headers";

import type { Board } from "@/types/pipeline";

const EMPTY: Board = { pipelines: [], pipeline: null, stages: [], opportunities: [] };

export async function getBoard(pipelineId?: string): Promise<Board> {
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);
  const host = headerStore.get("host");
  const proto = headerStore.get("x-forwarded-proto") ?? "http";
  const qs = pipelineId ? `?pipelineId=${encodeURIComponent(pipelineId)}` : "";
  const res = await fetch(`${proto}://${host}/api/pipelines${qs}`, {
    headers: { cookie: cookieStore.toString() },
    cache: "no-store",
  });
  if (!res.ok) return EMPTY;
  return (await res.json()) as Board;
}
