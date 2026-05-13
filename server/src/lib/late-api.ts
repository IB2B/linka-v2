const BASE = process.env.LATE_API_URL;
if (!BASE) throw new Error("LATE_API_URL env var is required");

export class LateApiError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

export async function lateFetch<T>(
  path: string, init: RequestInit = {},
): Promise<T> {
  const key = process.env.LATE_API_KEY;
  if (!key) throw new LateApiError(500, "LATE_API_KEY not configured");

  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
      ...init.headers,
    },
  });

  if (!res.ok && res.status !== 202) {
    const text = await res.text().catch(() => "");
    throw new LateApiError(res.status, `Late API ${res.status}: ${text}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}
