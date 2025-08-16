import Icon from "@/components/ui/Icon";
import Form from "next/form";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { connectDB } from "@/lib/db/db";
import courseModel from "@/lib/db/models/courseModel";
import instructorModel from "@/lib/db/models/instructorModel";
import CourseCard from "@/components/Student/CourseCard";
import TeacherCard from "@/components/Student/TeacherCard";
import Link from "next/link";
import CourseFilter from "@/components/Courses/CourseFilter";
import React from "react";

type Category = {
  name: string;
  icon: string;
  subcategories: { [key: string]: number };
};

type Rating = {
  label: string;
  count: number;
};

export default async function CategoryPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; filter?: string }>;
}) {
  await connectDB();
  const resolvedParams = await searchParams;
  const query = resolvedParams.query?.toLowerCase();
  const isFiltered = resolvedParams.filter === "true";

  const courseFilter = query
    ? {
        $or: [
          { title: { $regex: query, $options: "i" } },
          { "category.name": { $regex: query, $options: "i" } },
        ],
      }
    : {};

  const foundFilterCourse = await courseModel.find(courseFilter).lean();
  const foundAllCourse = await courseModel.find().limit(5).lean();
  const foundInstructor = await instructorModel.find().lean();

  const courses = foundFilterCourse.map((course) => ({
    thumbnail:
      course.thumbnail || "http://localhost:3000/images/courses-images-1.png",
    name: course.title,
    category: course.category?.name || "Unknown",
    price: course.price,
    rating: 5,
    students: course.studentsCount,
  }));

  const AllCourse = foundAllCourse.map((course) => ({
    thumbnail: course.thumbnail || "/images/course-images-1.png",
    name: course.title,
    category: course.category?.name || "Unknown",
    price: course.price,
    rating: 5,
    students: course.studentsCount,
  }));

  const instructors = foundInstructor.map((instructor) => ({
    name: `${instructor.firstname} ${instructor.lastname}`,
    title: "Instructor",
    image: instructor.avatar || "/images/instructors/instructors-1.png",
    rating: instructor.rating,
    students: instructor.students,
  }));

  const popularTools = [
    { name: "HTML 5", courses: 2736 },
    { name: "CSS 3", courses: 13332 },
    { name: "Javascript", courses: 62622 },
    { name: "Saas", courses: 20128 },
    { name: "Laravel", courses: 8190 },
    { name: "Django", courses: 22040 },
  ];

  const popularKeywords = [
    "HTML 5",
    "Web Development",
    "Responsive Developments",
    "Developments",
    "Programing",
    "Website",
    "Technology",
    "Wordpress",
  ];

  const categories: Category[] = [
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
    {
      name: "Photography & Video",
      icon: "ph:camera",
      subcategories: { "": 0 },
    },
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

  const rating: Rating[] = [
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

  return (
    <section className="container mx-auto flex flex-col items-center px-4 py-8">
      <div className="my-12 flex w-full max-w-6xl flex-col items-center gap-10">
        <h2 className="mb-6 text-center text-2xl font-semibold sm:text-3xl lg:text-4xl">
          Best selling courses in Web Development
        </h2>
        <div className="grid w-full grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
          {AllCourse.slice(0, 5).map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>

      <div className="my-12 mb-20 flex w-full max-w-6xl flex-col gap-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
            Popular tools
          </h2>
          <div className="flex flex-row items-center justify-center gap-2">
            <Icon
              icon="ph:arrow-left"
              className="btn btn-primary btn-soft text-2xl sm:text-3xl"
            />
            <Icon
              icon="ph:arrow-right"
              className="btn btn-primary btn-soft text-2xl sm:text-3xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-4">
          {popularTools.map((tool) => (
            <button
              key={tool.name}
              className="border-base-300 hover:text-primary bg-base-100 border px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:border-none hover:shadow-lg sm:px-7 sm:py-3 sm:text-base"
            >
              <div>{tool.name}</div>
              <div className="text-base-content/60 mt-1 text-xs sm:mt-2 sm:text-sm">
                {tool.courses.toLocaleString()} Courses
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm sm:text-base">
          <span className="font-semibold">Popular keyword:</span>
          {popularKeywords.map((keyword) => (
            <button
              key={keyword}
              className="hover:bg-primary bg-base-200 text-base-content/70 hover:text-base-100 px-4 py-2 text-xs transition sm:text-sm"
            >
              {keyword}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-base-200 mb-12 flex w-full justify-center py-16">
        <div className="w-full max-w-6xl px-4">
          <h2 className="mb-6 text-2xl font-semibold sm:text-3xl lg:text-4xl">
            Popular instructor in Web Development
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
            {instructors.map((instructor) => (
              <TeacherCard
                key={instructor.name}
                {...instructor}
                sendMessage={false}
                className="!bg-base-100"
              />
            ))}
          </div>
        </div>
      </div>

      <section className="w-full max-w-6xl">
        <div className="mb-6 flex flex-col flex-wrap items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
            {/* Filter Button Desktop */}
            <a
              href={isFiltered ? "/category" : "/category?filter=true"}
              className={`hidden items-center gap-3 rounded-none border px-2 py-3 md:flex ${isFiltered ? "border-primary text-primary bg-base-100" : "border-primary/20 text-base-content/80 bg-base-100"}`}
            >
              <Icon icon="ph:faders-fill" className="text-xl" />
              <span className="text-sm">Filter</span>
              <span
                className={`px-2 ${isFiltered ? "bg-primary text-base-100" : "bg-primary/10 text-primary"}`}
              >
                {isFiltered ? "3" : "0"}
              </span>
            </a>

            <Dialog>
              <DialogTrigger className="bg-base-100 border-primary/20 text-base-content/80 flex items-center gap-3 rounded-none border px-2 py-3 md:hidden">
                <Icon icon="ph:faders-fill" className="text-primary text-xl" />
                <span className="text-sm">Filter</span>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            {/* Search Form */}
            <Form action="/category" className="relative w-full sm:w-72">
              <input
                type="text"
                name="query"
                placeholder="UI/UX Design"
                className="border-base-300 w-full rounded-none border px-4 py-2.5 text-sm sm:py-3 sm:text-base"
              />
              <Icon
                icon="ph:magnifying-glass"
                className="text-base-content/50 absolute top-1/2 left-3 -translate-y-1/2"
              />
              <button type="submit" className="sr-only">
                Search
              </button>
            </Form>
          </div>

          <div className="flex flex-row gap-2">
            <div className="flex flex-row items-center gap-2">
              <label
                htmlFor="sort"
                className="text-base-content/60 text-xs sm:text-sm"
              >
                Sorted by:
              </label>
            </div>
            <Select name="sort">
              <SelectTrigger className="w-32 sm:w-40">
                <SelectValue placeholder="Sorted by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Latest">Latest</SelectItem>
                <SelectItem value="Oldest">Oldest</SelectItem>
                <SelectItem value="Most Viewed">Most Viewed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="border-base-300 flex flex-col items-start justify-between gap-3 border-b pb-4 text-sm sm:flex-row sm:items-center sm:text-base">
          <div className="text-primary flex flex-wrap items-center gap-2">
            <span className="text-base-content">Suggestion:</span>
            <button className="hover:underline">User interface</button>
            <button className="hover:underline">User experience</button>
            <button className="hover:underline">Web design</button>
            <button className="hover:underline">App</button>
          </div>
          <div>
            <span className="text-base-content/80">
              {query ? (
                <>
                  {courses.length.toLocaleString()}
                  <span className="text-base-content/60 ml-2">
                    results for &quot;{resolvedParams.query}&quot;
                  </span>
                </>
              ) : (
                <>
                  {courses.length.toLocaleString()}
                  <span className="text-base-content/60 ml-2">courses</span>
                </>
              )}
            </span>
          </div>
        </div>

        <div className="flex w-full items-start gap-4 pt-6">
          {isFiltered && (
            <CourseFilter
              categories={categories}
              tools={tools}
              rating={rating}
              courseLevel={courseLevel}
              duration={duration}
              price={price}
              classname="hidden md:block"
            />
          )}
          <div
            className={`grid grid-cols-1 gap-4 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:${isFiltered ? "grid-cols-3" : "grid-cols-4"}`}
          >
            {courses.map((course, index) => (
              // FIXME : fix this route
              <Link key={index} href={`/courses/`}>
                <CourseCard {...course} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
