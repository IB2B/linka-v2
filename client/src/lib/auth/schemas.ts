import { z } from "zod";

import { USER_ROLES } from "@/lib/auth/constants";

export const loginRequestSchema = z.object({
  email: z
    .string()
    .email("Enter a valid email address.")
    .transform((v) => v.toLowerCase()),
  password: z.string().min(1, "Password is required."),
});

export const loginSuccessSchema = z.object({
  role: z.enum(USER_ROLES),
});

export const registerRequestSchema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required."),
    lastName: z.string().trim().min(1, "Last name is required."),
    email: z
      .string()
      .email("Enter a valid email address.")
      .transform((v) => v.toLowerCase()),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const registerSuccessSchema = z.object({
  role: z.enum(USER_ROLES),
  emailConfirmationRequired: z.boolean(),
});

export const apiErrorSchema = z.object({ error: z.string() });

export const forgotPasswordRequestSchema = z.object({
  email: z
    .string()
    .email("Enter a valid email address.")
    .transform((v) => v.toLowerCase()),
});

export const forgotPasswordSuccessSchema = z.object({ ok: z.literal(true) });

export const verifyEmailRequestSchema = z.object({
  code: z.string().regex(/^\d{6}$/, "Enter the 6-digit code."),
});

export const verifyEmailSuccessSchema = z.object({ ok: z.literal(true) });

export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type LoginSuccess = z.infer<typeof loginSuccessSchema>;
export type RegisterRequest = z.infer<typeof registerRequestSchema>;
export type RegisterSuccess = z.infer<typeof registerSuccessSchema>;
export type ForgotPasswordRequest = z.infer<typeof forgotPasswordRequestSchema>;
export type ForgotPasswordSuccess = z.infer<typeof forgotPasswordSuccessSchema>;
export type VerifyEmailRequest = z.infer<typeof verifyEmailRequestSchema>;
export type VerifyEmailSuccess = z.infer<typeof verifyEmailSuccessSchema>;
