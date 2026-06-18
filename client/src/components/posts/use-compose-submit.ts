"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { createPostAction } from "@/app/dashboard/posts/compose-actions";
import { publishPostAction } from "@/app/dashboard/posts/actions";
import { uploadComposeImage } from "@/lib/posts/upload-post-image";
import { showPublishToast } from "@/lib/posts/publish-toast";
import { usePostPlatforms } from "./platforms-context";

// Shared create→publish / create→schedule flow for the manual composer.
export function useComposeSubmit(
  onPosted: () => void, onScheduleDraft: (id: string) => void,
) {
  const ctx = usePostPlatforms();
  const [pending, start] = useTransition();

  async function createDraft(content: string, file: File | null): Promise<string | null> {
    let imageUrl: string | null = null;
    if (file) {
      const up = await uploadComposeImage(file);
      if ("error" in up) { toast.error(up.error); return null; }
      imageUrl = up.url;
    }
    const r = await createPostAction(content, imageUrl);
    if (r.error || !r.id) { toast.error(r.error ?? "Failed to create post."); return null; }
    return r.id;
  }

  function hasPlatform(): boolean {
    if ((ctx?.selected ?? []).length > 0) return true;
    toast.error("Pick at least one platform.");
    return false;
  }

  function postNow(content: string, file: File | null) {
    if (!hasPlatform()) return;
    start(async () => {
      const id = await createDraft(content, file);
      if (!id) return;
      const res = await publishPostAction(id, ctx!.selected);
      if (res.error) { toast.error(res.error); return; }
      showPublishToast({ publishedTo: res.publishedTo ?? [], failed: res.failed ?? [] });
      onPosted();
    });
  }

  function schedule(content: string, file: File | null) {
    if (!hasPlatform()) return;
    start(async () => {
      const id = await createDraft(content, file);
      if (id) onScheduleDraft(id);
    });
  }

  return { pending, postNow, schedule };
}
