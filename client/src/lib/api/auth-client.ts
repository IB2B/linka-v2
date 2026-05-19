import { postJson } from "@/lib/api/post-json";
import {
  forgotPasswordSuccessSchema,
  loginSuccessSchema,
  registerSuccessSchema,
  verifyEmailSuccessSchema,
  type ForgotPasswordRequest,
  type ForgotPasswordSuccess,
  type LoginRequest,
  type LoginSuccess,
  type RegisterRequest,
  type RegisterSuccess,
  type VerifyEmailRequest,
  type VerifyEmailSuccess,
} from "@/lib/auth/schemas";

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

export function forgotPasswordRequest(payload: ForgotPasswordRequest) {
  return postJson<ForgotPasswordSuccess>(
    "/api/auth/forgot-password",
    payload,
    forgotPasswordSuccessSchema,
  );
}

export function verifyEmailRequest(payload: VerifyEmailRequest) {
  return postJson<VerifyEmailSuccess>(
    "/api/auth/verify-email",
    payload,
    verifyEmailSuccessSchema,
  );
}

export function resendVerificationRequest() {
  return postJson<VerifyEmailSuccess>(
    "/api/auth/resend-verification",
    {},
    verifyEmailSuccessSchema,
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
