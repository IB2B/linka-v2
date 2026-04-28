import { Suspense } from "react";

import { PageHeader } from "@/components/dashboard/page-header";
import { AccountGrid } from "@/components/accounts/account-grid";
import { AccountsToast } from "@/components/accounts/accounts-toast";
import { getAccounts } from "@/lib/zernio/get-accounts";

export default async function AccountsPage() {
  const accounts = await getAccounts();

  return (
    <>
      <Suspense>
        <AccountsToast />
      </Suspense>
      <PageHeader
        title="Connected Accounts"
        description="Connect your social media accounts to start publishing."
      />
      <AccountGrid accounts={accounts} />
    </>
  );
}
