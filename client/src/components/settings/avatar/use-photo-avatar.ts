"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { createPhotoAvatar, fetchLookStatus } from "@/lib/api/avatar-photo-client";

const POLL_MS = 5000;

// Upload → HeyGen trains for a few minutes → poll until the look is ready.
export function usePhotoAvatar(onReady: (lookId: string) => void) {
  const [creating, setCreating] = useState(false);
  const [trainingId, setTrainingId] = useState<string | null>(null);

  useEffect(() => {
    if (!trainingId) return;
    const timer = setInterval(async () => {
      const r = await fetchLookStatus(trainingId);
      const status = r.data?.status;
      if (status === "completed") {
        setTrainingId(null);
        toast.success("Your avatar is ready and selected. Press Save avatar to use it.");
        onReady(trainingId);
      } else if (status === "failed" || r.error) {
        setTrainingId(null);
        toast.error(r.data?.error ?? r.error ?? "HeyGen could not build that avatar. Try another photo.");
      }
    }, POLL_MS);
    return () => clearInterval(timer);
  }, [trainingId, onReady]);

  async function create(file: File, name: string): Promise<boolean> {
    setCreating(true);
    const r = await createPhotoAvatar(file, name);
    setCreating(false);
    if (r.error || !r.data) { toast.error(r.error ?? "Could not create the avatar."); return false; }
    setTrainingId(r.data.lookId);
    return true;
  }

  return { creating, training: trainingId !== null, create };
}
