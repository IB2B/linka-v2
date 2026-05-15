import { resolvePlatformAccounts } from "./late-accounts";

export async function userOwnsAccount(userId: string, accountId: string): Promise<boolean> {
  if (!accountId) return false;
  const accounts = await resolvePlatformAccounts(userId, []);
  return accounts.some((a) => a.accountId === accountId);
}
