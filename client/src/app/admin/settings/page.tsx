import { PageHeader } from "@/components/dashboard/page-header";
import { SettingsContent } from "@/components/admin/settings/settings-content";
import { SettingsNav } from "@/components/admin/settings/settings-nav";
import { fetchMe } from "@/lib/auth/me";
import { getIntegrations, getSettings } from "@/lib/admin/get-settings";

export const dynamic = "force-dynamic";

const NAV = [
  { id: "policies",      label: "Platform policies" },
  { id: "notifications", label: "Notifications" },
  { id: "branding",      label: "Branding" },
  { id: "profile",       label: "My profile" },
  { id: "integrations",  label: "Integrations" },
  { id: "danger",        label: "Danger zone" },
];

type Props = { searchParams: Promise<{ section?: string }> };

export default async function AdminSettingsPage({ searchParams }: Props) {
  const [{ section }, settings, integrations, me] = await Promise.all([
    searchParams, getSettings(), getIntegrations(), fetchMe(),
  ]);
  if (!settings || !me) {
    return <p className="text-sm text-muted-foreground">Failed to load settings.</p>;
  }
  const active = NAV.find((n) => n.id === section)?.id ?? "policies";
  return (
    <>
      <PageHeader
        title="Settings"
        description="Platform policies, alerts, branding and your admin profile."
      />
      <div className="grid gap-6 md:grid-cols-[180px_1fr] md:gap-8">
        <SettingsNav items={NAV} active={active} />
        <SettingsContent section={active} settings={settings} integrations={integrations} me={me} />
      </div>
    </>
  );
}
