"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { FormField } from "@/components/forms/form-field";
import { ToggleRow } from "@/components/admin/settings/toggle-row";
import { SaveBar } from "@/components/admin/settings/save-bar";
import { updateSettingsAction } from "@/app/admin/settings/actions";
import type { AppSettings } from "@/types/admin";

type P = Pick<AppSettings,
  "signupsEnabled" | "trialDays" | "minPasswordLength" | "requireMfa" | "sessionTimeoutMin" | "autoSuspendDays">;

export function PoliciesForm({ initial }: { initial: P }) {
  const [v, setV] = useState<P>(initial);
  const [pending, start] = useTransition();
  const dirty = JSON.stringify(v) !== JSON.stringify(initial);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    start(async () => {
      const r = await updateSettingsAction(v);
      r.error ? toast.error(r.error) : toast.success("Policies saved.");
    });
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <ToggleRow id="signupsEnabled" label="New signups" description="Allow anyone to register a new account."
        checked={v.signupsEnabled} onChange={(b) => setV({ ...v, signupsEnabled: b })} />
      <ToggleRow id="requireMfa" label="Require MFA" description="Force every user to set up two-factor auth."
        checked={v.requireMfa} onChange={(b) => setV({ ...v, requireMfa: b })} />
      <div className="grid gap-3 sm:grid-cols-2">
        <FormField id="trialDays" label="Trial length (days)" type="number" min={0} max={90} value={v.trialDays}
          onChange={(e) => setV({ ...v, trialDays: Number(e.target.value) })} />
        <FormField id="minPasswordLength" label="Minimum password length" type="number" min={6} max={128} value={v.minPasswordLength}
          onChange={(e) => setV({ ...v, minPasswordLength: Number(e.target.value) })} />
        <FormField id="sessionTimeoutMin" label="Session timeout (minutes)" type="number" min={15} max={43200} value={v.sessionTimeoutMin}
          onChange={(e) => setV({ ...v, sessionTimeoutMin: Number(e.target.value) })} />
        <FormField id="autoSuspendDays" label="Auto-suspend after inactivity (days, 0 = off)" type="number" min={0} max={365} value={v.autoSuspendDays}
          onChange={(e) => setV({ ...v, autoSuspendDays: Number(e.target.value) })} />
      </div>
      <SaveBar pending={pending} dirty={dirty} />
    </form>
  );
}
