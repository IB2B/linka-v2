import { listPostComments } from "./late-comments";
import { mapComment, type CommentDTO } from "./post-comments-map";
import {
  COMMENTS_MOCK_ENABLED, MOCK_COMMENTS_BY_PLATFORM,
} from "./post-comments-mock";
import type { PlatformEntry } from "./late-accounts";

export type { CommentDTO } from "./post-comments-map";
export type CommentGroup = { platform: string; comments: CommentDTO[] };

function mockGroup(entry: PlatformEntry): CommentGroup {
  return {
    platform: entry.platform,
    comments: (MOCK_COMMENTS_BY_PLATFORM[entry.platform] ?? [])
      .map((c) => mapComment(c, entry)),
  };
}

async function loadGroup(
  postId: string, entry: PlatformEntry,
): Promise<CommentGroup> {
  if (COMMENTS_MOCK_ENABLED) return mockGroup(entry);
  try {
    const data = await listPostComments(postId, entry.accountId);
    console.log(
      `\n=== [post-comments] ${entry.platform} (count=${data.comments?.length ?? 0}) ===\n`,
      JSON.stringify(data, null, 2), "\n=========================",
    );
    return {
      platform: entry.platform,
      comments: (data.comments ?? []).map((c) => mapComment(c, entry)),
    };
  } catch (e) {
    console.error("[post-comments] late call failed", entry.platform, e);
    return { platform: entry.platform, comments: [] };
  }
}

export async function aggregateComments(
  postId: string, entries: PlatformEntry[],
): Promise<CommentGroup[]> {
  const groups = await Promise.all(entries.map((e) => loadGroup(postId, e)));
  return groups.filter((g) => g.comments.length > 0);
}
