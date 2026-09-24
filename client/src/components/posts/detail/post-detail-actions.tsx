"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, Send, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ScheduleDialog } from "../schedule-dialog";
import { DeletePostConfirm } from "../delete-post-confirm";
import { PostDetailRegenerate } from "./post-detail-regenerate";
import { PostDetailDownload } from "./post-detail-download";
import { useDetailMutations } from "./use-detail-mutations";
import { usePostPlatforms } from "../platforms-context";
import { parseDay } from "@/lib/calendar/parse-day";
import type { GeneratedPost } from "@/types/post";

export function PostDetailActions({ post }: { post: GeneratedPost }) {
  // ?schedule=YYYY-MM-DD: arrived from a calendar day, so open on that day.
  const scheduleFor = parseDay(useSearchParams().get("schedule"));
  const [scheduleOpen, setScheduleOpen] = useState(!!scheduleFor && post.status === "draft");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [publishedNow, setPublishedNow] = useState(false);
  const { delPending, pubPending, onConfirmDelete, onPublishNow } =
    useDetailMutations(post.id, () => setPublishedNow(true));
  const ctx = usePostPlatforms();
  const noPlatforms = !!ctx && ctx.selected.length === 0;
  const lockedTitle = !noPlatforms ? undefined
    : ctx?.connected.length === 0 ? "Connect a social account first" : "Pick at least one platform";

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
        {!isPosted ? (
          <PostDetailRegenerate hasVideo={post.videoStatus !== "skipped"} />
        ) : null}
        <div className="ml-auto flex flex-wrap items-center gap-2">
          {!isPosted ? (
            <Button size="sm" variant="outline"
              onClick={() => setScheduleOpen(true)}
              disabled={pubPending || noPlatforms}
              title={lockedTitle}>
              <Calendar className="size-4" />
              {isScheduled ? "Reschedule" : "Schedule"}
            </Button>
          ) : null}
          {!isPosted ? (
            <Button size="sm" onClick={onPublishNow}
              disabled={pubPending || noPlatforms}
              title={lockedTitle}>
              {pubPending ? <Spinner aria-hidden /> : <Send className="size-4" />}
              Post now
            </Button>
          ) : null}
        </div>
      </div>
      <ScheduleDialog postId={post.id} open={scheduleOpen}
        onOpenChange={setScheduleOpen} initialDate={scheduleFor ?? undefined} />
      <DeletePostConfirm open={confirmOpen} onOpenChange={setConfirmOpen}
        onConfirm={onConfirmDelete} pending={delPending} />
    </>
  );
}
