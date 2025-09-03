import { z } from "zod";

export const paymentCardSchema = z.object({
  bank: z.string(),
  name: z.string().min(4),
  cardNumber: z.string().min(19),
  expiration: z.string().min(5),
  cvc: z.string().min(3),
});

export type PaymentCardFormData = z.infer<typeof paymentCardSchema>;
