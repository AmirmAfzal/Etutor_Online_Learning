import Categories from "./courseFilter/Categories";
// import Tools from "./courseFilter/Tools";
import Rating from "./courseFilter/Rating";
import CourseLevel from "./courseFilter/CourseLevel";
import PriceSelect from "./courseFilter/PriceSelect";
import Duration from "./courseFilter/Duration";
import { connectDB } from "@/lib/db/db";
import courseModel from "@/lib/db/models/courseModel";
import categoryModel from "@/lib/db/models/categoryModel";
import subCategoryModel from "@/lib/db/models/subCategoryModel";

interface Category {
  name: string;
  icon: string;
  subcategories: { [key: string]: number };
}

interface SubCategory {
  [key: string]: { [key: string]: number };
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

// Static data for other filters
// const tools = {
//   "HTML 5": 1234,
//   "GOLANG ": 1234,
//   "CSS 3": 1234,
//   "Node.js": 8454,
// };

const CourseFilter = async (props: Props) => {
  await connectDB();

  const searchParams = await props.searchParams;
  const minPrice = searchParams.minPrice
    ? parseFloat(searchParams.minPrice)
    : undefined;
  const maxPrice = searchParams.maxPrice
    ? parseFloat(searchParams.maxPrice)
    : undefined;

  const foundCategories = await categoryModel.find().lean();
  const foundSubCategories = await subCategoryModel
    .find()
    .populate("category")
    .lean();

  const foundCourses = await courseModel
    .find()
    .populate("category")
    .populate("duration")
    .populate("level")
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

  const durations: number[] = foundCourses.map((course) => course.duration);
  const levels: string[] = foundCourses.map((course) => course.level);
  const rating: number[] = foundCourses.map((course) => course.rating);
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
      {/* <Tools tools={tools} /> */}
      <Rating
        searchParams={Promise.resolve(searchParams)}
        courseRating={rating}
      />
      <CourseLevel
        // promise => for lint error
        searchParams={Promise.resolve(searchParams)}
        courseLevel={levels}
      />
      <PriceSelect
        price={priceCounts}
        currentPriceFilters={currentPriceFilters}
        // promise => for lint error
        searchParams={Promise.resolve(searchParams)}
      />
      <Duration duration={durations} searchParams={searchParams} />
    </aside>
  );
};

export default CourseFilter;
