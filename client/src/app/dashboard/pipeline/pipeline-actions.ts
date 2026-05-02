"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";

import type { CreatePipelineInput } from "@/types/pipeline";

type Result = { success: true; id: string } | { error: string };

async function api(path: string, init: RequestInit = {}): Promise<Response> {
  const cookieStore = await cookies();
  const hdrs = await headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  return fetch(`${proto}://${host}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      cookie: cookieStore.toString(),
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });
}

export async function createPipelineAction(input: CreatePipelineInput): Promise<Result> {
  const res = await api("/api/pipelines", {
    method: "POST",
    body: JSON.stringify(input),
  });
  const body = (await res.json().catch(() => ({}))) as { error?: string; id?: string };
  if (!res.ok || !body.id) return { error: body.error ?? "Request failed." };
  revalidatePath("/dashboard/pipeline");
  return { success: true, id: body.id };
}
