"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { schedulePostAction } from "@/app/dashboard/posts/actions";
import { usePostPlatforms } from "./platforms-context";

export function useScheduleSubmit(postId: string, onDone: () => void) {
  const [pending, start] = useTransition();
  const ctx = usePostPlatforms();

  function submit(when: Date) {
    const platforms = ctx?.selected ?? [];
    if (platforms.length === 0) {
      toast.error("Pick at least one platform to post to.");
      return;
    }
    start(async () => {
      const res = await schedulePostAction(postId, when.toISOString(), platforms);
      if (res.error) toast.error(res.error);
      else {
        toast.success("Post scheduled.");
        onDone();
      }
    });
  }

  return { pending, submit };
}
