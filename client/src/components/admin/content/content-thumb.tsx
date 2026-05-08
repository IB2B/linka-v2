import { ImageIcon } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

type Props = { src: string | null; alt: string };

export function ContentThumb({ src, alt }: Props) {
  if (!src) {
    return (
      <Skeleton className="grid size-12 shrink-0 place-items-center rounded-md border bg-muted/40">
        <ImageIcon className="size-4 text-muted-foreground/60" />
      </Skeleton>
    );
  }
  // Use plain img to avoid next/image config for arbitrary remote/proxy URLs.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="size-12 shrink-0 rounded-md border object-cover"
    />
  );
}
