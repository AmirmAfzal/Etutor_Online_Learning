"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/Pagination";
import CourseCard from "@/components/CourseCardStudent";

const fakeCourses = [
  {
    title: "Web Design Course",
    subtitle: "31. Learn More About Web Design",
    image: "/images/course-1.jpg",
    progress: "26% Completed",
    status: "text-success",
  },
  {
    title: "SQL Beginner Course",
    subtitle: "105. Special Features Challenge",
    image: "/images/course-2.jpg",
    progress: "22% Completed",
    status: "text-success",
  },
  {
    title: "Advanced CSS Training",
    subtitle: "54. CSS Static and Relative Positioning",
    image: "/images/course-3.jpg",
    progress: "52% Completed",
    status: "text-success",
  },
  {
    title: "Intro to Machine Learning",
    subtitle: "651. CSS Property Challenge Solution",
    image: "/images/course-4.jpg",
    progress: "13% Completed",
    status: "text-success",
  },
  {
    title: "Intro to Machine Learning",
    subtitle: "651. CSS Property Challenge Solution",
    image: "/images/course-4.jpg",
    progress: "0% Completed",
    status: "text-success",
  },
  {
    title: "Intro to Machine Learning",
    subtitle: "651. CSS Property Challenge Solution",
    image: "/images/course-4.jpg",
    progress: "0% Completed",
    status: "text-success",
  },
];
// FIXME: convert this component to server side component and use searchParams to filter the results
export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Latest");
  const [status, setStatus] = useState("All Courses");
  const [teacher, setTeacher] = useState("All Teachers");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 20;

  // Pagination logic
  const totalPages = Math.ceil(fakeCourses.length / coursesPerPage);
  const paginatedCourses = fakeCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  return (
    <>
      <div className="mb-6 flex flex-col gap-4">
        {/* title */}
        <div className="text-base-content/80 mb-4 text-xl font-semibold">
          Courses
          <span className="text-base-content/80">{`(${fakeCourses.length})`}</span>
        </div>
        <div className="flex flex-row gap-2">
          {/* search */}
          <div className="flex flex-1 items-center gap-2">
            <form className="flex w-full max-w-md flex-col items-start gap-2">
              <label htmlFor="search" className="text-base-content/60 text-xs">
                Search:
              </label>
              <div className="relative w-full">
                <span className="text-base-content/60 absolute top-1/2 left-3 -translate-y-1/2 text-xl">
                  {/* <Icon icon="solar:magnifer-linear" /> */}
                </span>
                <Input
                  type="text"
                  placeholder="Search in your courses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-base-100 border-base-content/10 focus:border-primary focus:ring-primary/20 placeholder:text-base-content/40 w-full border py-2 pr-4 pl-10 text-base transition-all focus:ring-0"
                />
              </div>
            </form>
          </div>
          {/* filter */}
          <div className="flex flex-row gap-2">
            {/* sorted by */}
            <div className="flex flex-col gap-2">
              {/* FIXME: use shadcn selects insted of defualt selections */}
              <div className="flex flex-row items-center gap-2">
                <label htmlFor="sort" className="text-base-content/60 text-xs">
                  Sorted by:
                </label>
              </div>
              <select
                className="select border-base-content/10 focus:border-primary focus:ring-primary/20 text-base-content/60 w-full min-w-[180px] border-1 px-4 py-2 text-base transition-all focus:ring-0"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option className="text-base-content/60">Latest</option>
                <option className="text-base-content/60">Oldest</option>
                <option className="text-base-content/60">Most Viewed</option>
              </select>
            </div>
            {/* status */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <label
                  htmlFor="status"
                  className="text-base-content/60 text-xs"
                >
                  Status:
                </label>
              </div>
              <select
                className="select border-base-content/10 focus:border-primary focus:ring-primary/20 text-base-content/60 w-full min-w-[180px] border-1 px-4 py-2 text-base transition-all focus:ring-0"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option className="text-base-content/60">All Courses</option>
                <option className="text-base-content/60">Ongoing</option>
                <option className="text-base-content/60">Completed</option>
              </select>
            </div>
            {/* teacher */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <label
                  htmlFor="teacher"
                  className="text-base-content/60 text-xs"
                >
                  Teacher:
                </label>
              </div>
              <select
                className="select border-base-content/10 focus:border-primary focus:ring-primary/20 text-base-content/60 w-full min-w-[180px] border-1 px-4 py-2 text-base transition-all focus:ring-0"
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
              >
                <option className="text-base-content/60">All Teachers</option>
                <option className="text-base-content/60">Mr. Ahmadi</option>
                <option className="text-base-content/60">Mr. Rezaei</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* FIXME: change idx to index everywhere */}
        {paginatedCourses.map((course, idx) => (
          <CourseCard
            key={idx + (currentPage - 1) * coursesPerPage}
            {...course}
          />
        ))}
      </div>
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
