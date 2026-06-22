import { SettingsSection } from "./settings-section";
import { PreferencesForm } from "./preferences-form";
import { PostLanguageForm } from "./post-language-form";

export function PreferencesSection({ postLanguage }: { postLanguage: string }) {
  return (
    <SettingsSection
      title="Preferences"
      description="Customize your interface and post defaults."
    >
      <div className="space-y-6">
        <PreferencesForm />
        <PostLanguageForm initial={postLanguage} />
      </div>
    </SettingsSection>
  );
}
