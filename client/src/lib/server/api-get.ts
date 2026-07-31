import { cookies } from "next/headers";

const API_BASE = process.env.API_URL ?? "http://localhost:4000";

// Server-side reads go straight to Express. The pattern this replaces rebuilt the
// app's own origin from the host header and fetched /api/* through the rewrite —
// three hops to reach the same handler, and dependent on the rewrite table being
// live. When that hop answered anything but 200 (a dev-server reload, a cold
// rewrite) callers read it as "no data", so a post that existed rendered a 404.
//
// 404 means absent and returns null. Everything else throws with the status in
// the message: a caller that can degrade writes .catch(() => null) and says so.
export async function apiGet<T>(path: string): Promise<T | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.getAll()
    .map((c) => `${c.name}=${c.value}`).join("; ");

  const res = await fetch(`${API_BASE}${path}`, {
    headers: { cookie }, cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`API ${res.status} on ${path}`);
  return res.json() as Promise<T>;
}
