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
} from "@/components/ui/select";

type Course = {
  id: number;
  thumbnail: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  students: number;
};

interface Props {
  searchParams: Promise<{
    search: string;
    sort: string;
    category: string;
    rating: string;
  }>;
}

const MyCoursesPage = async (props: Props) => {
  const courses: Course[] = [
    {
      id: 1,
      thumbnail: "/images/course-images-1.png",
      name: "Machine Learning A-Z™: Hands-On Python & R In Data...",
      category: "Design",
      price: 57,
      rating: 4.8,
      students: 265.7,
    },
    {
      id: 2,
      thumbnail: "/images/course-images-2.png",
      name: "The Complete 2021 Web Development Bootcamp",
      category: "Developments",
      price: 24,
      rating: 4.7,
      students: 265.7,
    },
    {
      id: 3,
      thumbnail: "/images/course-images-3.png",
      name: "Learn Python Programming Masterclass",
      category: "Business",
      price: 12,
      rating: 5,
      students: 265.7,
    },
    {
      id: 4,
      thumbnail: "/images/course-images-4.png",
      name: "The Complete Digital Marketing Course - 12 Courses in 1",
      category: "Marketing",
      price: 32,
      rating: 4.5,
      students: 265.7,
    },
    {
      id: 5,
      thumbnail: "/images/course-images-5.png",
      name: "Reiki Level I, II and Master/Teacher Program",
      category: "IT & Software",
      price: 16,
      rating: 4.4,
      students: 265.7,
    },
    {
      id: 6,
      thumbnail: "/images/course-images-6.png",
      name: "The Complete Foundation Stock Trading Course",
      category: "Music",
      price: 28,
      rating: 4.3,
      students: 265.7,
    },
    {
      id: 7,
      thumbnail: "/images/course-images-7.png",
      name: "Beginner to Pro in Excel: Financial Modeling and Valuati...",
      category: "Marketing",
      price: 38,
      rating: 5,
      students: 265.7,
    },
    {
      id: 8,
      thumbnail: "/images/course-images-8.png",
      name: "The Python Mega Course: Build 10 Real World Applications",
      category: "Health & Fitness",
      price: 89,
      rating: 4.1,
      students: 265.7,
    },
    {
      id: 9,
      thumbnail: "/images/course-images-9.png",
      name: "Copywriting - Become a Freelance Copywriter, your ow...",
      category: "Design",
      price: 56,
      rating: 4.0,
      students: 265.7,
    },
    {
      id: 10,
      thumbnail: "/images/course-images-10.png",
      name: "Google Analytics Certification - Learn How To Pass The Exam",
      category: "Lifestyle",
      price: 45,
      rating: 5,
      students: 265.7,
    },
  ];

  const searchParams = await props.searchParams;
  const search = searchParams.search?.toLowerCase() || "";
  const sort = searchParams.sort || "latest";
  const category = searchParams.category || "all";
  const rating = searchParams.rating || "4";

  const filteredCourses = courses
    .filter((course) => {
      const matchSearch = course.name.toLowerCase().includes(search);
      const matchCategory =
        category === "all" ||
        course.category.toLowerCase() === category.toLowerCase();
      const matchRating = course.rating >= +rating;
      return matchSearch && matchCategory && matchRating;
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
          action={"/instructor/dashboard/my-courses"}
          className="flex flex-row items-center justify-between gap-6"
        >
          <div className="relative">
            <label className="text-base-content/80 mb-2 text-xs">Search:</label>
            <Icon
              icon="ph:magnifying-glass"
              className="text-base-content/80 absolute top-11 left-3 -translate-y-1/2"
              width="20"
              height="20"
            />
            <Input
              type="text"
              name="search"
              className="bg-base-100 min-w-lg pl-12"
              placeholder="Search in your courses..."
              defaultValue={search}
            />
          </div>
          <div className="w-full">
            <label className="text-base-content/80 mb-2 text-xs">
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
            <label className="text-base-content/80 mb-2 text-xs">
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
            <label className="text-base-content/80 mb-2 text-xs">Rating:</label>
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

        <div className="mt-6 grid grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.name}
              className="bg-base-100 transition-all duration-300 hover:shadow-lg"
            >
              <Image
                src={course.thumbnail}
                alt="course image"
                width={400}
                height={200}
              />
              <div className="space-y-4 p-4">
                <div>
                  <span className="bg-base-200 p-1 text-xs">
                    {course.category}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold">{course.name}</p>
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
                  {course.rating}
                </div>
                <div className="flex flex-row items-center gap-1 font-semibold">
                  <Icon
                    icon="ph:user"
                    className="text-secondary"
                    width="20"
                    height="20"
                  />
                  <p>{course.students}</p>
                  <span className="text-base-content/80 font-normal">
                    student
                  </span>
                </div>
              </div>
              <div className="border-base-300 flex flex-row items-center justify-between border-t p-4">
                <p className="text-primary text-lg font-bold">
                  ${course.price}.00
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
                        href={`/instructor/dashboard/my-courses/${course.id}`}
                      >
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-primary focus:text-base-100">
                      <button>Edit Course</button>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-primary focus:text-base-100">
                      <button>Delete Course</button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyCoursesPage;
