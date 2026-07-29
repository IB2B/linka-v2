"use client";

import { AccountToggleRow } from "./account-toggle-row";
import { AccountDisconnectConfirm } from "./account-disconnect-confirm";
import { useAccountToggle } from "./use-account-toggle";
import type { ZernioAccount } from "@/lib/zernio/zernio-account.types";

export function AccountToggleList({ accounts }: { accounts: ZernioAccount[] }) {
  const { busy, confirming, setConfirming, toggle, confirmDisconnect } =
    useAccountToggle();

  return (
    <>
      <div className="max-w-xl divide-y overflow-hidden rounded-xl border bg-card">
        {accounts.map((account) => (
          <AccountToggleRow
            key={account.platform}
            account={account}
            pending={busy === account.platform}
            onToggle={(next) => toggle(account, next)}
          />
        ))}
      </div>
      <AccountDisconnectConfirm
        account={confirming}
        onOpenChange={(open) => !open && setConfirming(null)}
        onConfirm={confirmDisconnect}
      />
    </>
  );
}
