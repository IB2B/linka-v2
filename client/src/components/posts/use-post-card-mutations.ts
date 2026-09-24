"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { deletePostAction, publishPostAction } from "@/app/dashboard/posts/actions";
import { showPublishToast } from "@/lib/posts/publish-toast";
import type { GeneratedPost } from "@/types/post";

// Delete + publish-now for a post card; the card itself only renders buttons.
export function usePostCardMutations(post: GeneratedPost, onDeleted: () => void) {
  const t = useTranslations("posts");
  const [delPending, delStart] = useTransition();
  const [pubPending, pubStart] = useTransition();

  function onConfirmDelete() {
    delStart(async () => {
      const res = await deletePostAction(post.id);
      if (res.error) toast.error(res.error);
      else { toast.success(t("toast.deleted")); onDeleted(); }
    });
  }

  function onPublishNow() {
    const platform = post.platform;
    if (!platform) { toast.error(t("toast.noPlatform")); return; }
    pubStart(async () => {
      const res = await publishPostAction(post.id, [platform]);
      if (res.error) toast.error(res.error);
      else showPublishToast({ publishedTo: res.publishedTo ?? [platform], failed: res.failed ?? [] });
    });
  }

  return { delPending, pubPending, onConfirmDelete, onPublishNow };
}
