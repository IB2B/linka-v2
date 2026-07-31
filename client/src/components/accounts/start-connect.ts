"use client";

import { toast } from "sonner";

import { connectAction } from "@/app/dashboard/accounts/actions";
import type { Platform } from "@/lib/zernio/zernio-account.types";

// Shared by the settings toggles and the account cards so a failed connect
// behaves the same in both: stay on the page, say what happened.
export async function startConnect(platform: Platform): Promise<void> {
  const result = await connectAction(platform);
  if ("error" in result) {
    toast.error(result.error);
    return;
  }
  window.location.assign(result.url);
}
