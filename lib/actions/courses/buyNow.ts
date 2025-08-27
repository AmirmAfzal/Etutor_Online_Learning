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
        message: "ERROR1",
        errors: ["User not authenticated."],
      };
    }

    const { courseId } = Object.fromEntries(formData.entries());

    if (!courseId || typeof courseId !== "string") {
      return {
        message: "ERROR2",
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
        message: "ERROR3",
        errors: ["Student not found"],
      };
    }

    return {
      message: "SUCCESS",
      errors: [],
      data: JSON.parse(JSON.stringify(updatedStudent.courses)),
    };
  } catch (error) {
    console.error("Error updating student wishlist:", error);
    return {
      message: "ERROR4",
      errors: ["An unexpected error occurred."],
    };
  }
};
