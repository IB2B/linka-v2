"use client";

import { useState, useTransition } from "react";
import { Calendar, Eye, Send, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { PostViewDialog } from "./post-view-dialog";
import { ScheduleDialog } from "./schedule-dialog";
import {
  deletePostAction,
  publishPostAction,
} from "@/app/dashboard/posts/actions";
import type { GeneratedPost } from "@/types/post";

export function PostActions({ post }: { post: GeneratedPost }) {
  const [viewOpen, setViewOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [delPending, delStart] = useTransition();
  const [pubPending, pubStart] = useTransition();

  const isPosted = post.status === "posted";
  const isScheduled = post.status === "scheduled";

  function onDelete() {
    delStart(async () => {
      const res = await deletePostAction(post.id);
      if (res.error) toast.error(res.error);
      else toast.success("Post deleted.");
    });
  }

  function onPublishNow() {
    pubStart(async () => {
      const res = await publishPostAction(post.id);
      if (res.error) toast.error(res.error);
      else toast.success("Posted to LinkedIn.");
    });
  }

  return (
    <>
      <div className="flex w-full items-center gap-1">
        <Button size="icon-sm" variant="ghost" onClick={() => setViewOpen(true)} aria-label="View">
          <Eye className="size-4" />
        </Button>
        <Button size="icon-sm" variant="ghost" onClick={onDelete}
          disabled={delPending} aria-label="Delete">
          {delPending ? <Spinner /> : <Trash2 className="size-4" />}
        </Button>
        <div className="ml-auto flex gap-2">
          {!isPosted ? (
            <Button size="sm" variant="outline"
              onClick={() => setScheduleOpen(true)} disabled={pubPending}>
              <Calendar className="size-4" />
              {isScheduled ? "Reschedule" : "Schedule"}
            </Button>
          ) : null}
          {!isPosted ? (
            <Button size="sm" onClick={onPublishNow} disabled={pubPending}>
              {pubPending ? <Spinner aria-hidden /> : <Send className="size-4" />}
              Post now
            </Button>
          ) : null}
        </div>
      </div>
      <PostViewDialog post={post} open={viewOpen} onOpenChange={setViewOpen} />
      <ScheduleDialog postId={post.id} open={scheduleOpen} onOpenChange={setScheduleOpen} />
    </>
  );
}
