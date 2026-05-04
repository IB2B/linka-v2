import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { formatPostDate } from "@/lib/posts/format-date";
import type { GeneratedPost } from "@/types/post";

export function PostAnalyticsTimeline({ post }: { post: GeneratedPost }) {
  const events = [
    { label: "Created", at: post.createdAt },
    { label: "Scheduled", at: post.scheduledFor },
    { label: "Posted", at: post.postedAt },
  ].filter((e) => e.at);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lifecycle</CardTitle>
        <CardDescription>Key moments for this post.</CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="space-y-3">
          {events.map((e) => (
            <li key={e.label} className="flex items-center gap-3 text-sm">
              <span className="size-2 rounded-full bg-blue-500" />
              <span className="font-medium">{e.label}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                {formatPostDate(e.at!)}
              </span>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
