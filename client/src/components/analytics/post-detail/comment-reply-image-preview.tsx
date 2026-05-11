"use client";

import { X } from "lucide-react";
import Image from "next/image";

type Props = { url: string; onRemove: () => void };

export function CommentReplyImagePreview({ url, onRemove }: Props) {
  return (
    <div className="mt-2 inline-flex items-start gap-1.5">
      <div className="relative h-20 w-20 overflow-hidden rounded-lg border bg-muted">
        <Image
          src={url} alt="" fill sizes="80px"
          className="object-cover"
        />
      </div>
      <button
        type="button" onClick={onRemove} aria-label="Remove image"
        className="grid size-5 place-items-center rounded-full bg-zinc-900/80 text-white hover:bg-zinc-900"
      >
        <X className="size-3" />
      </button>
    </div>
  );
}
