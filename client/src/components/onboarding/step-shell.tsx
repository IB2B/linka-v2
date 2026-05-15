import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { fetchMe } from "@/lib/auth/me";
import { BrandLogo } from "@/components/brand-logo";
import { OnboardingStepper } from "./onboarding-stepper";
import { OnboardingHeaderNav } from "./onboarding-header-nav";

type Props = {
  step: number;
  total?: number;
  title: string;
  description: string;
  children: React.ReactNode;
  backHref?: string;
  maxWidth?: string;
  alignLeft?: boolean;
};

export async function StepShell({ step, total = 3, title, description, children, backHref, maxWidth, alignLeft }: Props) {
  const user = await fetchMe();
  const mw = maxWidth ?? "max-w-md";
  return (
    <div className="flex min-h-svh flex-col">
      <header className="grid h-14 shrink-0 grid-cols-3 items-center border-b px-6">
        <div className="flex items-center gap-3">
          {backHref && (
            <Link href={backHref} className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <ChevronLeft className="size-4" />
              Back
            </Link>
          )}
          <div className="flex items-center gap-2 text-sm font-bold">
            <BrandLogo size={18} />
            linka
          </div>
        </div>
        <div className="flex justify-center">
          <OnboardingStepper current={step} total={total} />
        </div>
        <div className="flex justify-end">
          <OnboardingHeaderNav email={user?.email ?? ""} />
        </div>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className={`flex w-full flex-col gap-5 ${mw} ${alignLeft ? "items-start" : "items-center"}`}>
          <div className={`space-y-1.5 ${alignLeft ? "" : "text-center"}`}>
            <h1 className="text-xl font-bold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
