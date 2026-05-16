import { cookies } from "next/headers";

const API_BASE = process.env.API_URL ?? "http://localhost:4000";

export async function socialFetch<T>(
  path: string, init: RequestInit = {},
): Promise<T> {
  const cookieStore = await cookies();
  const cookie = cookieStore.getAll()
    .map((c) => `${c.name}=${c.value}`).join("; ");

  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { cookie, "Content-Type": "application/json", ...init.headers },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Social API ${res.status}: ${text}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}
