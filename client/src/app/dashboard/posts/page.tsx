import Link from "next/link";
import { Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { PostsExplorer } from "@/components/posts/posts-explorer";
import { PostsEmpty } from "@/components/posts/posts-empty";
import { getPosts } from "@/lib/posts/get-posts";

export default async function PostsPage() {
  const [posts, t] = await Promise.all([getPosts(), getTranslations("posts")]);
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <PageHeader title={t("title")} description={t("description")} />
        <Button
          render={<Link href="/dashboard/generate" />}
          nativeButton={false}
          size="sm"
        >
          <Sparkles className="size-4" />
          {t("newPost")}
        </Button>
      </div>
      {posts.length === 0 ? <PostsEmpty /> : <PostsExplorer posts={posts} />}
    </>
  );
}
