"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { authOptions } from "@/lib/auth/authOptions";
import { connectDB } from "@/lib/db/db";
import studentModel from "@/lib/db/models/studentModel";
import { ActionData } from "@/lib/formTypes";

export const actionDeleteCourse = async (
  prevState: ActionData,
  formData: FormData
): Promise<ActionData> => {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session) {
      return { message: "Error", errors: ["User not authenticated"] };
    }

    const { courseId } = Object.fromEntries(formData);

    if (!courseId || typeof courseId !== "string") {
      return { message: "Error", errors: ["Invalid courseId"] };
    }

    const updatedStudent = await studentModel.findOneAndUpdate(
      {
        user: session.user.id,
      },
      { $pull: { coursesCart: courseId } },
      { new: true }
    );

    if (!updatedStudent) {
      return {
        message: "ERROR",
        errors: ["Failed to delete course from cart"],
      };
    }

    revalidatePath("/shopping-cart");

    return {
      message: "SUCCESS",
      messageDetail: "Course removed from cart.",
      errors: [],
      data: JSON.parse(JSON.stringify(updatedStudent.coursesCart)),
    };
  } catch (error) {
    console.log("error deleting course from cart", error);
    return { message: "ERROR", errors: ["Failed to delete course from cart"] };
  }
};
