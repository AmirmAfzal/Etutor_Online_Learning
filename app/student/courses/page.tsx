import React from "react";

import CourseCard from "@/components/Student/CourseCardStudent";

import Search from "@/components/Student/Search";
import CoursesSelect from "@/components/Student/CoursesSelect";

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
            <Search action="/student/courses" />
          </div>
          <CoursesSelect />
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
