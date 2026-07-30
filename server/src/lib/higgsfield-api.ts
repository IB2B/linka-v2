// Raw fetch wrapper for the Higgsfield API (matches the late-api.ts pattern —
// no SDK). Base https://platform.higgsfield.ai, auth "Key KEY_ID:KEY_SECRET".
export class HiggsfieldError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

function auth(): string {
  const key = process.env.HIGGSFIELD_API_KEY;
  if (!key) throw new HiggsfieldError(500, "HIGGSFIELD_API_KEY not configured");
  // Accept either "id:secret" (V2) or a plain bearer token.
  return key.includes(":") ? `Key ${key}` : `Bearer ${key}`;
}

export async function higgsfieldFetch<T>(
  path: string, init: RequestInit = {},
): Promise<T> {
  const base = process.env.HIGGSFIELD_API_URL ?? "https://platform.higgsfield.ai";
  const res = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth(),
      ...init.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new HiggsfieldError(res.status, `Higgsfield ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}
