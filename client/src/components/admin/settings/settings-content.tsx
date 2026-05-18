import { AdminProfileForm } from "@/components/admin/settings/admin-profile-form";
import { EmailTestForm } from "@/components/admin/settings/email-test-form";
import { IntegrationsList } from "@/components/admin/settings/integrations-list";
import { SettingsSection } from "@/components/admin/settings/settings-section";
import type { IntegrationStatus } from "@/types/admin";
import type { Me } from "@/lib/auth/me";

type Props = {
  section: string;
  integrations: IntegrationStatus[];
  me: Me;
};

export function SettingsContent({ section, integrations, me }: Props) {
  switch (section) {
    case "integrations":
      return (
        <SettingsSection
          title="Integrations"
          description="Health check for third-party services. Keys live in server .env, never surfaced here."
        >
          <IntegrationsList integrations={integrations} />
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
