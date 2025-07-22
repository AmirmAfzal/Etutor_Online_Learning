import CourseCard from "@/components/CourseCard";
import TeacherCard from "@/components/TeacherCard";
import Icon from "@/components/ui/Icon";

import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const courses = [
  {
    thumbnail: "/images/course-images-1.png",
    name: "Machine Learning A-Z™: Hands-On Python & R In Data...",
    category: "Design",
    price: 57,
    rating: 5,
    students: 265.7,
  },
  {
    thumbnail: "/images/course-images-2.png",
    name: "The Complete 2021 Web Development Bootcamp",
    category: "Development",
    price: 57,
    rating: 5,
    students: 265.7,
  },
  {
    thumbnail: "/images/course-images-3.png",
    name: "Learn Python Programming Masterclass",
    category: "IT & Software",
    price: 57,
    rating: 5,
    students: 265.7,
  },
  {
    thumbnail: "/images/course-images-4.png",
    name: "The Complete Digital Marketing Course - 12 Courses in 1",
    category: "Marketing",
    price: 57,
    rating: 5,
    students: 265.7,
  },
  {
    thumbnail: "/images/course-images-5.png",
    name: "Reiki Level I, II and Master/Teacher Program",
    category: "Health & Fitness",
    price: 57,
    rating: 5,
    students: 265.7,
  },
  {
    thumbnail: "/images/course-images-6.png",
    name: "Learn Ethical Hacking From Scratch 2021",
    category: "IT & Software",
    price: 35,
    rating: 4.8,
    students: 451.444,
  },
  {
    thumbnail: "/images/course-images-7.png",
    name: "Ultimate AWS Certified Solutions Architect Associate 2021",
    category: "Development",
    price: 13,
    rating: 4.9,
    students: 211.434,
  },
  {
    thumbnail: "/images/course-images-8.png",
    name: "Complete Blender Creator: Learn 3D Modelling for Beginners",
    category: "Design",
    price: 49,
    rating: 4.9,
    students: 187.837,
  },
  {
    thumbnail: "/images/course-images-9.png",
    name: "Data Structures & Algorithms Essentials (2021)",
    category: "Development",
    price: 24,
    rating: 4.7,
    students: 451.444,
  },
  {
    thumbnail: "/images/course-images-10.png",
    name: "2021 Complete Python Bootcamp From Zero to Hero in Python",
    category: "Development",
    price: 35,
    rating: 4.3,
    students: 902.941,
  },
];

const instructors = [
  {
    name: "Devon Lane",
    title: "Web Developer",
    image: "/images/instructors/instructor-1.png",
    rating: 5.0,
    students: 265.7,
  },
  {
    name: "Darrell Steward",
    title: "React Native Developer",
    image: "/images/instructors/instructor-2.png",
    rating: 5.0,
    students: 265.7,
  },
  {
    name: "Jane Cooper",
    title: "Mobile Developer",
    image: "/images/instructors/instructor-3.png",
    rating: 5.0,
    students: 265.7,
  },
  {
    name: "Albert Flores",
    title: "JavaScript Developer",
    image: "/images/instructors/instructor-4.png",
    rating: 5.0,
    students: 265.7,
  },
  {
    name: "Kathryn Murphy",
    title: "Lead Developer",
    image: "/images/instructors/instructor-5.png",
    rating: 5.0,
    students: 265.7,
  },
];

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

// TODO: Add serachParams option
export default function CategoryPage() {
  return (
    <section className="container mx-auto flex flex-col items-center px-4 py-8">
      {/* Best selling courses */}
      <div className="my-12 flex max-w-6xl flex-col items-center gap-12">
        <h2 className="mb-6 text-4xl font-medium">
          Best selling courses in Web Development
        </h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {courses.slice(0, 5).map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>

      {/* Popular tools */}
      <div className="my-12 mb-20 flex max-w-6xl flex-col gap-5">
        <div className="flex flex-row items-center justify-between">
          <h2 className="mb-6 text-4xl font-medium">Popular tools</h2>
          <div className="flex flex-row items-center justify-center gap-2">
            {/* right and left arrow */}
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

      {/* Popular instructor */}
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

      {/* Filter and Course Grid */}
      <section className="max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button className="border-primary/50 py- flex items-center gap-2 border px-4 py-3 font-semibold">
              {/* TODO : change this icon */}
              <Icon icon="ph:funnel" />
              Filter
              <span className="text-primary">03</span>
            </button>
            <div className="relative">
              <input
                type="text"
                placeholder="UI/UX Design"
                className="border-base-300 w-full border py-3 pr-4 pl-10"
              />
              <Icon
                icon="ph:magnifying-glass"
                className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
              />
            </div>
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
              3.644.122
              <span className="text-base-content/60 ml-2">
                result find for &quot;UI/UX&quot;
              </span>
            </span>
          </div>
        </div>
      </section>
    </section>
  );
}
