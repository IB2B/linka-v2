import { ConnectedAccountBubble } from "./connected-account-bubble";
import { PLATFORMS } from "@/lib/zernio/platforms";
import type { ZernioAccount } from "@/lib/zernio/zernio-account.types";

export function ConnectedAccountsRow({ account }: { account: ZernioAccount }) {
  const meta = PLATFORMS.find((p) => p.slug === account.platform);
  return (
    <div className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm hover:bg-accent">
      <ConnectedAccountBubble account={account} ringClass="ring-popover" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium">
          {meta?.label ?? account.platform}
        </p>
        <p className="truncate text-[11px] text-muted-foreground">
          {account.connected ? `@${account.username}` : "Not connected"}
        </p>
      </div>
      <span
        className={
          account.connected
            ? "size-1.5 rounded-full bg-emerald-500"
            : "size-1.5 rounded-full bg-zinc-300"
        }
        aria-hidden
      />
    </div>
  );
}
