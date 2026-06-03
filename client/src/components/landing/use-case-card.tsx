import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Props = { icon: LucideIcon; title: string; body: string; bullets: string[] };

export function UseCaseCard({ icon: Icon, title, body, bullets }: Props) {
  return (
    <Card className="gap-4 bg-white text-[#0F1113] ring-[#E5E5E5] transition hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-28px_rgba(15,17,19,0.18)]">
      <CardHeader className="px-5 pt-2">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="inline-flex size-10 items-center justify-center rounded-xl bg-[#0F1113] text-white"
          >
            <Icon className="size-4" strokeWidth={1.75} />
          </span>
          <CardTitle className="text-[16px] font-semibold tracking-tight text-[#0F1113]">
            {title}
          </CardTitle>
        </div>
        <CardDescription className="mt-3 text-[13.5px] leading-[1.6] tracking-tight text-[#525252]">
          {body}
        </CardDescription>
      </CardHeader>
      <Separator className="bg-[#F4F4F5]" />
      <CardContent className="px-5">
        <ul className="flex flex-col gap-2">
          {bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2 text-[13px] tracking-tight text-[#0F1113]"
            >
              <Check className="mt-0.5 size-3.5 shrink-0 text-[#6D5FF9]" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
