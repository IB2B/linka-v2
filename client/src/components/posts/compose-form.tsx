"use client";

import { useState } from "react";
import { Calendar, Send } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { PlatformPicker } from "./platform-picker";
import { ComposeImageField } from "./compose-image-field";
import { useComposeSubmit } from "./use-compose-submit";
import { usePostPlatforms } from "./platforms-context";

type Props = {
  onPosted: () => void;
  onScheduleDraft: (id: string) => void;
};

export function ComposeForm({ onPosted, onScheduleDraft }: Props) {
  const t = useTranslations("posts.compose");
  const tp = useTranslations("posts");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { pending, postNow, schedule } = useComposeSubmit(onPosted, onScheduleDraft);
  const ctx = usePostPlatforms();
  // No connected account means nowhere to publish; the picker says so.
  const locked = pending || content.trim().length === 0
    || !ctx || ctx.loading || ctx.connected.length === 0;

  return (
    <div className="flex flex-col gap-4 p-4">
      <Textarea value={content} onChange={(e) => setContent(e.target.value)}
        maxLength={5000} rows={5} placeholder={t("placeholder")} autoFocus />
      <ComposeImageField file={file} onSelect={setFile} disabled={pending} />
      <div className="space-y-1.5">
        <p className="text-xs text-muted-foreground">{t("platformsLabel")}</p>
        <PlatformPicker />
      </div>
      <div className="flex justify-end gap-2 border-t pt-3">
        <Button type="button" variant="outline" disabled={locked}
          onClick={() => schedule(content, file)}>
          <Calendar className="size-4" />
          {tp("schedule")}
        </Button>
        <Button type="button" disabled={locked}
          onClick={() => postNow(content, file)}>
          {pending ? <Spinner aria-hidden /> : <Send className="size-4" />}
          {tp("postNow")}
        </Button>
      </div>
    </div>
  );
}
