"use server";

import { compare, hash } from "bcrypt";
import { getServerSession } from "next-auth";

import { ActionData } from "@/lib/formTypes";
import { settingPasswordSchema } from "@/lib/validation/Student-dashboard/settingPasswordSchema";
import { authOptions } from "@/lib/auth/authOptions";

import { connectDB } from "../../db/db";
import userModel from "../../db/models/userModel";

export const changeStudentPassword = async (
  prevState: ActionData,
  formData: FormData
): Promise<ActionData> => {
  try {
    await connectDB();

    // Get current user session
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return {
        message: "ERROR",
        errors: ["You must be logged in to change your password."],
      };
    }

    const data = Object.fromEntries(formData.entries());
    const result = settingPasswordSchema.safeParse(data);

    if (!result.success) {
      return {
        message: "ERROR",
        errors: result.error.errors.map((error) => error.message),
      };
    }

    // Find user and verify current password
    const user = await userModel.findById(session.user.id).select("+password");
    if (!user) {
      return {
        message: "ERROR",
        errors: ["User not found."],
      };
    }

    // Verify current password
    const isCurrentPasswordValid = await compare(
      result.data.currentPassword,
      user.password
    );
    if (!isCurrentPasswordValid) {
      return {
        message: "ERROR",
        errors: ["Current password is incorrect."],
      };
    }

    // Hash new password
    const hashedNewPassword = await hash(result.data.newPassword, 10);

    // Update password
    await userModel.findByIdAndUpdate(session.user.id, {
      password: hashedNewPassword,
    });

    return {
      message: "SUCCESS",
      messageDetail: "Password changed successfully.",
      errors: [],
    };
  } catch (error) {
    console.error("Error changing password:", error);
    return {
      message: "ERROR",
      errors: ["An unexpected error occurred while changing your password."],
    };
  }
};
