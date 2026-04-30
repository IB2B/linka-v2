"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { schedulePostAction } from "@/app/dashboard/posts/actions";

export function useScheduleSubmit(postId: string, onDone: () => void) {
  const [pending, start] = useTransition();

  function submit(when: Date) {
    start(async () => {
      const res = await schedulePostAction(postId, when.toISOString());
      if (res.error) toast.error(res.error);
      else {
        toast.success("Post scheduled.");
        onDone();
      }
    });
  }

  return { pending, submit };
}
