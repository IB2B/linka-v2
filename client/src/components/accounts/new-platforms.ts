import type { Platform } from "@/lib/zernio/zernio-account.types";

// Platforms recently added to linka — surfaced with a "New" badge in the
// Connected Accounts list. Drop a slug once it stops being news.
export const NEW_PLATFORMS: ReadonlySet<Platform> = new Set<Platform>([
  "bluesky",
  "reddit",
  "threads",
  "tiktok",
  "youtube",
]);
