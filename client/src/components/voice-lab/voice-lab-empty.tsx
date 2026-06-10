import { Mic, FileText, Sparkles, Brain } from "lucide-react";

import { AddSamplesDialog } from "./add-samples-dialog";
import type { SampleLimits } from "@/types/voice-lab";

const STEPS = [
  { Icon: FileText, title: "Add samples", desc: "Paste 3–5 things you've written." },
  { Icon: Sparkles, title: "Analyze", desc: "We extract your tone & style." },
  { Icon: Brain, title: "Generate", desc: "Every post sounds like you." },
];

export function VoiceLabEmpty({ limits }: { limits: SampleLimits }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed px-6 py-14 text-center">
      <div className="rounded-full bg-primary/10 p-4">
        <Mic className="size-8 text-primary" />
      </div>
      <h2 className="mt-5 text-xl font-semibold">Teach the AI to write like you</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Add a few writing samples and we&apos;ll learn your voice — so every
        generated post sounds authentically yours.
      </p>
      <div className="mt-6">
        <AddSamplesDialog limits={limits} />
      </div>
      <div className="mt-10 grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
        {STEPS.map(({ Icon, title, desc }) => (
          <div
            key={title}
            className="flex flex-col items-center gap-2 rounded-lg border bg-muted/30 p-4"
          >
            <Icon className="size-5 text-primary" />
            <span className="text-sm font-medium">{title}</span>
            <span className="text-xs text-muted-foreground">{desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
