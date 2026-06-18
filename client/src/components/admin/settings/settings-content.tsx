import { AdminProfileForm } from "@/components/admin/settings/admin-profile-form";
import { EmailTestForm } from "@/components/admin/settings/email-test-form";
import { IntegrationsList } from "@/components/admin/settings/integrations-list";
import { PlatformForm } from "@/components/admin/settings/platform-form";
import { SettingsSection } from "@/components/admin/settings/settings-section";
import type { IntegrationStatus, PlatformSettings } from "@/types/admin-settings.types";
import type { Me } from "@/lib/auth/me";

type Props = {
  section: string;
  integrations: IntegrationStatus[];
  checkedAt: string | null;
  platform: PlatformSettings;
  me: Me;
};

export function SettingsContent({ section, integrations, checkedAt, platform, me }: Props) {
  switch (section) {
    case "platform":
      return (
        <SettingsSection
          title="Platform"
          description="Controls that affect every client: sign-ups, maintenance, and announcements."
        >
          <PlatformForm initial={platform} />
        </SettingsSection>
      );
    case "integrations":
      return (
        <SettingsSection
          title="Integrations"
          description="Live health of third-party services. Keys live in server .env, never surfaced here."
        >
          <IntegrationsList integrations={integrations} checkedAt={checkedAt} />
        </SettingsSection>
      );
    case "email":
      return (
        <SettingsSection
          title="Email test"
          description="Send a one-off test through the configured SMTP transport."
        >
          <EmailTestForm defaultTo={me.email} />
        </SettingsSection>
      );
    default:
      return (
        <SettingsSection
          title="My admin profile"
          description="Your name and password — not visible to other admins."
        >
          <AdminProfileForm
            firstName={me.firstName} lastName={me.lastName} email={me.email}
            avatarUrl={me.avatarUrl ?? null}
          />
        </SettingsSection>
      );
  }
}
