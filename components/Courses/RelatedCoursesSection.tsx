import Icon from "@/components/ui/Icon";
import CourseCard from "@/components/Student/CourseCard";
import { connectDB } from "@/lib/db/db";
import courseModel from "@/lib/db/models/courseModel";

type RelatedCourse = {
  thumbnail: string;
  name: string;
  category: string;
  price: number;
  students: number;
  rating: number;
};


const RelatedCoursesSection =async () => {

await connectDB()

const foundCourses = await courseModel.find().limit(4).lean()

let courses: RelatedCourse[] = []


if(foundCourses.length > 0){
  courses = foundCourses.map(course => ({
    thumbnail: course.thumbnail,
    name: course.title,
    category: "development",
    price: course.price,
    students: course.studentsCount,
    rating: course.rating
  }))
}


  return (
    <div className="border-base-300 mt-12 w-full border-t">
      <div className="flex flex-row items-center justify-between gap-4 p-6">
        <span className="text-base-content/80 text-2xl font-semibold">
          Related Courses
        </span>

        <button className="btn btn-soft btn-primary mt-6">
          view All <Icon icon="ph:arrow-right" className="ml-2 text-lg" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            thumbnail={course.thumbnail}
            name={course.name}
            category={course.category}
            price={course.price}
            rating={course.rating}
            students={course.students}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedCoursesSection;
