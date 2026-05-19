import { emailLayout } from "./layout";

export type DigestPost = {
  excerpt: string;
  commentDelta: number;
  postUrl: string;
};

export type DigestInput = {
  firstName: string;
  posts: DigestPost[];
};

function escape(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function postBlock(p: DigestPost): string {
  return `
    <p>Your post just got <strong>${p.commentDelta} new comments</strong>.</p>
    <p class="small" style="background:#FAFAFA;border:1px solid #F4F4F5;border-radius:6px;padding:14px 16px;margin:16px 0">${escape(p.excerpt)}</p>
    <p style="margin:16px 0"><a class="btn" href="${escape(p.postUrl)}">Open the conversation</a></p>
  `;
}

export function socialEngagementDigestEmail({ firstName, posts }: DigestInput) {
  const name = firstName?.trim() || "there";
  const total = posts.reduce((acc, p) => acc + p.commentDelta, 0);
  const intro = posts.length === 1
    ? `<p>Hey ${escape(name)},</p><p>People are talking.</p>`
    : `<p>Hey ${escape(name)},</p><p>You've got <strong>${total} new comments</strong> across <strong>${posts.length} posts</strong>. Take a look:</p>`;
  const body = intro + posts.map(postBlock).join("");
  const subject = posts.length === 1
    ? `🔥 ${total} new comments on your post`
    : `🔥 ${total} new comments across ${posts.length} posts`;
  return {
    subject,
    html: emailLayout({ preheader: `${total} new comments waiting.`, heading: "Your posts are heating up", body }),
  };
}
