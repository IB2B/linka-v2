"use client";

import { Label } from "@/components/ui/label";
import { PlatformPicker } from "./platform-picker";
import { LanguageSelect } from "./language-select";
import { MediaTypeSelect } from "./media-type-select";
import { AvatarVideoOptions } from "./avatar-video-options";
import { ImageOptions } from "./image-options";
import type { Platform } from "@/lib/content/platforms";
import type { PostSettings } from "@/types/content";

type Props = {
  value: PostSettings;
  onChange: (next: PostSettings) => void;
  disabled?: boolean;
};

export function PostSettingsPanel({ value, onChange, disabled }: Props) {
  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Platforms</Label>
        <PlatformPicker
          values={value.platforms as Platform[]}
          onChange={(p) => onChange({ ...value, platforms: p })}
          disabled={disabled}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="language" className="text-xs text-muted-foreground">Language</Label>
        <LanguageSelect
          value={value.language}
          onChange={(v) => onChange({ ...value, language: v })}
          disabled={disabled}
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">AI media</Label>
        <MediaTypeSelect
          value={value.media}
          onChange={(m) => onChange({ ...value, media: m })}
          disabled={disabled}
        />
      </div>
      {value.media === "image" ? (
        <ImageOptions
          shape={value.imageShape}
          onShapeChange={(s) => onChange({ ...value, imageShape: s })}
          disabled={disabled}
        />
      ) : null}
      {value.media === "avatar" ? (
        <AvatarVideoOptions
          aspect={value.avatarAspect}
          seconds={value.avatarSeconds}
          onAspectChange={(a) => onChange({ ...value, avatarAspect: a })}
          onSecondsChange={(s) => onChange({ ...value, avatarSeconds: s })}
          disabled={disabled}
        />
      ) : null}
    </div>
  );
}
