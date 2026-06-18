import { adminApi } from "@/lib/admin/api";
import type { IntegrationStatus, PlatformSettings } from "@/types/admin-settings.types";

export type IntegrationsResult = { integrations: IntegrationStatus[]; checkedAt: string | null };

export async function getIntegrations(): Promise<IntegrationsResult> {
  const res = await adminApi("/api/admin/settings/integrations");
  if (!res.ok) return { integrations: [], checkedAt: null };
  const j = (await res.json()) as IntegrationsResult;
  return { integrations: j.integrations ?? [], checkedAt: j.checkedAt ?? null };
}

const PLATFORM_DEFAULTS: PlatformSettings = {
  signupsEnabled: true, maintenanceMode: false, maintenanceMessage: null,
  announcementEnabled: false, announcementMessage: null,
};

export async function getPlatformSettings(): Promise<PlatformSettings> {
  const res = await adminApi("/api/admin/settings/platform");
  if (!res.ok) return PLATFORM_DEFAULTS;
  const j = (await res.json()) as { settings?: PlatformSettings };
  return j.settings ?? PLATFORM_DEFAULTS;
}
