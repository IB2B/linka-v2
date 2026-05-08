import { PageHeader } from "@/components/dashboard/page-header";
import { SubPageNav } from "@/components/admin/sub-page-nav";
import { PostsTab } from "@/components/admin/content/posts-tab";
import { ModerationTab } from "@/components/admin/content/moderation/moderation-tab";

export const dynamic = "force-dynamic";

const TABS = [
  { id: "posts", label: "Posts" },
  { id: "moderation", label: "Moderation" },
];

type Sp = {
  tab?: string; q?: string; status?: string;
  platform?: string; reason?: string;
};

export default async function AdminContentPage({
  searchParams,
}: { searchParams: Promise<Sp> }) {
  const sp = await searchParams;
  const active = TABS.find((t) => t.id === sp.tab)?.id ?? "posts";
  return (
    <>
      <PageHeader
        title="Content"
        description="Every post generated, scheduled and published across the platform."
      />
      <SubPageNav items={TABS} active={active} basePath="/admin/content" defaultId="posts" />
      {active === "posts" ? <PostsTab sp={sp} /> : <ModerationTab sp={sp} />}
    </>
  );
}
