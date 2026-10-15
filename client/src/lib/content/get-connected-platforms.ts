import { socialFetch } from "@/lib/zernio/server-fetch";
import { PLATFORMS, type Platform } from "./platforms";

type Response = { accounts?: { platform: string }[]; unavailable?: boolean };

// The post platforms the user has connected, in the generator's order.
// null means we couldn't check (provider down, bad profile), which is not
// the same as "nothing connected": the picker then offers every platform.
export async function getConnectedPlatforms(): Promise<Platform[] | null> {
  try {
    const data = await socialFetch<Response>("/api/social/accounts");
    if (data.unavailable) return null;
    const connected = new Set((data.accounts ?? []).map((a) => a.platform));
    return PLATFORMS.map((p) => p.value).filter((v) => connected.has(v));
  } catch {
    return null;
  }
}
