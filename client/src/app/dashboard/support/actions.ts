"use server";

import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";

import type { CreateTicketInput } from "@/lib/support/support.types";

type Result = { success: true } | { error: string };

async function postJson(path: string, body: unknown = {}): Promise<Result> {
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);
  const host = headerStore.get("host");
  const proto = headerStore.get("x-forwarded-proto") ?? "http";
  const res = await fetch(`${proto}://${host}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json", cookie: cookieStore.toString() },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: "Request failed." }));
    return { error: data.error ?? "Request failed." };
  }
  return { success: true };
}

export async function createTicketAction(input: CreateTicketInput): Promise<Result> {
  const r = await postJson("/api/support/tickets", input);
  if ("success" in r) revalidatePath("/dashboard/support");
  return r;
}

export async function replyToMyTicketAction(
  id: string, body: string, attachmentUrl?: string,
): Promise<Result> {
  const r = await postJson(`/api/support/tickets/${id}/reply`, { body, attachmentUrl });
  if ("success" in r) revalidatePath(`/dashboard/support/${id}`);
  return r;
}

export async function markTicketViewedAction(id: string): Promise<Result> {
  const r = await postJson(`/api/support/tickets/${id}/view`);
  if ("success" in r) revalidatePath("/dashboard/support");
  return r;
}

export async function resolveMyTicketAction(id: string): Promise<Result> {
  const r = await postJson(`/api/support/tickets/${id}/resolve`);
  if ("success" in r) {
    revalidatePath(`/dashboard/support/${id}`);
    revalidatePath("/dashboard/support");
  }
  return r;
}

export async function rateMyTicketAction(id: string, rating: number): Promise<Result> {
  const r = await postJson(`/api/support/tickets/${id}/rate`, { rating });
  if ("success" in r) revalidatePath(`/dashboard/support/${id}`);
  return r;
}
