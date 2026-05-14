"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

import { GenerateStepOne } from "./generate-step-one";
import { GenerateStepTwo } from "./generate-step-two";
import { TopicSection } from "./topic-section";
import { GenerationOverlay } from "./generation-overlay";
import { GenerateStepBar } from "./generate-step-bar";
import { generatePostAction } from "@/app/dashboard/generate/actions";
import { RANDOM_TYPES } from "@/lib/content/post-type-utils";
import { Button } from "@/components/ui/button";
import type { NewsArticle, PostSettings, PostType } from "@/types/content";

type Props = { initialNews: NewsArticle[] };
type Step = 1 | 2 | 3;

const DEFAULT_SETTINGS: PostSettings = { platform: "linkedin", language: "en", withImage: true };

export function GenerateForm({ initialNews }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [postType, setPostType] = useState<PostType>("news_commentary");
  const [settings, setSettings] = useState<PostSettings>(DEFAULT_SETTINGS);
  const [generatingFor, setGeneratingFor] = useState<string | null>(null);
  const [pending, start] = useTransition();

  function generate(opts: { type?: PostType; topic?: string; article?: NewsArticle; label: string }) {
    const type = opts.type ?? postType;
    setGeneratingFor(opts.label);
    start(async () => {
      const res = await generatePostAction({
        postType: type, topic: opts.topic, newsArticle: opts.article,
        platform: settings.platform, language: settings.language, withImage: settings.withImage,
      });
      setGeneratingFor(null);
      if (res.error) toast.error(res.error);
      else toast.success("Post generated. Check Posts to review.");
    });
  }

  function onRandom() {
    const type = RANDOM_TYPES[Math.floor(Math.random() * RANDOM_TYPES.length)];
    setPostType(type);
    generate({ type, label: "a surprise post" });
  }

  return (
    <div className="space-y-8">
      <GenerateStepBar step={step} />

      {step === 1 && (
        <GenerateStepOne postType={postType} pending={pending}
          onChangeType={setPostType} onRandom={onRandom} onNext={() => setStep(2)} />
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

      {generatingFor ? <GenerationOverlay label={generatingFor} /> : null}
    </div>
  );
}
