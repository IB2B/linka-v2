const BASE_URL = "/api";

type Params = Record<string, string | number | boolean | undefined>;
type Options = { params?: Params; headers?: Record<string, string> };

export class HttpError extends Error {
  constructor(public status: number, public data: unknown, message: string) {
    super(message);
  }
}

function buildUrl(path: string, params?: Params): string {
  const url = `${BASE_URL}${path}`;
  if (!params) return url;
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined) qs.set(k, String(v));
  }
  const s = qs.toString();
  return s ? `${url}?${s}` : url;
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  opts: Options = {},
): Promise<{ data: T }> {
  const isForm = typeof FormData !== "undefined" && body instanceof FormData;
  const headers: Record<string, string> = { ...(opts.headers ?? {}) };
  if (body !== undefined && !isForm && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }
  const res = await fetch(buildUrl(path, opts.params), {
    method,
    credentials: "include",
    headers,
    body: body === undefined ? undefined : isForm ? (body as FormData) : JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as unknown;
  if (!res.ok) {
    const msg = (data as { error?: string })?.error ?? `HTTP ${res.status}`;
    throw new HttpError(res.status, data, msg);
  }
  return { data: data as T };
}

export const http = {
  get: <T = unknown>(path: string, opts?: Options) => request<T>("GET", path, undefined, opts),
  post: <T = unknown>(path: string, body?: unknown, opts?: Options) =>
    request<T>("POST", path, body, opts),
  patch: <T = unknown>(path: string, body?: unknown, opts?: Options) =>
    request<T>("PATCH", path, body, opts),
  delete: <T = unknown>(path: string, opts?: Options) => request<T>("DELETE", path, undefined, opts),
};

export function getErrorMessage(err: unknown, fallback = "Request failed."): string {
  if (err instanceof HttpError) return err.message || fallback;
  if (err instanceof TypeError) return "Network error. Please try again.";
  if (err instanceof Error) return err.message || fallback;
  return fallback;
}
