"use client";

import { useState } from "react";
import { FormField } from "@/components/forms/form-field";
import { PasswordField } from "@/components/forms/password-field";
import { FormSubmitButton } from "@/components/forms/form-submit-button";
import { LINKEDIN_COUNTRIES } from "./linkedin-countries";

type Props = {
  pending: boolean;
  onSubmit: (email: string, password: string, country: string) => void;
};

export function LinkedinCredentialsStep({ pending, onSubmit }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("US");

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(email, password, country); }}
      className="space-y-4"
    >
      <FormField
        id="li-email" label="LinkedIn email" type="email" autoComplete="username"
        value={email} onChange={(e) => setEmail(e.target.value)} required
      />
      <PasswordField
        id="li-password" label="Password" autoComplete="current-password"
        value={password} onChange={(e) => setPassword(e.target.value)} required
      />
      <div className="space-y-2">
        <label htmlFor="li-country" className="text-sm font-medium">Region</label>
        <select
          id="li-country" value={country} onChange={(e) => setCountry(e.target.value)}
          className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {LINKEDIN_COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.label}</option>)}
        </select>
      </div>
      <FormSubmitButton label="Continue" pending={pending} />
    </form>
  );
}
