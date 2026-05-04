"use client";

import { useTransition } from "react";
import { Trash2, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useSelection } from "./selection-context";
import { bulkDeletePostsAction } from "@/app/dashboard/posts/actions";
import type { GeneratedPost } from "@/types/post";

export function SelectionBar({ posts }: { posts: GeneratedPost[] }) {
  const sel = useSelection();
  const [pending, start] = useTransition();
  if (!sel.enabled) return null;

  const postedIds = posts.filter((p) => p.status === "posted").map((p) => p.id);

  function onDelete() {
    const ids = Array.from(sel.selected);
    if (ids.length === 0) { toast.error("Select at least one post."); return; }
    start(async () => {
      const r = await bulkDeletePostsAction(ids);
      if (r.error) toast.error(r.error);
      else {
        toast.success(`Deleted ${r.deleted ?? 0} post(s).`);
        sel.clear(); sel.setEnabled(false);
      }
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border bg-card p-3">
      <span className="text-sm font-medium">{sel.selected.size} selected</span>
      <Button size="sm" variant="outline" onClick={() => sel.selectMany(postedIds)}>
        Select all posted ({postedIds.length})
      </Button>
      <Button size="sm" variant="outline" onClick={() => sel.selectMany(posts.map((p) => p.id))}>
        Select all
      </Button>
      <Button size="sm" variant="outline" onClick={sel.clear}>Clear</Button>
      <div className="ml-auto flex gap-2">
        <Button size="sm" variant="destructive" onClick={onDelete}
          disabled={pending || sel.selected.size === 0}>
          {pending ? <Spinner /> : <Trash2 className="size-4" />}
          Delete selected
        </Button>
        <Button size="sm" variant="ghost" onClick={() => sel.setEnabled(false)}>
          <X className="size-4" /> Exit
        </Button>
      </div>
    </div>
  );
}
