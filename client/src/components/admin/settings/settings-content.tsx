import { AdminProfileForm } from "@/components/admin/settings/admin-profile-form";
import { BrandingForm } from "@/components/admin/settings/branding-form";
import { IntegrationsList } from "@/components/admin/settings/integrations-list";
import { MaintenanceToggle } from "@/components/admin/settings/maintenance-toggle";
import { NotificationsForm } from "@/components/admin/settings/notifications-form";
import { PoliciesForm } from "@/components/admin/settings/policies-form";
import { SettingsSection } from "@/components/admin/settings/settings-section";
import type { AppSettings, IntegrationStatus } from "@/types/admin";
import type { Me } from "@/lib/auth/me";

type Props = {
  section: string;
  settings: AppSettings;
  integrations: IntegrationStatus[];
  me: Me;
};

export function SettingsContent({ section, settings, integrations, me }: Props) {
  switch (section) {
    case "notifications":
      return (
        <SettingsSection title="Notifications & alerts" description="Where critical events get sent.">
          <NotificationsForm initial={settings} />
        </SettingsSection>
      );
    case "branding":
      return (
        <SettingsSection title="Branding & emails" description="Logo, color and transactional email tone.">
          <BrandingForm initial={settings} />
        </SettingsSection>
      );
    case "profile":
      return (
        <SettingsSection title="My admin profile" description="Your name and password — not visible to other admins.">
          <AdminProfileForm firstName={me.firstName} lastName={me.lastName} email={me.email} />
        </SettingsSection>
      );
    case "integrations":
      return (
        <SettingsSection title="Integrations" description="Health check for third-party services. Keys live in server .env, never surfaced here.">
          <IntegrationsList integrations={integrations} />
        </SettingsSection>
      );
    case "danger":
      return (
        <SettingsSection title="Danger zone" description="Operations that affect every user.">
          <MaintenanceToggle initial={settings.maintenanceMode} />
        </SettingsSection>
      );
    default:
      return (
        <SettingsSection title="Platform policies" description="Operational rules applied to every account.">
          <PoliciesForm initial={settings} />
        </SettingsSection>
      );
  }
}
