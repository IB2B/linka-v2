"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { generatePostAction } from "@/app/dashboard/generate/actions";
import { RANDOM_TYPES } from "@/lib/content/post-type-utils";
import type { GenerationResult, NewsArticle, PostSettings, PostType } from "@/types/content";

export type GenOpts = { type?: PostType; topic?: string; article?: NewsArticle; label: string };

export function useGenerate(postType: PostType, settings: PostSettings) {
  const [generatingFor, setGeneratingFor] = useState<string | null>(null);
  const [results, setResults] = useState<GenerationResult[]>([]);
  const [lastOpts, setLastOpts] = useState<GenOpts | null>(null);
  const [pending, start] = useTransition();

  function generate(opts: GenOpts) {
    const type = opts.type ?? postType;
    setGeneratingFor(opts.label);
    setLastOpts(opts);
    start(async () => {
      const res = await generatePostAction({
        postType: type, topic: opts.topic, newsArticle: opts.article,
        platforms: settings.platforms, language: settings.language, withImage: settings.withImage,
      });
      setGeneratingFor(null);
      if (res.error) {
        const isLimit = res.code === "POST_LIMIT_REACHED";
        toast.error(res.error, isLimit ? {
          action: { label: "Upgrade", onClick: () => { window.location.href = "/dashboard/billing"; } },
        } : undefined);
        return;
      }
      setResults(res.data?.posts ?? []);
      (res.data?.errors ?? []).forEach((e) => toast.error(`${e.platform}: ${e.error}`));
    });
  }

  function randomGenerate(onType: (t: PostType) => void) {
    const type = RANDOM_TYPES[Math.floor(Math.random() * RANDOM_TYPES.length)];
    onType(type);
    generate({ type, label: "a surprise post" });
  }

  return {
    generate,
    randomGenerate,
    regenerate: () => { if (lastOpts) generate(lastOpts); },
    clearResults: () => setResults([]),
    pending,
    generatingFor,
    results,
  };
}
