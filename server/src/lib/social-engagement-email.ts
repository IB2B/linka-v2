import { sendEmail } from "./email/send";
import { socialEngagementDigestEmail, type DigestPost } from "./email/templates/social-engagement-digest";
import type { DetectedEvent } from "./social-engagement-detect";
import { fetchPostsById, groupHighVolumeByUser, type PostRow } from "./social-engagement-email-fetch";

let smtpWarned = false;

function preview(s: string, n = 200): string {
  return s.length > n ? `${s.slice(0, n)}…` : s;
}

function buildDigestPosts(
  userEvents: DetectedEvent[], postsById: Map<string, PostRow>, appUrl: string,
): DigestPost[] {
  return userEvents
    .map((e) => {
      const row = postsById.get(e.postId);
      if (!row) return null;
      return { excerpt: preview(row.content), commentDelta: e.delta, postUrl: `${appUrl}/dashboard/posts/${e.postId}` };
    })
    .filter((p): p is DigestPost => p !== null);
}

async function sendOneUserDigest(
  userEvents: DetectedEvent[], postsById: Map<string, PostRow>, appUrl: string,
): Promise<void> {
  const recipient = userEvents.map((e) => postsById.get(e.postId)).find(Boolean);
  if (!recipient) return;
  const posts = buildDigestPosts(userEvents, postsById, appUrl);
  if (posts.length === 0) return;
  const { subject, html } = socialEngagementDigestEmail({ firstName: recipient.first_name, posts });
  try { await sendEmail({ to: recipient.email, subject, html }); }
  catch (err) { console.error("[social-engagement-email]", err); }
}

export async function emailHighVolumeDigest(events: DetectedEvent[]): Promise<void> {
  if (!process.env.SMTP_HOST) {
    if (!smtpWarned) { console.warn("[social-engagement-email] SMTP_HOST not set, skipping"); smtpWarned = true; }
    return;
  }
  const byUser = groupHighVolumeByUser(events);
  if (byUser.size === 0) return;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const postIds = [...new Set([...byUser.values()].flat().map((e) => e.postId))];
  const postsById = await fetchPostsById(postIds);
  await Promise.all([...byUser.values()].map((userEvents) => sendOneUserDigest(userEvents, postsById, appUrl)));
}
