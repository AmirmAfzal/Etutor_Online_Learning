"use server";

import { revalidatePath } from "next/cache";

import { connectDB } from "@/lib/db/db";
import courseModel from "@/lib/db/models/courseModel";

export async function deleteCourse(id: string) {
  await connectDB();
  await courseModel.findByIdAndDelete(id);

  revalidatePath("/instructor/dashboard/my-courses");
}
