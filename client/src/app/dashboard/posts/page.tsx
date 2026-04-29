import Link from "next/link";
import { Sparkles } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PostsList } from "@/components/posts/posts-list";
import { PostsEmpty } from "@/components/posts/posts-empty";
import { getPosts } from "@/lib/posts/get-posts";

export default async function PostsPage() {
  const posts = await getPosts();
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader
          title="Posts"
          description="Every draft you've generated. Review, copy, or delete."
        />
        <Button
          render={<Link href="/dashboard/generate" />}
          nativeButton={false}
          size="sm"
        >
          <Sparkles className="size-4" />
          New post
        </Button>
      </div>
      <Separator className="my-2" />
      {posts.length === 0 ? <PostsEmpty /> : <PostsList posts={posts} />}
    </>
  );
}
