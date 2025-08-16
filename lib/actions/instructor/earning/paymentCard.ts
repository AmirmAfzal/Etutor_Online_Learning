"use server";

import { ActionData } from "@/lib/formTypes";
import { PaymentCardFormData, paymentCardSchema } from "@/lib/validation/schemas/instructor/newPaymentCard";

export async function savePaymentCard(
  prevState: ActionData,
  formData: PaymentCardFormData
) {

  const result = paymentCardSchema.safeParse(formData);
  if (!result.success) {
    return {
      message: "ERROR",
      errors: result.error.errors.map((error) => error.message),
    };
  }

  console.log(result.data);

  return {
    message: "SUCCESS",
    errors: [],
  };
}
