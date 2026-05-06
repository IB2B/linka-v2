import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { PlatformBadge } from "@/components/inbox/platform-badge";
import { CommentRow } from "./comment-row";
import type { CommenterMe, PostCommentGroup } from "@/lib/analytics/post-comments.types";

const LABELS: Record<string, string> = {
  linkedin: "LinkedIn", instagram: "Instagram", facebook: "Facebook",
  twitter: "X", threads: "Threads", reddit: "Reddit",
};

type Props = { postId: string; group: PostCommentGroup; me?: CommenterMe };

export function CommentsGroup({ postId, group, me }: Props) {
  return (
    <div className="rounded-lg border bg-background/40 p-3">
      <div className="mb-1 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          <PlatformBadge platform={group.platform} className="size-4" />
          <span>{LABELS[group.platform] ?? group.platform}</span>
          <span className="text-xs text-muted-foreground">
            ({group.comments.length})
          </span>
        </div>
        <Link
          href={`/dashboard/inbox?platform=${group.platform}`}
          className="inline-flex items-center gap-0.5 text-xs text-muted-foreground hover:text-foreground"
        >
          Open in Inbox <ArrowUpRight className="size-3" />
        </Link>
      </div>
      <div className="space-y-1">
        {group.comments.map((c) => (
          <CommentRow
            key={c.id} postId={postId} platform={group.platform} comment={c} me={me}
          />
        ))}
      </div>
    </div>
  );
}
