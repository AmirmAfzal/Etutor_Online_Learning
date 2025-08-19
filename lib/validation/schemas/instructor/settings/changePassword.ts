import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8)
      .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
    newPassword: z
      .string()
      .min(8)
      .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
    confirmPassword: z.string().min(8),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword === data.currentPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["newPassword"],
        message: "The new password cannot be the same as the current password.",
      });
    }
    if (data.confirmPassword !== data.newPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Repeat password does not match new password.",
      });
    }
  });

export type changePasswordFormData = z.infer<typeof changePasswordSchema>;
