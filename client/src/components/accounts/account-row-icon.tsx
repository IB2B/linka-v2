import { PlatformIcon } from "./platform-icon";
import { PLATFORMS } from "@/lib/zernio/platforms";
import type { Platform } from "@/lib/zernio/zernio-account.types";

// X and Threads are pure black, which disappears on a dark background — those
// two follow the text colour instead of their brand hex.
const MONOCHROME: ReadonlySet<Platform> = new Set<Platform>(["twitter", "threads"]);

// Brand logo on a faint tile of its own colour, so each row has a stable anchor.
export function AccountRowIcon({ platform }: { platform: Platform }) {
  const meta = PLATFORMS.find((p) => p.slug === platform)!;
  const mono = MONOCHROME.has(platform);
  return (
    <span
      className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted/60"
      style={mono ? undefined : { backgroundColor: `${meta.color}1f` }}
    >
      <PlatformIcon
        platform={platform}
        className={mono ? "size-4 text-foreground" : "size-4"}
        style={mono ? undefined : { color: meta.color }}
      />
    </span>
  );
}
