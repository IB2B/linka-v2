import { PlatformIcon } from "./platform-icon";
import { PLATFORMS } from "@/lib/zernio/platforms";
import { cn } from "@/lib/utils";
import type { Platform } from "@/lib/zernio/zernio-account.types";

type Props = { platform: Platform; connected: boolean };

// Brand colour once connected, muted grey while it is still available —
// so status reads at a glance without depending on the toggle alone.
export function AccountRowIcon({ platform, connected }: Props) {
  const meta = PLATFORMS.find((p) => p.slug === platform)!;
  return (
    <PlatformIcon
      platform={platform}
      className={cn("size-4 shrink-0", !connected && "text-muted-foreground/50")}
      style={connected ? { color: meta.color } : undefined}
    />
  );
}
