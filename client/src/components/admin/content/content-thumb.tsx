import { ImageIcon } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { FallbackImage } from "@/components/media/fallback-image";

type Props = { src: string | null; alt: string };

const empty = (
  <Skeleton className="grid size-12 shrink-0 place-items-center rounded-md border bg-muted/40">
    <ImageIcon className="size-4 text-muted-foreground/60" />
  </Skeleton>
);

export function ContentThumb({ src, alt }: Props) {
  if (!src) return empty;
  // Plain img (via FallbackImage) avoids next/image config for proxy URLs and
  // degrades to the empty state if the file is gone.
  return (
    <FallbackImage
      src={src}
      alt={alt}
      loading="lazy"
      className="size-12 shrink-0 rounded-md border object-cover"
      fallback={empty}
    />
  );
}
