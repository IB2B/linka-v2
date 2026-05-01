"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";

import type { CreateOppInput, UpdateOppInput } from "@/types/pipeline";

type Result = { success: true } | { error: string };

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

async function readError(res: Response): Promise<string> {
  const j = (await res.json().catch(() => ({}))) as { error?: string };
  return j.error ?? "Request failed.";
}

export async function createOpportunityAction(input: CreateOppInput): Promise<Result> {
  const res = await api("/api/pipelines/opportunities", {
    method: "POST", body: JSON.stringify(input),
  });
  if (!res.ok) return { error: await readError(res) };
  revalidatePath("/dashboard/pipeline");
  return { success: true };
}

export async function updateOpportunityAction(id: string, input: UpdateOppInput): Promise<Result> {
  const res = await api(`/api/pipelines/opportunities/${id}`, {
    method: "PATCH", body: JSON.stringify(input),
  });
  if (!res.ok) return { error: await readError(res) };
  revalidatePath("/dashboard/pipeline");
  return { success: true };
}

export async function moveOpportunityAction(
  id: string, stageId: string, position: number,
): Promise<Result> {
  const res = await api(`/api/pipelines/opportunities/${id}/move`, {
    method: "PATCH", body: JSON.stringify({ stageId, position }),
  });
  if (!res.ok) return { error: await readError(res) };
  revalidatePath("/dashboard/pipeline");
  return { success: true };
}

export async function deleteOpportunityAction(id: string): Promise<Result> {
  const res = await api(`/api/pipelines/opportunities/${id}`, { method: "DELETE" });
  if (!res.ok) return { error: await readError(res) };
  revalidatePath("/dashboard/pipeline");
  return { success: true };
}
