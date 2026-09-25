import { socialFetch } from "@/lib/zernio/server-fetch";
import type { UsageSummary } from "@/types/usage";

// Server-side read of the user's limits. Null if the API is unreachable, so the
// generate page still renders without the limits card.
export async function getUsage(): Promise<UsageSummary | null> {
  try {
    return await socialFetch<UsageSummary>("/api/users/me/usage");
  } catch {
    return null;
  }
}
