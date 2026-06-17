import { linkupFetch } from "./linkup-api";

type AuthResp = { status?: string; message?: string; login_token?: string };

// LinkedIn often emails a verification code on a fresh login. When it does, the
// login response carries no token and we ask the user for the code; otherwise we
// get the login_token straight away.
export async function linkupLogin(
  email: string, password: string, country: string,
): Promise<{ needsVerification: boolean; loginToken?: string }> {
  const r = await linkupFetch<AuthResp>("/auth/login", { email, password, country });
  if (r.login_token) return { needsVerification: false, loginToken: r.login_token };
  return { needsVerification: true };
}

export async function linkupVerify(
  email: string, code: string, country: string,
): Promise<string> {
  const r = await linkupFetch<AuthResp>("/auth/verify", { email, code, country });
  if (!r.login_token) throw new Error(r.message ?? "Verification failed");
  return r.login_token;
}
