import { MessageSquare } from "lucide-react";

import { ComingSoon } from "@/components/admin/coming-soon";

export const dynamic = "force-dynamic";

export default function AdminFeedbackPage() {
  return (
    <ComingSoon
      title="Feedback"
      description="User-submitted feedback from the in-app widget — bugs, ideas and praise."
      icon={MessageSquare}
    />
  );
}
