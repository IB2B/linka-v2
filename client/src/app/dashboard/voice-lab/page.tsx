import { Suspense } from "react";

import { PageHeader } from "@/components/dashboard/page-header";
import { Separator } from "@/components/ui/separator";
import { AddSamplesDialog } from "@/components/voice-lab/add-samples-dialog";
import { SamplesList } from "@/components/voice-lab/samples-list";
import { VoiceDnaCard } from "@/components/voice-lab/voice-dna-card";
import { TipsCard } from "@/components/voice-lab/tips-card";
import { AnalyzeAllButton } from "@/components/voice-lab/analyze-all-button";
import { getVoiceLabData } from "@/lib/voice-lab/get-data";

export default async function VoiceLabPage() {
  const { samples, limits, profile } = await getVoiceLabData();
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader
          title="Voice Lab"
          description="Train AI to write in your authentic voice."
        />
        <div className="flex flex-wrap items-center gap-2">
          <AnalyzeAllButton
            disabled={samples.length < 2}
            sampleCount={samples.length}
          />
          <AddSamplesDialog limits={limits} />
        </div>
      </div>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Suspense>
            <SamplesList samples={samples} />
          </Suspense>
        </div>
        <aside className="space-y-6">
          <VoiceDnaCard profile={profile} />
          <TipsCard />
        </aside>
      </div>
    </>
  );
}
