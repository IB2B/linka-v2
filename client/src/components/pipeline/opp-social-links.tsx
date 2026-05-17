"use client";

import { useMemo, useState } from "react";
import type { SocialKey, Opportunity } from "@/types/pipeline";
import { SOCIAL_PROFILES } from "./opp-social-config";
import { OppSocialRow } from "./opp-social-row";
import { OppSocialAdd } from "./opp-social-add";

type Props = {
  opp: Opportunity;
  disabled: boolean;
  onSave: (k: SocialKey, url: string | null) => void;
};

export function OppSocialLinks({ opp, disabled, onSave }: Props) {
  const [extras, setExtras] = useState<SocialKey[]>([]);

  const visible = useMemo(
    () => SOCIAL_PROFILES.filter((p) => opp[p.key] || extras.includes(p.key)),
    [opp, extras],
  );
  const available = useMemo(
    () => SOCIAL_PROFILES.filter((p) => !opp[p.key] && !extras.includes(p.key)),
    [opp, extras],
  );

  function remove(key: SocialKey) {
    if (opp[key]) onSave(key, null);
    setExtras((e) => e.filter((k) => k !== key));
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Social profiles
        </p>
        <OppSocialAdd
          available={available}
          onAdd={(cfg) => setExtras((e) => [...e, cfg.key])}
        />
      </div>
      {visible.length === 0 ? (
        <p className="rounded-md border border-dashed bg-card/50 px-3 py-4 text-center text-xs text-muted-foreground">
          No social profiles linked yet.
        </p>
      ) : (
        <div className="space-y-2">
          {visible.map((cfg) => (
            <OppSocialRow
              key={cfg.key} cfg={cfg}
              value={opp[cfg.key]} disabled={disabled}
              autoFocus={extras.includes(cfg.key) && !opp[cfg.key]}
              onSave={(url) => onSave(cfg.key, url)}
              onRemove={() => remove(cfg.key)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
