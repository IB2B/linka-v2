import { SettingsSection } from "./settings-section";
import { AccountToggleList } from "@/components/accounts/account-toggle-list";
import type { ZernioAccount } from "@/lib/zernio/zernio-account.types";

type Props = { accounts: ZernioAccount[] };

export function ConnectedAccountsSection({ accounts }: Props) {
  return (
    <SettingsSection
      title="Connected Accounts"
      description="Flip a platform on to connect it. Connected accounts are ready to post to."
    >
      <AccountToggleList accounts={accounts} />
    </SettingsSection>
  );
}
