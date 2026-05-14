import { PageHeader } from "@/components/dashboard/page-header";
import { PostsTab } from "@/components/admin/content/posts-tab";

export const dynamic = "force-dynamic";

type Sp = { q?: string; status?: string; platform?: string };

export default async function AdminContentPage({
  searchParams,
}: { searchParams: Promise<Sp> }) {
  const sp = await searchParams;
  return (
    <>
      <PageHeader
        title="Content"
        description="Every post generated, scheduled and published across the platform."
      />
      <PostsTab sp={sp} />
    </>
  );
}
