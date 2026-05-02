import { SettingsSection } from "./settings-section";
import { PreferencesForm } from "./preferences-form";

export function PreferencesSection() {
  return (
    <SettingsSection
      title="Preferences"
      description="Customize your language and timezone."
    >
      <PreferencesForm />
    </SettingsSection>
  );
}
