"use server";

import instructorModel from "@/lib/db/models/instructorModel";
import { ActionData } from "@/lib/formTypes";

export type Instructor = {
  id: number;
  profile: string;
  name: string;
  skill: string;
};

export async function findInstructor(
  prevState: ActionData,
  formData: string
): Promise<{
  message: string;
  errors: string[];
  data: Instructor[];
}> {
  const search = formData.trim().toLowerCase();

  if (search.length === 0) {
    return {
      message: "ERROR",
      errors: ["Search term is empty."],
      data: [],
    };
  }

  const foundInstructors = await instructorModel.find().lean();
  const instructors: Instructor[] = foundInstructors.map((instructor, index) => ({
    id: index + 1,
    profile: instructor.avatar,
    name: `${instructor.firstname} ${instructor.lastname}`,
    skill: instructor.title,
  }));

  const matched = instructors.filter((instructor) =>
    instructor.name.toLowerCase().includes(search)
  );

  return {
    message: "SUCCESS",
    errors: [],
    data: matched,
  };
}
