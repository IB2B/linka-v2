"use server";

import { redirect } from "next/navigation";

import { getConnectUrl } from "@/lib/zernio/get-connect-url";
import { disconnectAccount } from "@/lib/zernio/disconnect-account";
import type { Platform } from "@/lib/zernio/zernio-account.types";

export async function connectAction(platform: Platform) {
  const url = await getConnectUrl(platform);
  redirect(url);
}

export async function disconnectAction(accountId: string) {
  await disconnectAccount(accountId);
  redirect("/dashboard/accounts");
}

// Same disconnect without the redirect, for callers that stay on the page
// (Settings keeps the open tab and refreshes in place).
export async function disconnectInPlaceAction(
  accountId: string,
): Promise<{ success: boolean }> {
  await disconnectAccount(accountId);
  return { success: true };
}
