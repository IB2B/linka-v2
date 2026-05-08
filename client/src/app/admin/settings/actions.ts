"use server";

import { revalidatePath } from "next/cache";
import { adminApi, readError } from "@/lib/admin/api";
import type { AppSettings } from "@/types/admin";

type Result = { error?: string; success?: boolean };

export async function updateSettingsAction(input: Partial<AppSettings>): Promise<Result> {
  const res = await adminApi("/api/admin/settings", {
    method: "PATCH", body: JSON.stringify(input),
  });
  if (!res.ok) return { error: await readError(res, "Failed to update settings.") };
  revalidatePath("/admin/settings");
  return { success: true };
}
