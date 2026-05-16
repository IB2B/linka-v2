import { cookies } from "next/headers";

const API_BASE = process.env.API_URL ?? "http://localhost:4000";

export async function adminApi(path: string, init: RequestInit = {}): Promise<Response> {
  const cookieStore = await cookies();
  const cookie = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");
  return fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", cookie, ...(init.headers ?? {}) },
    cache: "no-store",
  });
}

export async function readError(res: Response, fallback: string): Promise<string> {
  const j = (await res.json().catch(() => ({}))) as { error?: string };
  return j.error ?? fallback;
}
