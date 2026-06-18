"use client";

import { useEffect, useMemo, useRef } from "react";
import { ImagePlus, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

type Props = {
  file: File | null;
  onSelect: (file: File | null) => void;
  disabled?: boolean;
};

export function ComposeImageField({ file, onSelect, disabled }: Props) {
  const t = useTranslations("posts.compose");
  const inputRef = useRef<HTMLInputElement>(null);
  const preview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  if (preview) {
    return (
      <div className="relative overflow-hidden rounded-lg border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={preview} alt="" className="max-h-60 w-full object-cover" />
        <Button type="button" size="icon-sm" variant="secondary" disabled={disabled}
          onClick={() => onSelect(null)} aria-label={t("removeImage")}
          className="absolute right-2 top-2">
          <X className="size-4" />
        </Button>
      </div>
    );
  }

  return (
    <>
      <input ref={inputRef} type="file" accept="image/*" hidden
        onChange={(e) => onSelect(e.target.files?.[0] ?? null)} />
      <Button type="button" variant="outline" size="sm" disabled={disabled}
        onClick={() => inputRef.current?.click()} className="w-fit">
        <ImagePlus className="size-4" />
        {t("addImage")}
      </Button>
    </>
  );
}
