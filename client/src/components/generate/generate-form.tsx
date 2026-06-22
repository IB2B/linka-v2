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

type Props = { initialNews: NewsArticle[]; defaultLanguage: string };
type Step = 1 | 2 | 3;

export function GenerateForm({ initialNews, defaultLanguage }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [postType, setPostType] = useState<PostType>("news_commentary");
  const [settings, setSettings] = useState<PostSettings>({
    platforms: ["linkedin"], language: defaultLanguage, withImage: true,
  });
  const { generate, randomGenerate, pending, generatingFor } =
    useGenerate(postType, settings);

  return (
    <div className="space-y-8">
      <GenerateStepBar step={step} />

      {step === 1 && (
        <GenerateStepOne postType={postType} pending={pending}
          onChangeType={setPostType} onRandom={() => randomGenerate(setPostType)}
          onNext={() => setStep(2)} />
      )}

      {step === 2 && (
        <GenerateStepTwo settings={settings} pending={pending}
          onChange={setSettings} onBack={() => setStep(1)} onNext={() => setStep(3)} />
      )}

      {step === 3 && (
        <div className="space-y-4">
          <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
            <ArrowLeft className="size-4" /> Back to settings
          </Button>
          <TopicSection postType={postType} initialNews={initialNews} pending={pending}
            language={settings.language} onGenerate={(opts) => generate(opts)} />
        </div>
      )}

      {generatingFor ? <GenerationOverlay label={generatingFor} /> : null}
    </div>
  );
}
