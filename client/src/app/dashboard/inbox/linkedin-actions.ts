"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_BASE = process.env.API_URL ?? "http://localhost:4000";

async function api(path: string, init: RequestInit = {}): Promise<Response> {
  const cookieStore = await cookies();
  return fetch(`${API_BASE}/api/linkedin${path}`, {
    ...init,
    headers: { "content-type": "application/json", cookie: cookieStore.toString(), ...(init.headers ?? {}) },
    cache: "no-store",
  });
}

export async function connectLinkedinAction(): Promise<{ url: string } | { error: string }> {
  const res = await api("/connect", { method: "POST" });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || !body.url) return { error: body.error ?? "Could not start LinkedIn connect." };
  return { url: body.url as string };
}

export async function syncLinkedinAction(): Promise<{ connected: boolean }> {
  const res = await api("/sync", { method: "POST" });
  const body = await res.json().catch(() => ({}));
  if (res.ok && body.connected) revalidatePath("/dashboard/inbox");
  return { connected: !!body.connected };
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
