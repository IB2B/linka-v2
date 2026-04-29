import { cookies, headers } from "next/headers";
import type { BillingOverview } from "@/types/billing-overview";

export type OverviewResult =
  | { ok: true; overview: BillingOverview }
  | { ok: false; error: string };

export async function getBillingOverview(): Promise<OverviewResult> {
  const cookieStore = await cookies();
  const hdrs = await headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const cookie = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; ");

  try {
    const res = await fetch(`${proto}://${host}/api/billing/overview`, {
      headers: { cookie },
      cache: "no-store",
    });
    const json = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) return { ok: false, error: json.error ?? `HTTP ${res.status}` };
    return { ok: true, overview: json as unknown as BillingOverview };
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }
}
