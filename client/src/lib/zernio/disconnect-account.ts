import { zernioFetch } from "./client";

export async function disconnectAccount(accountId: string): Promise<void> {
  await zernioFetch(`/accounts/${accountId}`, { method: "DELETE" });
}
