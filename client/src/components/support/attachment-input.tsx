"use client";

import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { uploadSupportAttachment } from "@/lib/support/upload-attachment";

type Props = {
  value: string | null;
  onChange: (url: string | null) => void;
  disabled?: boolean;
};

export function AttachmentInput({ value, onChange, disabled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    const res = await uploadSupportAttachment(file);
    setUploading(false);
    if ("error" in res) toast.error(res.error);
    else onChange(res.url);
  }

  if (value) {
    return (
      <div className="relative inline-block">
        <img
          src={value}
          alt="Attachment"
          className="h-24 w-24 rounded-md border object-cover"
        />
        <button
          type="button"
          onClick={() => onChange(null)}
          disabled={disabled}
          className="absolute -top-2 -right-2 grid size-5 place-items-center rounded-full border bg-background shadow-xs hover:bg-muted disabled:opacity-50"
          aria-label="Remove attachment"
        >
          <X className="size-3" />
        </button>
      </div>
    );
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={onPick}
        disabled={disabled || uploading}
      />
      <Button
        type="button" variant="outline" size="sm"
        onClick={() => inputRef.current?.click()}
        disabled={disabled || uploading}
      >
        {uploading ? <Spinner aria-hidden /> : <ImagePlus className="size-3.5" />}
        {uploading ? "Uploading…" : "Attach image"}
      </Button>
    </>
  );
}
