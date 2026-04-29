import { Loader2 } from "lucide-react";
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
      <div className="flex size-full items-center justify-center gap-2 bg-muted text-xs text-muted-foreground">
        <Loader2 className="size-4 animate-spin" />
        Generating image…
      </div>
    );
  }
  if (status === "failed") return <PostImagePlaceholder />;
  return null;
}
