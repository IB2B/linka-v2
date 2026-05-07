"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { ConnectedAccountBubble } from "./connected-account-bubble";
import { ConnectedAccountsRow } from "./connected-accounts-row";
import type { ZernioAccount } from "@/lib/zernio/zernio-account.types";
import { PLATFORMS } from "@/lib/zernio/platforms";

const MAX_VISIBLE = 3;

const dmCapable = new Set(
  PLATFORMS.filter((p) => p.inboxCapability === "dms").map((p) => p.slug),
);

export function ConnectedAccountsStack({ accounts }: { accounts: ZernioAccount[] }) {
  const inboxAccounts = accounts.filter((a) => dmCapable.has(a.platform));
  const connected = inboxAccounts.filter((a) => a.connected);
  const disconnected = inboxAccounts.filter((a) => !a.connected);
  const visible = connected.slice(0, MAX_VISIBLE);
  const hidden = connected.length - visible.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Connected accounts"
        className="inline-flex items-center gap-1.5 rounded-full px-1 py-0.5 transition-colors hover:bg-accent"
      >
        <div className="flex -space-x-2">
          {visible.map((a) => (
            <ConnectedAccountBubble key={a.id} account={a} />
          ))}
          {hidden > 0 && (
            <span className="flex size-8 items-center justify-center rounded-full bg-muted text-[11px] font-medium text-muted-foreground ring-2 ring-card">
              +{hidden}
            </span>
          )}
          {connected.length === 0 && (
            <span className="text-xs text-muted-foreground">No accounts</span>
          )}
        </div>
        <ChevronDown className="size-3.5 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64 p-1">
        {connected.map((a) => (
          <ConnectedAccountsRow key={a.platform} account={a} />
        ))}
        {disconnected.length > 0 && (
          <>
            <p className="mt-1 px-2 pt-1.5 pb-1 text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
              Not connected
            </p>
            {disconnected.map((a) => (
              <ConnectedAccountsRow key={a.platform} account={a} />
            ))}
          </>
        )}
        <Link
          href="/dashboard/accounts"
          className="mt-1 block rounded-md px-2 py-1.5 text-center text-xs font-medium text-primary hover:bg-accent"
        >
          Manage accounts →
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
