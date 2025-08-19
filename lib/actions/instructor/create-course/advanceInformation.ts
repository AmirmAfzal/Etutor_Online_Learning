"use server";

import { connectDB } from "@/lib/db/db";
import courseModel from "@/lib/db/models/courseModel";
import { ActionData } from "@/lib/formTypes";
import { advanceInformationSchema } from "@/lib/validation/schemas/instructor/create-course";

export async function saveAdvanceInformation(
  prevState: ActionData,
  formData: FormData
): Promise<ActionData> {
  await connectDB();
  const data = {
    _id: formData.get("_id") as string,
    description: formData.get("description") as string,
    requirementsTopics: formData.getAll("requirementsTopics") as string[],
    targetTopics: formData.getAll("targetTopics") as string[],
    thumbnail: formData.get("thumbnail") as string,
    topics: formData.getAll("topics") as string[],
    video: formData.get("video") as string,
  };
  console.log(data);

  const result = advanceInformationSchema.safeParse(data);

  if (!result.success) {
    return {
      message: "ERROR",
      errors: result.error.errors.map((error) => error.message),
    };
  }

  try {
    const foundCourse = await courseModel.findOne({ _id: data._id });
    console.log(foundCourse);
    if (!foundCourse)
      return {
        message: "ERROR",
        errors: ["Course not found"],
      };
    const updatedCourse = await courseModel.findOneAndUpdate(
      { _id: data._id },
      {
        $set: {
          description: data.description,
          requirements: data.requirementsTopics,
          targetAudience: data.targetTopics,
          trailer: data.video,
          thumbnail: data.thumbnail,
          learningOutcomes: data.topics,
        },
      }
    );

    console.log(updatedCourse);

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
