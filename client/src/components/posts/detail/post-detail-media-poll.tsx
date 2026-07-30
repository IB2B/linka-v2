"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { ImageStatus, VideoStatus } from "@/types/post";

const WAITING: string[] = ["pending", "generating"];

type Props = { imageStatus: ImageStatus; videoStatus: VideoStatus };

export function PostDetailMediaPoll({ imageStatus, videoStatus }: Props) {
  const router = useRouter();
  const imageInflight = WAITING.includes(imageStatus);
  const inflight = imageInflight || WAITING.includes(videoStatus);
  // Images land in seconds; video renders run for minutes, so poll them slower.
  const everyMs = imageInflight ? 3000 : 6000;

  useEffect(() => {
    if (!inflight) return;
    const t = setInterval(() => router.refresh(), everyMs);
    return () => clearInterval(t);
  }, [inflight, everyMs, router]);

  return null;
}
