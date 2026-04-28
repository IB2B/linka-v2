import { SettingsSection } from "./settings-section";
import { NotificationsForm } from "./notifications-form";

export function NotificationsSection() {
  return (
    <SettingsSection
      title="Notifications"
      description="Choose which emails you want to receive."
    >
      <NotificationsForm />
    </SettingsSection>
  );
}
