"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { forwardSetCookies } from "@/lib/server-actions/forward-set-cookie";

const API_BASE = process.env.API_URL ?? "http://localhost:4000";
const FIELDS = ["name", "url", "pitch", "audience", "features", "cta"] as const;

type ActionResult = { error?: string; id?: string };

async function send(path: string, method: string, body?: unknown): Promise<ActionResult> {
  const cookieStore = await cookies();
  const cookie = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");
  const res = await fetch(`${API_BASE}/api/products${path}`, {
    method,
    headers: { "Content-Type": "application/json", cookie },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  await forwardSetCookies(res);
  const json = (await res.json().catch(() => ({}))) as { error?: string; id?: string };
  if (!res.ok) return { error: json.error ?? "Request failed." };
  // Products show in Settings and on the Generate page.
  revalidatePath("/dashboard/settings");
  revalidatePath("/dashboard/generate");
  return { id: json.id };
}

function readProduct(fd: FormData): Record<string, string> {
  return Object.fromEntries(FIELDS.map((k) => [k, String(fd.get(k) ?? "").trim()]));
}

// Creates when `id` is null, otherwise updates that product.
export async function saveProductAction(id: string | null, fd: FormData): Promise<ActionResult> {
  const body = readProduct(fd);
  return id ? send(`/${id}`, "PATCH", body) : send("", "POST", body);
}

export async function deleteProductAction(id: string): Promise<ActionResult> {
  return send(`/${id}`, "DELETE");
}
