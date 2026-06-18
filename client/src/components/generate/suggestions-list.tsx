"use client";

import { useEffect, useState, useTransition } from "react";
import { RefreshCw, Wand2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SuggestionItem } from "./suggestion-item";
import { suggestTopics } from "@/lib/api/generate-client";
import type { PostType, TopicSuggestion } from "@/types/content";

type Props = {
  postType: PostType;
  pending: boolean;
  onSelect: (topic: string) => void;
};

export function SuggestionsList({ postType, pending, onSelect }: Props) {
  const [items, setItems] = useState<TopicSuggestion[]>([]);
  const [loading, start] = useTransition();

  function load(refresh = false) {
    start(async () => {
      const res = await suggestTopics(postType, 5, refresh);
      if (res.error) toast.error(res.error);
      else setItems(res.data ?? []);
    });
  }

  useEffect(() => {
    setItems([]);
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postType]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Click a topic to generate.
        </p>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => load(true)}
          disabled={loading || pending}
        >
          <RefreshCw className={loading ? "size-4 animate-spin" : "size-4"} />
          Refresh
        </Button>
      </div>
      {loading && items.length === 0 ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-md" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
          <Wand2 className="size-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No suggestions yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((s, i) => (
            <SuggestionItem
              key={i}
              suggestion={s}
              disabled={pending}
              onClick={() => onSelect(s.topic)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
