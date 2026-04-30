import { socialFetch } from "./server-fetch";
import type { Platform } from "./zernio-account.types";

export async function getConnectUrl(platform: Platform): Promise<string> {
  const data = await socialFetch<{ url: string }>(
    `/api/social/connect/${platform}`,
  );
  return data.url;
}
