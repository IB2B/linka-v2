"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { LinkedinCredentialsStep } from "./linkedin-credentials-step";
import { LinkedinVerifyStep } from "./linkedin-verify-step";
import { linkedinLoginAction, linkedinVerifyAction } from "@/app/dashboard/inbox/linkedin-actions";

type Props = { open: boolean; onOpenChange: (open: boolean) => void };

export function LinkedinConnectDialog({ open, onOpenChange }: Props) {
  const router = useRouter();
  const [step, setStep] = useState<"creds" | "verify">("creds");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("US");
  const [pending, setPending] = useState(false);

  function finish() {
    toast.success("LinkedIn connected");
    onOpenChange(false);
    setStep("creds");
    router.refresh();
  }

  async function handleLogin(em: string, password: string, c: string) {
    setPending(true);
    const r = await linkedinLoginAction(em, password, c);
    setPending(false);
    if ("error" in r) { toast.error(r.error); return; }
    setEmail(em); setCountry(c);
    if (r.status === "connected") finish(); else setStep("verify");
  }

  async function handleVerify(code: string) {
    setPending(true);
    const r = await linkedinVerifyAction(email, code, country);
    setPending(false);
    if ("error" in r) { toast.error(r.error); return; }
    finish();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect LinkedIn</DialogTitle>
          <DialogDescription>
            Sign in with your LinkedIn account to read and reply to DMs here.
          </DialogDescription>
        </DialogHeader>
        {step === "creds"
          ? <LinkedinCredentialsStep pending={pending} onSubmit={handleLogin} />
          : <LinkedinVerifyStep pending={pending} email={email} onSubmit={handleVerify} />}
      </DialogContent>
    </Dialog>
  );
}
