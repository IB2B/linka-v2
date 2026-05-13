"use client";

import { useState } from "react";
import { Calendar, Send, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ScheduleDialog } from "../schedule-dialog";
import { DeletePostConfirm } from "../delete-post-confirm";
import { PostDetailRegenerate } from "./post-detail-regenerate";
import { PostDetailDownload } from "./post-detail-download";
import { useDetailMutations } from "./use-detail-mutations";
import { usePostPlatforms } from "../platforms-context";
import type { GeneratedPost } from "@/types/post";

export function PostDetailActions({ post }: { post: GeneratedPost }) {
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [publishedNow, setPublishedNow] = useState(false);
  const { delPending, pubPending, onConfirmDelete, onPublishNow } =
    useDetailMutations(post.id, () => setPublishedNow(true));
  const ctx = usePostPlatforms();
  const noPlatforms = !!ctx && ctx.selected.length === 0;

  const isPosted = post.status === "posted" || publishedNow;
  const isScheduled = post.status === "scheduled";

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant="ghost" className="text-destructive"
          onClick={() => setConfirmOpen(true)} disabled={delPending}
          aria-label="Delete">
          {delPending ? <Spinner aria-hidden /> : <Trash2 className="size-4" />}
        </Button>
        {post.imageUrl ? (
          <PostDetailDownload url={post.imageUrl} postId={post.id} />
        ) : null}
        {!isPosted ? <PostDetailRegenerate /> : null}
        <div className="ml-auto flex flex-wrap items-center gap-2">
          {!isPosted ? (
            <Button size="sm" variant="outline"
              onClick={() => setScheduleOpen(true)}
              disabled={pubPending || noPlatforms}
              title={noPlatforms ? "Pick at least one platform" : undefined}>
              <Calendar className="size-4" />
              {isScheduled ? "Reschedule" : "Schedule"}
            </Button>
          ) : null}
          {!isPosted ? (
            <Button size="sm" onClick={onPublishNow}
              disabled={pubPending || noPlatforms}
              title={noPlatforms ? "Pick at least one platform" : undefined}>
              {pubPending ? <Spinner aria-hidden /> : <Send className="size-4" />}
              Post now
            </Button>
          ) : null}
        </div>
      </div>
      <ScheduleDialog postId={post.id} open={scheduleOpen}
        onOpenChange={setScheduleOpen} />
      <DeletePostConfirm open={confirmOpen} onOpenChange={setConfirmOpen}
        onConfirm={onConfirmDelete} pending={delPending} />
    </>
  );
}
