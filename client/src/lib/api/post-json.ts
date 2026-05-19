import { apiErrorSchema } from "@/lib/auth/schemas";

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export async function postJson<T extends object>(
  url: string,
  body: object,
  successSchema: { safeParse: (v: unknown) => { success: boolean; data?: T } },
): Promise<ApiResult<T>> {
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }

  const json: unknown = await res.json().catch(() => ({}));

  if (!res.ok) {
    const parsed = apiErrorSchema.safeParse(json);
    return {
      ok: false,
      error: parsed.success ? parsed.data.error : "Request failed.",
    };
  }

  const parsed = successSchema.safeParse(json);
  if (!parsed.success || !parsed.data) {
    return { ok: false, error: "Unexpected response from server." };
  }
  return { ok: true, data: parsed.data };
}
