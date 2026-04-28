"use client";

import { useState } from "react";

import { ProfileSection } from "./profile-section";
import { PasswordSection } from "./password-section";
import { PreferencesSection } from "./preferences-section";
import { NotificationsSection } from "./notifications-section";
import { ConnectedAccountsSection } from "./connected-accounts-section";
import { DangerSection } from "./danger-section";
import { SettingsNav } from "./settings-nav";
import type { ZernioAccount } from "@/lib/zernio/zernio-account.types";

type Props = {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
  jobTitle: string;
  companyName: string;
  industry: string;
  headline: string;
  accounts: ZernioAccount[];
};

export function SettingsShell({ accounts, ...profile }: Props) {
  const [active, setActive] = useState("profile");

  return (
    <div className="grid grid-cols-[180px_1fr] gap-12">
      <SettingsNav active={active} onSelect={setActive} />
      <div className="pb-24">
        {active === "profile" && <ProfileSection {...profile} />}
        {active === "security" && <PasswordSection />}
        {active === "preferences" && <PreferencesSection />}
        {active === "notifications" && <NotificationsSection />}
        {active === "accounts" && <ConnectedAccountsSection accounts={accounts} />}
        {active === "danger" && <DangerSection />}
      </div>
    </div>
  );
}
