"use client";

import { useState } from "react";
import { PenLine, Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SuggestionsList } from "./suggestions-list";
import { ManualTopicForm } from "./manual-topic-form";
import { cn } from "@/lib/utils";
import type { PostType, TopicMode } from "@/types/content";

type Props = {
  postType: PostType;
  pending: boolean;
  language: string;
  onGenerate: (topic: string) => void;
};

export function TopicChooser({ postType, pending, language, onGenerate }: Props) {
  const [mode, setMode] = useState<TopicMode>("ai");
  return (
    <div className="space-y-4">
      <div className="inline-flex w-full rounded-md border bg-muted/30 p-1 sm:w-auto">
        <ModeTab active={mode === "ai"} onClick={() => setMode("ai")}>
          <Wand2 className="size-4" />
          AI suggestions
        </ModeTab>
        <ModeTab active={mode === "manual"} onClick={() => setMode("manual")}>
          <PenLine className="size-4" />
          Write my own
        </ModeTab>
      </div>
      {mode === "ai" ? (
        <SuggestionsList
          postType={postType}
          pending={pending}
          language={language}
          onSelect={onGenerate}
        />
      ) : (
        <ManualTopicForm pending={pending} onSubmit={onGenerate} />
      )}
    </div>
  );
}

function ModeTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      type="button"
      size="sm"
      variant="ghost"
      onClick={onClick}
      className={cn(
        "flex-1 gap-2",
        active && "bg-background text-foreground shadow-xs",
      )}
    >
      {children}
    </Button>
  );
}
