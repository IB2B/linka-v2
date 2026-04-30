import { cookies, headers } from "next/headers";

export async function socialFetch<T>(
  path: string, init: RequestInit = {},
): Promise<T> {
  const cookieStore = await cookies();
  const hdrs = await headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const cookie = cookieStore.getAll()
    .map((c) => `${c.name}=${c.value}`).join("; ");

  const res = await fetch(`${proto}://${host}${path}`, {
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
