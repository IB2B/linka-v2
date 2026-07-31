"use client";

import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { ALL_LANGUAGES, VOICE_LANGUAGES } from "./voice-languages";

type Props = { value: string; onChange: (code: string) => void };

// Language has to be a server round trip, not a local filter: HeyGen pages the
// catalogue 100 at a time and the first page is nearly all English, so the
// other languages are simply not in memory to filter.
export function VoiceLanguageSelect({ value, onChange }: Props) {
  return (
    // Coalesced because base-ui latches controlled-vs-uncontrolled on the first
    // render: one undefined and the Select is uncontrolled for its whole life.
    <Select
      value={value ?? ALL_LANGUAGES}
      onValueChange={(v) => onChange(String(v))}
    >
      <SelectTrigger aria-label="Voice language" className="w-full sm:w-56">
        <SelectValue>
          {(v: string) =>
            VOICE_LANGUAGES.find((l) => l.value === v)?.label ?? v}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {VOICE_LANGUAGES.map((l) => (
          <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
