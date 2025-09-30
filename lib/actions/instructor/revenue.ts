"use server";

import { getInstructorDailyIncome } from "@/lib/utils/getInstructorDailyIncome";
import { getCourseDailyIncome } from "@/lib/utils/getCourseDailyIncome";

export async function fetchInstructorRevenue(
  instructorId: string,
  month: number,
  year: number
) {
  return await getInstructorDailyIncome(instructorId, month, year);
}

export async function fetchCourseRevenue(
  courseId: string,
  month: number,
  year: number
) {
  return await getCourseDailyIncome(courseId, month, year);
}
