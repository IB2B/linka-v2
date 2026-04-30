"use client";

import { useState } from "react";

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { ForgotPasswordSent } from "@/components/auth/forgot-password-sent";

export function ForgotPasswordPanel() {
  const [sentTo, setSentTo] = useState<string | null>(null);

  if (sentTo) return <ForgotPasswordSent email={sentTo} />;
  return <ForgotPasswordForm onSent={setSentTo} />;
}
