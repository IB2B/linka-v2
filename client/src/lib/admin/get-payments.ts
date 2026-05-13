import { adminApi } from "@/lib/admin/api";
import type { AdminCharge, AdminInvoice } from "@/types/admin-payment";

type Range = { from?: string; to?: string };

export async function getAdminCharges(range: Range = {}): Promise<AdminCharge[]> {
  const qs = new URLSearchParams();
  if (range.from) qs.set("from", range.from);
  if (range.to) qs.set("to", range.to);
  const res = await adminApi(`/api/admin/payments/charges${qs.size ? `?${qs}` : ""}`);
  if (!res.ok) return [];
  const j = (await res.json()) as { charges: AdminCharge[] };
  return j.charges ?? [];
}

export async function getAdminInvoices(range: Range = {}): Promise<AdminInvoice[]> {
  const qs = new URLSearchParams();
  if (range.from) qs.set("from", range.from);
  if (range.to) qs.set("to", range.to);
  const res = await adminApi(`/api/admin/payments/invoices${qs.size ? `?${qs}` : ""}`);
  if (!res.ok) return [];
  const j = (await res.json()) as { invoices: AdminInvoice[] };
  return j.invoices ?? [];
}
