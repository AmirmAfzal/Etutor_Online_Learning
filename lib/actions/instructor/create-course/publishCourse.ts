"use server";

import { ActionData } from "@/lib/formTypes";
import { publishMessageSchema } from "@/lib/validation/schemas/instructor/create-course";
import { Instructor } from "./findInstructors";

export async function publishCourse(prevState: ActionData, formData: FormData) {
  const instructorsRaw = formData.get("instructors");
  const instructors: Instructor[] = JSON.parse((instructorsRaw as string) || "[]");

  if (!Array.isArray(instructors) || instructors.length === 0) {
    return {
      message: "ERROR",
      errors: ["At least one instructor must be selected."],
    };
  }

  const result = publishMessageSchema.safeParse({
    welcomeMessage: formData.get("welcomeMessage"),
    congratulationsMessage: formData.get("congratulationsMessage"),
  });

  if (!result.success) {
    return {
      message: "ERROR",
      errors: result.error.errors.map((error) => error.message),
    };
  }

  try {
    console.log(result.data, instructors);
    return {
      message: "SUCCESS",
      errors: [],
    };
  } catch (error) {
    return {
      message: "ERROR",
      errors: [],
    };
  }
}
