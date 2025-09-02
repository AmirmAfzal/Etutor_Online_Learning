"use server";

import { hash, compare } from "bcrypt";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/authOptions";
import { connectDB } from "@/lib/db/db";
import instructorModel from "@/lib/db/models/instructorModel";
import userModel from "@/lib/db/models/userModel";
import { ActionData } from "@/lib/formTypes";
import { changePasswordSchema } from "@/lib/validation/schemas/instructor/settings/changePassword";

export async function saveChangePassword(
  prevState: ActionData,
  formData: FormData
) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return {
      message: "ERROR",
      errors: ["Unauthorized access"],
    };
  }

  const data = Object.fromEntries(formData.entries());
  const result = changePasswordSchema.safeParse(data);
  if (!result.success) {
    return {
      message: "ERROR",
      errors: result.error.errors.map((error) => error.message),
    };
  }

  try {
    const instructor = await instructorModel
      .findOne({ user: session.user.id })
      .populate("user");
    if (!instructor || !instructor.user) {
      return {
        message: "ERROR",
        errors: ["Instructor or user not found"],
      };
    }

    const user = await userModel
      .findById(instructor.user._id)
      .select("+password");

    if (!user) {
      return {
        message: "ERROR",
        errors: ["User not found"],
      };
    }

    const isCurrentPasswordValid = await compare(
      result.data.currentPassword,
      user.password
    );
    if (!isCurrentPasswordValid) {
      return {
        message: "ERROR",
        errors: ["Current password is incorrect"],
      };
    }

    const isNewPasswordSameAsCurrent = await compare(
      result.data.newPassword,
      user.password
    );
    if (isNewPasswordSameAsCurrent) {
      return {
        message: "ERROR",
        errors: ["New password cannot be the same as the current password"],
      };
    }

    if (result.data.newPassword !== result.data.confirmPassword) {
      return {
        message: "ERROR",
        errors: ["New password and confirmation do not match"],
      };
    }

    const hashedNewPassword = await hash(result.data.newPassword, 10);
    const updatedUser = await userModel
      .findByIdAndUpdate(
        instructor.user._id,
        { password: hashedNewPassword },
        { new: true }
      );

    if (!updatedUser) {
      return {
        message: "ERROR",
        errors: ["Failed to update password"],
      };
    }

    return {
      message: "SUCCESS",
      errors: [],
    };
  } catch (error) {
    console.error("Password change error:", error);
    return {
      message: "ERROR",
      errors: ["An unexpected error occurred. Please try again later."],
    };
  }
}
