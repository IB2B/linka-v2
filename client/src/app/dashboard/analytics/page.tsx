import { getTranslations } from "next-intl/server";

import { PageHeader } from "@/components/dashboard/page-header";
import { Separator } from "@/components/ui/separator";
import { AnalyticsEmpty } from "@/components/analytics/analytics-empty";
import { AnalyticsView } from "@/components/analytics/analytics-view";
import { DateRangeSelector } from "@/components/analytics/date-range-selector";
import { computeAnalytics } from "@/lib/analytics/compute";
import { parseRange } from "@/lib/analytics/range";
import { getPosts } from "@/lib/posts/get-posts";
import { getAnalyticsSummary } from "@/lib/analytics/get-analytics-summary";
import { getPlatformMetrics } from "@/lib/analytics/get-platform-metrics";
import { getImageRoi } from "@/lib/analytics/get-image-roi";
import { getDailyEngagement } from "@/lib/analytics/get-daily-engagement";
import { checkPaidFeature } from "@/lib/billing/check-paid-feature";
import { UpgradeWall } from "@/components/billing/upgrade-wall";

type Search = { range?: string };

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const access = await checkPaidFeature("analytics");
  if (!access.hasAccess) return <UpgradeWall feature="analytics" />;
  const { range: raw } = await searchParams;
  const range = parseRange(raw);
  const [posts, metrics, platformMetrics, imageRoi, engagement, t] = await Promise.all([
    getPosts(),
    getAnalyticsSummary(),
    getPlatformMetrics(),
    getImageRoi(),
    getDailyEngagement(30),
    getTranslations("analytics"),
  ]);
  const data = computeAnalytics(posts, range);
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader title={t("title")} description={t("description")} />
        <DateRangeSelector />
      </div>
      <Separator className="my-2" />
      {posts.length === 0 ? (
        <AnalyticsEmpty />
      ) : (
        <AnalyticsView
          data={data} metrics={metrics}
          platformMetrics={platformMetrics} imageRoi={imageRoi}
          engagement={engagement}
        />
      )}
    </>
  );
}
