import Icon from "@/components/ui/Icon";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";
import CoursesSearch from "@/components/Courses/CoursesSearch";
import CoursesSelect from "@/components/Courses/CoursesSelect";
import CourseFilter from "@/components/Courses/CourseFilter";
import { connectDB } from "@/lib/db/db";
import courseModel from "@/lib/db/models/courseModel";
import CourseCard from "@/components/Student/CourseCard";

interface Course {
  id?: string;
  thumbnail: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  students: number;
}

interface Props {
  searchParams: Promise<{
    query?: string;
    minPrice?: string;
    maxPrice?: string;
    level?: string;
    duration?: string;
    tool?: string;
    category?: string;
    subCategories?: string;
    filter?: string;
    priceFree?: string;
    pricePaid?: string;
  }>;
}

const CoursesPage = async (props: Props) => {
  const searchParams = await props.searchParams;
  const query = searchParams.query?.toLowerCase();
  const minPrice = searchParams.minPrice
    ? parseFloat(searchParams.minPrice)
    : undefined;
  const maxPrice = searchParams.maxPrice
    ? parseFloat(searchParams.maxPrice)
    : undefined;
  // Filter by duration using the new mapping

  const isFiltered = Object.keys(searchParams).length > 0;

  await connectDB();
  const mongoQuery: Record<string, unknown> = {};

  if (query) {
    mongoQuery.title = { $regex: new RegExp(query, "i") };
  }

  if (minPrice !== undefined && maxPrice !== undefined) {
    mongoQuery.price = { $gte: minPrice, $lte: maxPrice };
  } else if (minPrice !== undefined) {
    mongoQuery.price = { $gte: minPrice };
  } else if (maxPrice !== undefined) {
    mongoQuery.price = { $lte: maxPrice };
  }

  const durationMappings = {
    "Less than 6 hours": { $lte: 6 },
    "6-12 Hours": { $gte: 6, $lte: 12 },
    "12-24 Hours": { $gte: 12, $lte: 24 },
    "24-48 Hours": { $gte: 24, $lte: 48 },
    "More than 48 Hours": { $gte: 48 },
  };

  const duration = searchParams?.duration;
  const durationQuery =
    durationMappings[duration as keyof typeof durationMappings];

  if (durationQuery) {
    mongoQuery.duration = durationQuery;
  }

  const foundCourses = await courseModel
    .find(mongoQuery)
    .populate("category")
    .populate("subCategory")
    .lean();

  const courses: Course[] = foundCourses.map((course) => ({
    id: course._id?.toString(),
    thumbnail: course.thumbnail,
    name: course.title,
    category: course.category?.name || "Unknown",
    price: course.price,
    rating: 5, // TODO
    students: course.studentsCount,
  }));

  return (
    <section className="container mx-auto mt-8 flex max-w-6xl flex-col items-center justify-center">
      <div className="border-base-300 flex w-full flex-col gap-4 border-b px-4 pb-2">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <Link
              href={isFiltered ? "/courses" : "/courses?filter=true"}
              className={`bg-base-100 flex-row items-center gap-3 rounded-none border px-2 py-3 md:flex ${
                isFiltered
                  ? "border-primary text-primary"
                  : "border-primary/20 text-base-content/80"
              } hidden`}
            >
              <Icon icon="ph:faders-fill" className="text-xl" />
              <span className="text-sm">Filter</span>
              <span
                className={`${
                  isFiltered
                    ? "text-base-100 bg-primary px-2"
                    : "text-primary bg-primary/10 px-2"
                }`}
              >
                {isFiltered ? "1" : "0"}
              </span>
            </Link>

            <Sheet>
              <SheetTrigger className="bg-base-100 border-primary text-primary flex flex-row items-center gap-2 rounded-none border p-2 md:hidden">
                <Icon icon="ph:faders-fill" className="text-xl" />
                <span className="text-sm">Filter</span>
                <span className="text-primary bg-primary/10 px-2">
                  {isFiltered ? "1" : "0"}
                </span>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Courses Filter</SheetTitle>
                  <SheetDescription className="flex flex-col items-center justify-between">
                    <CourseFilter
                      searchParams={Promise.resolve(searchParams)}
                    />
                    <button className="btn btn-primary z-50 mt-8 w-full font-bold shadow-lg">
                      Done
                    </button>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>

            <CoursesSearch />
          </div>
          <CoursesSelect />
        </div>

        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex flex-row flex-wrap items-center gap-2 text-xs">
            <span className="text-base-content/70 whitespace-nowrap">
              Suggestions :
            </span>
            <Link href="" className="text-primary/80 whitespace-nowrap">
              user type
            </Link>
            <Link href="" className="text-primary/80 whitespace-nowrap">
              user experience
            </Link>
            <Link href="" className="text-primary/80 whitespace-nowrap">
              web design
            </Link>
            <Link href="" className="text-primary/80 whitespace-nowrap">
              type app
            </Link>
          </div>
          <div className="text-base-content/70 text-sm whitespace-nowrap">
            {query
              ? `${foundCourses.length} results find for "${query}"`
              : `${foundCourses.length} Course`}
          </div>
        </div>
      </div>

      <div className="flex w-full items-start gap-4 pt-6">
        {isFiltered && (
          <CourseFilter searchParams={Promise.resolve(searchParams)} />
        )}
        <div
          className={`grid w-full grid-cols-2 gap-4 pt-6 md:grid-cols-3 lg:${
            isFiltered ? "grid-cols-3" : "grid-cols-4"
          }`}
        >
          {foundCourses.length > 0 ? (
            courses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))
          ) : (
            <div className="text-base-content/70 col-span-full text-center">
              No courses found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CoursesPage;
