"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

type Props = { pending: boolean; onSubmit: (topic: string) => void };

export function ManualTopicForm({ pending, onSubmit }: Props) {
  const [topic, setTopic] = useState("");
  const trimmed = topic.trim();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!trimmed) {
      toast.error("Please enter a topic.");
      return;
    }
    onSubmit(trimmed);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="manual-topic">Your topic</Label>
        <Textarea
          id="manual-topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          rows={3}
          placeholder="e.g. Why hiring slower beats hiring smarter"
          disabled={pending}
        />
      </div>
      <Button type="submit" disabled={pending || !trimmed} className="w-full">
        {pending ? <Spinner aria-hidden /> : <Sparkles className="size-4" />}
        Generate post
      </Button>
    </form>
  );
}
