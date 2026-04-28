import {
  apiErrorSchema,
  loginSuccessSchema,
  registerSuccessSchema,
  type LoginRequest,
  type LoginSuccess,
  type RegisterRequest,
  type RegisterSuccess,
} from "@/lib/auth/schemas";

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

async function postJson<T extends object>(
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

export function loginRequest(payload: LoginRequest) {
  return postJson<LoginSuccess>("/api/auth/login", payload, loginSuccessSchema);
}

export function registerRequest(payload: RegisterRequest) {
  return postJson<RegisterSuccess>(
    "/api/auth/register",
    payload,
    registerSuccessSchema,
  );
}

export async function logoutRequest(): Promise<{ ok: boolean }> {
  try {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}
