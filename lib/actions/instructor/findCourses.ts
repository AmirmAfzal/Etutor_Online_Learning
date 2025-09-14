"use server";

import { connectDB } from "@/lib/db/db";
import courseModel from "@/lib/db/models/courseModel";
import { ActionData } from "@/lib/formTypes";

export async function findCourses(prevState: ActionData, formData: string) {
  await connectDB();

  const search = formData.trim().toLowerCase();
  if (search.length === 0) {
    return {
      message: "ERROR",
      errors: ["Search term is empty."],
      data: [],
    };
  }

  const courses = JSON.parse(JSON.stringify(await courseModel.find()));

  const matched = courses.filter((course: { title: string }) =>
    course.title.toLowerCase().includes(search)
  );

  return {
    message: "SUCCESS",
    errors: [],
    data: matched,
  };
}
