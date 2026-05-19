import { SettingsSection } from "./settings-section";
import { ProfileAvatar } from "./profile-avatar";
import { ProfileForm } from "./profile-form";
import { ProfileWorkForm } from "./profile-work-form";

type Props = {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
  jobTitle: string;
  industry: string;
  headline: string;
};

export function ProfileSection({
  avatarUrl, firstName, lastName, email,
  jobTitle, industry, headline,
}: Props) {
  return (
    <div className="space-y-10">
      <SettingsSection
        title="Profile"
        description="Your personal information and contact details."
      >
        <div className="space-y-4">
          <ProfileAvatar
            avatarUrl={avatarUrl} firstName={firstName} email={email}
          />
          <ProfileForm
            firstName={firstName} lastName={lastName} email={email}
          />
        </div>
      </SettingsSection>
      <SettingsSection
        title="Work Profile"
        description="Used to personalize AI-generated content to your context."
      >
        <ProfileWorkForm
          jobTitle={jobTitle} industry={industry} headline={headline}
        />
      </SettingsSection>
    </div>
  );
}
