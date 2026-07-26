import { Suspense } from "react";
import { getLocale, getTranslations } from "next-intl/server";

import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/dashboard/page-header";
import { SettingsShell } from "@/components/settings/settings-shell";
import { AccountsToast } from "@/components/accounts/accounts-toast";
import { fetchMe } from "@/lib/auth/me";
import { getAccounts } from "@/lib/zernio/get-accounts";
import { fetchPlatformInstructions } from "@/lib/api/platform-instructions";

export default async function SettingsPage() {
  const [me, accounts, instructions, locale, t] = await Promise.all([
    fetchMe(), getAccounts(), fetchPlatformInstructions(), getLocale(),
    getTranslations("settings"),
  ]);
  const preferredLanguage = me?.preferredLanguage ?? locale ?? "en";

  return (
    <>
      <Suspense>
        <AccountsToast />
      </Suspense>
      <PageHeader title={t("title")} description={t("description")} />
      <Separator className="my-2" />
      <SettingsShell
        firstName={me?.firstName ?? ""}
        lastName={me?.lastName ?? ""}
        email={me?.email ?? ""}
        avatarUrl={me?.avatarUrl ?? null}
        jobTitle={me?.jobTitle ?? ""}
        industry={me?.industry ?? ""}
        headline={me?.bio ?? ""}
        preferredLanguage={preferredLanguage}
        accounts={accounts}
        instructions={instructions}
      />
    </>
  );
}
