import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { PostHeroCard } from "@/components/analytics/post-detail/post-hero-card";
import { PostAnalyticsBody } from "@/components/analytics/post-detail/post-analytics-body";
import { LifecycleCard } from "@/components/analytics/post-detail/lifecycle-card";
import { loadPostDetail } from "@/lib/analytics/load-post-detail";

type Params = { id: string };

export default async function PostAnalyticsPage({
  params,
}: { params: Promise<Params> }) {
  const { id } = await params;
  const data = await loadPostDetail(id);
  return (
    <div className="space-y-5">
      <Link
        href="/dashboard/analytics"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to analytics
      </Link>
      <PostHeroCard post={data.post} />
      <Separator />
      <PostAnalyticsBody data={data} />
      <LifecycleCard post={data.post} />
    </div>
  );
}
