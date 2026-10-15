"use client";

import { createContext, useContext, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { regenerateImageAction, regenerateVideoAction } from "@/app/dashboard/posts/actions";
import { useTextRegen } from "./use-text-regen";

type RegenCtx = {
  textPending: boolean;
  // What the content block's loader says: "Rewriting…" or "Applying suggestions…".
  textLabel: string;
  imagePending: boolean;
  videoPending: boolean;
  runText: () => void;
  runImprove: (suggestions: string[], note: string, onDone: () => void) => void;
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
  const text = useTextRegen(postId);
  const [imagePending, imageStart] = useTransition();
  const [videoPending, videoStart] = useTransition();

  // The server flips the row to "generating"; the refresh runs inside the same
  // transition, so this loader holds until the page shows the media's own
  // progress state (which then polls) — no gap where the old image reappears.
  function runImage(prompt?: string) {
    imageStart(async () => {
      const res = await regenerateImageAction(postId, prompt);
      if (res.error) { toast.error(res.error); return; }
      toast.success("Image queued.");
      imageStart(() => router.refresh());
    });
  }

  function runVideo() {
    videoStart(async () => {
      const res = await regenerateVideoAction(postId);
      if (res.error) { toast.error(res.error); return; }
      toast.success("Video re-render queued.");
      videoStart(() => router.refresh());
    });
  }

  return (
    <Ctx.Provider value={{
      textPending: text.pending, textLabel: text.label, imagePending, videoPending,
      runText: text.runText, runImprove: text.runImprove, runImage, runVideo,
    }}>{children}</Ctx.Provider>
  );
}
