export type FaqEntry = { q: string; a: string };

export const FAQS: FaqEntry[] = [
  {
    q: "Why didn't my post publish?",
    a: "Most failures are due to a disconnected social account. Open Settings → Accounts and reconnect any account marked inactive, then retry the post.",
  },
  {
    q: "How do I cancel or change my plan?",
    a: "Go to Billing in the sidebar. You can switch tiers or cancel from the Stripe portal — your access stays active until the end of the current period.",
  },
  {
    q: "Can I generate posts in another language?",
    a: "Yes. Set your preferred language in Voice Lab; the generator will match it for new posts. Existing drafts won't be retranslated.",
  },
  {
    q: "How long until I get a reply?",
    a: "Urgent tickets are answered within a few hours during business days. Normal priority replies typically land within 1 business day.",
  },
  {
    q: "Where can I see scheduled posts?",
    a: "The Calendar view shows everything scheduled. You can drag to reschedule or click a post to edit it before it goes live.",
  },
];
