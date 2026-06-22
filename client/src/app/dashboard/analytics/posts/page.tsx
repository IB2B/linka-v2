import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PostsAnalyticsTable } from "@/components/analytics/posts-analytics-table";
import { UpgradeWall } from "@/components/billing/upgrade-wall";
import { checkPaidFeature } from "@/lib/billing/check-paid-feature";
import { getPosts } from "@/lib/posts/get-posts";
import { getAnalyticsSummary } from "@/lib/analytics/get-analytics-summary";

export default async function AllPostsAnalyticsPage() {
  const access = await checkPaidFeature("analytics");
  if (!access.hasAccess) return <UpgradeWall feature="analytics" />;
  const [posts, metrics] = await Promise.all([getPosts(), getAnalyticsSummary()]);
  const sorted = [...posts].sort(
    (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
  );
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader title="All posts" description="Every post with its analytics, newest first." />
        <Button render={<Link href="/dashboard/analytics" />} nativeButton={false}
          variant="ghost" size="sm">
          <ArrowLeft className="size-4" /> Back to analytics
        </Button>
      </div>
      <Separator className="my-2" />
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>All posts</CardTitle>
          <CardDescription>{posts.length} posts total.</CardDescription>
        </CardHeader>
        {posts.length === 0 ? (
          <p className="px-6 pb-6 text-sm text-muted-foreground">No posts yet.</p>
        ) : (
          <PostsAnalyticsTable posts={sorted} metrics={metrics} />
        )}
      </Card>
    </>
  );
}
