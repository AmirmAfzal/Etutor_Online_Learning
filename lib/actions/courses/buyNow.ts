"use server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/authOptions";
import { connectDB } from "@/lib/db/db";
import studentModel from "@/lib/db/models/studentModel";
import { ActionData } from "@/lib/formTypes";

export const actionBuyNow = async (
  prevState: ActionData,
  formData: FormData
): Promise<ActionData> => {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
      return {
        message: "ERROR",
        errors: ["User not authenticated."],
      };
    }

    const { courseId } = Object.fromEntries(formData.entries());

    if (!courseId || typeof courseId !== "string") {
      return {
        message: "ERROR",
        errors: ["Invalid CourseId."],
      };
    }

    const updatedStudent = await studentModel.findOneAndUpdate(
      { user: session.user.id },
      { $addToSet: { courses: courseId } },
      { new: true }
    );

    if (!updatedStudent) {
      return {
        message: "ERROR",
        errors: ["Student not found"],
      };
    }

    return {
      message: "SUCCESS",
      messageDetail: "Course added to your courses.",
      errors: [],
      data: JSON.parse(JSON.stringify(updatedStudent.courses)),
    };
  } catch (error) {
    console.error("Error updating student wishlist:", error);
    return {
      message: "ERROR",
      errors: ["An unexpected error occurred."],
    };
  }
};
