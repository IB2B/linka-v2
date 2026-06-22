import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { PostHeroCard } from "@/components/analytics/post-detail/post-hero-card";
import { PostAnalyticsBody } from "@/components/analytics/post-detail/post-analytics-body";
import { CommentsCard } from "@/components/analytics/post-detail/comments-card";
import { CommentsLoading } from "@/components/analytics/post-detail/comments-loading";
import { AnalyticsSyncPoller } from "@/components/analytics/post-detail/analytics-sync-poller";
import { AnalyticsToolbar } from "@/components/analytics/post-detail/analytics-toolbar";
import { loadPostDetail } from "@/lib/analytics/load-post-detail";
import { requirePaidFeature } from "@/lib/billing/require-paid-feature";

type Params = { id: string };
type Search = { t?: string };

export default async function PostAnalyticsPage({
  params, searchParams,
}: { params: Promise<Params>; searchParams: Promise<Search> }) {
  await requirePaidFeature("analytics");
  const { id } = await params;
  const { t } = await searchParams;
  const data = await loadPostDetail(id, !!t);
  const lastUpdated = data.analytics?.state === "ok"
    ? data.analytics.lastUpdated : null;
  const links = data.analytics?.state === "ok"
    ? data.analytics.platforms
        .filter((p) => p.url)
        .map((p) => ({ platform: p.platform, url: p.url! }))
    : [];

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/analytics"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to analytics
      </Link>

      <PostHeroCard
        post={data.post}
        platforms={
          data.post.scheduledPlatforms?.length
            ? data.post.scheduledPlatforms
            : data.post.platform ? [data.post.platform] : []
        }
        links={links}
      />

      <AnalyticsToolbar lastUpdated={lastUpdated} postId={id} />

      {data.analytics?.state === "syncing" && <AnalyticsSyncPoller />}
      <PostAnalyticsBody data={data} />

      <Suspense fallback={<CommentsLoading />}>
        <CommentsCard postId={data.post.id} />
      </Suspense>
    </div>
  );
}
