import { SettingsSection } from "./settings-section";
import { ActionRow } from "./action-row";
import { LogoutAllButton } from "./logout-all-button";
import { DeleteAccountButton } from "./delete-account-button";

export function DangerSection({ email }: { email: string }) {
  return (
    <SettingsSection
      title="Danger Zone"
      description="Irreversible actions that affect your account."
    >
      <div className="divide-y divide-destructive/10 overflow-hidden rounded-xl border border-destructive/30">
        <ActionRow
          title="Log out of all devices"
          description="Revokes all active sessions. You will be signed out everywhere."
          action={<LogoutAllButton />}
        />
        <ActionRow
          title="Delete account"
          description="Permanently delete your account and all associated data. This cannot be undone."
          action={<DeleteAccountButton email={email} />}
        />
      </div>
    </SettingsSection>
  );
}
