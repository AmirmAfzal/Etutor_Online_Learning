"use server";

import { ActionData } from "@/lib/formTypes";

export type Instructor = {
  id: number;
  profile: string;
  name: string;
  skill: string;
};

const instructors: Instructor[] = [
  {
    id: 1,
    profile: "/images/instructors/instructor-1.png",
    name: "John Doe",
    skill: "UI/UX Designer",
  },
  {
    id: 2,
    profile: "/images/instructors/instructor-2.png",
    name: "John Doer",
    skill: "Front-End Developer",
  },
  {
    id: 3,
    profile: "/images/instructors/instructor-3.png",
    name: "John Does",
    skill: "UI/UX Designer",
  },
  {
    id: 4,
    profile: "/images/instructors/instructor-4.png",
    name: "Jane Smith",
    skill: "Back-End Developer",
  },
];

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

  const matched = instructors.filter((instructor) =>
    instructor.name.toLowerCase().includes(search)
  );

  return {
    message: "SUCCESS",
    errors: [],
    data: matched,
  };
}
