"use server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/authOptions";
import { connectDB } from "@/lib/db/db";
import instructorModel from "@/lib/db/models/instructorModel";
import { ActionData } from "@/lib/formTypes";
import { accountSettingSchema } from "@/lib/validation/schemas/instructor/settings/accountSettings";

export async function saveAccountSettings(
  prevState: ActionData,
  formData: FormData
) {
  await connectDB();

  const data = Object.fromEntries(formData.entries());

  const result = accountSettingSchema.safeParse(data);
  if (!result.success) {
    return {
      message: "ERROR",
      errors: result.error.errors.map((error) => error.message),
    };
  }

  const session = await getServerSession(authOptions);

  const foundInstructor = await instructorModel.findOne({
    user: session?.user.id,
  });

  if (!foundInstructor) {
    return {
      message: "ERROR",
      errors: ["Instructor not found"],
    };
  }

  try {
    await instructorModel.findByIdAndUpdate(
      foundInstructor._id,
      {
        firstname: result.data.firstName,
        lastname: result.data.lastName,
        avatar: result.data.profile,
        username: result.data.userName,
        phoneCode: result.data.phoneCode,
        phoneNumber: result.data.phoneNumber,
        title: result.data.title,
        bio: result.data.biography,
      },
      { new: true }
    );
    return {
      message: "SUCCESS",
      errors: [],
    };
  } catch (error) {
    console.error(error);
    return {
      message: "ERROR",
      errors: ["save account settings error"],
    };
  }
}
