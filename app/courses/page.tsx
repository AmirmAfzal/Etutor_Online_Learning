import Icon from "@/components/ui/Icon";
import Link from "next/link";

import React from "react";
import CoursesSearch from "@/components/Courses/CoursesSearch";
import CoursesSelect from "@/components/Courses/CoursesSelect";
import CourseFilter from "@/components/Courses/CourseFilter";
import { connectDB } from "@/lib/db/db";
import courseModel from "@/lib/db/models/courseModel";
import CourseCard from "@/components/Student/CourseCard";
import FilterMobile from "@/components/Courses/courseFilter/FilterMobile";

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
    rating?: string;
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

  const isFilterPanelVisible = searchParams.filter === "true";

  const filterUrl = new URLSearchParams(searchParams);
  if (isFilterPanelVisible) {
    filterUrl.delete("filter");
  } else {
    filterUrl.set("filter", "true");
  }

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

  const level = searchParams?.level;
  if (level && level !== "All Levels") {
    mongoQuery.level = level;
  }

  const rating = searchParams?.rating;
  if (rating) {
    mongoQuery.rating = { $gte: Number(rating) };
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
    rating: course.rating,
    students: course.studentsCount,
  }));

  return (
    <section className="container mx-auto mt-8 flex max-w-6xl flex-col items-center justify-center">
      <div className="border-base-300 flex w-full flex-col gap-4 border-b px-4 pb-2">
        <div className="flex w-full flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <div className="flex flex-row items-center gap-2">
            <Link
              href={`/courses?${filterUrl.toString()}`}
              className={`bg-base-100 flex-row items-center gap-3 rounded-none border p-2 md:flex ${
                isFilterPanelVisible
                  ? "border-primary text-primary"
                  : "border-primary/20 text-base-content/80"
              } hidden`}
            >
              <Icon icon="ph:faders-fill" className="text-xl" />
              <span className="text-sm">Filter</span>
              <span
                className={`${
                  isFilterPanelVisible
                    ? "text-base-100 bg-primary px-2"
                    : "text-primary bg-primary/10 px-2"
                }`}
              >
                {isFilterPanelVisible ? "1" : "0"}
              </span>
            </Link>

            <FilterMobile searchParams={searchParams}>
              <CourseFilter searchParams={Promise.resolve(searchParams)} />
            </FilterMobile>

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
        {isFilterPanelVisible && (
          <CourseFilter searchParams={Promise.resolve(searchParams)} />
        )}
        <div
          className={`grid w-full grid-cols-1 gap-4 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:${
            isFilterPanelVisible ? "grid-cols-3" : "grid-cols-4"
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
