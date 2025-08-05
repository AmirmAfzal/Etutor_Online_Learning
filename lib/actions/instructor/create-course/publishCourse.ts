"use server";

import { ActionData } from "@/lib/formTypes";
import { publishMessageSchema } from "@/lib/validation/schemas/instructor/create-course";

export async function publishCourse(prevState: ActionData, formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  const result = publishMessageSchema.safeParse(data);
  if (!result.success) {
    return {
      message: "ERROR",
      errors: result.error.errors.map((error) => error.message),
    };
  }

  try {
      console.log(result.data);
    return {
        message: "SUCCESS",
        errors: []
    }
  } catch (error) {
      return {
          message: "ERROR",
          errors: [],
        };
    }
}
