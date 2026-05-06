import { cookies, headers } from "next/headers";
import type { RecycleSettings } from "@/types/recycler";

const DEFAULT: RecycleSettings = {
  enabled: false, perWeek: 1, minAgeDays: 30, lastRunAt: null,
};

export async function getRecycleSettings(): Promise<RecycleSettings> {
  const cookieStore = await cookies();
  const hdrs = await headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const cookie = cookieStore.getAll()
    .map((c) => `${c.name}=${c.value}`).join("; ");
  const res = await fetch(`${proto}://${host}/api/recycler/settings`, {
    headers: { cookie }, cache: "no-store",
  });
  if (!res.ok) return DEFAULT;
  const json = (await res.json()) as { settings?: RecycleSettings };
  return json.settings ?? DEFAULT;
}
