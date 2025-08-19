import { z } from "zod";

export const accountSettingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  userName: z.string().min(1, "Username is required"),
  phoneCode: z.enum(["+87", "+880", "+98", "+95"]),
  phoneNumber: z
    .string()
    .regex(/^\d{10,11}$/, "Phone number must be 10 or 11 digits"),
  title: z.string().min(1, "Title must not be empty"),
  biography: z.string().min(1, "Biography is required"),
  profile: z.string().optional(),
});

export type AccountSettingFormData = z.infer<typeof accountSettingSchema>;
