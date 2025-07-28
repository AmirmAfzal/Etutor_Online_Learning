import React from "react";

import TeacherCard from "@/components/Student/TeacherCard";

import Search from "@/components/Student/Search";
import TeacherSelect from "@/components/TeacherSelect";

// Fake data for demonstration
const fakeTeachers = [
  {
    name: "Wade Warren",
    title: "Frontend Developer",
    image: "/images/student-dashboard/Teacher-profile-1.jpg",
    rating: 4.8,
    students: 230984,
  },
  {
    name: "Bessie Cooper",
    title: "JavaScript Instructor",
    image: "/images/student-dashboard/Teacher-profile-2.jpg",
    rating: 4.7,
    students: 271488,
  },
  {
    name: "Floyd Miles",
    title: "Python Instructor",
    image: "/images/student-dashboard/Teacher-profile-3.jpg",
    rating: 4.9,
    students: 198234,
  },
  {
    name: "Ronald Richards",
    title: "Math Instructor",
    image: "/images/student-dashboard/Teacher-profile-4.jpg",
    rating: 4.6,
    students: 139876,
  },
  // ... add more teachers as needed
];

const TeachersPage = ({
  searchParams,
}: {
  searchParams: { query?: string };
}) => {
  const query = searchParams.query?.toLowerCase();
  const filteredTeachers = query
    ? fakeTeachers.filter(
        (teacher) =>
          teacher.name.toLowerCase().includes(query) ||
          teacher.title.toLowerCase().includes(query)
      )
    : fakeTeachers;

  return (
    <>
      <div className="mb-6 flex flex-col gap-4">
        {/* title */}
        <div className="text-base-content/80 mb-4 text-xl font-semibold">
          Instructors
          <span className="text-base-content/80">{`(${filteredTeachers.length})`}</span>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-1 items-center gap-2">
            <Search action="/student/teachers" />
          </div>
          <TeacherSelect />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredTeachers.map((teacher, i) => (
          <TeacherCard key={i} {...teacher} />
        ))}
      </div>
    </>
  );
};

export default TeachersPage;
