import { Separator } from "@/components/ui/separator";
import { SettingsSection } from "./settings-section";
import { DangerRow } from "./danger-row";
import { LogoutAllButton } from "./logout-all-button";
import { DeleteAccountButton } from "./delete-account-button";

export function DangerSection({ email }: { email: string }) {
  return (
    <SettingsSection
      title="Danger Zone"
      description="Irreversible actions that affect your account."
    >
      <div className="divide-y divide-destructive/10 overflow-hidden rounded-xl border border-destructive/30">
        <DangerRow
          title="Log out of all devices"
          description="Revokes all active sessions. You will be signed out everywhere."
          action={<LogoutAllButton />}
        />
        <DangerRow
          title="Delete account"
          description="Permanently delete your account and all associated data. This cannot be undone."
          action={<DeleteAccountButton email={email} />}
        />
      </div>
    </SettingsSection>
  );
}
