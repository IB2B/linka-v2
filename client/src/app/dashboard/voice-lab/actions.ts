"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import type { SampleSource } from "@/types/voice-lab";

type Result = { error?: string; success?: boolean };

async function api(path: string, init: RequestInit = {}): Promise<Response> {
  const cookieStore = await cookies();
  const hdrs = await headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const cookie = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");
  return fetch(`${proto}://${host}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", cookie, ...(init.headers ?? {}) },
    cache: "no-store",
  });
}

async function readError(res: Response): Promise<string> {
  const j = (await res.json().catch(() => ({}))) as { error?: string };
  return j.error ?? "Request failed.";
}

export async function createSampleAction(formData: FormData): Promise<Result> {
  const body = {
    title: String(formData.get("title") ?? "").trim() || null,
    content: String(formData.get("content") ?? "").trim(),
    source: String(formData.get("source") ?? "other") as SampleSource,
  };
  const res = await api("/api/voice-lab/samples", { method: "POST", body: JSON.stringify(body) });
  if (!res.ok) return { error: await readError(res) };
  revalidatePath("/dashboard/voice-lab");
  return { success: true };
}

export async function bulkCreateSamplesAction(
  samples: { content: string; source: SampleSource; title?: string }[],
): Promise<Result> {
  const res = await api("/api/voice-lab/samples/bulk", {
    method: "POST", body: JSON.stringify({ samples }),
  });
  if (!res.ok) return { error: await readError(res) };
  revalidatePath("/dashboard/voice-lab");
  return { success: true };
}

export async function deleteSampleAction(id: string): Promise<Result> {
  const res = await api(`/api/voice-lab/samples/${id}`, { method: "DELETE" });
  if (!res.ok) return { error: await readError(res) };
  revalidatePath("/dashboard/voice-lab");
  return { success: true };
}

export async function analyzeAction(sampleIds?: string[]): Promise<Result> {
  const res = await api("/api/voice-lab/analyze", {
    method: "POST",
    body: JSON.stringify(sampleIds?.length ? { sampleIds } : {}),
  });
  if (!res.ok) return { error: await readError(res) };
  revalidatePath("/dashboard/voice-lab");
  return { success: true };
}
