// TODO: single course updated => merge to this branch

import Icon from "@/components/ui/Icon";

import React from "react";
import CourseCard from "@/components/CourseCard";
import CoursesSearch from "@/components/Courses/CoursesSearch";
import CoursesSelect from "@/components/Courses/CoursesSelect";
import CourseFilter from "@/components/Courses/CourseFilter";

const courses = [
  {
    thumbnail: "/images/course-images-1.png",
    name: "Machine Learning A-Z™: Hands-On Python & R In Data...",
    category: "Design",
    price: 57,
    rating: 5,
    students: 265.7,
  },
  {
    thumbnail: "/images/course-images-2.png",
    name: "The Complete 2021 Web Development Bootcamp",
    category: "Development",
    price: 57,
    rating: 5,
    students: 265.7,
  },
  {
    thumbnail: "/images/course-images-3.png",
    name: "Learn Python Programming Masterclass",
    category: "IT & Software",
    price: 57,
    rating: 5,
    students: 265.7,
  },
  {
    thumbnail: "/images/course-images-4.png",
    name: "The Complete Digital Marketing Course - 12 Courses in 1",
    category: "Marketing",
    price: 57,
    rating: 5,
    students: 265.7,
  },
  {
    thumbnail: "/images/course-images-5.png",
    name: "Reiki Level I, II and Master/Teacher Program",
    category: "Health & Fitness",
    price: 57,
    rating: 5,
    students: 265.7,
  },
  {
    thumbnail: "/images/course-images-6.png",
    name: "Learn Ethical Hacking From Scratch 2021",
    category: "IT & Software",
    price: 35,
    rating: 4.8,
    students: 451.444,
  },
  {
    thumbnail: "/images/course-images-7.png",
    name: "Ultimate AWS Certified Solutions Architect Associate 2021",
    category: "Development",
    price: 13,
    rating: 4.9,
    students: 211.434,
  },
  {
    thumbnail: "/images/course-images-8.png",
    name: "Complete Blender Creator: Learn 3D Modelling for Beginners",
    category: "Design",
    price: 49,
    rating: 4.9,
    students: 187.837,
  },
  {
    thumbnail: "/images/course-images-9.png",
    name: "Data Structures & Algorithms Essentials (2021)",
    category: "Development",
    price: 24,
    rating: 4.7,
    students: 451.444,
  },
  {
    thumbnail: "/images/course-images-10.png",
    name: "2021 Complete Python Bootcamp From Zero to Hero in Python",
    category: "Development",
    price: 35,
    rating: 4.3,
    students: 902.941,
  },
];

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

const tools = ["HTML 5", "CSS 3", "React", "Webflow", "Node.js", "Laravel"];
const courseLevel = ["All Level", "Beginner", "Intermediate", "Expert"];

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

const CoursesPage = ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; filter?: string }>;
}) => {
  const query = searchParams.query?.toLowerCase();
  const isFiltered = searchParams.filter === "true";
  const filteredCourses = query
    ? courses.filter(
        (course) =>
          course.name.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query)
      )
    : courses;

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
