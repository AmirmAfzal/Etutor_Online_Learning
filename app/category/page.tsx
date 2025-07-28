import CourseCard from "@/components/CourseCard";
import TeacherCard from "@/components/TeacherCard";
import Icon from "@/components/ui/Icon";
import Form from "next/form";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { connectDB } from "@/lib/db/db";
import courseModel from "@/lib/db/models/courseModel";
import instructorModel from "@/lib/db/models/instructorModel";

export default async function CategoryPage({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  await connectDB();

  const coursesFromDB = await courseModel.find().lean();
  const instructorsFromDB = await instructorModel.find().lean();

  const courses = coursesFromDB.map((course) => ({
    thumbnail: course.thumbnail,
    name: course.title,
    category: course.category[0]?.name || "Unknown",
    price: course.price,
    rating: 5, // TODO
    students: course.studentsCount,
  }));

  const instructors = instructorsFromDB.map((instructor) => ({
    name: `${instructor.firstname} ${instructor.lastname}`,
    title: "Instructor",
    image: instructor.avatar || "/images/instructors/instructor-1.png",
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

  const query = searchParams.query?.toLowerCase();
  const filteredCourses = query
    ? courses.filter(
        (course) =>
          course.name.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query)
      )
    : courses;

  return (
    <section className="container mx-auto flex flex-col items-center px-4 py-8">
      <div className="my-12 flex max-w-6xl flex-col items-center gap-12">
        <h2 className="mb-6 text-4xl font-medium">
          Best selling courses in Web Development
        </h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {filteredCourses.slice(0, 5).map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>

      <div className="my-12 mb-20 flex max-w-6xl flex-col gap-5">
        <div className="flex flex-row items-center justify-between">
          <h2 className="mb-6 text-4xl font-medium">Popular tools</h2>
          <div className="flex flex-row items-center justify-center gap-2">
            <Icon
              icon="ph:arrow-left"
              className="btn btn-primary btn-soft text-3xl"
            />
            <Icon
              icon="ph:arrow-right"
              className="btn btn-primary btn-soft text-3xl"
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          {popularTools.map((tool) => (
            <button
              key={tool.name}
              className="border-base-300 hover:text-primary bg-base-100 border px-9 py-3 transition-all duration-300 hover:border-none hover:shadow-lg"
            >
              <div className="text-lg font-medium">{tool.name}</div>
              <div className="text-base-content/60 mt-2 text-sm">
                {tool.courses.toLocaleString()} Courses
              </div>
            </button>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3">
          <span className="font-semibold text-nowrap">Popular keyword:</span>
          {popularKeywords.map((keyword) => (
            <button
              key={keyword}
              className="hover:bg-primary bg-base-200 text-base-content/70 hover:text-base-100 px-4 py-2 text-xs text-nowrap transition"
            >
              {keyword}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-base-200 mb-12 flex w-screen flex-row justify-center py-16">
        <div className="max-w-6xl">
          <h2 className="mb-6 text-3xl font-bold">
            Popular instructor in Web Development
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {instructors.map((instructor) => (
              <TeacherCard
                key={instructor.name}
                {...instructor}
                sendMessage={false}
                className="!bg-base-100"
              />
            ))}
          </div>
        </div>
      </div>

      <section className="max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button className="border-primary/50 py- flex items-center gap-2 border px-4 py-3 font-semibold">
              <Icon icon="ph:funnel" />
              Filter
              <span className="text-primary">03</span>
            </button>

            <Form action="/category" className="relative">
              <input
                type="text"
                name="query"
                placeholder="UI/UX Design"
                className="border-base-300 w-full border py-3 pr-4 pl-10"
              />
              <Icon
                icon="ph:magnifying-glass"
                className="text-base-content/50 absolute top-1/2 left-3 -translate-y-1/2"
              />
              <button type="submit" className="sr-only">
                Search
              </button>
            </Form>
          </div>

          <div className="flex flex-row gap-2">
            <div className="flex flex-row items-center gap-2">
              <label htmlFor="sort" className="text-base-content/60 text-xs">
                Sorted by:
              </label>
            </div>
            <Select name="sort">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sorted by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Latest">Latest</SelectItem>
                <SelectItem value="Oldest">Oldest</SelectItem>
                <SelectItem value="Most Viewed">Most Viewed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="border-base-300 flex flex-row justify-between border-b">
          <div className="text-primary mb-4 flex flex-row items-center gap-2">
            <span className="text-base-content"> Suggestion:</span>
            <button className="hover:underline">User interface</button>
            <button className="hover:underline">User experience</button>
            <button className="hover:underline">Web design</button>
            <button className="hover:underline">App</button>
          </div>
          <div>
            <span className="text-base-content/80">
              {query ? (
                <>
                  {filteredCourses.length.toLocaleString()}
                  <span className="text-base-content/60 ml-2">
                    results for &quot;{searchParams.query}&quot;
                  </span>
                </>
              ) : (
                <>
                  {courses.length.toLocaleString()}
                  <span className="text-base-content/60 ml-2">courses</span>
                </>
              )}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredCourses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </section>
    </section>
  );
}
