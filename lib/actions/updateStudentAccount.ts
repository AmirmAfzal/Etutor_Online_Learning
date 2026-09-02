"use server";

import { getServerSession } from "next-auth";

import { settingAccountSchema } from "@/lib/validation/Student-dashboard/settingAccountSchema";
import { ActionData } from "@/lib/formTypes";
import { authOptions } from "@/lib/auth/authOptions";

import { connectDB } from "../db/db";
import studentModel from "../db/models/studentModel";
import userModel from "../db/models/userModel";

export const updateStudentAccount = async (
  prevState: ActionData,
  formData: FormData
): Promise<ActionData> => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return {
        message: "ERROR",
        errors: ["You must be signed in to update your account."],
      };
    }

    await connectDB();

    const data = Object.fromEntries(formData.entries());
    const result = settingAccountSchema.safeParse(data);

    if (!result.success) {
      return {
        message: "ERROR",
        errors: result.error.errors.map((error) => error.message),
      };
    }

    const updatedStudent = await studentModel.findOneAndUpdate(
      { user: session.user.id },
      {
        firstname: result.data.firstName,
        lastname: result.data.lastName,
        username: result.data.username,
        bio: result.data.title || "",
        avatar: result.data.avatar || "",
      },
      { new: true }
    );

    if (!updatedStudent) {
      return {
        message: "ERROR",
        errors: ["Student not found."],
      };
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      session.user.id,
      { email: result.data.email },
      { new: true }
    );

    if (!updatedUser) {
      return {
        message: "ERROR",
        errors: ["User not found."],
      };
    }

    return {
      message: "SUCCESS",
      messageDetail: "Account updated successfully.",
      errors: [],
    };
  } catch (error) {
    console.error("Error updating student account:", error);
    return {
      message: "ERROR",
      errors: ["An unexpected error occurred."],
    };
  }
};
