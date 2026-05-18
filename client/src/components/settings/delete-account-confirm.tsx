"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  email: string;
  typed: string;
  ack: boolean;
  onTypedChange: (v: string) => void;
  onAckChange: (v: boolean) => void;
};

export function DeleteAccountConfirm({ email, typed, ack, onTypedChange, onAckChange }: Props) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="confirm-email" className="text-xs">
          To confirm deletion, type{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-[11px] font-medium">
            {email}
          </code>
        </Label>
        <Input
          id="confirm-email"
          value={typed}
          onChange={(e) => onTypedChange(e.target.value)}
          placeholder={email}
          autoComplete="off"
          autoFocus
        />
      </div>
      <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-snug tracking-tight">
        <Checkbox
          checked={ack}
          onCheckedChange={(v) => onAckChange(v === true)}
          className="mt-0.5"
        />
        <span>
          I acknowledge that my account and active subscription will be
          deleted and I want to proceed.
        </span>
      </label>
    </>
  );
}
