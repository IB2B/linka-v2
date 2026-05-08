import type { LucideIcon } from "lucide-react";
import { Hammer } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";

type Props = {
  title: string;
  description: string;
  icon?: LucideIcon;
};

export function ComingSoon({ title, description, icon: Icon = Hammer }: Props) {
  return (
    <>
      <PageHeader title={title} description={description} />
      <div className="flex min-h-[420px] flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-muted/30 px-6 py-16 text-center">
        <div className="grid size-12 place-items-center rounded-full bg-background ring-1 ring-border">
          <Icon className="size-5 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium tracking-tight">Coming soon</p>
        <p className="max-w-sm text-sm tracking-tight text-muted-foreground">
          This admin area is on the roadmap. The data isn&rsquo;t wired up yet —
          let me know when you want it built.
        </p>
      </div>
    </>
  );
}
