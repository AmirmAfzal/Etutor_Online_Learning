import { connectDB } from "@/lib/db/db";
import courseModel from "@/lib/db/models/courseModel";
import instructorModel from "@/lib/db/models/instructorModel";
import FeaturedCourses from "@/components/Category/FeaturedCourses";
import PopularToolsAndKeywords from "@/components/Category/PopularToolsAndKeywords";
import PopularInstructors from "@/components/Category/PopularInstructors";
import SearchFilterAndResults from "@/components/Category/SearchFilterAndResults";
import CoursesGrid from "@/components/Category/CoursesGrid";

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

export default async function CategoryPage(props: Props) {
  await connectDB();
  const searchParams = await props.searchParams;

  const foundAllCourse = await courseModel.find().limit(5).lean();
  const foundInstructor = await instructorModel.find().lean();

  const AllCourse = foundAllCourse.map((course) => ({
    thumbnail: course.thumbnail || "/images/course-images-1.png",
    name: course.title,
    category: course.category?.name || "Unknown",
    price: course.price,
    rating: 5,
    students: course.studentsCount,
  }));

  const instructors = foundInstructor.map((instructor) => ({
    name: `${instructor.firstname} ${instructor.lastname}`,
    title: "Instructor",
    image: instructor.avatar || "/images/instructors/instructors-1.png",
    rating: instructor.rating,
    students: instructor.students,
  }));

  const popularTools = [
    { name: "HTML 5", courses: 2736 },
    { name: "CSS 3", courses: 13332 },
    { name: "Javascript", courses: 62622 },
    { name: "Saas", courses: 20128 },
    { name: "Laravel", courses: 8190 },
    { name: "Django", courses: 22040 },
  ];

  const popularKeywords = [
    "HTML 5",
    "Web Development",
    "Responsive Developments",
    "Developments",
    "Programing",
    "Website",
    "Technology",
    "Wordpress",
  ];

  return (
    <section className="container mx-auto flex flex-col items-center justify-center px-4 py-4 sm:py-6 md:py-8">
      <FeaturedCourses
        title="Best selling courses in Web Development"
        courses={AllCourse}
      />

      <PopularToolsAndKeywords
        tools={popularTools}
        keywords={popularKeywords}
      />

      <PopularInstructors
        title="Popular instructor in Web Development"
        instructors={instructors}
      />

      <section className="w-full max-w-6xl px-4">
        <SearchFilterAndResults searchParams={Promise.resolve(searchParams)} />

        <CoursesGrid searchParams={Promise.resolve(searchParams)} />
      </section>
    </section>
  );
}
