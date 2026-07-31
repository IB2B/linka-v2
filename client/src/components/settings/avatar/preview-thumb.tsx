"use client";

import { UserRound } from "lucide-react";

import { cn } from "@/lib/utils";

// Shared thumbnail for every avatar card. HeyGen serves signed CDN URLs, so a
// plain <img> is used deliberately: next/image would need domain config and its
// optimizer strips the query signature, giving 403s.
type Props = { src: string | null; alt: string; className?: string };

export function PreviewThumb({ src, alt, className }: Props) {
  return (
    <div className={cn("w-full overflow-hidden bg-muted", className)}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} loading="lazy"
          className="size-full object-cover" />
      ) : (
        <div className="flex size-full items-center justify-center">
          <UserRound className="size-6 text-muted-foreground/40" />
        </div>
      )}
    </div>
  );
}
