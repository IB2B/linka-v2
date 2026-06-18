"use client";

import { useTransition } from "react";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { generatePost } from "@/lib/api/generate-client";
import type { TrendIdea } from "@/types/trend";
import { normalizePlatform } from "./idea-platform";
import { IdeaPlatformPill } from "./idea-platform-pill";
import { ScoreBadge } from "./score-badge";
import { useGenSettings } from "./gen-settings-context";

export function IdeaRow({ idea }: { idea: TrendIdea }) {
  const { language, withImage } = useGenSettings();
  const [pending, start] = useTransition();
  const platform = normalizePlatform(idea.platform);

  function onGenerate() {
    start(async () => {
      const res = await generatePost({
        postType: "news_commentary",
        topic: idea.hook,
        platforms: [platform],
        language,
        withImage,
      });
      if (res.error) toast.error(res.error);
      else toast.success("Post generated. Check Posts to review.");
    });
  }

  return (
    <div className="flex items-start gap-3 rounded-lg border bg-card/40 p-3 transition-colors hover:border-foreground/15 hover:bg-card">
      <div className="min-w-0 flex-1 space-y-2">
        <p className="break-words text-sm leading-snug">{idea.hook}</p>
        <div className="flex flex-wrap items-center gap-1.5">
          <IdeaPlatformPill platform={platform} />
          {idea.angle ? (
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
              {idea.angle}
            </span>
          ) : null}
          <ScoreBadge score={idea.score} label="Viral potential" />
        </div>
      </div>
      <Button
        size="sm" variant="outline" disabled={pending} onClick={onGenerate}
        aria-label="Generate post"
        className="shrink-0 px-2 sm:px-3"
      >
        {pending ? <Spinner aria-hidden /> : <Sparkles className="size-3.5" />}
        <span className="hidden sm:inline">Generate</span>
      </Button>
    </div>
  );
}
