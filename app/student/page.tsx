import { Icon } from "@iconify/react";

import CourseCard from "@/components/CourseCardStudent";

const mockCoursesData = [
  {
    title: "Reiki Level I, II and Master/Teacher Program",
    subtitle: "1. Introductions",
    image: "/images/course-1.jpg",
    progress: null,
  },
  {
    title: "The Complete 2021 Web Development Bootcamp",
    subtitle: "167. What You'll Need to Get Started - Setup",
    image: "/images/course-2.jpg",
    progress: "61% Completed",
  },
  {
    title: "Copywriting - Become a Freelance Copywriter",
    subtitle: "1. How to get started with figma",
    image: "/images/course-3.jpg",
    progress: null,
  },
  {
    title: "2021 Complete Python Bootcamp From Zero to Hero",
    subtitle: "9. Advanced CSS - Selector Priority",
    image: "/images/course-4.jpg",
    progress: "12% Finish",
  },
];

export default function StudentDashboard() {
  const mockCourses = mockCoursesData;

  return (
    <>
      {/* Dashboard Stats */}
      <div className="flex w-full flex-col items-start">
        <h3 className="text-base-content/80 mt-2 mb-2 text-lg font-medium sm:mt-0 sm:mb-4 sm:text-2xl">
          Dashboard
        </h3>
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
      {/* Courses List */}
      <div className="mb-4 flex flex-row items-center justify-between">
        <h3 className="text-base-content text-lg font-semibold">
          Let’s start learning, Kevin
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
        {mockCourses.map((course, idx) => (
          <CourseCard
            key={idx}
            title={course.title}
            subtitle={course.subtitle}
            image={course.image}
            progress={course.progress}
            priority={idx === 0}
          />
        ))}
      </div>
    </>
  );
}
