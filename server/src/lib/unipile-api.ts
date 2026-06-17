export class UnipileApiError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

function config(): { base: string; key: string } {
  const dsn = process.env.UNIPILE_DSN;
  const key = process.env.UNIPILE_API_KEY;
  if (!dsn) throw new UnipileApiError(500, "UNIPILE_DSN not configured");
  if (!key) throw new UnipileApiError(500, "UNIPILE_API_KEY not configured");
  return { base: `https://${dsn}`, key };
}

// The hosted-auth request needs the bare DSN base as `api_url`.
export function unipileBaseUrl(): string {
  return config().base;
}

export async function unipileFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const { base, key } = config();
  const res = await fetch(`${base}/api/v1${path}`, {
    ...init,
    headers: { accept: "application/json", "X-API-KEY": key, ...(init.headers ?? {}) },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new UnipileApiError(res.status, `Unipile ${res.status}: ${text}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export function unipileJson<T>(path: string, body: unknown, method = "POST"): Promise<T> {
  return unipileFetch<T>(path, {
    method, headers: { "content-type": "application/json" }, body: JSON.stringify(body),
  });
}

// Sending a message is multipart/form-data; let fetch set the boundary header.
export function unipileForm<T>(path: string, fields: Record<string, string>): Promise<T> {
  const form = new FormData();
  for (const [k, v] of Object.entries(fields)) form.append(k, v);
  return unipileFetch<T>(path, { method: "POST", body: form });
}
