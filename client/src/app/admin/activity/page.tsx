import { PageHeader } from "@/components/dashboard/page-header";
import { ActivityFeed } from "@/components/admin/activity/activity-feed";
import { ActivityFilter } from "@/components/admin/activity/activity-filter";
import { ActivitySummaryCards } from "@/components/admin/activity/activity-summary";
import { getActivity, getActivitySummary } from "@/lib/admin/get-activity";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ type?: string }> };

export default async function AdminActivityPage({ searchParams }: Props) {
  const { type } = await searchParams;
  const [events, summary] = await Promise.all([
    getActivity(100, type),
    getActivitySummary(),
  ]);
  return (
    <>
      <PageHeader
        title="Activity"
        description="Live event stream — signups, posts, billing and support, all in one feed."
      />
      {summary && <ActivitySummaryCards summary={summary} />}
      <ActivityFilter active={type ?? "all"} summary={summary} />
      <ActivityFeed events={events} />
    </>
  );
}
