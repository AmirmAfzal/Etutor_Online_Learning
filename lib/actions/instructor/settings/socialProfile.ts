"use server";

import { ActionData } from "@/lib/formTypes";
import { socialProfileSchema } from "@/lib/validation/schemas/instructor/settings/socialProfile";

export async function saveSocialProfile(
  prevState: ActionData,
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries());

  const result = socialProfileSchema.safeParse(data);
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
