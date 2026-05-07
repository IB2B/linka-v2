import { cookies, headers } from "next/headers";
import { fillEngagementGaps } from "./fill-engagement-gaps";
import type { EngagementDay } from "./engagement.types";

export async function getEngagementSeries(
  days = 30,
): Promise<EngagementDay[]> {
  const cookieStore = await cookies();
  const hdrs = await headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const cookie = cookieStore.getAll()
    .map((c) => `${c.name}=${c.value}`).join("; ");

  const res = await fetch(
    `${proto}://${host}/api/analytics/daily?days=${days}`,
    { headers: { cookie }, cache: "no-store" },
  );
  if (!res.ok) return fillEngagementGaps([], days);
  const j = (await res.json()) as { series: EngagementDay[] };
  return fillEngagementGaps(j.series ?? [], days);
}
