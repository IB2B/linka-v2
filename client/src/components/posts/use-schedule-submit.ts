"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { schedulePostAction } from "@/app/dashboard/posts/actions";
import { usePostPlatforms } from "./platforms-context";

export function useScheduleSubmit(postId: string, onDone: () => void) {
  const [pending, start] = useTransition();
  const ctx = usePostPlatforms();

  function submit(when: Date) {
    if (ctx && !ctx.selected) {
      toast.error("Pick a platform to post to.");
      return;
    }
    const platforms = ctx?.selected ? [ctx.selected] : [];
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
