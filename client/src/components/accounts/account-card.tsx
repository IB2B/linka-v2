import { PLATFORMS } from "@/lib/zernio/platforms";
import { AccountCardActions } from "./account-card-actions";
import { PlatformIcon } from "./platform-icon";
import type { ZernioAccount } from "@/lib/zernio/zernio-account.types";

type Props = { account: ZernioAccount };

export function AccountCard({ account }: Props) {
  const meta = PLATFORMS.find((p) => p.slug === account.platform)!;

  return (
    <div
      className="flex w-full items-center gap-4 rounded-xl border bg-card p-4 transition-colors"
      style={
        account.connected
          ? { borderColor: `${meta.color}50` }
          : undefined
      }
    >
      <div className="flex size-12 shrink-0 items-center justify-center">
        <PlatformIcon
          platform={account.platform}
          className="size-7"
          style={{ color: meta.color }}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">{meta.label}</p>
          {account.connected && (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-[11px] font-medium text-green-600 dark:text-green-400">
              <span className="size-1.5 rounded-full bg-green-500" />
              Connected
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {account.connected ? `@${account.username}` : "Not connected — click to link your account"}
        </p>
      </div>

      <AccountCardActions
        platform={account.platform}
        connected={account.connected}
        accountId={account.id}
      />
    </div>
  );
}
