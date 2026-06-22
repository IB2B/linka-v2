"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_BASE = process.env.API_URL ?? "http://localhost:4000";

type StatusResult = { status: "connected" | "verify" } | { error: string };

async function api(path: string, init: RequestInit = {}): Promise<Response> {
  const cookieStore = await cookies();
  return fetch(`${API_BASE}/api/linkedin${path}`, {
    ...init,
    headers: { "content-type": "application/json", cookie: cookieStore.toString(), ...(init.headers ?? {}) },
    cache: "no-store",
  });
}

export async function linkedinLoginAction(
  email: string, password: string, country: string,
): Promise<StatusResult> {
  const res = await api("/login", { method: "POST", body: JSON.stringify({ email, password, country }) });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) return { error: body.error ?? "Could not connect LinkedIn." };
  return { status: body.status as "connected" | "verify" };
}

export async function linkedinVerifyAction(
  email: string, code: string, country: string,
): Promise<StatusResult> {
  const res = await api("/verify", { method: "POST", body: JSON.stringify({ email, code, country }) });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) return { error: body.error ?? "Verification failed." };
  revalidatePath("/dashboard/inbox");
  return { status: body.status as "connected" | "verify" };
}

export async function disconnectLinkedinAction(): Promise<{ success: true } | { error: string }> {
  const res = await api("/", { method: "DELETE" });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    return { error: body.error ?? "Failed to disconnect." };
  }
  revalidatePath("/dashboard/inbox");
  return { success: true };
}
