"use server";

import { settingAccountSchema } from "@/lib/validation/Student-dashboard/settingAccountSchema";
import { ActionData } from "@/lib/formTypes";

import { connectDB } from "../db/db";
import studentModel from "../db/models/studentModel";
import userModel from "../db/models/userModel";

export const updateStudentAccount = async (
  prevState: ActionData,
  formData: FormData
): Promise<ActionData> => {
  try {
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
      // FIXME: Security issue
      //  وقتی یه عملیاتی با آیدی یوزر آپدیت بشه مشکل امنیتی ایجاد میکنه چون یکی که به یوزر آیدی همه دسترسی داره میتونه پروفایل و رمز همرو آپدیت کنه برای همین سعی کن کاربر رو از روی سشن برداری
      // const user = await getServerSession(authOptions);
      { user: result.data.id },
      {
        firstname: result.data.firstName,
        lastname: result.data.lastName,
        username: result.data.username,
        bio: result.data.title || "",
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
      result.data.id,
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
