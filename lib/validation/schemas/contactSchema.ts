import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "Email must be a valid email address format.",
    }),

  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long." }),
  subject: z
    .string()
    .min(2, { message: "Subject must be at least 2 characters long." })
    .max(100, { message: "Subject must not exceed 100 characters." }),
});
