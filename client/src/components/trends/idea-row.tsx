"use client";

import { useTransition } from "react";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { generatePostAction } from "@/app/dashboard/generate/actions";
import type { TrendIdea } from "@/types/trend";
import { ScoreBar } from "./score-bar";

const ALLOWED = ["linkedin", "x", "threads", "instagram"] as const;
type Platform = (typeof ALLOWED)[number];
const isPlatform = (v: string | null): v is Platform =>
  !!v && (ALLOWED as readonly string[]).includes(v);

export function IdeaRow({ idea }: { idea: TrendIdea }) {
  const [pending, start] = useTransition();
  const platform: Platform = isPlatform(idea.platform) ? idea.platform : "linkedin";

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
      <div className="flex-1 space-y-1.5">
        <p className="text-sm leading-snug">{idea.hook}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {idea.angle ? <span className="rounded bg-muted px-1.5 py-0.5">{idea.angle}</span> : null}
          <span className="rounded bg-muted px-1.5 py-0.5">{platform}</span>
          <ScoreBar score={idea.score} />
        </div>
      </div>
      <Button size="sm" variant="outline" disabled={pending} onClick={onGenerate}>
        {pending ? <Spinner aria-hidden /> : <Sparkles className="size-3.5" />}
        Generate
      </Button>
    </div>
  );
}
