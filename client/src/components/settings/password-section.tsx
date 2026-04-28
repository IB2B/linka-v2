import { Separator } from "@/components/ui/separator";
import { SettingsSection } from "./settings-section";
import { PasswordForm } from "./password-form";
import { ActiveSessions } from "./active-sessions";

export function PasswordSection() {
  return (
    <div className="space-y-10">
      <SettingsSection title="Security" description="Change your account password.">
        <PasswordForm />
      </SettingsSection>
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold tracking-tight">Active Sessions</h2>
          <p className="text-sm text-muted-foreground">
            Devices currently signed in to your account.
          </p>
        </div>
        <Separator />
        <ActiveSessions />
      </div>
    </div>
  );
}
