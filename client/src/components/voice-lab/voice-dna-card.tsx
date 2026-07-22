"use client";

import { useState } from "react";
import { Brain } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnalysisModal } from "./analysis-modal";
import type { VoiceProfile } from "@/types/voice-lab";

export function VoiceDnaCard({ profile }: { profile: VoiceProfile | null }) {
  const [open, setOpen] = useState(false);

  if (!profile?.voiceDna) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="size-4" /> Voice DNA
          </CardTitle>
          <CardDescription>
            Add a sample and run analysis to generate your profile.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const dna = profile.voiceDna;
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="size-4" /> Voice DNA · v{profile.version}
          </CardTitle>
          <CardDescription>{dna.tone.primary}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="text-muted-foreground">{dna.summary}</p>
          {dna.expertiseAreas.length ? (
            <div>
              <span className="font-medium">Expertise: </span>
              {dna.expertiseAreas.slice(0, 3).join(", ")}
            </div>
          ) : null}
          <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
            View full analysis
          </Button>
        </CardContent>
      </Card>
      <AnalysisModal open={open} onOpenChange={setOpen} profile={profile} />
    </>
  );
}
