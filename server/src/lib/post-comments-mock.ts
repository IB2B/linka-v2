import type { RawComment } from "./late-comments";

const t = (mins: number) => new Date(Date.now() - mins * 60_000).toISOString();

export const COMMENTS_MOCK_ENABLED =
  process.env.POST_COMMENTS_USE_MOCK === "true";

const cap = {
  canReply: true, canLike: true, canHide: true, canDelete: true,
};

export const MOCK_COMMENTS_BY_PLATFORM: Record<string, RawComment[]> = {
  linkedin: [
    {
      id: "lc-1", message: "Solid take — sharing with my team.",
      from: { name: "Priya Raman", picture: "https://i.pravatar.cc/80?img=5", verifiedType: "blue" },
      createdTime: t(30), likeCount: 12, replyCount: 1, ...cap,
      replies: [{
        id: "lc-1-r1", message: "Glad it resonated!",
        from: { name: "You", isOwner: true },
        createdTime: t(20), likeCount: 2, replyCount: 0, ...cap,
      }],
    },
    {
      id: "lc-2", message: "Curious how this compares with the v2 rollout?",
      from: { name: "Tomás Alvarez", picture: null },
      createdTime: t(120), likeCount: 4, replyCount: 0, ...cap,
    },
  ],
  instagram: [
    { id: "ic-1", message: "this slaps 🔥",
      from: { name: "kira.codes", picture: "https://i.pravatar.cc/80?img=47" },
      createdTime: t(8), likeCount: 23, replyCount: 0, ...cap, isLiked: true },
    { id: "ic-2", message: "drop the prompt 👀",
      from: { name: "naveen.b", picture: "https://i.pravatar.cc/80?img=22" },
      createdTime: t(45), likeCount: 6, replyCount: 0, ...cap },
  ],
  facebook: [
    { id: "fc-1", message: "Saved! Will try this on next campaign.",
      from: { name: "Linda Park", picture: null },
      createdTime: t(180), likeCount: 8, replyCount: 0, ...cap },
  ],
  twitter: [
    { id: "tc-1", message: "this is the take of the week ngl",
      from: { name: "@deeevops", picture: null, verifiedType: "blue" },
      createdTime: t(15), likeCount: 41, replyCount: 0, ...cap },
  ],
  threads: [
    { id: "thc-1", message: "needed this today, thanks for sharing",
      from: { name: "sara.threads", picture: null },
      createdTime: t(60), likeCount: 9, replyCount: 0, ...cap },
  ],
  reddit: [
    { id: "rc-1", message: "OP delivers. Have a strong upvote.",
      from: { name: "u/lurking_dev", picture: null },
      createdTime: t(240), likeCount: 28, replyCount: 0, ...cap },
  ],
};
