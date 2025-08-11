import { z } from "zod";

const nameRegex = /^[a-zA-Zآ-یءچ-]+$/;
const usernameRegex = /^[a-zA-Z0-9_]+$/;

export const settingAccountSchema = z.object({
  id: z.string().min(1, "User ID is required"),
  firstName: z
    .string()
    .min(3, { message: "First name must be at least 3 characters" })
    .max(32, { message: "First name must be at most 32 characters" })
    .regex(nameRegex, { message: "First name must contain only letters" }),
  lastName: z
    .string()
    .min(3, { message: "Last name must be at least 3 characters" })
    .max(32, { message: "Last name must be at most 32 characters" })
    .regex(nameRegex, { message: "Last name must contain only letters" }),
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters" })
    .max(20, { message: "Username must be at most 20 characters" })
    .regex(usernameRegex, {
      message: "Username can only contain letters, numbers, and underscores",
    }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .refine((val) => val.endsWith("@gmail.com"), {
      message: "Email must be a gmail address",
    }),
  title: z
    .string()
    .min(4, { message: "Title must be at least 4 characters" })
    .max(50, { message: "Title must be at most 50 characters" }),
});
