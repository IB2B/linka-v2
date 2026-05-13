import { PageHeader } from "@/components/dashboard/page-header";
import { Separator } from "@/components/ui/separator";
import { AnalyticsEmpty } from "@/components/analytics/analytics-empty";
import { AnalyticsView } from "@/components/analytics/analytics-view";
import { DateRangeSelector } from "@/components/analytics/date-range-selector";
import { computeAnalytics } from "@/lib/analytics/compute";
import { parseRange, rangeLabel } from "@/lib/analytics/range";
import { getPosts } from "@/lib/posts/get-posts";
import { getAnalyticsSummary } from "@/lib/analytics/get-analytics-summary";
import { getPublishedPlatforms } from "@/lib/posts/get-published-platforms";
import { getPlatformMetrics } from "@/lib/analytics/get-platform-metrics";
import { getImageRoi } from "@/lib/analytics/get-image-roi";
import { getDailyEngagement } from "@/lib/analytics/get-daily-engagement";

type Search = { range?: string };

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const { range: raw } = await searchParams;
  const range = parseRange(raw);
  const [posts, metrics, platformMetrics, imageRoi, engagement] = await Promise.all([
    getPosts(),
    getAnalyticsSummary(),
    getPlatformMetrics(),
    getImageRoi(),
    getDailyEngagement(30),
  ]);
  const data = computeAnalytics(posts, range);
  const published = await getPublishedPlatforms(data.recent.map((p) => p.id));
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader
          title="Analytics"
          description={`Pipeline health for ${rangeLabel(range).toLowerCase()}.`}
        />
        <DateRangeSelector />
      </div>
      <Separator className="my-2" />
      {posts.length === 0 ? (
        <AnalyticsEmpty />
      ) : (
        <AnalyticsView
          data={data} metrics={metrics} published={published}
          platformMetrics={platformMetrics} imageRoi={imageRoi}
          engagement={engagement}
        />
      )}
    </>
  );
}
