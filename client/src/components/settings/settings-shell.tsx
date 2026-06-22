"use client";

import { useState } from "react";

import { ProfileSection } from "./profile-section";
import { PasswordSection } from "./password-section";
import { PreferencesSection } from "./preferences-section";
import { NotificationsSection } from "./notifications-section";
import { ConnectedAccountsSection } from "./connected-accounts-section";
import { DangerSection } from "./danger-section";
import { ServicesSection } from "./services-section";
import { SettingsNav } from "./settings-nav";
import type { ZernioAccount } from "@/lib/zernio/zernio-account.types";

type Props = {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
  jobTitle: string;
  industry: string;
  headline: string;
  preferredLanguage: string;
  accounts: ZernioAccount[];
};

export function SettingsShell({ accounts, preferredLanguage, ...profile }: Props) {
  const [active, setActive] = useState("profile");

  return (
    <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-12">
      <SettingsNav active={active} onSelect={setActive} />
      <div className="min-w-0 pb-24">
        {active === "profile" && <ProfileSection {...profile} />}
        {active === "security" && <PasswordSection />}
        {active === "preferences" && <PreferencesSection postLanguage={preferredLanguage} />}
        {active === "notifications" && <NotificationsSection />}
        {active === "accounts" && <ConnectedAccountsSection accounts={accounts} />}
        {active === "services" && <ServicesSection />}
        {active === "danger" && <DangerSection email={profile.email} />}
      </div>
    </div>
  );
}
