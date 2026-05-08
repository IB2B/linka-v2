import { BarChart3 } from "lucide-react";

import { ComingSoon } from "@/components/admin/coming-soon";

export const dynamic = "force-dynamic";

export default function AdminAnalyticsPage() {
  return (
    <ComingSoon
      title="Analytics"
      description="Platform-wide engagement, retention and growth funnels across all users."
      icon={BarChart3}
    />
  );
}
