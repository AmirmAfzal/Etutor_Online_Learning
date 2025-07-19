import React from "react";
import { Icon } from "@iconify/react";

import TeacherCard from "@/components/TeacherCard";
import { Select, SelectItem } from "@/components/ui/select";

// Fake data for demonstration
const fakeTeachers = [
  {
    name: "Wade Warren",
    title: "Frontend Developer",
    image: "/images/Teacher-profile-1.jpg",
    rating: 4.8,
    students: 230984,
  },
  {
    name: "Bessie Cooper",
    title: "JavaScript Instructor",
    image: "/images/Teacher-profile-2.jpg",
    rating: 4.7,
    students: 271488,
  },
  {
    name: "Floyd Miles",
    title: "Python Instructor",
    image: "/images/Teacher-profile-3.jpg",
    rating: 4.9,
    students: 198234,
  },
  {
    name: "Ronald Richards",
    title: "Math Instructor",
    image: "/images/Teacher-profile-4.jpg",
    rating: 4.6,
    students: 139876,
  },
  // ... add more teachers as needed
];

export default function TeachersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search =
    typeof searchParams?.search === "string" ? searchParams.search : "";
  const sort =
    typeof searchParams?.sort === "string" ? searchParams.sort : "Latest";
  const courses =
    typeof searchParams?.courses === "string" ? searchParams.courses : "All";

  // Filter logic
  let filteredTeachers = fakeTeachers.filter((teacher) => {
    const matchesSearch =
      !search ||
      teacher.name.toLowerCase().includes(search.toLowerCase()) ||
      teacher.title.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  // Sort logic
  if (sort === "Latest") {
    filteredTeachers = filteredTeachers.slice().reverse();
  } else if (sort === "Oldest") {
    // do nothing, keep original order
  } else if (sort === "Most Students") {
    filteredTeachers = filteredTeachers
      .slice()
      .sort((a, b) => b.students - a.students);
  }

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
            <form
              className="flex w-full max-w-md flex-col items-start gap-2"
              method="GET"
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
                  name="search"
                  type="text"
                  placeholder="Search instructors..."
                  defaultValue={search}
                  className="placeholder:text-base-content/40 w-full bg-transparent py-2 pr-4 pl-2 text-base focus:outline-none"
                />
              </div>
              <button type="submit" className="hidden" />
            </form>
          </div>
          {/* filter */}
          <form className="flex flex-1 flex-row gap-2" method="GET">
            {/* sorted by */}
            <div className="flex flex-2 flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <label htmlFor="sort" className="text-base-content/60 text-xs">
                  Courses:
                </label>
              </div>
              <Select name="courses" defaultValue={courses}>
                <SelectItem value="All">All Courses</SelectItem>
                <SelectItem value="1">1 Course</SelectItem>
                <SelectItem value="2">2 Courses</SelectItem>
                <SelectItem value="3">3 Courses</SelectItem>
              </Select>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <label htmlFor="sort" className="text-base-content/60 text-xs">
                  Sort by:
                </label>
              </div>
              <Select name="sort" defaultValue={sort}>
                <SelectItem value="Latest">Latest</SelectItem>
                <SelectItem value="Oldest">Oldest</SelectItem>
                <SelectItem value="Most Students">Most Students</SelectItem>
              </Select>
            </div>
            <button type="submit" className="hidden" />
          </form>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredTeachers.map((teacher, idx) => (
          <TeacherCard key={idx} {...teacher} />
        ))}
      </div>
    </>
  );
}
