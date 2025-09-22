"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { connectDB } from "@/lib/db/db";
import courseModel from "@/lib/db/models/courseModel";
import { authOptions } from "@/lib/auth/authOptions";
import instructorModel from "@/lib/db/models/instructorModel";

export async function deleteCourse(id: string) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    redirect("/auth/signin");
  }

  const course = await courseModel.findOne({
    _id: id,
  });

  if (course) {
    await courseModel.findByIdAndDelete(id);

    await instructorModel.updateMany(
      { courses: course._id },
      { $pull: { courses: course._id } }
    );
  }

  revalidatePath("/instructor/dashboard/my-courses");
}
