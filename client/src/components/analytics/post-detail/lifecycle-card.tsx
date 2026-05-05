import { Check, Clock } from "lucide-react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { formatPostDate } from "@/lib/posts/format-date";
import type { GeneratedPost } from "@/types/post";

type Event = { label: string; at: string | null; done: boolean };

export function LifecycleCard({ post }: { post: GeneratedPost }) {
  const events: Event[] = [
    { label: "Created", at: post.createdAt, done: true },
    { label: "Scheduled", at: post.scheduledFor, done: !!post.scheduledFor },
    { label: "Posted", at: post.postedAt, done: post.status === "posted" },
  ];
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
              {e.done ? (
                <Check className="size-4 text-emerald-600" />
              ) : (
                <Clock className="size-4 text-muted-foreground" />
              )}
              <span className="font-medium">{e.label}</span>
              <span className="ml-auto text-xs tabular-nums text-muted-foreground">
                {e.at ? formatPostDate(e.at) : "—"}
              </span>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
