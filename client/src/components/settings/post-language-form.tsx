"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { LanguageSelect } from "@/components/generate/language-select";
import { setPostLanguageAction } from "@/app/dashboard/settings/actions";

type Props = { initial: string };

export function PostLanguageForm({ initial }: Props) {
  const [value, setValue] = useState(initial);
  const [pending, start] = useTransition();

  function onChange(next: string) {
    if (next === value) return;
    const prev = value;
    setValue(next);
    start(async () => {
      const r = await setPostLanguageAction(next);
      if (r.error) { setValue(prev); toast.error(r.error); }
      else toast.success("Default post language updated.");
    });
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        Default post language
      </label>
      <p className="text-xs text-muted-foreground">
        New posts — including “Surprise me” — are written in this language by default.
      </p>
      <LanguageSelect
        value={value}
        onChange={onChange}
        disabled={pending}
        className="w-full sm:max-w-xs"
      />
    </div>
  );
}
