import { AccountCard } from "./account-card";
import type { ZernioAccount } from "@/lib/zernio/zernio-account.types";

type Props = { accounts: ZernioAccount[] };

export function AccountGrid({ accounts }: Props) {
  return (
    <div className="flex w-full flex-col gap-2">
      {accounts.map((account) => (
        <AccountCard key={account.platform} account={account} />
      ))}
    </div>
  );
}
