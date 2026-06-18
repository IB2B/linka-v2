import Link from "next/link";
import { Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { PostsExplorer } from "@/components/posts/posts-explorer";
import { PostsEmpty } from "@/components/posts/posts-empty";
import { ComposePostButton } from "@/components/posts/compose-post-button";
import { getPosts } from "@/lib/posts/get-posts";

export default async function PostsPage() {
  const [posts, t] = await Promise.all([getPosts(), getTranslations("posts")]);
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <PageHeader title={t("title")} description={t("description")} />
        <div className="flex items-center gap-2">
          <ComposePostButton />
          <Button
            render={<Link href="/dashboard/generate" />}
            nativeButton={false}
            size="sm"
          >
            <Sparkles className="size-4" />
            {t("newPost")}
          </Button>
        </div>
      </div>
      {posts.length === 0 ? <PostsEmpty /> : <PostsExplorer posts={posts} />}
    </>
  );
}
