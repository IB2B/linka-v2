import type { LegalSection } from "./legal.types";

export const PRIVACY_CORE: LegalSection[] = [
  {
    id: "who-we-are",
    heading: "Who we are",
    blocks: [
      { type: "p", text: "linka.studio (“linka”, “we”, “us”) is operated by intelligentb2b. We are the data controller responsible for the personal information described in this policy. For any privacy question, contact us at support@intelligentb2b.com." },
    ],
  },
  {
    id: "collect",
    heading: "Information we collect",
    blocks: [
      { type: "p", text: "We collect the following categories of information:" },
      { type: "list", items: [
        "Account data — your name, email address, and authentication credentials provided at sign-up.",
        "Connected accounts — the social profiles you link and the access tokens needed to publish on your behalf.",
        "Content — the posts, drafts, images, and writing samples you create, upload, or publish through linka.",
        "Billing data — handled by our payment processor, Stripe; we store only your plan and subscription status, not card numbers.",
        "Usage and device data — log data, IP address, browser type, and analytics that help us operate and improve the service.",
      ] },
    ],
  },
  {
    id: "use",
    heading: "How we use your information",
    blocks: [
      { type: "p", text: "We use your information to:" },
      { type: "list", items: [
        "Provide the service — generate drafts, publish to connected platforms, and surface analytics.",
        "Manage your account, subscription, and billing.",
        "Communicate with you about updates, security notices, and support.",
        "Maintain security, prevent abuse, and comply with our legal obligations.",
        "Improve and develop new features.",
      ] },
      { type: "p", text: "We never sell your personal information." },
    ],
  },
  {
    id: "legal-bases",
    heading: "Legal bases for processing",
    blocks: [
      { type: "p", text: "Under the GDPR, we rely on the following legal bases: performance of our contract with you (to provide the service), your consent (for optional communications and certain integrations), our legitimate interests (to secure and improve the product), and compliance with legal obligations." },
    ],
  },
];
