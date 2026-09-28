"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { saveAvatarChoice } from "@/lib/api/avatar-client";

// Saves as soon as both an avatar and a voice are picked. A separate Save
// button was easy to miss, and videos then silently used the old choice.
export function useAvatarSave(
  avatarId: string | null, voiceId: string | null, loading: boolean,
) {
  const [saving, setSaving] = useState(false);
  // null until the stored choice has loaded, so loading it isn't a "change".
  const saved = useRef<string | null>(null);
  const key = avatarId && voiceId ? `${avatarId}|${voiceId}` : "";

  useEffect(() => {
    if (loading) return;
    if (saved.current === null) { saved.current = key; return; }
    if (!avatarId || !voiceId || key === saved.current) return;
    const previous = saved.current;
    saved.current = key;
    setSaving(true);
    saveAvatarChoice({ avatarId, voiceId }).then((r) => {
      setSaving(false);
      if (r.error) { saved.current = previous; toast.error(r.error); }
      else toast.success("Avatar saved.");
    });
  }, [key, loading, avatarId, voiceId]);

  return { saving };
}
