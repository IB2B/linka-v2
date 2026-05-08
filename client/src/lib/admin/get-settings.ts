import { adminApi } from "@/lib/admin/api";
import type { AppSettings, IntegrationStatus } from "@/types/admin";

export async function getSettings(): Promise<AppSettings | null> {
  const res = await adminApi("/api/admin/settings");
  if (!res.ok) return null;
  return (await res.json()) as AppSettings;
}

export async function getIntegrations(): Promise<IntegrationStatus[]> {
  const res = await adminApi("/api/admin/settings/integrations");
  if (!res.ok) return [];
  const j = (await res.json()) as { integrations: IntegrationStatus[] };
  return j.integrations;
}
