"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { authOptions } from "@/lib/auth/authOptions";
import { connectDB } from "@/lib/db/db";
import studentModel from "@/lib/db/models/studentModel";
import { ActionData } from "@/lib/formTypes";

export const wishlistRemoveAction = async (
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
        user: session?.user.id,
      },
      { $pull: { wishlist: courseId } },
      { new: true }
    );

    if (!updatedStudent) {
      return {
        message: "ERROR",
        errors: ["Failed to add course to cart"],
      };
    }

    revalidatePath("/student/wishlist");

    return {
      message: "SUCCESS",
      messageDetail: "Course removed from wishlist.",
      errors: [],
      data: JSON.parse(JSON.stringify(updatedStudent.wishlist)),
    };
  } catch (error) {
    console.error("Error adding course to cart:", error);
    return {
      message: "ERROR",
      errors: ["Failed to add course to cart"],
    };
  }
};
