export class LinkupApiError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

// All LinkupAPI endpoints are POST + JSON, authenticated with the account-level
// `x-api-key`. The per-user LinkedIn `login_token` is passed in each body.
export async function linkupFetch<T>(
  path: string, body: Record<string, unknown>,
): Promise<T> {
  const base = process.env.LINKUP_API_BASE_URL;
  if (!base) throw new LinkupApiError(500, "LINKUP_API_BASE_URL not configured");
  const key = process.env.LINKUP_API_KEY;
  if (!key) throw new LinkupApiError(500, "LINKUP_API_KEY not configured");

  const res = await fetch(`${base}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": key },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new LinkupApiError(res.status, `Linkup API ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}
