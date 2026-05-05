"use client";

import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { PostStatusBadge } from "@/components/posts/post-status-badge";
import { formatPostDate } from "@/lib/posts/format-date";
import type { GeneratedPost } from "@/types/post";
import type { PostMetrics } from "@/types/analytics";

const COLS: Array<keyof PostMetrics> =
  ["views", "likes", "comments", "shares"];

export function RecentPostsRow({
  post, metrics,
}: { post: GeneratedPost; metrics?: PostMetrics }) {
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
      className="cursor-pointer border-t transition-colors hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700 focus:outline-none"
    >
      <td className="px-4 py-3">
        <p className="line-clamp-2 max-w-md text-sm">{preview}</p>
      </td>
      <td className="px-4 py-3">
        {post.platform ? (
          <Badge variant="outline" className="capitalize">{post.platform}</Badge>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        )}
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
