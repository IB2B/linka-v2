import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TourCard } from "./product-tour-data";

export function ProductTourCard({ card }: { card: TourCard }) {
  const colSpan = card.span === "lg" ? "lg:col-span-7" : "lg:col-span-5";
  const Mock = card.Mock;
  return (
    <Card
      className={`relative gap-5 overflow-hidden bg-white p-2 text-[#0F1113] ring-[#E5E5E5] transition hover:shadow-[0_30px_60px_-30px_rgba(15,17,19,0.18)] ${colSpan}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(109,95,249,0.10)_0%,transparent_70%)]"
      />
      <CardHeader className="px-4 pt-3">
        <Badge variant="outline" className="w-fit gap-1.5 border-[#6D5FF9]/20 bg-[#6D5FF9]/8 text-[10.5px] font-medium uppercase tracking-[0.14em] text-[#6D5FF9]">
          <span className="size-1 rounded-full bg-[#6D5FF9]" />
          {card.tag}
        </Badge>
        <CardTitle className="mt-3 text-[20px] font-semibold leading-[1.15] tracking-[-0.015em] text-[#0F1113] md:text-[22px]">
          {card.title}
        </CardTitle>
        <CardDescription className="max-w-md text-[13.5px] leading-[1.6] tracking-tight text-[#525252]">
          {card.body}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <Mock />
      </CardContent>
    </Card>
  );
}
