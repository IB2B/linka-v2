import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PostDetailActions } from "./post-detail-actions";
import type { GeneratedPost } from "@/types/post";

export function PostDetailToolbar({ post }: { post: GeneratedPost }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Button
        render={<Link href="/dashboard/posts" />}
        nativeButton={false}
        variant="ghost"
        size="sm"
        className="-ml-2 text-muted-foreground"
      >
        <ArrowLeft className="size-4" />
        All posts
      </Button>
      <PostDetailActions post={post} />
    </div>
  );
}
