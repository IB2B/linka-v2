import { MessageSquare } from "lucide-react";

import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";

export function CommentsLoading() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageSquare className="size-4 text-muted-foreground" />
          <CardTitle>Comments</CardTitle>
        </div>
        <CardDescription>Loading replies from connected platforms…</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {[0, 1].map((i) => (
          <div key={i} className="flex gap-3">
            <div className="size-7 shrink-0 animate-pulse rounded-full bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
              <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
