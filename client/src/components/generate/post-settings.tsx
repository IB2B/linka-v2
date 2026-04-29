"use client";

import { ImageIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PlatformPicker } from "./platform-picker";
import { LanguageSelect } from "./language-select";
import type { Platform } from "@/lib/content/platforms";
import type { PostSettings } from "@/types/content";

type Props = {
  value: PostSettings;
  onChange: (next: PostSettings) => void;
  disabled?: boolean;
};

export function PostSettingsPanel({ value, onChange, disabled }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Post settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Platform</Label>
          <PlatformPicker
            value={value.platform as Platform}
            onChange={(p) => onChange({ ...value, platform: p })}
            disabled={disabled}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="language" className="text-xs text-muted-foreground">
              Language
            </Label>
            <LanguageSelect
              value={value.language}
              onChange={(v) => onChange({ ...value, language: v })}
              disabled={disabled}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Image</Label>
            <Label className="flex h-9 cursor-pointer items-center gap-2 rounded-md border bg-muted/30 px-3 text-sm">
              <Checkbox
                checked={value.withImage}
                onCheckedChange={(c) => onChange({ ...value, withImage: !!c })}
                disabled={disabled}
              />
              <ImageIcon className="size-4 text-muted-foreground" />
              Generate AI image
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
