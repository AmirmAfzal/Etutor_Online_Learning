"use server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/authOptions";
import { connectDB } from "@/lib/db/db";
import studentModel from "@/lib/db/models/studentModel";
import { ActionData } from "@/lib/formTypes";
import purchaseHistoryModel from "@/lib/db/models/purchaseHistoryModel";
import courseModel from "@/lib/db/models/courseModel";

export const addToCheckout = async (
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

    const courseIds = formData.getAll("courseId").filter(Boolean) as string[];

    if (!courseIds.length) {
      return {
        message: "ERROR",
        errors: ["Invalid courseId."],
      };
    }

    const coursesData = await courseModel.find({ _id: { $in: courseIds } });

    const totalPrice = coursesData.reduce((acc, c) => acc + c.price, 0);

    const newPurchase = await purchaseHistoryModel.create({
      date: new Date().toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      summary: {
        courses: courseIds.length,
        price: totalPrice,
        method: "Credit Card",
      },
      courses: courseIds,
      summaryCourses: courseIds.length,
      userId: session.user.id,
    });

    const updatedStudent = await studentModel.findOneAndUpdate(
      { user: session.user.id },
      {
        $addToSet: {
          checkout: { $each: courseIds },
          courses: { $each: courseIds },
          purchases: newPurchase._id,
        },
      },
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
      data: JSON.parse(JSON.stringify(updatedStudent.checkout)),
    };
  } catch (error) {
    console.error("Error updating checkout:", error);
    return {
      message: "ERROR",
      errors: ["An unexpected error occurred."],
    };
  }
};
