"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { FormField } from "@/components/forms/form-field";
import { PasswordField } from "@/components/forms/password-field";
import { Label } from "@/components/ui/label";
import { createUserAction } from "@/app/admin/users/actions";

const EMPTY = { firstName: "", lastName: "", email: "", password: "", role: "USER" as const };

export function AddUserForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState(EMPTY);
  const [pending, start] = useTransition();
  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    start(async () => {
      const r = await createUserAction(form);
      if (r.error) { toast.error(r.error); return; }
      toast.success("User created.");
      setForm(EMPTY);
      onSuccess();
    });
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <FormField id="firstName" label="First name" required value={form.firstName}
          onChange={(e) => set("firstName")(e.target.value)} />
        <FormField id="lastName" label="Last name" required value={form.lastName}
          onChange={(e) => set("lastName")(e.target.value)} />
      </div>
      <FormField id="email" label="Email" type="email" required value={form.email}
        onChange={(e) => set("email")(e.target.value)} />
      <PasswordField id="password" label="Password" required minLength={8} value={form.password}
        onChange={(e) => set("password")(e.target.value)} />
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select value={form.role} onValueChange={(v) => set("role")(v ?? "USER")}>
          <SelectTrigger id="role" className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="USER">User</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" disabled={pending} className="w-full">
        {pending && <Spinner aria-hidden />}
        Create user
      </Button>
    </form>
  );
}
