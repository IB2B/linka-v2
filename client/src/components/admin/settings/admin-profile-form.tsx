"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { FormField } from "@/components/forms/form-field";
import { PasswordField } from "@/components/forms/password-field";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import { ProfileAvatar } from "@/components/settings/profile-avatar";
import {
  changePasswordAction, updateProfileAction,
} from "@/app/dashboard/settings/actions";

type Props = {
  firstName: string; lastName: string; email: string;
  avatarUrl: string | null;
};

export function AdminProfileForm({ firstName, lastName, email, avatarUrl }: Props) {
  const [pending, start] = useTransition();

  function saveProfile(formData: FormData) {
    start(async () => {
      const r = await updateProfileAction(formData);
      r.error ? toast.error(r.error) : toast.success("Profile updated.");
    });
  }
  function savePassword(formData: FormData) {
    start(async () => {
      const r = await changePasswordAction(formData);
      r.error ? toast.error(r.error) : toast.success("Password changed.");
    });
  }

  return (
    <div className="flex flex-col gap-5">
      <ProfileAvatar avatarUrl={avatarUrl} firstName={firstName} email={email} />
      <Separator />
      <form action={saveProfile} className="flex flex-col gap-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <FormField id="firstName" name="firstName" label="First name" required defaultValue={firstName} />
          <FormField id="lastName" name="lastName" label="Last name" required defaultValue={lastName} />
        </div>
        <FormField id="adminEmail" label="Email" defaultValue={email} disabled
          labelAction={<span className="text-xs text-muted-foreground">Contact support to change</span>} />
        <div className="flex justify-end">
          <Button type="submit" size="sm" disabled={pending}>
            {pending && <Spinner aria-hidden />}Save profile
          </Button>
        </div>
      </form>
      <Separator />
      <form action={savePassword} className="flex flex-col gap-3">
        <PasswordField id="currentPassword" name="currentPassword" label="Current password" required />
        <div className="grid gap-3 sm:grid-cols-2">
          <PasswordField id="newPassword" name="newPassword" label="New password" required minLength={8} />
          <PasswordField id="confirmPassword" name="confirmPassword" label="Confirm new password" required />
        </div>
        <div className="flex justify-end">
          <Button type="submit" size="sm" variant="outline" disabled={pending}>
            {pending && <Spinner aria-hidden />}Change password
          </Button>
        </div>
      </form>
    </div>
  );
}
