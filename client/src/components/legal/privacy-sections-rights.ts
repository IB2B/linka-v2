import type { LegalSection } from "./legal.types";

export const PRIVACY_RIGHTS: LegalSection[] = [
  {
    id: "sharing",
    heading: "How we share your information",
    blocks: [
      { type: "p", text: "We share data only with trusted processors who help us deliver the service, strictly under contract and on our instructions:" },
      { type: "list", items: [
        "Social platforms (LinkedIn, Instagram, X, Threads, Pinterest, Facebook) — to publish the content you schedule.",
        "Social publishing and messaging providers — to connect your social accounts, publish posts, and show your messages.",
        "AI providers — to generate post copy, images, videos, and avatars from your prompts.",
        "Stripe — to process subscription payments.",
        "Hosting, email, and error-monitoring providers — to run the service and fix problems.",
      ] },
      { type: "p", text: "We may also disclose information where required by law or to protect our rights, users, or the public." },
    ],
  },
  {
    id: "cookies",
    heading: "Cookies and tracking",
    blocks: [
      { type: "p", text: "We only use strictly necessary cookies: one keeps you signed in (an httpOnly session token), and three remember your language, your light or dark theme, and whether the sidebar is open. We do not use analytics, advertising, or cross-site tracking cookies." },
    ],
  },
  {
    id: "retention",
    heading: "Data retention",
    blocks: [
      { type: "p", text: "We keep your information for as long as your account exists. Cancelling a paid plan does not delete anything. When you delete your account, we sign you out everywhere and erase your profile, posts, uploaded files, connected accounts, and AI avatars — usually within minutes and always within 30 days." },
      { type: "p", text: "The only exception is billing: Stripe keeps invoice and payment records for as long as tax and accounting laws require." },
    ],
  },
  {
    id: "security",
    heading: "Security",
    blocks: [
      { type: "p", text: "We protect your data with encryption in transit, hashed credentials, and access controls. No method of transmission or storage is completely secure, but we work continuously to safeguard your information and will notify you of any breach as required by law." },
    ],
  },
  {
    id: "rights",
    heading: "Your rights",
    blocks: [
      { type: "p", text: "Depending on your location, you may have the right to access, correct, export, or delete your personal data, to restrict or object to certain processing, and to withdraw consent at any time." },
      { type: "p", text: "You can do this yourself in Settings: “Your Data” downloads a copy of everything we store about you, and “Delete account” in the Danger Zone erases it. For any other request, contact support@intelligentb2b.com and we will answer within one month. You also have the right to lodge a complaint with your local data protection authority." },
    ],
  },
  {
    id: "transfers",
    heading: "International transfers",
    blocks: [
      { type: "p", text: "Some of our processors operate outside the European Economic Area. Where data is transferred internationally, we rely on appropriate safeguards such as the European Commission’s Standard Contractual Clauses." },
    ],
  },
  {
    id: "children",
    heading: "Children",
    blocks: [
      { type: "p", text: "linka is not directed to anyone under 18, and we do not knowingly collect personal data from children. If you believe a child has provided us information, contact us and we will delete it." },
    ],
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    blocks: [
      { type: "p", text: "We may update this policy from time to time. If we make material changes, we will notify you through the service or by email before they take effect." },
    ],
  },
  {
    id: "contact",
    heading: "Contact us",
    blocks: [
      { type: "p", text: "Questions about your privacy or this policy? Reach us at support@intelligentb2b.com or sales@intelligentb2b.com." },
    ],
  },
];
