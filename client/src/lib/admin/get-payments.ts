import { adminApi } from "@/lib/admin/api";
import type { AdminCharge, AdminInvoice } from "@/types/admin-payment";

export async function getAdminCharges(): Promise<AdminCharge[]> {
  const res = await adminApi("/api/admin/payments/charges");
  if (!res.ok) return [];
  const j = (await res.json()) as { charges: AdminCharge[] };
  return j.charges ?? [];
}

export async function getAdminInvoices(): Promise<AdminInvoice[]> {
  const res = await adminApi("/api/admin/payments/invoices");
  if (!res.ok) return [];
  const j = (await res.json()) as { invoices: AdminInvoice[] };
  return j.invoices ?? [];
}
