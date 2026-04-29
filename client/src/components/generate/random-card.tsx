"use client";

import { Shuffle } from "lucide-react";

import { Card } from "@/components/ui/card";

type Props = { disabled: boolean; onClick: () => void };

export function RandomCard({ disabled, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="block w-full text-left disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Card className="group relative overflow-hidden border-dashed bg-gradient-to-br from-primary/5 via-transparent to-transparent transition-colors hover:border-primary/60 hover:from-primary/10">
        <div className="flex items-center gap-4 p-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary transition-transform group-hover:scale-110">
            <Shuffle className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium">Surprise me</p>
            <p className="text-sm text-muted-foreground">
              Let AI pick a post type and topic — instant draft in your voice.
            </p>
          </div>
        </div>
      </Card>
    </button>
  );
}
