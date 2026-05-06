import { cn } from "@/lib/utils";
import { PlatformIcon } from "@/components/accounts/platform-icon";
import { PLATFORMS } from "@/lib/zernio/platforms";
import type { ZernioAccount } from "@/lib/zernio/zernio-account.types";

type Props = { account: ZernioAccount; ringClass?: string };

export function ConnectedAccountBubble({ account, ringClass }: Props) {
  const meta = PLATFORMS.find((p) => p.slug === account.platform);
  const dim = !account.connected;
  const initial = account.username.trim().slice(0, 1).toUpperCase() || "?";
  return (
    <div className="relative">
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-xs font-medium text-muted-foreground ring-2",
          ringClass ?? "ring-card",
          dim && "opacity-40 grayscale",
        )}
      >
        {account.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={account.avatar_url} alt="" className="h-full w-full object-cover" />
        ) : (
          <span>{initial}</span>
        )}
      </div>
      <span
        className={cn(
          "absolute -right-0.5 -bottom-0.5 flex size-3.5 items-center justify-center rounded-full ring-1 ring-card",
          dim && "opacity-50",
        )}
        style={{ background: meta?.gradient ?? meta?.color ?? "#737373" }}
      >
        <PlatformIcon
          platform={account.platform}
          className="size-2.5 text-white"
        />
      </span>
    </div>
  );
}
