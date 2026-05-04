import { Badge } from "@/components/ui/badge";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { PostStatusBadge } from "@/components/posts/post-status-badge";
import type { GeneratedPost } from "@/types/post";

export function PostAnalyticsOverview({ post }: { post: GeneratedPost }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Post</CardTitle>
        <CardDescription>The content this report is about.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="whitespace-pre-wrap text-sm leading-relaxed">
          {post.content}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {post.platform ? (
            <Badge variant="outline" className="capitalize">
              {post.platform}
            </Badge>
          ) : null}
          <PostStatusBadge status={post.status} />
        </div>
      </CardContent>
    </Card>
  );
}
