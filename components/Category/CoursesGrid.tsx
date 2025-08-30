import Link from "next/link";

import CourseCard from "@/components/Student/CourseCard";
import CourseFilter from "@/components/Courses/CourseFilter";

type Course = {
  thumbnail: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  students: number;
};

type Category = {
  name: string;
  icon: string;
  subcategories: { [key: string]: number };
};

type Rating = {
  label: string;
  count: number;
};

type CoursesGridProps = {
  courses: Course[];
  isFiltered: boolean;
  categories: Category[];
  tools: { [key: string]: number };
  rating: Rating[];
  courseLevel: { [key: string]: number };
  duration: { [key: string]: number };
  price: { [key: string]: number };
};

const CoursesGrid = ({
  courses,
  isFiltered,
  categories,
  tools,
  rating,
  courseLevel,
  duration,
  price,
}: CoursesGridProps) => {
  return (
    <div className="flex w-full items-start gap-4 pt-6">
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
        className={`grid grid-cols-2 gap-4 pt-6 md:grid-cols-3 lg:${isFiltered ? "grid-cols-3" : "grid-cols-4"}`}
      >
        {courses.map((course, index) => (
          <Link key={index} href={`/courses/`}>
            <CourseCard {...course} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CoursesGrid;
