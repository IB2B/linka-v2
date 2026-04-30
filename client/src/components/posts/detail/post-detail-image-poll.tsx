"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { ImageStatus } from "@/types/post";

export function PostDetailImagePoll({ status }: { status: ImageStatus }) {
  const router = useRouter();
  const inflight = status === "pending" || status === "generating";

  useEffect(() => {
    if (!inflight) return;
    const t = setInterval(() => router.refresh(), 3000);
    return () => clearInterval(t);
  }, [inflight, router]);

  return null;
}
