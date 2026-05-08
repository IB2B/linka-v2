import { Sparkles } from "lucide-react";

import { ComingSoon } from "@/components/admin/coming-soon";

export const dynamic = "force-dynamic";

export default function AdminAiUsagePage() {
  return (
    <ComingSoon
      title="AI Usage"
      description="Token spend, model mix and per-user generation volume across text and image providers."
      icon={Sparkles}
    />
  );
}
