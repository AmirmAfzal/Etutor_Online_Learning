"use server";

import { connectDB } from "@/lib/db/db";
import courseModel from "@/lib/db/models/courseModel";
import { ActionData } from "@/lib/formTypes";
import {
  AdvanceInformationFormData,
  advanceInformationSchema,
} from "@/lib/validation/schemas/instructor/create-course";

export async function saveAdvanceInformation(
  prevState: ActionData,
  formData: AdvanceInformationFormData
): Promise<ActionData> {
  await connectDB();

  const result = advanceInformationSchema.safeParse(formData);

  if (!result.success) {
    return {
      message: "ERROR",
      errors: result.error.errors.map((error) => error.message),
    };
  }

  try {
    const foundCourse = await courseModel.findOne({ _id: formData._id });
    if (!foundCourse)
      return {
        message: "ERROR",
        errors: ["Course not found"],
      };
    await courseModel.findOneAndUpdate(
      { _id: formData._id },
      {
        $set: {
          description: formData.description,
          requirements: formData.requirements,
          targetAudience: formData.targetAudience,
          trailer: formData.video,
          thumbnail: formData.thumbnail,
          learningOutcomes: formData.learningOutcomes,
        },
      }
    );

    return {
      message: "SUCCESS",
      errors: [],
    };
  } catch (error) {
    console.error("Error saving form data:", error);
    return {
      message: "ERROR",
      errors: ["An unexpected error occurred. Please try again."],
    };
  }
}
