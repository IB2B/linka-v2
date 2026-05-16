"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import type { CreateTicketInput } from "@/lib/support/support.types";

const API_BASE = process.env.API_URL ?? "http://localhost:4000";

type Result = { success: true } | { error: string };

async function postJson(path: string, body: unknown = {}): Promise<Result> {
  const cookieStore = await cookies();
  const res = await fetch(`${API_BASE}${path}`, {
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
