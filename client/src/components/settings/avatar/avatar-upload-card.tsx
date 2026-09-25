"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import { FormField } from "@/components/forms/form-field";
import { AvatarPhotoPicker } from "./avatar-photo-picker";
import { AvatarPhotoTips } from "./avatar-photo-tips";
import { usePhotoAvatar } from "./use-photo-avatar";

type Props = { onReady: (lookId: string) => void };

// Turns one photo into the user's own presenter for avatar videos.
export function AvatarUploadCard({ onReady }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(false);
  const { creating, training, create } = usePhotoAvatar(onReady);
  const busy = creating || training;

  async function submit() {
    if (file && (await create(file, name.trim() || "My avatar"))) {
      setFile(null); setName(""); setConsent(false);
    }
  }

  return (
    <div className="space-y-4 rounded-lg border bg-card p-4">
      <div>
        <p className="text-sm font-semibold">Create your own avatar</p>
        <p className="text-sm text-muted-foreground">
          Upload one photo and HeyGen builds a presenter that looks like you.
        </p>
      </div>
      {training ? (
        <div className="flex items-center gap-3 rounded-md bg-muted/60 px-3 py-3 text-sm">
          <Spinner aria-hidden />
          Building your avatar — this usually takes a few minutes. You can keep working.
        </div>
      ) : (
        <>
          <AvatarPhotoPicker file={file} disabled={busy} onPick={setFile} />
          <AvatarPhotoTips />
          <FormField id="avatar-name" label="Name" value={name} maxLength={80}
            placeholder="e.g. Me — office" onChange={(e) => setName(e.target.value)} disabled={busy} />
          <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-snug">
            <Checkbox checked={consent} onCheckedChange={(v) => setConsent(v === true)} className="mt-0.5" />
            <span>This is my photo, or I have this person&apos;s permission to make an avatar of them.</span>
          </label>
          <Button onClick={submit} disabled={!file || !consent || busy}>
            {creating ? <Spinner aria-hidden /> : <Sparkles className="size-4" />}
            Create avatar
          </Button>
        </>
      )}
    </div>
  );
}
