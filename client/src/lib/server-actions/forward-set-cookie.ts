import { cookies } from "next/headers";

type CookieOpts = {
  path?: string;
  domain?: string;
  maxAge?: number;
  expires?: Date;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "lax" | "strict" | "none";
};

function parseSetCookie(sc: string): { name: string; value: string; opts: CookieOpts } | null {
  const parts = sc.split(";").map((p) => p.trim());
  const first = parts[0];
  if (!first) return null;
  const eq = first.indexOf("=");
  if (eq === -1) return null;
  const opts: CookieOpts = {};
  for (let i = 1; i < parts.length; i++) {
    const [rawKey, ...rest] = parts[i]!.split("=");
    const key = rawKey!.toLowerCase();
    const v = rest.join("=");
    if (key === "path") opts.path = v;
    else if (key === "domain") opts.domain = v;
    else if (key === "max-age") opts.maxAge = Number(v);
    else if (key === "expires") opts.expires = new Date(v);
    else if (key === "samesite") opts.sameSite = v.toLowerCase() as CookieOpts["sameSite"];
    else if (key === "secure") opts.secure = true;
    else if (key === "httponly") opts.httpOnly = true;
  }
  return { name: first.slice(0, eq), value: first.slice(eq + 1), opts };
}

export async function forwardSetCookies(res: Response): Promise<void> {
  const setCookies = res.headers.getSetCookie?.() ?? [];
  if (setCookies.length === 0) return;
  const store = await cookies();
  for (const sc of setCookies) {
    const parsed = parseSetCookie(sc);
    if (parsed) store.set({ name: parsed.name, value: parsed.value, ...parsed.opts });
  }
}
