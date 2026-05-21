import { notifyUserIfEnabled } from "./notify-user";
import { escapeHtml } from "./email/escape";

function appUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

export function sendPostPublishedEmail(
  userId: string, postId: string, excerpt: string, platforms: string[],
): Promise<void> {
  const url = `${appUrl()}/dashboard/analytics/${postId}`;
  const pretty = platforms.map((p) => p[0].toUpperCase() + p.slice(1)).join(", ");
  return notifyUserIfEnabled(userId, "notif_published", (name) => ({
    subject: `Your post is live on ${pretty}`,
    html: `<p>Hi ${escapeHtml(name)},</p>
<p>Your scheduled post just went live on <strong>${escapeHtml(pretty)}</strong>.</p>
<blockquote style="color:#555;border-left:3px solid #ddd;padding-left:12px;margin:12px 0">${escapeHtml(excerpt)}</blockquote>
<p><a href="${url}">View analytics →</a></p>`,
  }));
}

export function sendPostFailedEmail(
  userId: string, postId: string, excerpt: string, failedOn: string[],
): Promise<void> {
  const url = `${appUrl()}/dashboard/posts/${postId}`;
  const pretty = failedOn.map((p) => p[0].toUpperCase() + p.slice(1)).join(", ");
  return notifyUserIfEnabled(userId, "notif_failed", (name) => ({
    subject: `Your post failed to publish on ${pretty}`,
    html: `<p>Hi ${escapeHtml(name)},</p>
<p>We couldn't publish your post on <strong>${escapeHtml(pretty)}</strong>.</p>
<blockquote style="color:#555;border-left:3px solid #ddd;padding-left:12px;margin:12px 0">${escapeHtml(excerpt)}</blockquote>
<p><a href="${url}">Open the post to retry →</a></p>`,
  }));
}
