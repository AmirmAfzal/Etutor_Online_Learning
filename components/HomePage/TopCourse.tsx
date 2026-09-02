import { CourseTypes } from "@/app/page";

import CourseCard from "../CourseCard";

interface Props {
  courses: CourseTypes[];
}

const TopCourse = ({ courses }: Props) => {
  if (!Array.isArray(courses) || courses.length === 0) {
    return null;
  }

  return (
    <section className="bg-base-200 w-full pt-16 pb-48">
      <div className="container mx-auto space-y-8">
        <h3 className="text-center text-2xl font-bold md:text-3xl">
          Best selling courses
        </h3>
        <div className="grid grid-cols-1 gap-6 px-8 sm:grid-cols-2 md:grid-cols-3 md:px-0 lg:grid-cols-5">
          {courses &&
            courses.map((course: CourseTypes) => (
              <CourseCard key={course.title} course={course} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default TopCourse;
