import { PLATFORMS } from "./platforms";
import { zernioFetch } from "./client";
import type { ZernioAccount, Platform } from "./zernio-account.types";

type RawAccount = {
  id: string;
  platform: string;
  username: string;
  avatar_url?: string | null;
};

export async function getAccounts(): Promise<ZernioAccount[]> {
  let connected: RawAccount[] = [];

  try {
    const data = await zernioFetch<{ accounts: RawAccount[] }>("/accounts");
    connected = data.accounts ?? [];
  } catch {
    // Return all platforms as disconnected if API fails
  }

  return PLATFORMS.map((p) => {
    const match = connected.find((a) => a.platform === p.slug);
    return match
      ? {
          id: match.id,
          platform: p.slug as Platform,
          username: match.username,
          avatar_url: match.avatar_url ?? null,
          connected: true,
        }
      : {
          id: "",
          platform: p.slug,
          username: "",
          avatar_url: null,
          connected: false,
        };
  });
}
