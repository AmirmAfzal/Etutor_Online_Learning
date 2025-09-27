"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import instructorModel from "../db/models/instructorModel";
import { ActionData } from "../formTypes";
import { connectDB } from "../db/db";
import { authOptions } from "../auth/authOptions";
import userModel from "@/lib/db/models/userModel";

export async function becomeInstructor(
  prevState: ActionData,
  formData: FormData
) {
  await connectDB();

  const data = Object.fromEntries(formData.entries());

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const foundInstructor = await instructorModel.findOne({ user: data.id });

  if (foundInstructor) {
    return {
      message: "ERROR",
      errors: ["You are moving to the dashboard..."],
    };
  }

  const updateUser = await userModel.findByIdAndUpdate(session.user.id, {
    role: "INSTRUCTOR",
  });

  const newInstructor = await instructorModel.create({
    user: data.id,
    firstname: data.firstname,
    lastname: data.lastname,
  });

  if (updateUser) {
    console.log("update user role successfully");
  }

  if (newInstructor) {
    redirect("/instructor/dashboard/settings");
  }

  return {
    message: "SUCCESS",
    errors: [],
  };
}
