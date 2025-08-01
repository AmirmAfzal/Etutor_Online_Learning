import React from "react";
import CourseCard from "@/components/Student/CourseCardStudent";
import Search from "@/components/Student/Search";
import CoursesSelect from "@/components/Student/CoursesSelect";
import { authOptions } from "@/lib/auth/authOptions";
import { connectDB } from "@/lib/db/db";
import studentModel from "@/lib/db/models/studentModel";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface CourseData {
  _id: string;
  title: string;
  subtitle: string;
  image: string;
  progress: string;
  status: string;
  teacher: string;
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

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return redirect("/auth/signin");

  const student = await studentModel
    .findOne({ user: session.user.id })
    .populate<{ courses: CourseData[] }>("courses")
    .lean<Student | null>();
  if (!student) return redirect("/auth/signin");

  const courses: CourseData[] = student.courses || [];

  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.query?.toLowerCase();
  const filteredCourses = query
    ? courses.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.subtitle.toLowerCase().includes(query)
      )
    : courses;

  return (
    <>
      <div className="mb-6 flex flex-col gap-4">
        <div className="text-base-content/80 mb-4 text-xl font-semibold">
          Courses
          <span className="text-base-content/80">{`(${filteredCourses.length})`}</span>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-1 items-center gap-2">
            <Search action="/student/courses" />
          </div>
          <CoursesSelect />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredCourses.map((course) => (
          <CourseCard key={course._id} {...course} />
        ))}
      </div>
    </>
  );
};

export default StudentCoursesPage;
