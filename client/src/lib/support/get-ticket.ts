import { cookies } from "next/headers";

import type { TicketDetail } from "./support.types";

const API_BASE = process.env.API_URL ?? "http://localhost:4000";

export async function getTicket(id: string): Promise<TicketDetail | null> {
  const cookieStore = await cookies();
  const res = await fetch(`${API_BASE}/api/support/tickets/${id}`, {
    headers: { cookie: cookieStore.toString() },
    cache: "no-store",
  });
  if (!res.ok) return null;
  return (await res.json()) as TicketDetail;
}
