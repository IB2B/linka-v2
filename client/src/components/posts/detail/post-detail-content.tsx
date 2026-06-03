"use client";

import { useState } from "react";
import { Copy, Pencil, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useRegen } from "./regen-context";
import { PostContentEditor } from "./post-content-editor";
import { cn } from "@/lib/utils";
import type { GeneratedPost } from "@/types/post";

export function PostDetailContent({ post }: { post: GeneratedPost }) {
  const { textPending } = useRegen();
  const [editing, setEditing] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(post.content);
      toast.success("Copied to clipboard.");
    } catch {
      toast.error("Could not copy.");
    }
  }

  if (editing) {
    return <PostContentEditor post={post} onClose={() => setEditing(false)} />;
  }

  return (
    <div className="relative space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-muted-foreground">Content</h2>
        <div className="flex items-center gap-1">
          {post.status !== "posted" && (
            <Button size="sm" variant="ghost" onClick={() => setEditing(true)} disabled={textPending}>
              <Pencil className="size-3.5" />
              Edit
            </Button>
          )}
          <Button size="sm" variant="ghost" onClick={onCopy} disabled={textPending}>
            <Copy className="size-3.5" />
            Copy
          </Button>
        </div>
      </div>
      <p className={cn(
        "text-sm leading-relaxed whitespace-pre-wrap text-foreground/90 transition-opacity",
        textPending && "opacity-30",
      )}>
        {post.content}
      </p>
      <p className="text-xs text-muted-foreground">
        {post.content.length.toLocaleString()} characters
      </p>
      {textPending ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-md">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-foreground/5 to-transparent" />
          <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-center gap-2 text-sm font-medium text-foreground/80">
            <Sparkles className="size-4 animate-pulse" />
            Rewriting…
          </div>
        </div>
      ) : null}
    </div>
  );
}
