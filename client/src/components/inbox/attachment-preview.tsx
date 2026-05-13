"use client";

import { X, FileText } from "lucide-react";

type Props = { file: File; onRemove: () => void };

export function AttachmentPreview({ file, onRemove }: Props) {
  const isImage = file.type.startsWith("image/");
  const url = isImage ? URL.createObjectURL(file) : null;

  return (
    <div className="relative inline-flex items-center gap-2 rounded-lg border bg-muted px-2 py-1.5 text-xs">
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt={file.name} className="h-10 w-10 rounded object-cover" />
      ) : (
        <FileText className="size-5 text-muted-foreground" />
      )}
      <span className="max-w-[120px] truncate text-muted-foreground">{file.name}</span>
      <button
        type="button"
        onClick={onRemove}
        className="ml-1 rounded-full p-0.5 hover:bg-accent"
        aria-label="Remove"
      >
        <X className="size-3" />
      </button>
    </div>
  );
}
