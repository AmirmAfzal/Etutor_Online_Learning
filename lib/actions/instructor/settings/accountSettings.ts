"use server";

import { ActionData } from "@/lib/formTypes";
import { accountSettingSchema } from "@/lib/validation/schemas/instructor/settings/accountSettings";

export async function saveAccountSettings(
  prevState: ActionData,
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries());

  const result = accountSettingSchema.safeParse(data);
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
