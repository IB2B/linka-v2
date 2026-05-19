"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { generatePostAction } from "@/app/dashboard/generate/actions";
import { RANDOM_TYPES } from "@/lib/content/post-type-utils";
import type { NewsArticle, PostSettings, PostType } from "@/types/content";

export type GenOpts = { type?: PostType; topic?: string; article?: NewsArticle; label: string };

export function useGenerate(postType: PostType, settings: PostSettings) {
  const router = useRouter();
  const t = useTranslations("generate.toast");
  const [generatingFor, setGeneratingFor] = useState<string | null>(null);
  const [pending, start] = useTransition();

  function generate(opts: GenOpts) {
    const type = opts.type ?? postType;
    setGeneratingFor(opts.label);
    start(async () => {
      const res = await generatePostAction({
        postType: type, topic: opts.topic, newsArticle: opts.article,
        platforms: settings.platforms, language: settings.language, withImage: settings.withImage,
      });
      setGeneratingFor(null);
      if (res.error) {
        const isLimit = res.code === "POST_LIMIT_REACHED";
        toast.error(res.error, isLimit ? {
          action: { label: t("upgrade"), onClick: () => { window.location.href = "/dashboard/billing"; } },
        } : undefined);
        return;
      }
      const posts = res.data?.posts ?? [];
      (res.data?.errors ?? []).forEach((e) => toast.error(`${e.platform}: ${e.error}`));
      if (posts.length === 0) return;
      toast.success(posts.length === 1 ? t("postGenerated") : t("postsGenerated", { count: posts.length }));
      router.push(posts.length === 1 ? `/dashboard/posts/${posts[0].contentId}` : "/dashboard/posts");
    });
  }

  function randomGenerate(onType: (t: PostType) => void) {
    const type = RANDOM_TYPES[Math.floor(Math.random() * RANDOM_TYPES.length)];
    onType(type);
    generate({ type, label: t("surprisePost") });
  }

  return { generate, randomGenerate, pending, generatingFor };
}
