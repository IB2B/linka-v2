"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import { GenerateStepOne } from "./generate-step-one";
import { GenerateStepTwo } from "./generate-step-two";
import { TopicSection } from "./topic-section";
import { GenerationOverlay } from "./generation-overlay";
import { GenerateStepBar } from "./generate-step-bar";
import { useGenerate } from "./use-generate";
import { Button } from "@/components/ui/button";
import type { NewsArticle, PostSettings, PostType } from "@/types/content";
import type { UsageSummary } from "@/types/usage";
import type { Product } from "@/types/product";
import type { Platform } from "@/lib/content/platforms";

type Props = {
  initialNews: NewsArticle[];
  defaultLanguage: string;
  // YYYY-MM-DD when started from a calendar day.
  scheduleDate: string | null;
  usage: UsageSummary | null;
  products: Product[];
  // Connected platforms, in order; the first is selected to start.
  channels: Platform[];
};
type Step = 1 | 2 | 3;

export function GenerateForm({ initialNews, defaultLanguage, scheduleDate, usage, products, channels }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [postType, setPostType] = useState<PostType>("news_commentary");
  const [settings, setSettings] = useState<PostSettings>({
    platforms: [channels[0] ?? "linkedin"], language: defaultLanguage, media: "image",
    avatarAspect: "auto", avatarSeconds: 30, imageShape: "landscape",
  });
  const { generate, randomGenerate, pending, generatingFor } =
    useGenerate(postType, settings, scheduleDate);

  return (
    <div className="space-y-8">
      <GenerateStepBar step={step} />

      {step === 1 && (
        <GenerateStepOne postType={postType} pending={pending}
          language={settings.language}
          onLanguageChange={(l) => setSettings((s) => ({ ...s, language: l }))}
          onChangeType={setPostType} onRandom={() => randomGenerate(setPostType)}
          onNext={() => setStep(2)} />
      )}

      {step === 2 && (
        <GenerateStepTwo settings={settings} pending={pending} usage={usage} channels={channels}
          onChange={setSettings} onBack={() => setStep(1)} onNext={() => setStep(3)} />
      )}

      {step === 3 && (
        <div className="space-y-4">
          <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
            <ArrowLeft className="size-4" /> Back to settings
          </Button>
          <TopicSection postType={postType} initialNews={initialNews} products={products} pending={pending}
            language={settings.language} onGenerate={(opts) => generate(opts)} />
        </div>
      )}

      {generatingFor ? <GenerationOverlay label={generatingFor} /> : null}
    </div>
  );
}
