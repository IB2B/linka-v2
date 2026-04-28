import { Suspense } from "react";

import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/dashboard/page-header";
import { SettingsShell } from "@/components/settings/settings-shell";
import { AccountsToast } from "@/components/accounts/accounts-toast";
import { fetchMe } from "@/lib/auth/me";
import { getAccounts } from "@/lib/zernio/get-accounts";

export default async function SettingsPage() {
  const [me, accounts] = await Promise.all([fetchMe(), getAccounts()]);

  return (
    <>
      <Suspense>
        <AccountsToast />
      </Suspense>
      <PageHeader
        title="Settings"
        description="Manage your profile, security, and connected accounts."
      />
      <Separator className="my-2" />
      <SettingsShell
        firstName={me?.firstName ?? ""}
        lastName={me?.lastName ?? ""}
        email={me?.email ?? ""}
        avatarUrl={me?.avatarUrl ?? null}
        jobTitle=""
        companyName=""
        industry={me?.industry ?? ""}
        headline={me?.bio ?? ""}
        accounts={accounts}
      />
    </>
  );
}
