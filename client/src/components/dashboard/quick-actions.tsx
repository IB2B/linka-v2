import Link from "next/link";
import { Calendar, Mic, Sparkles, type LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Action = { label: string; href: string; icon: LucideIcon; desc: string };

const ACTIONS: Action[] = [
  { label: "Generate", href: "/dashboard/generate", icon: Sparkles,
    desc: "Draft a new post with AI" },
  { label: "Voice Lab", href: "/dashboard/voice-lab", icon: Mic,
    desc: "Tune your writing voice" },
  { label: "Calendar", href: "/dashboard/calendar", icon: Calendar,
    desc: "Plan your schedule" },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">Quick actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 sm:grid-cols-3">
        {ACTIONS.map(({ label, href, icon: Icon, desc }) => (
          <Link key={href} href={href}
            className="group flex items-start gap-3 rounded-md border p-3 transition-colors hover:border-foreground/40 hover:bg-muted/50">
            <Icon className="mt-0.5 size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{label}</span>
              <span className="text-xs text-muted-foreground">{desc}</span>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
