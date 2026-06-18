"use server";

import { adminApi, readError } from "@/lib/admin/api";
import type { PlatformSettings } from "@/types/admin-settings.types";

type Result = { error?: string };

export async function savePlatformSettingsAction(s: PlatformSettings): Promise<Result> {
  const res = await adminApi("/api/admin/settings/platform", {
    method: "PUT",
    body: JSON.stringify(s),
  });
  if (!res.ok) return { error: await readError(res, "Failed to save settings.") };
  return {};
}
