import { PLATFORMS, type Platform } from "./platforms";
import type { ZernioAccount } from "@/lib/zernio/zernio-account.types";

// The platforms we can write posts for that the user has actually connected,
// in the generator's usual order.
export function connectedPostPlatforms(accounts: ZernioAccount[]): Platform[] {
  return PLATFORMS.map((p) => p.value)
    .filter((v) => accounts.some((a) => a.connected && a.platform === v));
}
