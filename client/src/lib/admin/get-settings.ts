import { adminApi } from "@/lib/admin/api";
import type { IntegrationStatus } from "@/types/admin";

export async function getIntegrations(): Promise<IntegrationStatus[]> {
  const res = await adminApi("/api/admin/settings/integrations");
  if (!res.ok) return [];
  const j = (await res.json()) as { integrations: IntegrationStatus[] };
  return j.integrations;
}
