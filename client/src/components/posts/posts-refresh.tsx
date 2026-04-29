"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { GeneratedPost } from "@/types/post";

const MAX_ATTEMPTS = 30;

function nextDelay(attempt: number): number {
  if (attempt < 8) return 4000;
  if (attempt < 16) return 8000;
  return 15000;
}

// Polls router.refresh() while any post on the page has an image still
// generating. Backs off and gives up after MAX_ATTEMPTS to avoid spinning
// forever if the background job died silently.
export function PostsRefresh({ posts }: { posts: GeneratedPost[] }) {
  const router = useRouter();
  const hasInflight = posts.some(
    (p) => p.imageStatus === "pending" || p.imageStatus === "generating",
  );
  const [attempt, setAttempt] = useState(0);
  const lastInflight = useRef(false);

  useEffect(() => {
    if (hasInflight && !lastInflight.current) setAttempt(0);
    lastInflight.current = hasInflight;
  }, [hasInflight]);

  useEffect(() => {
    if (!hasInflight || attempt >= MAX_ATTEMPTS) return;
    const id = setTimeout(() => {
      router.refresh();
      setAttempt((a) => a + 1);
    }, nextDelay(attempt));
    return () => clearTimeout(id);
  }, [hasInflight, attempt, router]);

  return null;
}
