import { zernioFetch } from "./client";
import type { Platform } from "./zernio-account.types";

type ConnectUrlResponse = { url: string };

export async function getConnectUrl(platform: Platform): Promise<string> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const redirectUri = `${appUrl}/api/social/callback`;

  const data = await zernioFetch<ConnectUrlResponse>(
    `/connect/url?platform=${platform}&redirect_uri=${encodeURIComponent(redirectUri)}`
  );

  return data.url;
}
