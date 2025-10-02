"use server";

import calculateAllCoursesRating from "@/lib/utils/calculateAllCoursesRating";
import calculateCourseRating from "@/lib/utils/calculateCourseRating";

export async function fetchAllCoursesRating(
  instructorId: string,
  month: number,
  year: number
) {
  return await calculateAllCoursesRating(instructorId, month, year);
}

export async function fetchCourseRating(
  courseId: string,
  month: number,
  year: number
) {
  return await calculateCourseRating(courseId, month, year);
}
