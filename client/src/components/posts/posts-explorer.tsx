"use client";

import { useMemo, useState } from "react";

import { PostsList } from "./posts-list";
import { PostsTable } from "./posts-table";
import { PostsToolbar, type ViewMode } from "./posts-toolbar";
import { PostsEmptyFiltered } from "./posts-empty-filtered";
import { PostsRefresh } from "./posts-refresh";
import { filterPosts, type StatusFilter } from "@/lib/posts/filter-posts";
import type { GeneratedPost } from "@/types/post";

export function PostsExplorer({ posts }: { posts: GeneratedPost[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [view, setView] = useState<ViewMode>("grid");

  const filtered = useMemo(
    () => filterPosts(posts, query, status),
    [posts, query, status],
  );

  return (
    <div className="flex flex-col gap-4">
      <PostsRefresh posts={posts} />
      <PostsToolbar
        query={query} onQueryChange={setQuery}
        status={status} onStatusChange={setStatus}
        view={view} onViewChange={setView}
        count={filtered.length} total={posts.length}
      />
      {filtered.length === 0 ? (
        <PostsEmptyFiltered />
      ) : view === "grid" ? (
        <PostsList posts={filtered} />
      ) : (
        <PostsTable posts={filtered} />
      )}
    </div>
  );
}
