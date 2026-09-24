"use client";

import { useState } from "react";
import { toast } from "sonner";

import { saveAvatarChoice } from "@/lib/api/avatar-client";

export function useAvatarSave(avatarId: string | null, voiceId: string | null) {
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!avatarId || !voiceId) {
      toast.error("Pick both an avatar and a voice."); return;
    }
    setSaving(true);
    const r = await saveAvatarChoice({ avatarId, voiceId });
    setSaving(false);
    if (r.error) toast.error(r.error);
    else toast.success("Avatar saved.");
  }

  return { saving, save };
}
