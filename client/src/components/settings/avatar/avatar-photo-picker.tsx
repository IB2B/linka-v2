"use client";

import { useEffect, useMemo, useRef } from "react";
import { ImagePlus } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = { file: File | null; disabled: boolean; onPick: (file: File | null) => void };

export function AvatarPhotoPicker({ file, disabled, onPick }: Props) {
  const input = useRef<HTMLInputElement>(null);
  const preview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  return (
    <div className="flex items-center gap-4">
      <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted">
        {preview
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={preview} alt="Your photo" className="size-full object-cover" />
          : <ImagePlus className="size-6 text-muted-foreground" />}
      </div>
      <div className="space-y-1">
        <Button type="button" size="sm" variant="outline" disabled={disabled}
          onClick={() => input.current?.click()}>
          {file ? "Change photo" : "Choose photo"}
        </Button>
        <p className="max-w-56 truncate text-xs text-muted-foreground">
          {file ? file.name : "JPG or PNG"}
        </p>
      </div>
      <input ref={input} type="file" accept="image/jpeg,image/png" className="hidden"
        onChange={(e) => onPick(e.target.files?.[0] ?? null)} />
    </div>
  );
}
