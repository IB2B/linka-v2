import type { RawConversation, RawMessage } from "./late-inbox";

export const MOCK_CONVERSATIONS: RawConversation[] = [
  {
    _id: "mock-1", platform: "instagram",
    participant: { name: "Sarah Chen", username: "sarahc", avatar: "https://i.pravatar.cc/150?img=47" },
    lastMessage: { text: "Loved your latest post! Could we collaborate?", createdAt: new Date(Date.now() - 5 * 60_000).toISOString(), direction: "incoming" },
    unreadCount: 2, updatedAt: new Date(Date.now() - 5 * 60_000).toISOString(),
  },
  {
    _id: "mock-2", platform: "twitter",
    participant: { name: "Marcus Lee", username: "mlee_dev", avatar: "https://i.pravatar.cc/150?img=12" },
    lastMessage: { text: "Sounds great, let's hop on a call next week.", createdAt: new Date(Date.now() - 2 * 3_600_000).toISOString(), direction: "outgoing" },
    unreadCount: 0, updatedAt: new Date(Date.now() - 2 * 3_600_000).toISOString(),
  },
  {
    _id: "mock-3", platform: "facebook",
    participant: { name: "Aïcha Bensalem", username: "aicha.b", avatar: "https://i.pravatar.cc/150?img=32" },
    lastMessage: { text: "Hi! Do you ship to Morocco?", createdAt: new Date(Date.now() - 26 * 3_600_000).toISOString(), direction: "incoming" },
    unreadCount: 1, updatedAt: new Date(Date.now() - 26 * 3_600_000).toISOString(),
  },
  {
    _id: "mock-4", platform: "telegram",
    participant: { name: "Devon Park", username: "devpark", avatar: null },
    lastMessage: { text: "Thanks for the quick reply 🙏", createdAt: new Date(Date.now() - 3 * 86_400_000).toISOString(), direction: "incoming" },
    unreadCount: 0, updatedAt: new Date(Date.now() - 3 * 86_400_000).toISOString(),
  },
  {
    _id: "mock-5", platform: "reddit",
    participant: { name: "u/lurking_dev", username: "lurking_dev", avatar: null },
    lastMessage: { text: "DM'd you the repo link.", createdAt: new Date(Date.now() - 7 * 86_400_000).toISOString(), direction: "outgoing" },
    unreadCount: 0, updatedAt: new Date(Date.now() - 7 * 86_400_000).toISOString(),
  },
];

const t = (mins: number) => new Date(Date.now() - mins * 60_000).toISOString();

export const MOCK_MESSAGES: Record<string, RawMessage[]> = {
  "mock-1": [
    { _id: "m1-1", text: "Hey! Just discovered your account.", direction: "incoming", sender: { name: "Sarah Chen" }, createdAt: t(60) },
    { _id: "m1-2", text: "Hi Sarah! Thanks for reaching out 🙌", direction: "outgoing", sender: { name: "You" }, createdAt: t(55) },
    { _id: "m1-3", text: "Loved your latest post! Could we collaborate?", direction: "incoming", sender: { name: "Sarah Chen" }, createdAt: t(5) },
  ],
  "mock-2": [
    { _id: "m2-1", text: "Saw your tweet about the new feature — looks 🔥", direction: "incoming", sender: { name: "Marcus Lee" }, createdAt: t(180) },
    { _id: "m2-2", text: "Appreciate it! Want a demo?", direction: "outgoing", sender: { name: "You" }, createdAt: t(150) },
    { _id: "m2-3", text: "Sounds great, let's hop on a call next week.", direction: "outgoing", sender: { name: "You" }, createdAt: t(120) },
  ],
  "mock-3": [
    { _id: "m3-1", text: "Hi! Do you ship to Morocco?", direction: "incoming", sender: { name: "Aïcha Bensalem" }, createdAt: t(60 * 26) },
  ],
  "mock-4": [
    { _id: "m4-1", text: "Got the file, will review tonight.", direction: "outgoing", sender: { name: "You" }, createdAt: t(60 * 24 * 3 + 30) },
    { _id: "m4-2", text: "Thanks for the quick reply 🙏", direction: "incoming", sender: { name: "Devon Park" }, createdAt: t(60 * 24 * 3) },
  ],
  "mock-5": [
    { _id: "m5-1", text: "DM'd you the repo link.", direction: "outgoing", sender: { name: "You" }, createdAt: t(60 * 24 * 7) },
  ],
};

export const INBOX_MOCK_ENABLED = process.env.INBOX_USE_MOCK === "true";
