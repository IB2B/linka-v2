"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VoiceCardGrid } from "./voice-card-grid";
import { VoiceLanguageSelect } from "./voice-language-select";
import type { VoiceOption } from "@/types/avatar-settings";

type Props = {
  voices: VoiceOption[];
  value: string | null;
  onChange: (id: string) => void;
  language: string;
  onLanguageChange: (code: string) => void;
};

const PAGE = 24;

export function VoicePicker({
  voices, value, onChange, language, onLanguageChange,
}: Props) {
  const [q, setQ] = useState("");
  const [playing, setPlaying] = useState<string | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);

  // One shared element: without it every card leaks its own audio and several
  // previews can play over each other.
  useEffect(() => () => { audio.current?.pause(); }, []);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const matched = needle
      ? voices.filter((v) => `${v.name} ${v.language ?? ""}`
        .toLowerCase().includes(needle))
      : voices;
    // Keep the saved voice visible even when a search would exclude it.
    const selected = voices.find((v) => v.id === value);
    const head = selected && !matched.some((v) => v.id === value) ? [selected] : [];
    return [...head, ...matched.slice(0, PAGE)];
  }, [voices, q, value]);

  function preview(v: VoiceOption) {
    if (!v.previewAudio) return;
    if (playing === v.id) { audio.current?.pause(); setPlaying(null); return; }
    audio.current?.pause();
    const el = new Audio(v.previewAudio);
    el.onended = () => setPlaying(null);
    audio.current = el;
    void el.play().catch(() => setPlaying(null));
    setPlaying(v.id);
  }

  return (
    <div className="space-y-2">
      <Label className="text-xs text-muted-foreground">Voice</Label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <VoiceLanguageSelect value={language} onChange={onLanguageChange} />
        <Input value={q} placeholder="Search voices by name…"
          onChange={(e) => setQ(e.target.value)} />
      </div>
      <VoiceCardGrid voices={shown} selectedId={value} playingId={playing}
        onSelect={onChange} onPreview={preview} />
      {shown.length === 0 ? (
        <p className="text-sm text-muted-foreground">No voices match that search.</p>
      ) : null}
    </div>
  );
}
