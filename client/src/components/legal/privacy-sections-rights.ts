import type { LegalSection } from "./legal.types";

export const PRIVACY_RIGHTS: LegalSection[] = [
  {
    id: "sharing",
    heading: "How we share your information",
    blocks: [
      { type: "p", text: "We share data only with trusted processors who help us deliver the service, strictly under contract and on our instructions:" },
      { type: "list", items: [
        "Social platforms (LinkedIn, Instagram, X, Threads, Pinterest, Facebook) — to publish the content you schedule.",
        "AI providers — to generate post copy and images from your prompts.",
        "Stripe — to process subscription payments.",
        "Infrastructure, email, and analytics providers — to host, operate, and monitor the service.",
      ] },
      { type: "p", text: "We may also disclose information where required by law or to protect our rights, users, or the public." },
    ],
  },
  {
    id: "cookies",
    heading: "Cookies and tracking",
    blocks: [
      { type: "p", text: "We use a strictly necessary cookie to keep you signed in (an httpOnly session token) and limited analytics to understand how the product is used. We do not use advertising or cross-site tracking cookies." },
    ],
  },
  {
    id: "retention",
    heading: "Data retention",
    blocks: [
      { type: "p", text: "We keep your information for as long as your account is active. After cancellation, your data remains exportable for 30 days and is then permanently deleted, except where we must retain limited records to meet legal, tax, or accounting obligations." },
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
      { type: "p", text: "You can export or delete most data directly from account settings. For any other request, contact support@intelligentb2b.com. You also have the right to lodge a complaint with your local data protection authority." },
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
