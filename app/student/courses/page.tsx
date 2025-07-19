import { Icon } from "@iconify/react";

import CourseCard from "@/components/CourseCardStudent";
import { Select, SelectItem } from "@/components/ui/Select";

// Fake data for demonstration
const fakeCourses = [
  {
    title: "Web Design Course",
    subtitle: "31. Learn More About Web Design",
    image: "/images/course-1.jpg",
    progress: "26% Completed",
    status: "Ongoing",
    teacher: "Mr. Ahmadi",
  },
  {
    title: "SQL Beginner Course",
    subtitle: "105. Special Features Challenge",
    image: "/images/course-2.jpg",
    progress: "22% Completed",
    status: "Ongoing",
    teacher: "Mr. Rezaei",
  },
  {
    title: "Advanced CSS Training",
    subtitle: "54. CSS Static and Relative Positioning",
    image: "/images/course-3.jpg",
    progress: "52% Completed",
    status: "Completed",
    teacher: "Mr. Ahmadi",
  },
  {
    title: "Intro to Machine Learning",
    subtitle: "651. CSS Property Challenge Solution",
    image: "/images/course-4.jpg",
    progress: "13% Completed",
    status: "Ongoing",
    teacher: "Mr. Rezaei",
  },
  {
    title: "Intro to Machine Learning",
    subtitle: "651. CSS Property Challenge Solution",
    image: "/images/course-4.jpg",
    progress: "0% Completed",
    status: "Completed",
    teacher: "Mr. Ahmadi",
  },
  {
    title: "Intro to Machine Learning",
    subtitle: "651. CSS Property Challenge Solution",
    image: "/images/course-4.jpg",
    progress: "0% Completed",
    status: "Ongoing",
    teacher: "Mr. Rezaei",
  },
];

export default function CoursesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Extract filters from searchParams
  const search =
    typeof searchParams.search === "string" ? searchParams.search : "";
  const sort =
    typeof searchParams.sort === "string" ? searchParams.sort : "Latest";
  const status =
    typeof searchParams.status === "string"
      ? searchParams.status
      : "All Courses";
  const teacher =
    typeof searchParams.teacher === "string"
      ? searchParams.teacher
      : "All Teachers";
  // Pagination (optional, not implemented fully)
  // const currentPage = parseInt(typeof searchParams.page === "string" ? searchParams.page : "1", 10);
  // const coursesPerPage = 20;

  // Filter logic
  let filteredCourses = fakeCourses.filter((course) => {
    const matchesSearch =
      !search ||
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.subtitle.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "All Courses" || course.status === status;
    const matchesTeacher =
      teacher === "All Teachers" || course.teacher === teacher;
    return matchesSearch && matchesStatus && matchesTeacher;
  });

  // Sort logic
  if (sort === "Latest") {
    filteredCourses = filteredCourses.slice().reverse();
  } else if (sort === "Oldest") {
    // do nothing, keep original order
  } else if (sort === "Most Viewed") {
    // For demo, just shuffle
    filteredCourses = filteredCourses.slice().sort(() => Math.random() - 0.5);
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-4">
        {/* title */}
        <div className="text-base-content/80 mb-4 text-xl font-semibold">
          Courses
          <span className="text-base-content/80">{`(${filteredCourses.length})`}</span>
        </div>
        <div className="flex flex-row gap-2">
          {/* search */}
          <div className="flex flex-1 items-center gap-2">
            <form
              className="flex w-full max-w-md flex-col items-start gap-2"
              method="GET"
            >
              <label htmlFor="search" className="text-base-content/60 text-xs">
                Search:
              </label>
              <div className="border-base-content/10 bg-base-100 focus-within:border-primary focus-within:ring-primary/20 flex w-full items-center border p-1 focus-within:ring-1">
                <Icon
                  icon="ph:magnifying-glass-bold"
                  className="text-base-content/40 ml-3 text-xl"
                />
                <input
                  id="search"
                  name="search"
                  type="text"
                  placeholder="Search in your courses..."
                  defaultValue={search}
                  className="placeholder:text-base-content/40 w-full bg-transparent py-2 pr-4 pl-2 text-base focus:ring-0 focus:outline-none"
                />
              </div>
              <button type="submit" className="hidden" />
            </form>
          </div>
          {/* filter */}
          <form className="flex flex-row gap-2" method="GET">
            {/* sorted by */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <label htmlFor="sort" className="text-base-content/60 text-xs">
                  Sorted by:
                </label>
              </div>
              <Select name="sort" defaultValue={sort}>
                <SelectItem value="Latest">Latest</SelectItem>
                <SelectItem value="Oldest">Oldest</SelectItem>
                <SelectItem value="Most Viewed">Most Viewed</SelectItem>
              </Select>
            </div>
            {/* status */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <label
                  htmlFor="status"
                  className="text-base-content/60 text-xs"
                >
                  Status:
                </label>
              </div>
              <Select name="status" defaultValue={status}>
                <SelectItem value="All Courses">All Courses</SelectItem>
                <SelectItem value="Ongoing">Ongoing</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </Select>
            </div>
            {/* teacher */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <label
                  htmlFor="teacher"
                  className="text-base-content/60 text-xs"
                >
                  Teacher:
                </label>
              </div>
              <Select name="teacher" defaultValue={teacher}>
                <SelectItem value="All Teachers">All Teachers</SelectItem>
                <SelectItem value="Mr. Ahmadi">Mr. Ahmadi</SelectItem>
                <SelectItem value="Mr. Rezaei">Mr. Rezaei</SelectItem>
              </Select>
            </div>
            <button type="submit" className="hidden" />
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredCourses.map((course, idx) => (
          <CourseCard key={idx} {...course} />
        ))}
      </div>
      {/* Pagination (optional, SSR-ready) */}
      {/* <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          /> */}
    </>
  );
}
