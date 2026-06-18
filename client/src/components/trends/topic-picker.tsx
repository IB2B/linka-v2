"use client";

import { RefreshCw, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { GenSettings } from "./gen-settings";

type Props = {
  topic: string;
  onTopic: (v: string) => void;
  onRefresh: (value?: string) => void;
  pending: boolean;
  chips: string[];
  language: string;
  withImage: boolean;
  onLanguage: (v: string) => void;
  onWithImage: (v: boolean) => void;
};

export function TopicPicker({
  topic, onTopic, onRefresh, pending, chips,
  language, withImage, onLanguage, onWithImage,
}: Props) {
  const hasQuery = topic.trim().length > 0;
  return (
    <div className="space-y-3 rounded-xl border bg-card p-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          placeholder="What do you want trends about? e.g. AI agents, fintech, indie hacking…"
          value={topic}
          onChange={(e) => onTopic(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") onRefresh(); }}
          disabled={pending}
          className="flex-1"
        />
        <div className="flex gap-2">
          <GenSettings
            language={language} withImage={withImage}
            onLanguage={onLanguage} onWithImage={onWithImage} disabled={pending}
          />
          <Button onClick={() => onRefresh()} disabled={pending}>
            {pending ? <Spinner aria-hidden />
              : hasQuery ? <Search className="size-4" /> : <RefreshCw className="size-4" />}
            {pending ? "Scanning…" : hasQuery ? "Search" : "Refresh"}
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs text-muted-foreground">Try:</span>
        {chips.map((s) => (
          <button
            key={s}
            type="button"
            disabled={pending}
            onClick={() => onRefresh(s)}
            className="rounded-full border bg-background px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
