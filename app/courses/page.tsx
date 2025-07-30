// TODO: single course updated => merge to this branch
// TODO: fix type script erorrs

import Icon from "@/components/ui/Icon";

import React from "react";
import CourseCard from "@/components/CourseCard";
import CoursesSearch from "@/components/Courses/CoursesSearch";
import CoursesSelect from "@/components/Courses/CoursesSelect";
import CourseFilter from "@/components/Courses/CourseFilter";
import { connectDB } from "@/lib/db/db";
import courseModel from "@/lib/db/models/courseModel";

// fake data for filtered courses
const categories = [
  {
    name: "Development",
    icon: "ph:cpu",
    subcategories: {
      "Web Development": 574,
      "Mobile Development": 1345,
      "Software Testing": 317,
      "Software Engineering": 31,
      "Software Development Tools": 58,
      "No-Code Development": 37,
    },
  },
  {
    name: "Business",
    icon: "ph:handshake",
    subcategories: { "Finance & Accounting": 0 },
  },
  {
    name: "IT & Software",
    icon: "ph:chart-bar-horizontal",
    subcategories: { "": 0 },
  },
  {
    name: "Office Productivity",
    icon: "ph:bug-droid",
    subcategories: { "": 0 },
  },
  {
    name: "Personal Development",
    icon: "ph:receipt",
    subcategories: { "": 0 },
  },
  { name: "Design", icon: "ph:pen-nib", subcategories: { "": 0 } },
  { name: "Marketing", icon: "ph:megaphone", subcategories: { "": 0 } },
  { name: "Lifestyle", icon: "ph:package", subcategories: { "": 0 } },
  { name: "Photography & Video", icon: "ph:camera", subcategories: { "": 0 } },
  { name: "Music", icon: "ph:headset", subcategories: { "": 0 } },
  {
    name: "Health & Fitness",
    icon: "ph:first-aid-kit",
    subcategories: { "": 0 },
  },
];

const tools = {
  "HTML 5": 1234,
  "GOLANG ": 1234,
  "CSS 3": 1234,
  "Node.js": 8454,
};

const price = {
  Paid: 12863,
  Free: 832,
};

const duration = {
  "6-12 Months": 1312,
  "3-6 Months": 42376,
  "1-3 Months": 12,
  "1-4 Weeks": 87423,
  "1-7 Days": 23746,
};
const courseLevel = {
  "All Level": 234234,
  Beginner: 2345,
  Intermediate: 124,
  Expert: 826,
};

const rating = [
  {
    label: "5 Star",
    count: 12345,
  },
  {
    label: "4 Star & up",
    count: 12345,
  },
  {
    label: "3 Star & up",
    count: 12345,
  },
  {
    label: "2 Star & up",
    count: 12345,
  },
  {
    label: "1 Star & up",
    count: 12345,
  },
];

const CoursesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; filter?: string }>;
}) => {
  await connectDB();
  const foundCourse = await courseModel.find().lean();

  const courses = foundCourse.map((course) => ({
    thumbnail: course.thumbnail,
    name: course.title,
    category: course.category[0]?.name || "Unknown",
    price: course.price,
    rating: 5, // TODO
    students: course.studentsCount,
  }));

  const isFiltered = searchParams.filter === "true";
  const query = searchParams.query?.toLowerCase();
  let filteredCourses = courses;
  if (query) {
    filteredCourses = filteredCourses.filter(
      (course) =>
        course.name.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query)
    );
  }

  return (
    <section className="container mx-auto mt-8 flex max-w-6xl flex-col items-center justify-center">
      <div className="border-base-300 flex w-full flex-col gap-4 border-b pb-2">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <a
              href={isFiltered ? "/courses" : "/courses?filter=true"}
              className="border-primary/20 bg-border-base-100 flex flex-row items-center gap-3 rounded-none border px-2 py-3"
            >
              <Icon icon="ph:faders-fill" className="text-xl" />
              <span className="text-sm">Filter</span>
              <span className="text-primary bg-primary/10 px-2">
                {isFiltered ? "3" : "0"}
              </span>
            </a>
            <CoursesSearch />
          </div>

          <CoursesSelect />
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2 text-xs">
            <span className="text-base-content/70">Suggestions :</span>
            <a href="" className="text-primary/80">
              user interface
            </a>
            <a href="" className="text-primary/80">
              user experience
            </a>
            <a href="" className="text-primary/80">
              web design
            </a>
            <a href="" className="text-primary/80">
              interface app
            </a>
          </div>

          {/* TODO: number of results for search */}
          <div className="text-base-content/70 text-sm">Results: 0</div>
        </div>
        <div className="grid grid-cols-4 gap-2">{}</div>
      </div>
      <div className="flex w-full gap-4 pt-6">
        {isFiltered && (
          <CourseFilter
            categories={categories}
            tools={tools}
            rating={rating}
            courseLevel={courseLevel}
            duration={duration}
            price={price}
          />
        )}
        <div
          className={`grid grid-cols-1 gap-4 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:${isFiltered ? "grid-cols-3" : "grid-cols-4"}`}
        >
          {filteredCourses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
      {/*TODO: Implement pagination */}
    </section>
  );
};

export default CoursesPage;
