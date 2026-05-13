import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PostStatusBadge } from "@/components/posts/post-status-badge";
import { PlatformIcon } from "@/components/accounts/platform-icon";
import { formatPostDate } from "@/lib/posts/format-date";
import type { GeneratedPost } from "@/types/post";
import type { Platform } from "@/lib/zernio/zernio-account.types";

export function PostHeroCard({
  post, platforms = post.platform ? [post.platform] : [],
}: { post: GeneratedPost; platforms?: string[] }) {
  const date = post.postedAt ?? post.scheduledFor ?? post.createdAt;
  const dateLabel = post.postedAt
    ? `Posted ${formatPostDate(post.postedAt)}`
    : formatPostDate(date);
  return (
    <Card className="overflow-hidden">
      <CardContent className="grid gap-4 p-4 sm:grid-cols-[200px_1fr]">
        {post.imageUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={post.imageUrl} alt=""
            className="aspect-square w-full rounded-md object-cover sm:size-[200px]"
          />
        ) : (
          <div className="aspect-square w-full rounded-md bg-muted sm:size-[200px]" />
        )}
        <div className="flex flex-col justify-between gap-3">
          <p className="line-clamp-5 whitespace-pre-wrap text-sm leading-relaxed">
            {post.content}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {platforms.map((p) => (
              <Badge key={p} variant="outline" className="gap-1.5 capitalize">
                <PlatformIcon platform={p as Platform} className="size-3.5" />
                {p}
              </Badge>
            ))}
            <PostStatusBadge status={post.status} />
            <span className="text-xs text-muted-foreground">{dateLabel}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
