import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import TeacherCard from "@/components/Student/TeacherCard";
import Search from "@/components/Student/Search";
import TeacherSelect from "@/components/TeacherSelect";
import { connectDB } from "@/lib/db/db";
import { CourseInterface } from "@/lib/db/models/courseModel";
import studentModel from "@/lib/db/models/studentModel";
import { authOptions } from "@/lib/auth/authOptions";

interface InstructorData {
  name: string;
  title: string;
  image: string;
  rating: number;
  students: number;
}

interface Instructor {
  _id: string;
  firstname: string;
  lastname: string;
  bio?: string;
  avatar?: string;
  rating: number;
  students: number;
}

interface Props {
  searchParams: Promise<{ query?: string }>;
}

const TeachersPage = async (props: Props) => {
  await connectDB();

  const searchParams = await props.searchParams;
  const query = searchParams.query?.toLowerCase();

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return redirect("/auth/signin");
  }

  const student = await studentModel
    .findOne({ user: session.user.id })
    .populate({
      path: "courses",
      populate: {
        path: "authors",
        select: "firstname lastname avatar username bio rating students",
      },
    });

  if (!student) {
    return redirect("/auth/signin");
  }

  // Extract all instructors from all courses and flatten the array
  const allInstructors = student.courses.flatMap(
    (course: CourseInterface) => course.authors
  );

  // Remove duplicates based on instructor ID
  const uniqueInstructors = allInstructors.filter(
    (instructor: Instructor, index: number, self: Instructor[]) =>
      index ===
      self.findIndex(
        (i: Instructor) => i._id.toString() === instructor._id.toString()
      )
  );

  const instructorData: InstructorData[] = uniqueInstructors.map(
    (instructor: Instructor) => ({
      name: `${instructor.firstname} ${instructor.lastname}`,
      title: instructor.bio || "Instructor",
      image:
        instructor.avatar || "",
      rating: instructor.rating,
      students: instructor.students,
    })
  );
  console.log(instructorData);

  // FIXME filter on db
  const filteredTeachers = query
    ? instructorData.filter(
        (teacher) =>
          teacher.name.toLowerCase().includes(query) ||
          teacher.title.toLowerCase().includes(query)
      )
    : instructorData;

  return (
    <>
      <div className="mb-6 flex flex-col gap-4">
        <div className="text-base-content/80 mb-4 text-xl font-semibold">
          Instructors
          <span className="text-base-content/80">
            {`(${filteredTeachers.length})`}
          </span>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-2">
            <Search action="/student/teachers" />
          </div>
          <div className="w-full sm:w-auto">
            <TeacherSelect />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {filteredTeachers.map((teacher, i) => (
          <TeacherCard key={i} {...teacher} />
        ))}
      </div>
    </>
  );
};

export default TeachersPage;
