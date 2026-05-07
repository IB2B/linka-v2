export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "Will this sound like AI?",
    a: "No. Linka trains on your last 90 days of posts, your bio, and 5 voice prompts you provide on day one. Most users edit fewer than 3 words per post.",
  },
  {
    q: "Which platforms do you support?",
    a: "LinkedIn, Instagram (feed, reels, carousels), X / Twitter, TikTok, Pinterest, Threads, YouTube Shorts and Facebook Pages.",
  },
  {
    q: "Do I need to install a browser extension?",
    a: "Nope. Connect once via OAuth and posts go out through the official APIs — including auto-publish, no manual push.",
  },
  {
    q: "What if I don't like a draft?",
    a: "Hit regenerate, edit it like a Google Doc, or trash it. The model learns from every approve/reject and gets sharper week over week.",
  },
  {
    q: "Can I cancel any time?",
    a: "Yes — one click from billing. You keep access until the end of the period and your data stays exportable for 30 days after.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes. Every paid plan includes a 7-day free trial. Cards aren't charged until day 7 and you can cancel before then.",
  },
];
