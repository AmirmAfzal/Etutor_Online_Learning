"use server";

import { ActionData } from "@/lib/formTypes";
import {
  PublishMessageFormData,
  publishMessageSchema,
} from "@/lib/validation/schemas/instructor/create-course";
import { connectDB } from "@/lib/db/db";
import courseModel from "@/lib/db/models/courseModel";

export async function publishCourse(
  prevState: ActionData,
  formData: PublishMessageFormData
) {
  const result = publishMessageSchema.safeParse(formData);
  if (!result.success) {
    return {
      message: "ERROR",
      errors: result.error.errors.map((error) => error.message),
    };
  }

  try {
    await connectDB();

    // Find the course using the courseId
    const foundCourse = await courseModel.findOne({
      _id: result.data.courseId,
    });

    if (!foundCourse) {
      return {
        message: "ERROR",
        errors: ["Course not found"],
      };
    }

    // Update the course with the publish data
    await courseModel.findOneAndUpdate(
      { _id: result.data.courseId },
      {
        $set: {
          welcomeMessage: result.data.welcomeMessage,
          congratulationsMessage: result.data.congratulationsMessage,
          instructors: result.data.instructors,
        },
      }
    );

    return {
      message: "SUCCESS",
      errors: [],
    };
  } catch (error) {
    console.error("Error publishing course:", error);
    return {
      message: "ERROR",
      errors: ["An unexpected error occurred while publishing the course."],
    };
  }
}
