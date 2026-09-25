import Link from "next/link";
import { Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { PostsExplorer } from "@/components/posts/posts-explorer";
import { PostsEmpty } from "@/components/posts/posts-empty";
import { ComposePostButton } from "@/components/posts/compose-post-button";
import { ConnectAccountsNotice } from "@/components/posts/connect-accounts-notice";
import { HasAccountsProvider } from "@/components/posts/has-accounts-context";
import { getPosts } from "@/lib/posts/get-posts";
import { getAccounts } from "@/lib/zernio/get-accounts";

export default async function PostsPage() {
  const [posts, accounts, t] = await Promise.all([
    getPosts(), getAccounts(), getTranslations("posts"),
  ]);
  const hasAccounts = accounts.some((a) => a.connected);
  return (
    <HasAccountsProvider value={hasAccounts}>
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
      {!hasAccounts && posts.length > 0 ? <ConnectAccountsNotice /> : null}
      {posts.length === 0 ? <PostsEmpty /> : <PostsExplorer posts={posts} />}
    </HasAccountsProvider>
  );
}
