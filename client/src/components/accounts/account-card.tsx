import { PLATFORMS } from "@/lib/zernio/platforms";
import { PLATFORM_CONTENT } from "@/lib/zernio/platform-content";
import { AccountCardActions } from "./account-card-actions";
import { AccountStatusBadge } from "./account-status-badge";
import { PlatformIcon } from "./platform-icon";
import type { ZernioAccount } from "@/lib/zernio/zernio-account.types";

type Props = { account: ZernioAccount };

export function AccountCard({ account }: Props) {
  const meta = PLATFORMS.find((p) => p.slug === account.platform)!;
  const content = PLATFORM_CONTENT[account.platform];
  return (
    <div className="flex w-full items-center gap-4 rounded-xl border bg-card p-4 transition-colors hover:border-foreground/20">
      <div
        className="flex size-12 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${meta.color}15` }}
      >
        <PlatformIcon
          platform={account.platform}
          className="size-6"
          style={{ color: meta.color }}
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">{meta.label}</p>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">{content.category}</span>
        </div>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {account.connected ? `@${account.username}` : content.description}
        </p>
      </div>
      <AccountStatusBadge connected={account.connected} />
      <AccountCardActions
        platform={account.platform}
        connected={account.connected}
        accountId={account.id}
      />
    </div>
  );
}
