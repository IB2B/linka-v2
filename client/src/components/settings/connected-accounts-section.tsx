import { SettingsSection } from "./settings-section";
import { AccountGrid } from "@/components/accounts/account-grid";
import type { ZernioAccount } from "@/lib/zernio/zernio-account.types";

type Props = { accounts: ZernioAccount[] };

export function ConnectedAccountsSection({ accounts }: Props) {
  return (
    <SettingsSection
      title="Connected Accounts"
      description="Manage your LinkedIn, Facebook, Instagram, X, Threads, and TikTok connections."
    >
      <AccountGrid accounts={accounts} />
    </SettingsSection>
  );
}
