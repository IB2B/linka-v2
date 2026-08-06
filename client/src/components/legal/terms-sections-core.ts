import type { LegalSection } from "./legal.types";

export const TERMS_CORE: LegalSection[] = [
  {
    id: "acceptance",
    heading: "Acceptance of these terms",
    blocks: [
      { type: "p", text: "By accessing or using linka.studio (“linka”, “we”, “us”), you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree, please do not use the service." },
      { type: "p", text: "If you use linka on behalf of an organization, you represent that you have authority to bind that organization to these terms." },
    ],
  },
  {
    id: "accounts",
    heading: "Eligibility and your account",
    blocks: [
      { type: "p", text: "You must be at least 18 years old and able to form a binding contract to use linka." },
      { type: "list", items: [
        "Provide accurate, complete registration information and keep it up to date.",
        "Keep your password confidential — you are responsible for all activity under your account.",
        "Notify us promptly at support@intelligentb2b.com of any unauthorized use.",
      ] },
    ],
  },
  {
    id: "service",
    heading: "The service",
    blocks: [
      { type: "p", text: "linka is a social media management platform that uses AI to draft post copy and images and publishes them to the social accounts you connect." },
      { type: "p", text: "We may add, change, or remove features at any time. We aim for high availability but do not guarantee that the service will be uninterrupted, secure, or error-free." },
    ],
  },
  {
    id: "billing",
    heading: "Subscriptions and billing",
    blocks: [
      { type: "p", text: "Paid plans are billed in advance on a recurring basis through our payment processor, Stripe. By subscribing, you authorize these recurring charges." },
      { type: "list", items: [
        "A free plan is available with no card and no time limit; paid plans are charged from the day you subscribe.",
        "You may cancel any time from billing and keep access until the end of the current period.",
        "Fees are non-refundable except where required by law.",
        "We may change pricing on a going-forward basis with prior notice.",
      ] },
    ],
  },
  {
    id: "content",
    heading: "Your content",
    blocks: [
      { type: "p", text: "You retain ownership of the content you upload, create, or publish through linka (“Your Content”)." },
      { type: "p", text: "You grant linka a worldwide, non-exclusive, royalty-free license to host, store, process, adapt, and transmit Your Content solely to operate and provide the service — including generating drafts and publishing on your behalf." },
      { type: "p", text: "You are responsible for Your Content and represent that you hold all rights necessary to use and publish it." },
    ],
  },
  {
    id: "ai",
    heading: "AI-generated content",
    blocks: [
      { type: "p", text: "linka uses third-party AI models to generate text and images. AI output may be inaccurate, biased, or resemble existing material. You are responsible for reviewing and approving every draft before it is published." },
      { type: "p", text: "AI output is not professional advice. You are responsible for ensuring published content complies with applicable laws and the policies of each platform." },
    ],
  },
  {
    id: "platforms",
    heading: "Connected platforms and third parties",
    blocks: [
      { type: "p", text: "linka publishes to platforms including LinkedIn, Instagram, X, Threads, Pinterest, and Facebook through their official APIs. Your use of those platforms is governed by their own terms." },
      { type: "p", text: "We are not responsible for the availability of, or changes to, third-party platforms or APIs, and such changes may affect features without notice." },
    ],
  },
];
