"use server";

import { connectDB } from "@/lib/db/db";
import AdvanceInfoModel from "@/lib/db/models/advanceInformationModel";
import { ActionData } from "@/lib/formTypes";
import { advanceInformationSchema } from "@/lib/validation/schemas/instructor/create-course";
import type { ZodIssue } from "zod";

export async function saveAdvanceInformation(
  prevState: ActionData,
  formData: FormData
): Promise<ActionData> {
  await connectDB();
  const data = {
    description: formData.get("description") as string,
    requirementsTopics: formData.getAll("requirementsTopics") as string[],
    targetTopics: formData.getAll("targetTopics") as string[],
    thumbnail: formData.get("thumbnail") as string,
    topics: formData.getAll("topics") as string[],
    video: formData.get("video") as string,
  };

  const result = advanceInformationSchema.safeParse(data);

  if (!result.success) {
    return {
      message: "ERROR",
      errors: result.error.errors.map((error: ZodIssue) => error.message),
    };
  }

  try {
    const addAdvanceInformation = await AdvanceInfoModel.create({
      topics: result.data.topics,
      requirementsTopics: result.data.requirementsTopics,
      targetTopics: result.data.targetTopics,
      description: result.data.description,
      thumbnail: result.data.thumbnail,
      video: result.data.video,
    });
    console.log(addAdvanceInformation);

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
