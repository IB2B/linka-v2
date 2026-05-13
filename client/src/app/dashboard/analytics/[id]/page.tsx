import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { PostHeroCard } from "@/components/analytics/post-detail/post-hero-card";
import { PostAnalyticsBody } from "@/components/analytics/post-detail/post-analytics-body";
import { CommentsCard } from "@/components/analytics/post-detail/comments-card";
import { CommentsLoading } from "@/components/analytics/post-detail/comments-loading";
import { AnalyticsSyncPoller } from "@/components/analytics/post-detail/analytics-sync-poller";
import { loadPostDetail } from "@/lib/analytics/load-post-detail";

type Params = { id: string };

export default async function PostAnalyticsPage({
  params,
}: { params: Promise<Params> }) {
  const { id } = await params;
  const data = await loadPostDetail(id);

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
          data.analytics?.state === "ok"
            ? data.analytics.platforms.map((p) => p.platform)
            : data.post.platform ? [data.post.platform] : []
        }
      />

      {data.analytics?.state === "syncing" && <AnalyticsSyncPoller />}
      <PostAnalyticsBody data={data} />

      <Suspense fallback={<CommentsLoading />}>
        <CommentsCard postId={data.post.id} />
      </Suspense>
    </div>
  );
}
