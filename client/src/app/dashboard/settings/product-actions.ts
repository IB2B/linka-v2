"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { forwardSetCookies } from "@/lib/server-actions/forward-set-cookie";
import type { ProductDraft } from "@/types/product";

const API_BASE = process.env.API_URL ?? "http://localhost:4000";

type ActionResult<T = { id?: string }> = { error?: string } & Partial<T>;

async function send<T>(path: string, method: string, body?: unknown): Promise<{ ok: boolean; json: T & { error?: string } }> {
  const cookieStore = await cookies();
  const cookie = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");
  const res = await fetch(`${API_BASE}/api/products${path}`, {
    method,
    headers: { "Content-Type": "application/json", cookie },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  await forwardSetCookies(res);
  return { ok: res.ok, json: (await res.json().catch(() => ({}))) as T & { error?: string } };
}

async function mutate(path: string, method: string, body?: unknown): Promise<ActionResult> {
  const { ok, json } = await send<{ id?: string }>(path, method, body);
  if (!ok) return { error: json.error ?? "Request failed." };
  // Products show in Settings and on the Generate page.
  revalidatePath("/dashboard/settings");
  revalidatePath("/dashboard/generate");
  return { id: json.id };
}

// Creates when `id` is null, otherwise updates that product.
export async function saveProductAction(id: string | null, draft: ProductDraft): Promise<ActionResult> {
  return id ? mutate(`/${id}`, "PATCH", draft) : mutate("", "POST", draft);
}

export async function deleteProductAction(id: string): Promise<ActionResult> {
  return mutate(`/${id}`, "DELETE");
}

// Reads a website and returns suggested field values. Nothing is saved.
export async function importProductAction(url: string): Promise<ActionResult<{ fields: Partial<ProductDraft> }>> {
  const { ok, json } = await send<Partial<ProductDraft>>("/import", "POST", { url });
  if (!ok) return { error: json.error ?? "Couldn't read that website." };
  return { fields: json };
}
