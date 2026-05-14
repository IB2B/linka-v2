import { adminApi } from "@/lib/admin/api";
import type { AdminPayment } from "@/types/admin-payment";

type Range = { from?: string; to?: string };

export async function getAdminPayments(range: Range = {}): Promise<AdminPayment[]> {
  const p = new URLSearchParams();
  if (range.from) p.set("from", range.from);
  if (range.to) p.set("to", range.to);
  const res = await adminApi(`/api/admin/payments${p.size ? `?${p}` : ""}`);
  if (!res.ok) return [];
  const j = (await res.json()) as { payments: AdminPayment[] };
  return j.payments ?? [];
}
