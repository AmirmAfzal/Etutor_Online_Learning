import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import CourseCard from "@/components/Student/CourseCardStudent";
import Search from "@/components/Student/Search";
import CoursesSelect from "@/components/Student/CoursesSelect";
import { authOptions } from "@/lib/auth/authOptions";
import { connectDB } from "@/lib/db/db";
import studentModel from "@/lib/db/models/studentModel";

interface CourseData {
  _id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  progress?: string;
  status?: string;
  author: string[];
}

interface Student {
  _id: string;
  user: string;
  courses: CourseData[];
}

interface Props {
  searchParams: Promise<{ query?: string }>;
}

const StudentCoursesPage = async ({ searchParams }: Props) => {
  await connectDB();
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.query?.toLowerCase();

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return redirect("/auth/signin");
  }

  const student = await studentModel
    .findOne({ user: session.user.id })
    .populate<{ courses: CourseData[] }>({
      path: "courses",
      match: query
        ? {
            $or: [
              { title: { $regex: query, $options: "i" } },
              { subtitle: { $regex: query, $options: "i" } },
            ],
          }
        : {},
    })
    .lean<Student | null>();

  if (!student) {
    return redirect("/auth/signin");
  }

  const courses: CourseData[] = student.courses || [];

  const mappedCourses = courses.map((course) => ({
    id: course._id,
    name: course.title,
    subtitle: course.subtitle,
    image: course.thumbnail,
    progress: course.progress || "0%",
    status: course.status || "Not Started",
  }));

  return (
    <>
      <div className="mb-6 space-y-4">
        <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base-content text-lg font-semibold sm:text-xl">
              Courses
            </h2>
            <span className="text-base-content/60 text-sm sm:text-base">
              ({mappedCourses.length})
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-1">
            <Search action="/student/courses" />
          </div>
          <CoursesSelect />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {mappedCourses.map((course) => (
          <CourseCard
            key={course.id}
            title={course.name}
            subtitle={course.subtitle}
            image={course.image}
            progress={course.progress}
          />
        ))}
      </div>
    </>
  );
};

export default StudentCoursesPage;
