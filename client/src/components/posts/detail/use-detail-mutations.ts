"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import {
  deletePostAction,
  publishPostAction,
} from "@/app/dashboard/posts/actions";
import { usePostPlatforms } from "@/components/posts/platforms-context";
import { showPublishToast } from "@/lib/posts/publish-toast";

export function useDetailMutations(postId: string) {
  const router = useRouter();
  const [delPending, delStart] = useTransition();
  const [pubPending, pubStart] = useTransition();
  const ctx = usePostPlatforms();

  function onConfirmDelete() {
    delStart(async () => {
      const res = await deletePostAction(postId);
      if (res.error) toast.error(res.error);
      else {
        toast.success("Post deleted.");
        router.replace("/dashboard/posts");
      }
    });
  }

  function onPublishNow() {
    if (ctx && !ctx.selected) {
      toast.error("Pick a platform to post to.");
      return;
    }
    const platforms = ctx?.selected ? [ctx.selected] : [];
    pubStart(async () => {
      const res = await publishPostAction(postId, platforms);
      if (res.error) toast.error(res.error);
      else {
        showPublishToast({ publishedTo: res.publishedTo ?? platforms, failed: res.failed ?? [] });
        router.refresh();
      }
    });
  }

  return { delPending, pubPending, onConfirmDelete, onPublishNow };
}
