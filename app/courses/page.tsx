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
import categoryModel from "@/lib/db/models/categoryModel";
import subCategoryModel from "@/lib/db/models/subCategoryModel";

// Types for filtered courses
type Category = {
  name: string;
  icon: string;
  subcategories: { [key: string]: number };
};

type Rating = {
  label: string;
  count: number;
};

type Course = {
  id?: string;
  thumbnail: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  students: number;
};

type SubCategory = {
  [key: string]: { [key: string]: number };
};

// Static data for other filters
const tools = {
  "HTML 5": 1234,
  "GOLANG ": 1234,
  "CSS 3": 1234,
  "Node.js": 8454,
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

const CoursesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
    minPrice?: string;
    maxPrice?: string;
    level?: string;
    duration?: string;
    tool?: string;
    category?: string;
    subCategories?: string;
  }>;
}) => {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.query?.toLowerCase();
  const minPrice = resolvedSearchParams.minPrice
    ? parseFloat(resolvedSearchParams.minPrice)
    : undefined;
  const maxPrice = resolvedSearchParams.maxPrice
    ? parseFloat(resolvedSearchParams.maxPrice)
    : undefined;

  // const isFiltered = Object.keys(resolvedSearchParams).length > 0;
  let isFiltered = false;
  for (const key in resolvedSearchParams) {
    isFiltered = true;
    break;
  }

  await connectDB();

  const mongoQuery: any = {};
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

  const foundCategories = await categoryModel.find().lean();
  const foundSubCategories = await subCategoryModel
    .find()
    .populate("category")
    .lean();

  const foundCourses = await courseModel
    .find(mongoQuery)
    .populate("category")
    .populate("subCategory")
    .lean();

  const totalFreeCount = await courseModel.countDocuments({ price: 0 });
  const totalPaidCount = await courseModel.countDocuments({
    price: { $gt: 0 },
  });
  const courseCounts: Record<string, number> = {};
  foundCourses.forEach((course) => {
    const subCategoryId = course.subCategory?._id?.toString();
    if (subCategoryId) {
      courseCounts[subCategoryId] = (courseCounts[subCategoryId] || 0) + 1;
    }
  });

  const subcategoriesByCategory: SubCategory = {};
  foundSubCategories.forEach((subCategory) => {
    const categoryId = subCategory.category._id?.toString();
    if (!categoryId) return;

    if (!subcategoriesByCategory[categoryId]) {
      subcategoriesByCategory[categoryId] = {};
    }

    const subCategoryId = subCategory._id?.toString();
    if (subCategoryId) {
      subcategoriesByCategory[categoryId][subCategory.name] =
        courseCounts[subCategoryId] || 0;
    }
  });

  const categories: Category[] = foundCategories.map((category) => ({
    name: category?.name,
    icon: category?.icon || "ph:cpu",
    subcategories:
      subcategoriesByCategory[category._id?.toString() || ""] || {},
  }));

  const courses: Course[] = foundCourses.map((course) => ({
    id: course._id?.toString(),
    thumbnail: course.thumbnail,
    name: course.title,
    category: course.category?.name || "Unknown",
    price: course.price,
    rating: 5, // TODO
    students: course.studentsCount,
  }));

  const priceCounts: { Free: number; Paid: number } = {
    Free: totalFreeCount,
    Paid: totalPaidCount,
  };

  const isFreeSelected =
    minPrice === 0 && (maxPrice === undefined || maxPrice === 0);
  const isPaidSelected = minPrice !== undefined && minPrice > 0;

  const currentPriceFilters = {
    Free: isFreeSelected,
    Paid: isPaidSelected,
  };

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
                      categories={categories}
                      tools={tools}
                      rating={rating}
                      courseLevel={courseLevel}
                      duration={duration}
                      price={priceCounts}
                      currentPriceFilters={currentPriceFilters}
                      searchParams={searchParams as any}
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
              ? `${foundCourses.length} results find for"${query}"`
              : `${foundCourses.length} Course`}
          </div>
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
            price={priceCounts}
            currentPriceFilters={currentPriceFilters}
            searchParams={searchParams}
          />
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
