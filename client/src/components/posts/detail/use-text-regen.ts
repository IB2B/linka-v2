"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { regenerateTextAction } from "@/app/dashboard/posts/actions";
import { improvePostAction } from "@/app/dashboard/posts/improve-action";

// Both ways of rewriting a post's text share one pending flag and a label, so
// the content block shows its loader for either. The refresh runs inside the
// same transition, so the loader stays until the new text is on screen instead
// of flashing the old text back.
export function useTextRegen(postId: string) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [label, setLabel] = useState("Rewriting…");

  function runText() {
    setLabel("Rewriting…");
    start(async () => {
      const res = await regenerateTextAction(postId);
      if (res.error) { toast.error(res.error); return; }
      toast.success("Content regenerated.");
      start(() => router.refresh());
    });
  }

  function runImprove(suggestions: string[], note: string, onDone: () => void) {
    setLabel("Applying suggestions…");
    start(async () => {
      const res = await improvePostAction(postId, suggestions, note);
      if (res.error) { toast.error(res.error); return; }
      toast.success("Post updated. Re-scoring…");
      start(() => router.refresh());
      onDone();
    });
  }

  return { pending, label, runText, runImprove };
}
