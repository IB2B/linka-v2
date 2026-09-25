"use client";

import Link from "next/link";
import { useState } from "react";
import { Calendar, Eye, Send, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ScheduleDialog } from "./schedule-dialog";
import { DeletePostConfirm } from "./delete-post-confirm";
import { useHasAccounts } from "./has-accounts-context";
import { usePostCardMutations } from "./use-post-card-mutations";
import type { GeneratedPost } from "@/types/post";

export function PostActions({ post }: { post: GeneratedPost }) {
  const t = useTranslations("posts");
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { delPending, pubPending, onConfirmDelete, onPublishNow } =
    usePostCardMutations(post, () => setConfirmOpen(false));
  const hasAccounts = useHasAccounts();
  const lockedTitle = hasAccounts ? undefined : "Connect a social account first";

  const isPosted = post.status === "posted";
  const isScheduled = post.status === "scheduled";

  return (
    <>
      <div className="flex w-full items-center gap-1">
        <Button render={<Link href={`/dashboard/posts/${post.id}`} />}
          nativeButton={false} size="icon-sm" variant="ghost" aria-label={t("view")}>
          <Eye className="size-4" />
        </Button>
        <Button size="icon-sm" variant="ghost" onClick={() => setConfirmOpen(true)}
          disabled={delPending} aria-label={t("delete")}>
          {delPending ? <Spinner /> : <Trash2 className="size-4" />}
        </Button>
        <div className="ml-auto flex gap-2">
          {!isPosted ? (
            <Button size="sm" variant="outline"
              onClick={() => setScheduleOpen(true)} disabled={pubPending || !hasAccounts}
              title={lockedTitle}>
              <Calendar className="size-4" />
              {isScheduled ? t("reschedule") : t("schedule")}
            </Button>
          ) : null}
          {!isPosted ? (
            <Button size="sm" onClick={onPublishNow} disabled={pubPending || !hasAccounts}
              title={lockedTitle}>
              {pubPending ? <Spinner aria-hidden /> : <Send className="size-4" />}
              {t("postNow")}
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
