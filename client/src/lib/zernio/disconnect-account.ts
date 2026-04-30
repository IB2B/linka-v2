import { socialFetch } from "./server-fetch";

export async function disconnectAccount(accountId: string): Promise<void> {
  await socialFetch(`/api/social/accounts/${accountId}`, { method: "DELETE" });
}
