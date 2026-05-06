import { SettingsSection } from "./settings-section";
import { PasswordForm } from "./password-form";
import { ActiveSessions } from "./active-sessions";

export function PasswordSection() {
  return (
    <div className="space-y-10">
      <SettingsSection
        title="Security"
        description="Change your account password."
      >
        <PasswordForm />
      </SettingsSection>
      <SettingsSection
        title="Active Sessions"
        description="Devices currently signed in to your account."
      >
        <ActiveSessions />
      </SettingsSection>
    </div>
  );
}
