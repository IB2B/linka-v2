import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/dashboard/page-header";
import { Separator } from "@/components/ui/separator";
import { EngagementNotice } from "@/components/analytics/engagement-notice";
import { PostAnalyticsMetrics } from "@/components/analytics/post-detail/post-analytics-metrics";
import { PostAnalyticsOverview } from "@/components/analytics/post-detail/post-analytics-overview";
import { PostAnalyticsTimeline } from "@/components/analytics/post-detail/post-analytics-timeline";
import { getPost } from "@/lib/posts/get-post";

type Params = { id: string };

export default async function PostAnalyticsPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) notFound();

  return (
    <>
      <Link
        href="/dashboard/analytics"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to analytics
      </Link>
      <PageHeader
        title="Post analytics"
        description="Performance and lifecycle for a single post."
      />
      <Separator className="my-2" />
      <PostAnalyticsMetrics />
      <div className="grid gap-4 lg:grid-cols-2">
        <PostAnalyticsOverview post={post} />
        <PostAnalyticsTimeline post={post} />
      </div>
      <EngagementNotice />
    </>
  );
}
