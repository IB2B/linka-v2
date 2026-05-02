"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";

import type {
  CreateStageInput, UpdateStageInput,
} from "@/types/pipeline";

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

export async function createStageAction(input: CreateStageInput): Promise<Result> {
  const res = await api("/api/pipelines/stages", {
    method: "POST", body: JSON.stringify(input),
  });
  if (!res.ok) return { error: await readError(res) };
  revalidatePath("/dashboard/pipeline");
  return { success: true };
}

export async function updateStageAction(id: string, input: UpdateStageInput): Promise<Result> {
  const res = await api(`/api/pipelines/stages/${id}`, {
    method: "PATCH", body: JSON.stringify(input),
  });
  if (!res.ok) return { error: await readError(res) };
  revalidatePath("/dashboard/pipeline");
  return { success: true };
}

export async function deleteStageAction(id: string): Promise<Result> {
  const res = await api(`/api/pipelines/stages/${id}`, { method: "DELETE" });
  if (!res.ok) return { error: await readError(res) };
  revalidatePath("/dashboard/pipeline");
  return { success: true };
}
