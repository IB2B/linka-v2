import { notFound } from "next/navigation";

import { getPost } from "@/lib/posts/get-post";
import { RegenProvider } from "@/components/posts/detail/regen-context";
import { PostPlatformsProvider } from "@/components/posts/platforms-context";
import { PlatformPicker } from "@/components/posts/platform-picker";
import { PostedPlatforms } from "@/components/posts/posted-platforms";
import { PostDetailToolbar } from "@/components/posts/detail/post-detail-toolbar";
import { PostDetailHeader } from "@/components/posts/detail/post-detail-header";
import { PostDetailImage } from "@/components/posts/detail/post-detail-image";
import { PostDetailContent } from "@/components/posts/detail/post-detail-content";
import { PostDetailMeta } from "@/components/posts/detail/post-detail-meta";
import { PostDetailImagePoll } from "@/components/posts/detail/post-detail-image-poll";
import { PostViralityScore } from "@/components/posts/detail/post-virality-score";
import { PostDetailMetrics } from "@/components/posts/detail/post-detail-metrics";

type Props = { params: Promise<{ id: string }> };

export default async function PostDetailPage({ params }: Props) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) notFound();

  const isPosted = post.status === "posted";

  return (
    <RegenProvider postId={post.id}>
      <PostPlatformsProvider>
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
          <PostDetailToolbar post={post} />
          {isPosted ? <PostedPlatforms post={post} /> : <PlatformPicker />}
          <PostDetailHeader post={post} />
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="flex flex-col gap-6">
              <PostDetailImage post={post} />
              <PostDetailContent post={post} />
            </div>
            <div className="flex flex-col gap-4">
              <PostViralityScore postId={post.id} />
              <PostDetailMetrics postId={post.id} />
              <PostDetailMeta post={post} />
            </div>
          </div>
          <PostDetailImagePoll status={post.imageStatus} />
        </div>
      </PostPlatformsProvider>
    </RegenProvider>
  );
}
