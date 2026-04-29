import { PostCard } from "./post-card";
import { PostsRefresh } from "./posts-refresh";
import type { GeneratedPost } from "@/types/post";

export function PostsList({ posts }: { posts: GeneratedPost[] }) {
  return (
    <>
      <PostsRefresh posts={posts} />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
    </>
  );
}
