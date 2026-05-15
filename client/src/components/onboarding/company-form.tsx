"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { saveCompanyAction, skipStepAction } from "@/app/onboarding/actions";
import { COMPANY_TYPES, COMPANY_SIZES, FUNDING_AMOUNTS, INDUSTRIES } from "./company-data";

export function CompanyForm() {
  const router = useRouter();
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [funding, setFunding] = useState("");
  const [industry, setIndustry] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    const r = await saveCompanyAction({ companyType: type, companySize: size, fundingAmount: funding, industry });
    setPending(false);
    if (r.error) { toast.error(r.error); return; }
    router.push("/onboarding/connect");
  }

  async function handleSkip() {
    await skipStepAction(2);
    router.push("/onboarding/connect");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="space-y-2">
        <p className="text-sm font-medium">What kind of company are you?</p>
        <div className="flex flex-wrap gap-2">
          {COMPANY_TYPES.map((t) => (
            <button key={t} type="button" onClick={() => setType(t === type ? "" : t)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors",
                type === t
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
              )}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Industry</p>
        <Select value={industry} onValueChange={setIndustry}>
          <SelectTrigger className="w-full"><SelectValue placeholder="Select your industry" /></SelectTrigger>
          <SelectContent>
            {INDUSTRIES.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">How large is your company?</p>
        <Select value={size} onValueChange={setSize}>
          <SelectTrigger className="w-full"><SelectValue placeholder="Select company size" /></SelectTrigger>
          <SelectContent>
            {COMPANY_SIZES.map((s) => <SelectItem key={s} value={s}>{s} employees</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">How much have you raised so far?</p>
        <Select value={funding} onValueChange={setFunding}>
          <SelectTrigger className="w-full"><SelectValue placeholder="Select funding amount" /></SelectTrigger>
          <SelectContent>
            {FUNDING_AMOUNTS.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button type="button" onClick={handleSkip} disabled={pending}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50">
          Skip for now
        </button>
        <Button type="submit" size="sm" disabled={pending}>
          {pending && <Spinner size="xs" />} Continue
        </Button>
      </div>
    </form>
  );
}
