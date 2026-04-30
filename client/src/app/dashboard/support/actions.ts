"use server";

import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";

import type { CreateTicketInput } from "@/lib/support/support.types";

type Result = { success: true } | { error: string };

export async function createTicketAction(input: CreateTicketInput): Promise<Result> {
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);
  const host = headerStore.get("host");
  const proto = headerStore.get("x-forwarded-proto") ?? "http";

  const res = await fetch(`${proto}://${host}/api/support/tickets`, {
    method: "POST",
    headers: { "content-type": "application/json", cookie: cookieStore.toString() },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: "Failed to submit." }));
    return { error: data.error ?? "Failed to submit." };
  }
  revalidatePath("/dashboard/support");
  return { success: true };
}
