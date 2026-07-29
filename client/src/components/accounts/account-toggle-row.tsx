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
    <div className="flex items-center gap-3.5 px-4 py-3 transition-colors hover:bg-muted/40">
      <AccountRowIcon platform={account.platform} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium">{meta.label}</p>
          {NEW_PLATFORMS.has(account.platform) && (
            <Badge className="border-transparent bg-primary/15 px-1.5 py-0 text-[10px] font-semibold uppercase text-primary">
              New
            </Badge>
          )}
        </div>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {account.connected ? `@${account.username}` : description}
        </p>
      </div>
      {pending ? (
        <Spinner size="xs" className="mr-3.5" />
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
