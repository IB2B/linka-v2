"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatPostDate } from "@/lib/posts/format-date";
import type { GeneratedPost } from "@/types/post";

type Props = {
  post: GeneratedPost;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PostViewDialog({ post, open, onOpenChange }: Props) {
  async function onCopy() {
    try {
      await navigator.clipboard.writeText(post.content);
      toast.success("Copied to clipboard.");
    } catch {
      toast.error("Could not copy.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] flex-col gap-0 p-0 sm:max-w-2xl">
        <DialogHeader className="border-b p-4">
          <DialogTitle>{post.platform ?? "Generated post"}</DialogTitle>
          <DialogDescription>{formatPostDate(post.createdAt)}</DialogDescription>
        </DialogHeader>
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {post.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.imageUrl}
              alt=""
              className="w-full rounded-md border"
            />
          ) : null}
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        </div>
        <div className="flex justify-end gap-2 border-t p-3">
          <Button size="sm" variant="outline" onClick={onCopy}>
            <Copy className="size-4" />
            Copy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
