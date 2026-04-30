import { cookies, headers } from "next/headers";

import type { SupportTicket } from "./support.types";

export async function getTickets(): Promise<SupportTicket[]> {
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);
  const host = headerStore.get("host");
  const proto = headerStore.get("x-forwarded-proto") ?? "http";
  const res = await fetch(`${proto}://${host}/api/support/tickets`, {
    headers: { cookie: cookieStore.toString() },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = (await res.json()) as { tickets: SupportTicket[] };
  return data.tickets ?? [];
}
