import { ImageIcon } from "lucide-react";
import { PostImagePlaceholder } from "./post-image-placeholder";
import type { ImageStatus } from "@/types/post";

type Props = { url: string | null; status: ImageStatus };

export function PostImage({ url, status }: Props) {
  if (url) {
    return (
      <div className="size-full overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt="" className="size-full object-cover" />
      </div>
    );
  }
  if (status === "pending" || status === "generating") {
    return (
      <div className="relative size-full overflow-hidden bg-muted">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="flex size-full flex-col items-center justify-center gap-2">
          <ImageIcon className="size-5 text-muted-foreground/50" />
          <span className="text-xs font-medium text-muted-foreground">
            {status === "pending" ? "Image queued…" : "Generating image…"}
          </span>
          <span className="text-[11px] text-muted-foreground/60">This usually takes 10–30 s</span>
        </div>
      </div>
    );
  }
  if (status === "failed") return <PostImagePlaceholder />;
  return null;
}
