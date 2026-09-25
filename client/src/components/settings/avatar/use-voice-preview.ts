"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import type { VoiceOption } from "@/types/avatar-settings";

// One shared <audio> for every voice card, so previews never play over each
// other. "loading" lasts until sound actually starts (and again if it stalls to
// buffer), so the card can show a spinner instead of looking dead.
export function useVoicePreview() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => () => { audio.current?.pause(); }, []);

  function stop() {
    audio.current?.pause();
    audio.current = null;
    setPlayingId(null);
    setLoadingId(null);
  }

  function toggle(v: VoiceOption) {
    if (!v.previewAudio) return;
    if (playingId === v.id || loadingId === v.id) { stop(); return; }
    audio.current?.pause();
    const el = new Audio(v.previewAudio);
    audio.current = el;
    // Events from a preview the user already moved away from are ignored.
    const current = () => audio.current === el;
    el.onwaiting = () => { if (current()) setLoadingId(v.id); };
    el.onplaying = () => { if (current()) { setLoadingId(null); setPlayingId(v.id); } };
    el.onended = () => { if (current()) stop(); };
    el.onerror = () => {
      if (!current()) return;
      stop();
      toast.error("Couldn't load that voice sample. Try again.");
    };
    setPlayingId(null);
    setLoadingId(v.id);
    void el.play().catch(() => { if (current()) stop(); });
  }

  return { playingId, loadingId, toggle };
}
