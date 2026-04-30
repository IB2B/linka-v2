"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import {
  deletePostAction,
  publishPostAction,
} from "@/app/dashboard/posts/actions";

export function useDetailMutations(postId: string) {
  const router = useRouter();
  const [delPending, delStart] = useTransition();
  const [pubPending, pubStart] = useTransition();

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
    pubStart(async () => {
      const res = await publishPostAction(postId);
      if (res.error) toast.error(res.error);
      else {
        toast.success("Posted to LinkedIn.");
        router.refresh();
      }
    });
  }

  return { delPending, pubPending, onConfirmDelete, onPublishNow };
}
