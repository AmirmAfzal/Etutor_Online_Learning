"use server";

import { authOptions } from "@/lib/auth/authOptions";
import { connectDB } from "@/lib/db/db";
import studentModel from "@/lib/db/models/studentModel";
import { ActionData } from "@/lib/formTypes";
import { getServerSession } from "next-auth";

export const actionAddToWishlist = async (
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
        errors: ["Invalid courseId."],
      };
    }

    const updatedStudent = await studentModel.findOneAndUpdate(
      { user: session.user.id },
      { $addToSet: { wishlist: courseId } },
      { new: true }
    );

    if (!updatedStudent) {
      return {
        message: "ERROR",
        errors: ["Student not found."],
      };
    }

    return {
      message: "SUCCESS",
      errors: [],
      data: JSON.parse(JSON.stringify(updatedStudent.wishlist)),
    };
  } catch (error) {
    console.error("Error updating student wishlist:", error);
    return {
      message: "ERROR",
      errors: ["An unexpected error occurred."],
    };
  }
};
