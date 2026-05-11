import { cookies, headers } from "next/headers";

import type { TicketDetail } from "./support.types";

export async function getTicket(id: string): Promise<TicketDetail | null> {
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);
  const host = headerStore.get("host");
  const proto = headerStore.get("x-forwarded-proto") ?? "http";
  const res = await fetch(`${proto}://${host}/api/support/tickets/${id}`, {
    headers: { cookie: cookieStore.toString() },
    cache: "no-store",
  });
  if (!res.ok) return null;
  return (await res.json()) as TicketDetail;
}
