import React from "react";
import { Icon } from "@iconify/react";

import CourseCard from "@/components/Student/CourseCardStudent";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { redirect } from "next/navigation";
import Form from "next/form";

// Fake data for demonstration
const fakeCourses = [
  {
    title: "Web Design Course",
    subtitle: "31. Learn More About Web Design",
    image: "/images/student-dashboard/course-1.jpg",
    progress: "26% Completed",
    status: "Ongoing",
    teacher: "Mr. Ahmadi",
  },
  {
    title: "SQL Beginner Course",
    subtitle: "105. Special Features Challenge",
    image: "/images/student-dashboard/course-2.jpg",
    progress: "22% Completed",
    status: "Ongoing",
    teacher: "Mr. Rezaei",
  },
  {
    title: "Advanced CSS Training",
    subtitle: "54. CSS Static and Relative Positioning",
    image: "/images/student-dashboard/course-3.jpg",
    progress: "52% Completed",
    status: "Completed",
    teacher: "Mr. Ahmadi",
  },
  {
    title: "Intro to Machine Learning",
    subtitle: "651. CSS Property Challenge Solution",
    image: "/images/student-dashboard/course-4.jpg",
    progress: "13% Completed",
    status: "Ongoing",
    teacher: "Mr. Rezaei",
  },
  {
    title: "Intro to Machine Learning",
    subtitle: "651. CSS Property Challenge Solution",
    image: "/images/student-dashboard/course-4.jpg",
    progress: "0% Completed",
    status: "Completed",
    teacher: "Mr. Ahmadi",
  },
  {
    title: "Intro to Machine Learning",
    subtitle: "651. CSS Property Challenge Solution",
    image: "/images/student-dashboard/course-4.jpg",
    progress: "0% Completed",
    status: "Ongoing",
    teacher: "Mr. Rezaei",
  },
];

const CoursesPage = async ({
  searchParams,
}: {
  searchParams: { query?: string };
}) => {
  // FIXME: چرا سرچم درست کار نمیکنه ؟ نفهمیدم من
  const query = await searchParams.query?.toLowerCase();
  const filteredCourses = query
    ? fakeCourses.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.subtitle.toLowerCase().includes(query)
      )
    : fakeCourses;

  return (
    <>
      <div className="mb-6 flex flex-col gap-4">
        <div className="text-base-content/80 mb-4 text-xl font-semibold">
          Courses
          <span className="text-base-content/80">{`(${filteredCourses.length})`}</span>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-1 items-center gap-2">
            <Form
              className="flex w-full max-w-md flex-col items-start gap-2"
              action={"/student/courses"}
            >
              <label htmlFor="search" className="text-base-content/60 text-xs">
                Search:
              </label>
              <div className="border-base-content/10 bg-base-100 focus-within:border-primary focus-within:ring-primary/20 flex w-full items-center border p-1 focus-within:ring-1">
                <button type="submit">
                  <Icon
                    icon="ph:magnifying-glass-bold"
                    className="text-base-content/40 ml-3 text-xl"
                  />
                </button>
                <input
                  id="search"
                  name="query"
                  type="text"
                  placeholder="Search in your courses..."
                  defaultValue={searchParams.query || ""}
                  className="placeholder:text-base-content/40 w-full bg-transparent py-2 pr-4 pl-2 text-base focus:ring-0 focus:outline-none"
                />
              </div>
            </Form>
          </div>
          <form className="flex flex-row gap-2" method="GET">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <label htmlFor="sort" className="text-base-content/60 text-xs">
                  Sorted by:
                </label>
              </div>
              <Select name="sort">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sorted by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Latest">Latest</SelectItem>
                  <SelectItem value="Oldest">Oldest</SelectItem>
                  <SelectItem value="Most Viewed">Most Viewed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <label
                  htmlFor="status"
                  className="text-base-content/60 text-xs"
                >
                  Status:
                </label>
              </div>
              <Select name="status">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Courses">All Courses</SelectItem>
                  <SelectItem value="Ongoing">Ongoing</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <label
                  htmlFor="teacher"
                  className="text-base-content/60 text-xs"
                >
                  Teacher:
                </label>
              </div>
              <Select name="teacher">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Teacher" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Teachers">All Teachers</SelectItem>
                  <SelectItem value="Mr. Ahmadi">Mr. Ahmadi</SelectItem>
                  <SelectItem value="Mr. Rezaei">Mr. Rezaei</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <button type="submit" className="hidden" />
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredCourses.map((course, i) => (
          <CourseCard key={i} {...course} />
        ))}
      </div>
      {/* Pagination (optional, SSR-ready) */}
      {/* <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          /> */}
    </>
  );
};

export default CoursesPage;
