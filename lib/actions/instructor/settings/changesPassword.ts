"use server";

import { ActionData } from "@/lib/formTypes";
import { changePasswordSchema } from "@/lib/validation/schemas/instructor/settings/changePassword";

export async function saveChangePassword(
  prevState: ActionData,
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries());

  const result = changePasswordSchema.safeParse(data);
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
