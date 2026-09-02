"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import instructorModel from "../db/models/instructorModel";
import studentModel from "../db/models/studentModel";
import { ActionData } from "../formTypes";
import { connectDB } from "../db/db";
import { authOptions } from "../auth/authOptions";

export async function becomeInstructor(
  _prevState: ActionData,
  _formData: FormData
) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const foundInstructor = await instructorModel.findOne({
    user: session.user.id,
  });

  if (foundInstructor) {
    return {
      message: "ERROR",
      errors: ["You are moving to the dashboard..."],
    };
  }

  const student = await studentModel.findOne({ user: session.user.id });

  const newInstructor = await instructorModel.create({
    user: session.user.id,
    firstname: student?.firstname ?? "",
    lastname: student?.lastname ?? "",
  });

  if (newInstructor) {
    redirect("/instructor/dashboard/settings");
  }

  return {
    message: "SUCCESS",
    errors: [],
  };
}
