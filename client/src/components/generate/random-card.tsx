"use client";

import { Shuffle, Languages } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { LanguageSelect } from "./language-select";

type Props = {
  disabled: boolean;
  language: string;
  onLanguageChange: (value: string) => void;
  onClick: () => void;
};

export function RandomCard({ disabled, language, onLanguageChange, onClick }: Props) {
  return (
    <Card className="overflow-hidden border-dashed bg-gradient-to-br from-primary/5 via-transparent to-transparent">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Shuffle className="size-5" />
          </div>
          <div className="min-w-0">
            <p className="font-medium">Surprise me</p>
            <p className="text-sm text-muted-foreground">
              Let AI pick a post type and topic — instant draft in your voice.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:shrink-0">
          <Languages className="size-4 shrink-0 text-muted-foreground" />
          <LanguageSelect
            value={language}
            onChange={onLanguageChange}
            disabled={disabled}
            className="w-[150px]"
          />
          <Button onClick={onClick} disabled={disabled}>
            {disabled ? <Spinner size="xs" /> : <Shuffle className="size-4" />}
            Surprise me
          </Button>
        </div>
      </div>
    </Card>
  );
}
