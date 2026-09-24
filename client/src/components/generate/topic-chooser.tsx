"use client";

import { useState } from "react";
import { PenLine, Wand2 } from "lucide-react";

import { SuggestionsList } from "./suggestions-list";
import { ManualTopicForm } from "./manual-topic-form";
import { TopicGenerateBar } from "./topic-generate-bar";
import { ModeTab } from "./mode-tab";
import type { PostType, TopicMode } from "@/types/content";

type Props = {
  postType: PostType;
  pending: boolean;
  language: string;
  onGenerate: (topic: string) => void;
};

export function TopicChooser({ postType, pending, language, onGenerate }: Props) {
  const [mode, setMode] = useState<TopicMode>("ai");
  const [selected, setSelected] = useState<string | null>(null);
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
        <>
          <SuggestionsList postType={postType} pending={pending} language={language}
            selected={selected} onSelect={setSelected} />
          <TopicGenerateBar label={selected} pending={pending}
            onGenerate={() => selected && onGenerate(selected)} />
        </>
      ) : (
        <ManualTopicForm pending={pending} onSubmit={onGenerate} />
      )}
    </div>
  );
}
