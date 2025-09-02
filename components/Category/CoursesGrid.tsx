import CourseCard from "@/components/Student/CourseCard";
import CourseFilter from "@/components/Courses/CourseFilter";
import { connectDB } from "@/lib/db/db";
import courseModel from "@/lib/db/models/courseModel";

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

const CoursesGrid = async (props: Props) => {
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
    <div className="flex w-full items-start gap-4 pt-6">
      {isFilterPanelVisible && (
        <CourseFilter searchParams={Promise.resolve(searchParams)} />
      )}
      <div
        className={`grid grid-cols-1 gap-4 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:${isFilterPanelVisible ? "grid-cols-3" : "grid-cols-4"}`}
      >
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
};

export default CoursesGrid;
