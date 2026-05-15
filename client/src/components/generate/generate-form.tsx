"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import { GenerateStepOne } from "./generate-step-one";
import { GenerateStepTwo } from "./generate-step-two";
import { TopicSection } from "./topic-section";
import { GenerationOverlay } from "./generation-overlay";
import { GenerateStepBar } from "./generate-step-bar";
import { GeneratedPostCard } from "./generated-post-card";
import { useGenerate } from "./use-generate";
import { Button } from "@/components/ui/button";
import type { NewsArticle, PostSettings, PostType } from "@/types/content";

type Props = { initialNews: NewsArticle[] };
type Step = 1 | 2 | 3;

const DEFAULT_SETTINGS: PostSettings = { platform: "linkedin", language: "en", withImage: true };

export function GenerateForm({ initialNews }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [postType, setPostType] = useState<PostType>("news_commentary");
  const [settings, setSettings] = useState<PostSettings>(DEFAULT_SETTINGS);
  const { generate, randomGenerate, regenerate, clearResult, pending, generatingFor, result } =
    useGenerate(postType, settings);

  function reset() { clearResult(); setStep(1); }

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
            onGenerate={(opts) => generate(opts)} />
        </div>
      )}

      {result && (
        <GeneratedPostCard result={result} pending={pending}
          onRegenerate={regenerate} onReset={reset} />
      )}

      {generatingFor ? <GenerationOverlay label={generatingFor} /> : null}
    </div>
  );
}
