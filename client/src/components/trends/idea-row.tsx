"use client";

import { useTransition } from "react";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { generatePostAction } from "@/app/dashboard/generate/actions";
import type { TrendIdea } from "@/types/trend";
import { ScoreBar } from "./score-bar";

const ALLOWED = ["linkedin", "twitter", "threads", "instagram", "facebook"] as const;
type Platform = (typeof ALLOWED)[number];
function normalize(v: string | null): Platform {
  if (!v) return "linkedin";
  const lower = v.toLowerCase();
  if (lower === "x") return "twitter";
  return (ALLOWED as readonly string[]).includes(lower)
    ? (lower as Platform)
    : "linkedin";
}

export function IdeaRow({ idea }: { idea: TrendIdea }) {
  const [pending, start] = useTransition();
  const platform = normalize(idea.platform);

  function onGenerate() {
    start(async () => {
      const res = await generatePostAction({
        postType: "news_commentary",
        topic: idea.hook,
        platform,
        language: "en",
        withImage: true,
      });
      if (res.error) toast.error(res.error);
      else toast.success("Post generated. Check Posts to review.");
    });
  }

  return (
    <div className="flex items-start gap-3 rounded-lg border bg-card/40 p-3">
      <div className="min-w-0 flex-1 space-y-1.5">
        <p className="break-words text-sm leading-snug">{idea.hook}</p>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {idea.angle ? <span className="rounded bg-muted px-1.5 py-0.5">{idea.angle}</span> : null}
          <span className="rounded bg-muted px-1.5 py-0.5">{platform}</span>
          <ScoreBar score={idea.score} />
        </div>
      </div>
      <Button
        size="sm" variant="outline" disabled={pending} onClick={onGenerate}
        aria-label="Generate"
        className="shrink-0 px-2 sm:px-3"
      >
        {pending ? <Spinner aria-hidden /> : <Sparkles className="size-3.5" />}
        <span className="hidden sm:inline">Generate</span>
      </Button>
    </div>
  );
}
