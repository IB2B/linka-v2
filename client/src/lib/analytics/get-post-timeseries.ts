import { cookies, headers } from "next/headers";
import type { PostSnapshot } from "@/types/analytics";

export async function getPostTimeseries(id: string): Promise<PostSnapshot[]> {
  const cookieStore = await cookies();
  const hdrs = await headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const cookie = cookieStore.getAll()
    .map((c) => `${c.name}=${c.value}`).join("; ");
  try {
    const res = await fetch(
      `${proto}://${host}/api/analytics/posts/${id}/timeseries`,
      { headers: { cookie }, cache: "no-store" },
    );
    if (!res.ok) return [];
    const json = (await res.json()) as { series?: PostSnapshot[] };
    return json.series ?? [];
  } catch {
    return [];
  }
}
