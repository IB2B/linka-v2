"use client";

import { useRouter } from "next/navigation";

import { PostStatusBadge } from "@/components/posts/post-status-badge";
import { PlatformBadges } from "./platform-badges";
import { formatPostDate } from "@/lib/posts/format-date";
import type { GeneratedPost } from "@/types/post";
import type { PostMetrics } from "@/types/analytics";

const COLS: Array<keyof PostMetrics> =
  ["views", "likes", "comments", "shares"];

export function RecentPostsRow({
  post, metrics,
}: {
  post: GeneratedPost;
  metrics?: PostMetrics;
}) {
  const router = useRouter();
  const preview =
    post.content.slice(0, 120) + (post.content.length > 120 ? "…" : "");
  const date = post.postedAt ?? post.scheduledFor ?? post.createdAt;
  const href = `/dashboard/analytics/${post.id}`;
  return (
    <tr
      role="link"
      tabIndex={0}
      onClick={() => router.push(href)}
      onKeyDown={(e) => { if (e.key === "Enter") router.push(href); }}
      className="cursor-pointer border-t transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
    >
      <td className="px-4 py-3">
        <p className="line-clamp-2 max-w-md text-sm">{preview}</p>
      </td>
      <td className="px-4 py-3">
        <PlatformBadges
          scheduled={post.scheduledPlatforms}
          intended={post.platform}
        />
      </td>
      <td className="px-4 py-3">
        <PostStatusBadge status={post.status} />
      </td>
      {COLS.map((k) => (
        <td key={k} className="px-4 py-3 text-right text-sm tabular-nums text-muted-foreground">
          {metrics ? metrics[k].toLocaleString() : "—"}
        </td>
      ))}
      <td className="px-4 py-3 text-xs whitespace-nowrap">
        {formatPostDate(date)}
      </td>
    </tr>
  );
}
