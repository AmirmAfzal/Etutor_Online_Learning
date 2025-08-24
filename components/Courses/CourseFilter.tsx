import Categories from "./courseFilter/Categories";
import Tools from "./courseFilter/Tools";
import Rating from "./courseFilter/Rating";
import CourseLevel from "./courseFilter/CourseLevel";
import PriceSelect from "./courseFilter/PriceSelect";
import Duration from "./courseFilter/Duration";
import { connectDB } from "@/lib/db/db";
import courseModel from "@/lib/db/models/courseModel";
import categoryModel from "@/lib/db/models/categoryModel";
import subCategoryModel from "@/lib/db/models/subCategoryModel";

// Types for filtered courses
type Category = {
  name: string;
  icon: string;
  subcategories: { [key: string]: number };
};

type RatingItem = {
  label: string;
  count: number;
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

const rating: RatingItem[] = [
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

type Props = {
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
};

const CourseFilter = async ({ searchParams }: Props) => {
  await connectDB();

  const resolvedSearchParams = await searchParams;
  const minPrice = resolvedSearchParams.minPrice
    ? parseFloat(resolvedSearchParams.minPrice)
    : undefined;
  const maxPrice = resolvedSearchParams.maxPrice
    ? parseFloat(resolvedSearchParams.maxPrice)
    : undefined;

  const foundCategories = await categoryModel.find().lean();
  const foundSubCategories = await subCategoryModel
    .find()
    .populate("category")
    .lean();

  const foundCourses = await courseModel.find().lean();

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

  const priceCounts = {
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
    <aside className="border-base-300 bg-base-100 mt-8 w-full !space-y-1.5 md:mt-0 md:w-5/12 md:border-r md:p-4">
      <Categories categories={categories} />
      <Tools tools={tools} />
      <Rating rating={rating} />
      <CourseLevel courseLevel={courseLevel} />
      <PriceSelect
        price={priceCounts}
        currentPriceFilters={currentPriceFilters}
        searchParams={searchParams as any}
      />
      <Duration duration={duration} />
    </aside>
  );
};

export default CourseFilter;
