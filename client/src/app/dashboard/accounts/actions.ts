"use server";

import { redirect } from "next/navigation";

import { getConnectUrl } from "@/lib/zernio/get-connect-url";
import { connectErrorMessage } from "@/lib/zernio/connect-error";
import { disconnectAccount } from "@/lib/zernio/disconnect-account";
import type { Platform } from "@/lib/zernio/zernio-account.types";

export type ConnectResult = { url: string } | { error: string };

// Returns the URL instead of redirecting to it: a throw here would take the
// whole route down to the error boundary, which in production is a bare "Ooops"
// with the reason stripped out. The caller navigates, or shows the reason.
export async function connectAction(platform: Platform): Promise<ConnectResult> {
  try {
    return { url: await getConnectUrl(platform) };
  } catch (err) {
    console.error(`[connect] ${platform} failed:`, err);
    return { error: connectErrorMessage(err) };
  }
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
