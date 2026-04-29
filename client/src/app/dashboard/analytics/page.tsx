import { PageHeader } from "@/components/dashboard/page-header";
import { Separator } from "@/components/ui/separator";
import { AnalyticsEmpty } from "@/components/analytics/analytics-empty";
import { AnalyticsView } from "@/components/analytics/analytics-view";
import { DateRangeSelector } from "@/components/analytics/date-range-selector";
import { computeAnalytics } from "@/lib/analytics/compute";
import { parseRange, rangeLabel } from "@/lib/analytics/range";
import { getPosts } from "@/lib/posts/get-posts";

type Search = { range?: string };

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const { range: raw } = await searchParams;
  const range = parseRange(raw);
  const posts = await getPosts();
  const data = computeAnalytics(posts, range);
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
      {posts.length === 0 ? <AnalyticsEmpty /> : <AnalyticsView data={data} />}
    </>
  );
}
