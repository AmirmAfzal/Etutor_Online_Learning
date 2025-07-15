import React from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";

const mockCourses = [
  {
    title: "Reiki Level I, II and Master/Teacher Program",
    subtitle: "1. Introductions",
    image: "/images/course-1.jpg",
    progress: null,
    button: "Watch Lecture",
    status: null,
  },
  {
    title: "The Complete 2021 Web Development Bootcamp",
    subtitle: "167. What You'll Need to Get Started - Setup",
    image: "/images/course-2.jpg",
    progress: "61% Completed",
    button: "Watch Lecture",
    status: "text-success",
  },
  {
    title: "Copywriting - Become a Freelance Copywriter",
    subtitle: "1. How to get started with figma",
    image: "/images/course-3.jpg",
    progress: null,
    button: "Watch Lecture",
    status: null,
  },
  {
    title: "2021 Complete Python Bootcamp From Zero to Hero",
    subtitle: "9. Advanced CSS - Selector Priority",
    image: "/images/course-4.jpg",
    progress: "12% Finish",
    button: "Watch Lecture",
    status: "text-success",
  },
];

// Mock fetch for profile data
const mockProfiles = [
  {
    name: "Kevin Gilbert",
    job: "Web Designer & Best-Selling Instructor",
    image: "/images/profile-student.jpg",
  },
];

export default function StudentDashboard() {
  return (
    <section className="bg-base-200 flex min-h-screen w-full flex-col items-center">
      <div
        className="bg-primary/10 flex w-full justify-center"
        style={{ minHeight: 260 }}
      >
        <div className="w-full max-w-5xl">
          {/* Profile Card */}
          {mockProfiles.map((profile, idx) => (
            <div
              key={idx}
              className="bg-base-100 border-primary/20 relative mt-8 mb-0 flex flex-col items-center gap-4 border-2 p-4 sm:gap-6 sm:p-6 md:flex-row md:items-center"
            >
              <Image
                src={profile.image}
                alt="Profile"
                width={112}
                height={112}
                className="h-20 w-20 rounded-full object-cover sm:h-28 sm:w-28"
                style={{ width: "auto", height: "auto" }}
                priority={true}
              />
              <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
                <h2 className="text-base-content text-lg font-bold sm:text-2xl">
                  {profile.name}
                </h2>
                <p className="text-base-content/50 mt-2 text-xs sm:mt-4 sm:text-base">
                  {profile.job}
                </p>
              </div>
              <button className="btn btn-soft btn-primary mt-2 w-full gap-2 font-bold md:static md:top-6 md:right-6 md:mt-0 md:ml-auto md:w-auto">
                Become Instructor
                <Icon
                  icon="solar:arrow-right-outline"
                  className="text-xl sm:text-2xl"
                />
              </button>
            </div>
          ))}
          {/* Tabs (Static) */}
          <div className="bg-base-100 border-primary/20 mb-0 flex justify-between overflow-x-auto border-2 border-t-0 px-6 py-2">
            {[
              "Dashboard",
              "Courses",
              "Teachers",
              "Message",
              "Wishlist",
              "Purchase History",
              "Settings",
            ].map((tab, idx) => (
              <div
                key={tab}
                className={`cursor-pointer px-4 py-2 font-medium ${idx === 0 ? "border-primary text-base-content/80 border-b-3 font-bold" : "text-base-content/50"}`}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Main white content */}
      <div className="bg-base-100 flex w-full justify-center pb-16">
        <div className="mt-10 w-full max-w-5xl">
          {/* Dashboard Stats */}
          <div className="flex w-full flex-col items-start">
            <h3 className="text-base-content/80 mt-2 mb-2 text-lg font-medium sm:mt-0 sm:mb-4 sm:text-2xl">
              Dashboard
            </h3>
            <div className="mt-8 mb-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div className="bg-primary/10 flex flex-row items-start gap-4 p-4 sm:p-6">
                <div className="bg-base-100 flex items-center gap-2 p-2">
                  <Icon
                    icon="icon-park-twotone:play"
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
                    icon="fontisto:checkbox-active"
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
                    icon="solar:cup-bold-duotone"
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
                    icon="solar:cup-bold-duotone"
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
          {/* Courses List */}
          <h3 className="text-base-content mb-4 text-lg font-semibold">
            Let’s start learning, Kevin
            {/* TODO: Add right && left arrow for pagination */}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {mockCourses.map((course, idx) => (
              <div
                key={idx}
                className="bg-base-100 border-base-content/20 flex h-full min-w-[220px] flex-col border-1 shadow-sm transition-all duration-200 hover:shadow-lg sm:min-w-0"
              >
                <Image
                  src={course.image}
                  alt={course.title}
                  width={400}
                  height={160}
                  className="mb-2 h-32 w-full object-cover sm:mb-3 sm:h-36 md:h-40"
                  style={{ width: "100%", height: "auto" }}
                  priority={idx === 0}
                />
                <div className="flex-1 p-2 sm:p-3 md:p-4">
                  <div className="text-base-content/50 mb-1 truncate text-xs font-medium sm:text-sm">
                    {course.title}
                  </div>
                  <div className="text-base-content/70 mb-2 truncate text-xs font-semibold sm:text-xs">
                    {course.subtitle}
                  </div>
                </div>
                <div className="border-base-content/20 mt-auto border-t-1 p-2 sm:p-3 md:p-4">
                  {course.progress ? (
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <button className="btn btn-soft btn-primary btn-xs w-full sm:w-auto">
                        {course.button}
                      </button>
                      <span
                        className={`text-[10px] font-semibold sm:text-xs ${course.status || ""}`}
                      >
                        {course.progress}
                      </span>
                    </div>
                  ) : (
                    <button className="btn btn-soft btn-primary btn-xs w-full">
                      {course.button}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
