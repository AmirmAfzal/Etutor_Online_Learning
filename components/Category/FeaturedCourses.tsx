import CourseCard from "@/components/Student/CourseCard";

type Course = {
  thumbnail: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  students: number;
};

type FeaturedCoursesProps = {
  title: string;
  courses: Course[];
};

const FeaturedCourses = ({ title, courses }: FeaturedCoursesProps) => {
  return (
    <div className="my-12 flex w-full max-w-6xl flex-col items-center gap-10">
      <h2 className="mb-6 text-center text-2xl font-semibold sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      <div className="grid w-full grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
        {courses.slice(0, 5).map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCourses;
