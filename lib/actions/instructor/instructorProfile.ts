"use server";

import { connectDB } from "@/lib/db/db";
import instructorModel from "@/lib/db/models/instructorModel";
import { ActionData } from "@/lib/formTypes";

export async function instructorProfile(prevState: ActionData, id: string) {
  await connectDB();

  const instructor = await instructorModel.findOne({ user: id });
  if (!instructor) {
    return {
      message: "ERROR",
      errors: [],
      data: [],
    };
  }

  return {
    message: "SUCCESS",
    errors: [],
    data: instructor.avatar,
  };
}
