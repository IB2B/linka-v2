import { PageHeader } from "@/components/dashboard/page-header";
import { SettingsContent } from "@/components/admin/settings/settings-content";
import { SettingsNav } from "@/components/admin/settings/settings-nav";
import { fetchMe } from "@/lib/auth/me";
import { getIntegrations, getPlatformSettings } from "@/lib/admin/get-settings";

export const dynamic = "force-dynamic";

const NAV = [
  { id: "profile",      label: "My profile" },
  { id: "platform",     label: "Platform" },
  { id: "integrations", label: "Integrations" },
  { id: "email",        label: "Email test" },
];

type Props = { searchParams: Promise<{ section?: string }> };

export default async function AdminSettingsPage({ searchParams }: Props) {
  const [{ section }, integrations, platform, me] = await Promise.all([
    searchParams, getIntegrations(), getPlatformSettings(), fetchMe(),
  ]);
  if (!me) {
    return <p className="text-sm text-muted-foreground">Failed to load settings.</p>;
  }
  const active = NAV.find((n) => n.id === section)?.id ?? "profile";
  return (
    <>
      <PageHeader
        title="Settings"
        description="Your admin profile, third-party integrations health and SMTP test."
      />
      <div className="grid gap-6 md:grid-cols-[180px_1fr] md:gap-8">
        <SettingsNav items={NAV} active={active} />
        <SettingsContent
          section={active}
          integrations={integrations.integrations}
          checkedAt={integrations.checkedAt}
          platform={platform}
          me={me}
        />
      </div>
    </>
  );
}
