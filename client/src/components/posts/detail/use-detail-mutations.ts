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

export function useDetailMutations(postId: string, onPublished?: () => void) {
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
    const platforms = ctx?.selected ?? [];
    if (platforms.length === 0) {
      toast.error("Pick at least one platform to post to.");
      return;
    }
    pubStart(async () => {
      const res = await publishPostAction(postId, platforms);
      if (res.error) toast.error(res.error);
      else {
        showPublishToast({ publishedTo: res.publishedTo ?? platforms, failed: res.failed ?? [] });
        onPublished?.();
        router.refresh();
      }
    });
  }

  return { delPending, pubPending, onConfirmDelete, onPublishNow };
}
