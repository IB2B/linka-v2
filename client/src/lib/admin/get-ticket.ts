import { adminApi } from "@/lib/admin/api";
import type { TicketDetail } from "@/types/admin-ticket-detail";

export async function getAdminTicket(id: string): Promise<TicketDetail | null> {
  const res = await adminApi(`/api/admin/support/${id}`);
  if (!res.ok) return null;
  return (await res.json()) as TicketDetail;
}
