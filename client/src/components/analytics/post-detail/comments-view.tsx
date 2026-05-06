"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare, RefreshCw } from "lucide-react";

import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { CommentsGroup } from "./comments-group";
import { CommentsPlatformPills } from "./comments-platform-pills";
import type { CommenterMe, PostCommentGroup } from "@/lib/analytics/post-comments.types";

type Props = { postId: string; groups: PostCommentGroup[]; me?: CommenterMe };

export function CommentsView({ postId, groups, me }: Props) {
  const router = useRouter();
  const [active, setActive] = useState("all");
  const [pending, start] = useTransition();
  const total = groups.reduce((s, g) => s + g.comments.length, 0);
  const pills = useMemo(() => [
    { value: "all", label: "All", count: total },
    ...groups.map((g) => ({
      value: g.platform, label: g.platform, count: g.comments.length,
    })),
  ], [groups, total]);
  const visible = active === "all" ? groups : groups.filter((g) => g.platform === active);

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="size-4 text-muted-foreground" />
            <CardTitle>Comments</CardTitle>
            {total > 0 && (
              <span className="text-xs text-muted-foreground">{total} total</span>
            )}
          </div>
          <button
            type="button" disabled={pending}
            onClick={() => start(() => router.refresh())}
            className="inline-flex items-center gap-1 rounded-md border bg-background px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-50"
          >
            {pending ? <Spinner aria-hidden /> : <RefreshCw className="size-3" />}
            Refresh
          </button>
        </div>
        <CardDescription>Reply directly from here.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        {groups.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            No comments yet on this post.
          </p>
        ) : (
          <>
            {groups.length > 1 && (
              <CommentsPlatformPills
                pills={pills} active={active} onChange={setActive}
              />
            )}
            <div className="space-y-3">
              {visible.map((g) => (
                <CommentsGroup key={g.platform} postId={postId} group={g} me={me} />
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
