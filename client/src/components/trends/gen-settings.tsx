"use client";

import { ImageIcon, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LanguageSelect } from "@/components/generate/language-select";

type Props = {
  language: string;
  withImage: boolean;
  onLanguage: (v: string) => void;
  onWithImage: (v: boolean) => void;
  disabled?: boolean;
};

export function GenSettings({
  language, withImage, onLanguage, onWithImage, disabled,
}: Props) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button type="button" variant="outline" disabled={disabled}
            aria-label="Generation settings" className="gap-2">
            <Settings className="size-4" />
            <span className="hidden sm:inline">Options</span>
          </Button>
        }
      />
      <PopoverContent align="end" className="w-60 space-y-3">
        <div className="space-y-1.5">
          <span className="text-xs text-muted-foreground">Post language</span>
          <LanguageSelect value={language} onChange={onLanguage} disabled={disabled} />
        </div>
        <Label className="flex cursor-pointer items-center gap-2 rounded-md border bg-muted/30 px-3 py-2 text-sm">
          <Checkbox checked={withImage}
            onCheckedChange={(c) => onWithImage(!!c)} disabled={disabled} />
          <ImageIcon className="size-4 text-muted-foreground" />
          Generate AI image
        </Label>
      </PopoverContent>
    </Popover>
  );
}
