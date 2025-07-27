import React from "react";
import { Icon } from "@iconify/react";
import Form from "next/form";

import TeacherCard from "@/components/Student/TeacherCard";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { redirect } from "next/navigation";

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

async function searchCourses(formData: FormData) {
  "use server";

  // Get the search query from form data
  const query = formData.get("query")?.toString() || "";

  if (query) {
    redirect(`/student/teachers?query=${encodeURIComponent(query)}`);
  }
}

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
          {/* search */}
          <div className="flex flex-1 items-center gap-2">
            {/* TODO: check the form */}
            <Form
              className="flex w-full max-w-md flex-col items-start gap-2"
              action={searchCourses}
            >
              <label htmlFor="search" className="text-base-content/60 text-xs">
                Search:
              </label>
              <div className="border-base-content/10 bg-base-100 focus-within:border-primary focus-within:ring-primary/20 flex w-full items-center border p-1 focus-within:ring-1">
                <Icon
                  icon="ph:magnifying-glass-bold"
                  className="text-base-content/40 ml-3 text-xl"
                />
                <input
                  id="search"
                  name="query"
                  type="text"
                  placeholder="Search instructors..."
                  defaultValue={searchParams?.query || ""}
                  className="placeholder:text-base-content/40 w-full bg-transparent py-2 pr-4 pl-2 text-base focus:outline-none"
                />
              </div>
              <button type="submit" className="hidden" />
            </Form>
          </div>
          {/* TODO: این قسمت رو چطوری اکشنش رو اوکی کنم  */}
          <Form className="flex flex-1 flex-row gap-2" action="">
            <div className="flex flex-2 flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <label htmlFor="sort" className="text-base-content/60 text-xs">
                  Courses:
                </label>
              </div>
              <Select name="courses">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Courses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Courses</SelectItem>
                  <SelectItem value="1">1 Course</SelectItem>
                  <SelectItem value="2">2 Courses</SelectItem>
                  <SelectItem value="3">3 Courses</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <label htmlFor="sort" className="text-base-content/60 text-xs">
                  Sort by:
                </label>
              </div>
              <Select name="sort">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Latest">Latest</SelectItem>
                  <SelectItem value="Oldest">Oldest</SelectItem>
                  <SelectItem value="Most Students">Most Students</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <button type="submit" className="hidden" />
          </Form>
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
