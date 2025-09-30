"use server";

import { getCourseDailyComments } from "@/lib/utils/getCourseDailyComments";
import { getInstructorDailyComments } from "@/lib/utils/getInstructorDailyComments";

export async function fetchInstructorComments(
  instructorId: string,
  month: number,
  year: number
) {
  return await getInstructorDailyComments(instructorId, month, year);
}

export async function fetchCourseComments(
  courseId: string,
  month: number,
  year: number
) {
  return await getCourseDailyComments(courseId, month, year);
}
