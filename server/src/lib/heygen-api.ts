// Raw fetch wrapper for the HeyGen v3 API (mirrors higgsfield-api.ts — no SDK).
// Base https://api.heygen.com, auth via the x-api-key header. Errors come back
// as { error: { code, message } } — surface the message, not the raw envelope.
export class HeygenError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

function apiKey(): string {
  const key = process.env.HEYGEN_API_KEY;
  if (!key) throw new HeygenError(500, "HEYGEN_API_KEY not configured");
  return key;
}

function detail(body: string): string {
  try {
    const parsed = JSON.parse(body) as { error?: { message?: string } };
    return parsed.error?.message ?? body.slice(0, 300);
  } catch { return body.slice(0, 300); }
}

export async function heygenFetch<T>(
  path: string, init: RequestInit = {},
): Promise<T> {
  const base = process.env.HEYGEN_API_URL ?? "https://api.heygen.com";
  const res = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey(),
      ...init.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new HeygenError(res.status, `HeyGen ${res.status}: ${detail(text)}`);
  }
  return res.json() as Promise<T>;
}
