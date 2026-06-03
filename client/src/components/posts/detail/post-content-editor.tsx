"use client";

import { useLayoutEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { updatePostAction } from "@/app/dashboard/posts/actions";
import type { GeneratedPost } from "@/types/post";

type Props = { post: GeneratedPost; onClose: () => void };

export function PostContentEditor({ post, onClose }: Props) {
  const router = useRouter();
  const ref = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState(post.content);
  const [pending, start] = useTransition();
  const dirty = value.trim() !== post.content.trim();

  // Grow the textarea to fit its content so the whole post is visible.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  function onSave() {
    const text = value.trim();
    if (!text) { toast.error("Content can't be empty."); return; }
    start(async () => {
      const res = await updatePostAction(post.id, text);
      if (res.error) { toast.error(res.error); return; }
      toast.success("Post updated.");
      onClose();
      router.refresh();
    });
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-muted-foreground">Edit content</h2>
        <span className="text-xs text-muted-foreground">
          {value.length.toLocaleString()} characters
        </span>
      </div>
      <Textarea
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={pending}
        autoFocus
        className="min-h-48 resize-none overflow-hidden text-sm leading-relaxed"
      />
      <div className="flex items-center justify-end gap-2">
        <Button size="sm" variant="ghost" onClick={onClose} disabled={pending}>
          Cancel
        </Button>
        <Button size="sm" onClick={onSave} disabled={pending || !dirty}>
          {pending && <Spinner size="xs" />}
          Save
        </Button>
      </div>
    </div>
  );
}
