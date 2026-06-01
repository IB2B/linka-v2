import type { Metadata } from "next";

import { LandingBg } from "@/components/landing/landing-bg";
import { LandingNav } from "@/components/landing/landing-nav";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LegalDocument } from "@/components/legal/legal-document";
import { PRIVACY } from "@/components/legal/privacy-data";

export const metadata: Metadata = {
  title: "Privacy Policy — linka.studio",
  description: "How linka.studio collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FAFAFA] font-sans text-[#0F1113]">
      <LandingBg />
      <LandingNav />
      <LegalDocument {...PRIVACY} />
      <LandingFooter />
    </div>
  );
}
