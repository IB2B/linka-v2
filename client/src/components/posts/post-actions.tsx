"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Calendar, Eye, Send, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ScheduleDialog } from "./schedule-dialog";
import { DeletePostConfirm } from "./delete-post-confirm";
import { deletePostAction, publishPostAction } from "@/app/dashboard/posts/actions";
import { showPublishToast } from "@/lib/posts/publish-toast";
import type { GeneratedPost } from "@/types/post";

export function PostActions({ post }: { post: GeneratedPost }) {
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [delPending, delStart] = useTransition();
  const [pubPending, pubStart] = useTransition();

  const isPosted = post.status === "posted";
  const isScheduled = post.status === "scheduled";

  function onConfirmDelete() {
    delStart(async () => {
      const res = await deletePostAction(post.id);
      if (res.error) toast.error(res.error);
      else {
        toast.success("Post deleted.");
        setConfirmOpen(false);
      }
    });
  }

  function onPublishNow() {
    const platform = post.platform;
    if (!platform) { toast.error("Post has no target platform."); return; }
    pubStart(async () => {
      const res = await publishPostAction(post.id, [platform]);
      if (res.error) toast.error(res.error);
      else showPublishToast({ publishedTo: res.publishedTo ?? [platform], failed: res.failed ?? [] });
    });
  }

  return (
    <>
      <div className="flex w-full items-center gap-1">
        <Button render={<Link href={`/dashboard/posts/${post.id}`} />}
          nativeButton={false} size="icon-sm" variant="ghost" aria-label="View">
          <Eye className="size-4" />
        </Button>
        <Button size="icon-sm" variant="ghost" onClick={() => setConfirmOpen(true)}
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
      <ScheduleDialog postId={post.id} open={scheduleOpen} onOpenChange={setScheduleOpen} />
      <DeletePostConfirm open={confirmOpen} onOpenChange={setConfirmOpen}
        onConfirm={onConfirmDelete} pending={delPending} />
    </>
  );
}
