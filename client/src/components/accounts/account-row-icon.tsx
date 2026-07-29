import { PlatformIcon } from "./platform-icon";
import { PLATFORMS } from "@/lib/zernio/platforms";
import type { Platform } from "@/lib/zernio/zernio-account.types";

// X and Threads are pure black, which disappears on a dark background — those
// two follow the text colour instead of their brand hex.
const MONOCHROME: ReadonlySet<Platform> = new Set<Platform>(["twitter", "threads"]);

export function AccountRowIcon({ platform }: { platform: Platform }) {
  const meta = PLATFORMS.find((p) => p.slug === platform)!;
  const mono = MONOCHROME.has(platform);
  return (
    <PlatformIcon
      platform={platform}
      className={mono ? "size-4 shrink-0 text-foreground" : "size-4 shrink-0"}
      style={mono ? undefined : { color: meta.color }}
    />
  );
}
