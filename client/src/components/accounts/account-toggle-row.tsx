"use client";

import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { FeatureToggle } from "@/components/settings/feature-toggle";
import { AccountRowIcon } from "./account-row-icon";
import { AccountConnectedLine } from "./account-connected-line";
import { NEW_PLATFORMS } from "./new-platforms";
import { PLATFORMS } from "@/lib/zernio/platforms";
import { PLATFORM_CONTENT } from "@/lib/zernio/platform-content";
import type { ZernioAccount } from "@/lib/zernio/zernio-account.types";

type Props = {
  account: ZernioAccount;
  pending: boolean;
  onToggle: (next: boolean) => void;
};

export function AccountToggleRow({ account, pending, onToggle }: Props) {
  const meta = PLATFORMS.find((p) => p.slug === account.platform)!;
  const { description } = PLATFORM_CONTENT[account.platform];

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border bg-card px-3.5 py-3 text-card-foreground transition-colors hover:border-foreground/15">
      <div className="min-w-0 space-y-1">
        <div className="flex items-center gap-2">
          <AccountRowIcon platform={account.platform} />
          <p className="text-sm font-semibold tracking-tight text-card-foreground">
            {meta.label}
          </p>
          {NEW_PLATFORMS.has(account.platform) && (
            <Badge className="border-transparent bg-amber-500/15 px-1.5 py-0 text-[10px] font-semibold uppercase text-amber-600 dark:text-amber-400">
              New
            </Badge>
          )}
        </div>
        <p className="truncate border-l-2 border-muted-foreground/25 pl-2 text-xs text-muted-foreground/90">
          {description}
        </p>
        <AccountConnectedLine
          connected={account.connected}
          username={account.username}
        />
      </div>
      {pending ? (
        <Spinner size="xs" className="mr-3" />
      ) : (
        <FeatureToggle
          tone="success"
          ariaLabel={`${meta.label} connection`}
          checked={account.connected}
          onChange={onToggle}
        />
      )}
    </div>
  );
}
