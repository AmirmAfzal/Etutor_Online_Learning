import Image from "next/image";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icon from "@/components/ui/Icon";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { connectDB } from "@/lib/db/db";
import courseModel from "@/lib/db/models/courseModel";
import DeleteButton from "@/components/instructor-dashboard/my-courses/DeleteButton";
import MyCoursesPagination from "@/components/instructor-dashboard/my-courses/MyCoursesPagination";

interface Props {
  searchParams: Promise<{
    search: string;
    sort: string;
    category: string;
    rating: string;
  }>;
}

const MyCoursesPage = async (props: Props) => {
  await connectDB();
  const courses = await courseModel
    .find()
    .populate("category", "name")
    .sort({ createdAt: -1 });

  const searchParams = await props.searchParams;
  const search = searchParams.search?.toLowerCase() || "";
  const sort = searchParams.sort || "latest";
  const category = searchParams.category || "all";
  const rating = searchParams.rating || "4";

  const filteredCourses = courses
    .filter((course) => {
      const matchSearch = course.title?.toLowerCase().includes(search);
      const matchCategory =
        category === "all" ||
        course.category.name?.toLowerCase() === category.toLowerCase();
      // const matchRating = course.rating >= +rating;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (sort === "latest") return b.id - a.id;
      if (sort === "oldest") return a.id - b.id;
      return 0;
    });

  return (
    <section className="bg-base-200 p-6">
      <div className="container mx-auto">
        <form
          action={"/instructor/dashboard/my-courses?page=1"}
          className="grid grid-cols-1 gap-6 md:grid-cols-5"
        >
          <div className="relative md:col-span-2">
            <label
              htmlFor="search"
              className="text-base-content/80 mb-2 text-xs"
            >
              Search:
            </label>
            <Icon
              icon="ph:magnifying-glass"
              className="text-base-content/80 absolute top-11 left-3 -translate-y-1/2"
              width="20"
              height="20"
            />
            <Input
              type="text"
              name="search"
              className="bg-base-100 pl-12"
              placeholder="Search in your courses..."
              defaultValue={search}
            />
          </div>
          <div className="w-full">
            <label htmlFor="sort" className="text-base-content/80 mb-2 text-xs">
              Sort by:
            </label>
            <Select name="sort" defaultValue={sort}>
              <SelectTrigger className="bg-base-100 w-full border-0">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full">
            <label
              htmlFor="category"
              className="text-base-content/80 mb-2 text-xs"
            >
              Category:
            </label>
            <Select name="category" defaultValue={category}>
              <SelectTrigger className="bg-base-100 w-full border-0">
                <SelectValue placeholder="All Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Category</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="it">IT & Software</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="health">Health & Fitness</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full">
            <label
              htmlFor="rating"
              className="text-base-content/80 mb-2 text-xs"
            >
              Rating:
            </label>
            <Select name="rating" defaultValue={rating}>
              <SelectTrigger className="bg-base-100 w-full border-0">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 Start</SelectItem>
                <SelectItem value="4">4 Start & Up</SelectItem>
                <SelectItem value="3">3 Start & Up</SelectItem>
                <SelectItem value="2">2 Start & Up</SelectItem>
                <SelectItem value="1">1 Start & Up</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <button type="submit" hidden />
        </form>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="bg-base-100 transition-all duration-300 hover:shadow-lg"
            >
              <Image
                src={course.thumbnail}
                alt={course.title}
                width={400}
                height={200}
              />
              <div className="space-y-4 p-4">
                <div>
                  <span className="bg-secondary/20 text-secondary p-1 text-xs">
                    {course.category.name.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold">{course.title}</p>
                </div>
              </div>
              <div className="border-base-300 flex flex-row items-center justify-between border-t p-4 text-xs">
                <div className="flex flex-row items-center gap-1">
                  <Icon
                    icon="ph:star-fill"
                    className="text-primary"
                    width="20"
                    height="20"
                  />
                  {/* {course.rating} */}
                  4.8
                </div>
                <div className="flex flex-row items-center gap-1 font-semibold">
                  <Icon
                    icon="ph:user"
                    className="text-secondary"
                    width="20"
                    height="20"
                  />
                  <p>{course.studentsCount}</p>
                  <span className="text-base-content/80 font-normal">
                    student
                  </span>
                </div>
              </div>
              <div className="border-base-300 flex flex-row items-center justify-between border-t p-4">
                <p className="text-primary text-lg font-bold">
                  {/* ${course.price}.00 */}
                  $57.00
                </p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Icon
                      icon="ph:dots-three"
                      className="btn btn-ghost btn-xs"
                      width="24"
                      height="24"
                    />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuItem className="focus:bg-primary focus:text-base-100">
                      <Link
                        href={`/instructor/dashboard/my-courses/${course._id}`}
                      >
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-primary focus:text-base-100">
                      <Link
                        href={`/instructor/dashboard/create-course?_id=${course._id}`}
                      >
                        Edit Course
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-primary focus:text-base-100">
                      <DeleteButton courseId={course._id.toString()} />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
        {/* pagination */}
        <div className="mt-4">
          <MyCoursesPagination />
        </div>
      </div>
    </section>
  );
};

export default MyCoursesPage;
