"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { PostTypeGrid } from "./post-type-grid";
import { RandomCard } from "./random-card";
import { TopicSection } from "./topic-section";
import { GenerationOverlay } from "./generation-overlay";
import { PostSettingsPanel } from "./post-settings";
import { generatePostAction } from "@/app/dashboard/generate/actions";
import { RANDOM_TYPES } from "@/lib/content/post-types";
import type { NewsArticle, PostSettings, PostType } from "@/types/content";

type Props = { initialNews: NewsArticle[] };

const DEFAULT_SETTINGS: PostSettings = {
  platform: "linkedin",
  language: "en",
  withImage: true,
};

export function GenerateForm({ initialNews }: Props) {
  const [postType, setPostType] = useState<PostType>("news_commentary");
  const [settings, setSettings] = useState<PostSettings>(DEFAULT_SETTINGS);
  const [generatingFor, setGeneratingFor] = useState<string | null>(null);
  const [pending, start] = useTransition();

  function generate(opts: {
    type?: PostType;
    topic?: string;
    article?: NewsArticle;
    label: string;
  }) {
    const type = opts.type ?? postType;
    setGeneratingFor(opts.label);
    start(async () => {
      const res = await generatePostAction({
        postType: type,
        topic: opts.topic,
        newsArticle: opts.article,
        platform: settings.platform,
        language: settings.language,
        withImage: settings.withImage,
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
      <RandomCard disabled={pending} onClick={onRandom} />
      <PostTypeGrid value={postType} onChange={setPostType} disabled={pending} />
      <PostSettingsPanel value={settings} onChange={setSettings} disabled={pending} />
      <TopicSection
        postType={postType}
        initialNews={initialNews}
        pending={pending}
        onGenerate={(opts) => generate(opts)}
      />
      {generatingFor ? <GenerationOverlay label={generatingFor} /> : null}
    </div>
  );
}
