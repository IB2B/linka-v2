import type { LegalSection } from "./legal.types";

export const TERMS_LEGAL: LegalSection[] = [
  {
    id: "acceptable-use",
    heading: "Acceptable use",
    blocks: [
      { type: "p", text: "You agree not to use linka to:" },
      { type: "list", items: [
        "Violate any law or the rights of others.",
        "Publish spam, deceptive, hateful, harassing, or otherwise unlawful content.",
        "Infringe intellectual property or privacy rights.",
        "Access the service without authorization, reverse engineer it, or disrupt its operation.",
        "Resell, sublicense, or misrepresent the service.",
      ] },
    ],
  },
  {
    id: "ip",
    heading: "Intellectual property",
    blocks: [
      { type: "p", text: "linka — including its software, branding, and all related materials — is owned by us or our licensors and protected by intellectual property laws. These terms grant you no right to our trademarks or branding." },
    ],
  },
  {
    id: "termination",
    heading: "Suspension and termination",
    blocks: [
      { type: "p", text: "You may stop using linka and close your account at any time. We may suspend or terminate your access if you breach these terms or use the service in a way that risks harm to us, other users, or third parties." },
      { type: "p", text: "On termination your right to use the service ends. As described in our Privacy Policy, your data remains exportable for 30 days before permanent deletion." },
    ],
  },
  {
    id: "liability",
    heading: "Disclaimers and limitation of liability",
    blocks: [
      { type: "p", text: "The service is provided “as is” and “as available”, without warranties of any kind, whether express or implied, including fitness for a particular purpose and non-infringement." },
      { type: "p", text: "To the maximum extent permitted by law, linka and intelligentb2b will not be liable for any indirect, incidental, or consequential damages, or for any loss of profits, data, or goodwill. Our total liability is limited to the amount you paid us in the 12 months before the claim." },
    ],
  },
  {
    id: "changes",
    heading: "Changes to these terms",
    blocks: [
      { type: "p", text: "We may update these terms from time to time. If we make material changes, we will notify you in advance through the service or by email. Your continued use after the changes take effect constitutes acceptance." },
    ],
  },
  {
    id: "governing-law",
    heading: "Governing law",
    blocks: [
      { type: "p", text: "These terms are governed by the laws of Italy, without regard to conflict-of-law principles. The courts of Italy will have exclusive jurisdiction, except where mandatory consumer law provides otherwise." },
    ],
  },
  {
    id: "contact",
    heading: "Contact us",
    blocks: [
      { type: "p", text: "Questions about these terms? Reach us at support@intelligentb2b.com or sales@intelligentb2b.com." },
    ],
  },
];
