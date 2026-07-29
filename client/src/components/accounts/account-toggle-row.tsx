"use client";

import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { FeatureToggle } from "@/components/settings/feature-toggle";
import { AccountRowIcon } from "./account-row-icon";
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
    <div className="flex items-center justify-between gap-4 rounded-lg border bg-card px-3.5 py-3 transition-colors hover:border-foreground/15">
      <div className="min-w-0 space-y-1">
        <div className="flex items-center gap-2">
          <AccountRowIcon platform={account.platform} />
          <p className="text-sm font-medium">{meta.label}</p>
          {NEW_PLATFORMS.has(account.platform) && (
            <Badge className="border-transparent bg-primary/15 px-1.5 py-0 text-[10px] font-semibold uppercase text-primary">
              New
            </Badge>
          )}
        </div>
        <p className="truncate border-l-2 border-primary/70 pl-2 text-xs text-muted-foreground">
          {account.connected ? `Connected as @${account.username}` : description}
        </p>
      </div>
      {pending ? (
        <Spinner size="xs" className="mr-3" />
      ) : (
        <FeatureToggle
          ariaLabel={`${meta.label} connection`}
          checked={account.connected}
          onChange={onToggle}
        />
      )}
    </div>
  );
}
