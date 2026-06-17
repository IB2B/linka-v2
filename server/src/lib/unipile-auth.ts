import { unipileJson, unipileFetch, unipileBaseUrl } from "./unipile-api";
import { saveLinkedinAccount } from "./unipile-account";
import type { HostedAuthResp, UnipileAccountList } from "./unipile-types";

// Mint a one-time hosted-auth link. The user logs into LinkedIn on Unipile's
// page (2FA/checkpoints handled there); credentials never touch this app.
export async function createHostedAuthLink(userId: string): Promise<string> {
  const app = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const expiresOn = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  const r = await unipileJson<HostedAuthResp>("/hosted/accounts/link", {
    type: "create",
    providers: ["LINKEDIN"],
    api_url: unipileBaseUrl(),
    expiresOn,
    success_redirect_url: `${app}/dashboard/inbox?linkedin=connected`,
    failure_redirect_url: `${app}/dashboard/inbox?linkedin=failed`,
    notify_url: `${app}/api/linkedin/webhook`,
    name: userId,
  });
  if (!r.url) throw new Error("Unipile did not return a hosted auth URL");
  return r.url;
}

// Fallback for when the notify webhook can't reach us (e.g. localhost dev):
// after the user returns, match their fresh LinkedIn account by the name we set.
export async function syncConnectedAccount(userId: string): Promise<boolean> {
  const list = await unipileFetch<UnipileAccountList>("/accounts");
  const linkedins = (list.items ?? []).filter((a) => (a.type ?? "").toUpperCase() === "LINKEDIN");
  const mine = linkedins.find((a) => a.name === userId) ?? linkedins[linkedins.length - 1];
  if (!mine) return false;
  await saveLinkedinAccount(userId, mine.id);
  return true;
}
