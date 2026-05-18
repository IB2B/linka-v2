import { PageHeader } from "@/components/dashboard/page-header";
import { RangeTabs } from "@/components/admin/analytics/range-tabs";
import { BreakdownCard } from "@/components/admin/analytics/breakdown-card";
import { UsageHero } from "@/components/admin/ai-usage/usage-hero";
import { UsageChartCard } from "@/components/admin/ai-usage/usage-chart-card";
import { ImageOutcomesCard } from "@/components/admin/ai-usage/image-outcomes-card";
import { TopGenerators } from "@/components/admin/ai-usage/top-generators";
import { ModelBreakdownCard } from "@/components/admin/ai-usage/model-breakdown-card";
import { SpendBreakdownCard } from "@/components/admin/ai-usage/spend-breakdown-card";
import { getAiUsageOverview } from "@/lib/admin/get-ai-usage";
import { platformColorVar } from "@/lib/calendar/platform-color";
import {
  LinkedInIcon, InstagramIcon, XIcon, TikTokIcon,
  YouTubeIcon, FacebookIcon, ThreadsIcon, PinterestIcon,
} from "@/components/onboarding/platform-icons";

const PLATFORM_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  linkedin: LinkedInIcon, instagram: InstagramIcon, x: XIcon, twitter: XIcon,
  tiktok: TikTokIcon, youtube: YouTubeIcon, facebook: FacebookIcon,
  threads: ThreadsIcon, pinterest: PinterestIcon,
};

function platformIcon(key: string) {
  const Icon = PLATFORM_ICONS[key.toLowerCase()];
  return Icon ? <Icon size={12} className="text-muted-foreground" /> : null;
}

export const dynamic = "force-dynamic";

const ALLOWED = new Set([7, 30, 90]);

type Sp = { days?: string };

export default async function AdminAiUsagePage({
  searchParams,
}: { searchParams: Promise<Sp> }) {
  const { days: raw } = await searchParams;
  const days = ALLOWED.has(Number(raw)) ? Number(raw) : 30;
  const data = await getAiUsageOverview(days);

  if (!data) {
    return <p className="text-sm text-muted-foreground">Failed to load AI usage.</p>;
  }
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <PageHeader
          title="AI Usage"
          description="Token consumption, generation volume, image outcomes and cost estimates."
        />
        <RangeTabs days={days} basePath="/admin/ai-usage" />
      </div>
      <div className="space-y-6">
        <UsageHero data={data} />
        <UsageChartCard series={data.series} days={days} />
        <div className="grid auto-rows-min gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <SpendBreakdownCard kpis={data.kpis} />
          <ModelBreakdownCard rows={data.models} />
          <ImageOutcomesCard rows={data.imageBreakdown} />
          <BreakdownCard
            title="Drafts by platform"
            rows={data.platforms}
            emptyText="No drafts in this range."
            icon={platformIcon}
            rowColor={(k) => platformColorVar(k)}
          />
        </div>
        <TopGenerators users={data.topGenerators} />
      </div>
    </>
  );
}
