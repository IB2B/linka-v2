import { cookies, headers } from "next/headers";

export type InboxFetchResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; error: string };

export async function inboxFetch<T>(
  path: string, init: RequestInit = {},
): Promise<InboxFetchResult<T>> {
  const [cookieStore, hdrs] = await Promise.all([cookies(), headers()]);
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const cookie = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");
  let res: Response;
  try {
    res = await fetch(`${proto}://${host}${path}`, {
      ...init,
      headers: { cookie, "Content-Type": "application/json", ...init.headers },
      cache: "no-store",
    });
  } catch {
    return { ok: false, status: 503, error: "service_unavailable" };
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: "Failed to load." }));
    return { ok: false, status: res.status, error: body.error ?? "Failed to load." };
  }
  return { ok: true, data: (await res.json()) as T };
}
