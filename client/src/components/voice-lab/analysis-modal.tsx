"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { VoiceProfile } from "@/types/voice-lab";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: VoiceProfile;
};

function Section({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">{title}</h4>
      <div className="flex flex-wrap gap-1.5">
        {items.map((it) => (
          <Badge key={it} variant="secondary">
            {it}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export function AnalysisModal({ open, onOpenChange, profile }: Props) {
  const dna = profile.voiceDna!;
  const subtitle = dna.tone.secondary
    ? `${dna.tone.primary} · ${dna.tone.secondary}`
    : dna.tone.primary;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] flex-col gap-0 p-0 sm:max-w-2xl">
        <DialogHeader className="border-b p-4">
          <DialogTitle>Voice DNA · v{profile.version}</DialogTitle>
          <DialogDescription>{subtitle}</DialogDescription>
        </DialogHeader>
        <div className="flex-1 space-y-5 overflow-y-auto p-4">
          <p className="text-sm leading-relaxed">{dna.summary}</p>
          <Section title="Expertise" items={dna.expertiseAreas} />
          <Section title="Content pillars" items={dna.contentPillars} />
          <Section
            title="Distinctive vocabulary"
            items={dna.vocabulary.distinctive}
          />
          <Section title="Strengths" items={dna.strengths} />
          {dna.audience ? (
            <p className="text-sm">
              <span className="font-medium">Audience: </span>
              {dna.audience}
            </p>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
