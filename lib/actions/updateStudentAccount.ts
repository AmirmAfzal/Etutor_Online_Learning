"use server";

import { connectDB } from "../db/db";
import studentModel from "../db/models/studentModel";
import { settingAccountSchema } from "@/lib/validation/Student-dashboard/settingAccountSchema";
import { ActionData } from "@/lib/formTypes";

export const updateStudentAccount = async (
  prevState: ActionData,
  formData: FormData
): Promise<ActionData> => {
  await connectDB();
  const data = Object.fromEntries(formData.entries());

  const result = await settingAccountSchema.safeParse(data);

  if (!result.success) {
    return {
      message: "ERROR",
      errors: result.error.errors.map((error) => error.message),
    };
  }

  const updatedStudent = await studentModel.findOneAndUpdate(
    { email: result.data.email },
    {
      firstName: result.data.firstName,
      lastName: result.data.lastName,
      username: result.data.username,
      title: result.data.title,
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
  };
};
