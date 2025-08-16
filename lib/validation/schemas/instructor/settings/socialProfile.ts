import { z } from "zod";

const usernameRegex = /^[a-zA-Z0-9._]{2,30}$/;

export const socialProfileSchema = z.object({
  website: z
    .string()
    .url("Website must be a valid URL")
    .optional()
    .or(z.literal("")),

  facebook: z
    .string()
    .regex(usernameRegex, "Invalid Facebook username")
    .optional()
    .or(z.literal("")),

  instagram: z
    .string()
    .regex(usernameRegex, "Invalid Instagram username")
    .optional()
    .or(z.literal("")),

  linkedin: z
    .string()
    .regex(usernameRegex, "Invalid LinkedIn username")
    .optional()
    .or(z.literal("")),

  twitter: z
    .string()
    .regex(usernameRegex, "Invalid Twitter username")
    .optional()
    .or(z.literal("")),

  whatsapp: z
    .string()
    .regex(/^\d{10,15}$/, "Invalid WhatsApp number")
    .optional()
    .or(z.literal("")),

  youtube: z
    .string()
    .regex(usernameRegex, "Invalid YouTube username")
    .optional()
    .or(z.literal("")),
});

export type SocialProfileFormData = z.infer<typeof socialProfileSchema>;
