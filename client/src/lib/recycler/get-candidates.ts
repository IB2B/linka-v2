import { cookies, headers } from "next/headers";
import type { RecycleCandidate } from "@/types/recycler";

export async function getRecycleCandidates(): Promise<RecycleCandidate[]> {
  const cookieStore = await cookies();
  const hdrs = await headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const cookie = cookieStore.getAll()
    .map((c) => `${c.name}=${c.value}`).join("; ");
  const res = await fetch(`${proto}://${host}/api/recycler/candidates`, {
    headers: { cookie }, cache: "no-store",
  });
  if (!res.ok) return [];
  const json = (await res.json()) as { candidates?: RecycleCandidate[] };
  return json.candidates ?? [];
}
