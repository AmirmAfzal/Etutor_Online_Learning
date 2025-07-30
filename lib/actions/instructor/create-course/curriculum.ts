"use server";

import {
  Lecture,
  Section,
} from "@/components/instructor-dashboard/create-course/Curriculum";
import { connectDB } from "@/lib/db/db";
import { ActionData } from "@/lib/formTypes";
import { curriculumSchema } from "@/lib/validation/schemas/instructor/create-course";

export async function saveCurriculum(
  prevState: ActionData,
  formData: Section[]
) {
  await connectDB();

  const result = curriculumSchema.safeParse(formData);

  if (!result.success) {
    return {
      message: "ERROR",
      errors: result.error.errors.map((error) => error.message),
    };
  }

  try {
    console.log(JSON.stringify(result.data));
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
