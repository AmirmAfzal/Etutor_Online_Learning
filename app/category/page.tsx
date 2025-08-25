import { connectDB } from "@/lib/db/db";
import courseModel from "@/lib/db/models/courseModel";
import instructorModel from "@/lib/db/models/instructorModel";
import FeaturedCourses from "@/components/Category/FeaturedCourses";
import PopularToolsAndKeywords from "@/components/Category/PopularToolsAndKeywords";
import PopularInstructors from "@/components/Category/PopularInstructors";
import SearchFilterAndResults from "@/components/Category/SearchFilterAndResults";
import CoursesGrid from "@/components/Category/CoursesGrid";

type Category = {
  name: string;
  icon: string;
  subcategories: { [key: string]: number };
};

type Rating = {
  label: string;
  count: number;
};

export default async function CategoryPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; filter?: string }>;
}) {
  await connectDB();
  const resolvedParams = await searchParams;
  const query = resolvedParams.query?.toLowerCase();
  const isFiltered = resolvedParams.filter === "true";

  const courseFilter = query
    ? {
        $or: [
          { title: { $regex: query, $options: "i" } },
          { "category.name": { $regex: query, $options: "i" } },
        ],
      }
    : {};

  const foundFilterCourse = await courseModel.find(courseFilter).lean();
  const foundAllCourse = await courseModel.find().limit(5).lean();
  const foundInstructor = await instructorModel.find().lean();

  const courses = foundFilterCourse.map((course) => ({
    thumbnail:
      course.thumbnail || "http://localhost:3000/images/courses-images-1.png",
    name: course.title,
    category: course.category?.name || "Unknown",
    price: course.price,
    rating: 5,
    students: course.studentsCount,
  }));

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

  const categories: Category[] = [
    {
      name: "Development",
      icon: "ph:cpu",
      subcategories: {
        "Web Development": 574,
        "Mobile Development": 1345,
        "Software Testing": 317,
        "Software Engineering": 31,
        "Software Development Tools": 58,
        "No-Code Development": 37,
      },
    },
    {
      name: "Business",
      icon: "ph:handshake",
      subcategories: { "Finance & Accounting": 0 },
    },
    {
      name: "IT & Software",
      icon: "ph:chart-bar-horizontal",
      subcategories: { "": 0 },
    },
    {
      name: "Office Productivity",
      icon: "ph:bug-droid",
      subcategories: { "": 0 },
    },
    {
      name: "Personal Development",
      icon: "ph:receipt",
      subcategories: { "": 0 },
    },
    { name: "Design", icon: "ph:pen-nib", subcategories: { "": 0 } },
    { name: "Marketing", icon: "ph:megaphone", subcategories: { "": 0 } },
    { name: "Lifestyle", icon: "ph:package", subcategories: { "": 0 } },
    {
      name: "Photography & Video",
      icon: "ph:camera",
      subcategories: { "": 0 },
    },
    { name: "Music", icon: "ph:headset", subcategories: { "": 0 } },
    {
      name: "Health & Fitness",
      icon: "ph:first-aid-kit",
      subcategories: { "": 0 },
    },
  ];

  const tools = {
    "HTML 5": 1234,
    "GOLANG ": 1234,
    "CSS 3": 1234,
    "Node.js": 8454,
  };

  const price = {
    Paid: 12863,
    Free: 832,
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
        <SearchFilterAndResults
          isFiltered={isFiltered}
          query={resolvedParams.query}
          coursesCount={courses.length}
          categories={categories}
          tools={tools}
          rating={rating}
          courseLevel={courseLevel}
          duration={duration}
          price={price}
        />

        <CoursesGrid
          courses={courses}
          isFiltered={isFiltered}
          categories={categories}
          tools={tools}
          rating={rating}
          courseLevel={courseLevel}
          duration={duration}
          price={price}
        />
      </section>
    </section>
  );
}
