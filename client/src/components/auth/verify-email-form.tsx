"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { verifyEmailRequest } from "@/lib/api/auth-client";
import { FormSubmitButton } from "@/components/forms/form-submit-button";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const CODE_LENGTH = 6;

export function VerifyEmailForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [code, setCode] = useState("");

  async function submit(value: string) {
    if (pending) return;
    setPending(true);
    const result = await verifyEmailRequest({ code: value });
    setPending(false);
    if (!result.ok) { toast.error(result.error); setCode(""); return; }
    toast.success("Email confirmed.");
    router.push("/onboarding");
    router.refresh();
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (code.length === CODE_LENGTH) submit(code);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="code">Verification code</Label>
        <InputOTP
          id="code"
          maxLength={CODE_LENGTH}
          value={code}
          onChange={(v) => {
            setCode(v);
            if (v.length === CODE_LENGTH) submit(v);
          }}
          disabled={pending}
          autoFocus
          containerClassName="justify-center"
        >
          <InputOTPGroup>
            {Array.from({ length: CODE_LENGTH }).map((_, i) => (
              <InputOTPSlot key={i} index={i} className="h-12 w-12 text-lg" />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
      <FormSubmitButton label="Confirm email" pending={pending} />
    </form>
  );
}
