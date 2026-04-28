import { SettingsSection } from "./settings-section";
import { PreferencesForm } from "./preferences-form";

export function PreferencesSection() {
  return (
    <SettingsSection
      title="Preferences"
      description="Customize your theme, language, and timezone."
    >
      <PreferencesForm />
    </SettingsSection>
  );
}
