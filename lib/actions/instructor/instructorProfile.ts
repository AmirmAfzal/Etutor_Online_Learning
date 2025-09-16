"use server";

import { connectDB } from "@/lib/db/db";
import instructorModel from "@/lib/db/models/instructorModel";
import userModel from "@/lib/db/models/userModel";

export interface DataTypes {
  fullName: string;
  email: string;
  avatar: string;
}

type ActionData<T = unknown> = {
  message: string;
  errors: string[];
  data?: T | null;
};

export async function instructorProfile(
  prevState: ActionData<DataTypes>,
  id: string
) {
  await connectDB();

  const user = await userModel.findOne({ _id: id });

  const instructor = await instructorModel.findOne({ user: user._id });
  if (!instructor) {
    return {
      message: "ERROR",
      errors: [],
      data: null,
    };
  }

  const data: DataTypes = {
    fullName: `${instructor.firstname} ${instructor.lastname}`,
    email: user.email,
    avatar: instructor.avatar,
  };

  return {
    message: "SUCCESS",
    errors: [],
    data: data,
  };
}
