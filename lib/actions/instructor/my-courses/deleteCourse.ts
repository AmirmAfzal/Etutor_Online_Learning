"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { connectDB } from "@/lib/db/db";
import courseModel from "@/lib/db/models/courseModel";
import instructorModel from "@/lib/db/models/instructorModel";
import { authOptions } from "@/lib/auth/authOptions";

export async function deleteCourse(id: string) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    redirect("/auth/signin");
  }

  const instructor = await instructorModel.findOne({ user: session.user.id });
  if (!instructor) {
    redirect("/auth/signin");
  }

  const course = await courseModel.findOne({
    _id: id,
    authors: instructor._id,
  });

  if (course) {
    await courseModel.findByIdAndDelete(id);
  }

  revalidatePath("/instructor/dashboard/my-courses");
}
