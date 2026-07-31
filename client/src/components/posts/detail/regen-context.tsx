"use client";

import { createContext, useContext, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  regenerateTextAction,
  regenerateImageAction,
  regenerateVideoAction,
} from "@/app/dashboard/posts/actions";

type RegenCtx = {
  textPending: boolean;
  imagePending: boolean;
  videoPending: boolean;
  runText: () => void;
  runImage: (prompt?: string) => void;
  runVideo: () => void;
};

const Ctx = createContext<RegenCtx | null>(null);

export function useRegen(): RegenCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error("RegenProvider missing");
  return v;
}

export function RegenProvider({
  postId, children,
}: { postId: string; children: React.ReactNode }) {
  const router = useRouter();
  const [textPending, textStart] = useTransition();
  const [imageOptimistic, setImageOptimistic] = useState(false);
  const [videoOptimistic, setVideoOptimistic] = useState(false);

  function runText() {
    textStart(async () => {
      const res = await regenerateTextAction(postId);
      if (res.error) toast.error(res.error);
      else { toast.success("Content regenerated."); router.refresh(); }
    });
  }

  function runImage(prompt?: string) {
    setImageOptimistic(true);
    (async () => {
      const res = await regenerateImageAction(postId, prompt);
      if (res.error) { toast.error(res.error); setImageOptimistic(false); return; }
      toast.success("Image queued.");
      router.refresh();
      setTimeout(() => setImageOptimistic(false), 1500);
    })();
  }

  // Renders take minutes, so the server flips the row to "generating" and the
  // refreshed page shows its own progress state — no long-lived local flag.
  function runVideo() {
    setVideoOptimistic(true);
    (async () => {
      const res = await regenerateVideoAction(postId);
      if (res.error) { toast.error(res.error); setVideoOptimistic(false); return; }
      toast.success("Video re-render queued.");
      router.refresh();
      setTimeout(() => setVideoOptimistic(false), 1500);
    })();
  }

  return (
    <Ctx.Provider value={{
      textPending, imagePending: imageOptimistic, videoPending: videoOptimistic,
      runText, runImage, runVideo,
    }}>{children}</Ctx.Provider>
  );
}
