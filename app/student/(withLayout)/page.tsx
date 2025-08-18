import React from "react";
import { Icon } from "@iconify/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import CourseCard from "@/components/Student/CourseCardStudent";
import { authOptions } from "@/lib/auth/authOptions";
import { connectDB } from "@/lib/db/db";
import studentModel from "@/lib/db/models/studentModel";

interface CourseData {
  title: string;
  subtitle: string;
  image: string;
  thumbnail?: string;
  progress?: string;
}

interface Student {
  user: string;
  _id: string;
  firstname: string;
  courses: CourseData[];
}

const StudentDashboard = async () => {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return redirect("/auth/signin");
  }
  const student = await studentModel
    .findOne({ user: session.user.id })
    .populate<{ courses: CourseData[] }>("courses")
    .lean<Student | null>();
  if (!student) {
    return redirect("/auth/signin");
  }

  const foundCourses: CourseData[] = student.courses || [];
  const courses: CourseData[] = foundCourses.map((course) => ({
    title: course.title,
    subtitle: course.subtitle,
    image: course.thumbnail || "/images/course-images-01.png",
    progress: course.progress || "0%",
  }));

  return (
    <>
      <div className="flex w-full flex-col items-start">
        <h3 className="text-base-content/80 mt-2 mb-2 text-lg font-medium sm:mt-0 sm:mb-4 sm:text-2xl">
          Dashboard
        </h3>
        {/* TODO : connect to db */}
        <div className="mt-8 mb-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div className="bg-primary/10 flex flex-row items-start gap-4 p-2 sm:p-6">
            <div className="bg-base-100 flex items-center gap-2 p-2">
              <Icon
                icon="ph:play-circle-fill"
                className="text-primary text-4xl md:text-5xl"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-base-content/80 text-xl font-medium md:text-2xl">
                957
              </span>
              <span className="text-base-content/60 text-xs text-nowrap md:text-sm">
                Enrolled Courses
              </span>
            </div>
          </div>
          <div className="bg-secondary/10 flex flex-row items-start gap-4 p-4 sm:p-6">
            <div className="bg-base-100 flex items-center gap-2 p-2">
              <Icon
                icon="ph:check-square-offset-duotone"
                className="text-secondary text-4xl md:text-5xl"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-base-content/80 text-xl font-medium md:text-2xl">
                6
              </span>
              <span className="text-base-content/60 text-xs text-nowrap md:text-sm">
                Active Courses
              </span>
            </div>
          </div>
          <div className="bg-success/10 flex flex-row items-start gap-4 p-4 sm:p-6">
            <div className="bg-base-100 flex items-center gap-2 p-2">
              <Icon
                icon="ph:trophy-duotone"
                className="text-success text-4xl md:text-5xl"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-base-content/80 text-xl font-medium md:text-2xl">
                951
              </span>
              <span className="text-base-content/60 text-xs text-nowrap md:text-sm">
                Completed Courses
              </span>
            </div>
          </div>
          <div className="bg-primary/10 flex flex-row items-start gap-4 p-4 sm:p-6">
            <div className="bg-base-100 flex items-center gap-2 p-2">
              <Icon
                icon="ph:users-duotone"
                className="text-primary text-4xl md:text-5xl"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-base-content/80 text-xl font-medium md:text-2xl">
                241
              </span>
              <span className="text-base-content/60 text-xs text-nowrap md:text-sm">
                Course Instructors
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4 flex flex-row items-center justify-between">
        <h3 className="text-base-content text-lg font-semibold">
          Let’s start learning, {student.firstname}
        </h3>
        <div className="flex flex-row items-center gap-2">
          <Icon
            icon="ph:arrow-left-light"
            className="text-primary bg-primary/10 p-2 text-4xl transition-all duration-300 hover:translate-y-[-2px] hover:cursor-pointer"
          />
          <Icon
            icon="ph:arrow-right-light"
            className="text-primary bg-primary/10 p-2 text-4xl transition-all duration-300 hover:translate-y-[-2px] hover:cursor-pointer"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {courses.map((course, i) => (
          <CourseCard
            key={i}
            title={course.title}
            subtitle={course.subtitle}
            image={course.image}
            progress={course.progress}
          />
        ))}
      </div>
    </>
  );
};

export default StudentDashboard;
