import React from "react";
import { Icon } from "@iconify/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import CourseCard from "@/components/Student/CourseCardStudent";
import { authOptions } from "@/lib/auth/authOptions";
import { connectDB } from "@/lib/db/db";
import studentModel from "@/lib/db/models/studentModel";
import sectionModel from "@/lib/db/models/sectionModel";
import courseProgressModel from "@/lib/db/models/courseProgressModel";

interface CourseData {
  _id: string;
  title: string;
  subtitle: string;
  thumbnail?: string;
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

  const enrolledCourses = student.courses || [];

  const coursesWithProgress = await Promise.all(
    enrolledCourses.map(async (course) => {
      const sections = await sectionModel.find({
        course: course._id,
      });

      const lectureIds = sections.flatMap((section) => section.lectures);

      const totalLectures = lectureIds.length;

      console.log(`Processing course: ${course.title} (ID: ${course._id})`);
      console.log(`Total lectures for this course: ${totalLectures}`);

      const completedLectures = await courseProgressModel.countDocuments({
        lecture: { $in: lectureIds },
        user: session.user.id,
        completed: true,
      });

      console.log(`Completed lectures for this course: ${completedLectures}`);

      const progress =
        totalLectures > 0
          ? Math.round((completedLectures / totalLectures) * 100)
          : 0;

      console.log(`Calculated progress: ${progress}%`);

      return {
        id: course._id,
        title: course.title,
        subtitle: course.subtitle,
        image: course.thumbnail || "/images/course-images-01.png",
        progress: `${progress}%`,
      };
    })
  );

  const stats = [
    {
      label: "Enrolled Courses",
      value: enrolledCourses.length.toString(),
      icon: "ph:play-circle-fill",
      color: "primary",
    },
    {
      label: "Active Courses",
      value: "6",
      icon: "ph:check-square-offset-duotone",
      color: "secondary",
    },
    {
      label: "Completed Courses",
      value: "951",
      icon: "ph:trophy-duotone",
      color: "success",
    },
    {
      label: "Course Instructors",
      value: "241",
      icon: "ph:users-duotone",
      color: "primary",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-base-content/80 text-lg font-medium sm:text-2xl">
        Dashboard
      </h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-${stat.color}/10 flex items-start gap-3 p-4 sm:p-5`}
          >
            <div className="bg-base-100 flex items-center justify-center p-2">
              <Icon
                icon={stat.icon}
                className={`text-${stat.color} text-3xl sm:text-4xl md:text-5xl`}
              />
            </div>
            <div>
              <span className="text-base-content/80 text-md font-medium sm:text-xl md:text-2xl md:font-semibold">
                {stat.value}
              </span>
              <p className="text-base-content/60 text-xs sm:text-sm">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-base-content text-lg font-semibold">
          Let’s start learning, {student.firstname}
        </h3>
        <div className="flex gap-2">
          {["ph:arrow-left-light", "ph:arrow-right-light"].map((icon, i) => (
            <Icon
              key={i}
              icon={icon}
              className="text-primary bg-primary/10 cursor-pointer p-2 text-3xl transition-all duration-300 hover:-translate-y-0.5 sm:text-4xl"
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {coursesWithProgress.map((course, i) => (
          <CourseCard key={i} {...course} />
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
