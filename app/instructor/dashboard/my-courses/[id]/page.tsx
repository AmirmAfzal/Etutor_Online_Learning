import Image from "next/image";
import Link from "next/link";
import moment from "moment";

import CourseInformation from "@/components/instructor-dashboard/course-detail/CourseInformation";
import CourseOverview from "@/components/instructor-dashboard/CourseOverview";
import CourseRating from "@/components/instructor-dashboard/CourseRating";
import RevenueView from "@/components/instructor-dashboard/RevenueView";
import Icon from "@/components/ui/Icon";
import courseModel from "@/lib/db/models/courseModel";
import { Instructor } from "@/lib/actions/instructor/create-course/findInstructors";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteButton from "@/components/instructor-dashboard/my-courses/DeleteButton";
import { getCourseRevenue } from "@/lib/utils/getCourseRevenue";
import { getCourseDailyIncome } from "@/lib/utils/getCourseDailyIncome";
import { getCourseDailyComments } from "@/lib/utils/getCourseDailyComments";

interface Props {
  params: Promise<{ id: string }>;
}

const CourseDetailPage = async (props: Props) => {
  const { id } = await props.params;
  const course = await courseModel.findById(id).populate("category", "name");

  const revenue = await getCourseRevenue(course._id, course.price);

  const currentMonth = new Date().getUTCMonth() + 1;
  const currentYear = new Date().getFullYear();

  const courseDailyIncome = await getCourseDailyIncome(
    course._id,
    currentMonth,
    currentYear
  );

  const dailyComments = await getCourseDailyComments(
    course._id,
    currentMonth,
    currentYear
  );

  return (
    <section className="bg-base-200 w-full">
      <div className="container mx-auto p-6">
        <div className="py-4">
          Course / My Courses /{" "}
          {course.category.name.charAt(0).toUpperCase() +
            course.category.name.slice(1)}{" "}
          / {course.title}
        </div>

        <div className="bg-base-100 flex flex-col gap-4 p-4 md:flex-row">
          <Image
            src={course.thumbnail}
            className="w-86"
            alt="course-detail"
            width={400}
            height={300}
          />
          <div className="w-full space-y-2">
            <div className="flex flex-row items-center gap-6 text-xs">
              <p className="text-base-content/70">
                <span>Uploaded: </span>
                <span className="text-base-content">
                  {moment(course.createdAt).format("ll")}
                </span>
              </p>
              <p className="text-base-content/80">
                <span>Last Updated: </span>
                <span className="text-base-content">
                  {moment(course.updatedAt).format("ll")}
                </span>
              </p>
            </div>

            <h3 className="text-2xl font-bold">{course.title}</h3>
            <p className="text-base-content/70 text-sm">{course.subtitle}</p>

            <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
              <div className="flex flex-row items-center gap-4">
                <div className="flex flex-row items-center -space-x-4">
                  {course.instructors.map((instructor: Instructor) => (
                    <Image
                      key={instructor.id}
                      src={instructor.profile}
                      alt="instructor"
                      width={40}
                      height={40}
                      className="border-base-100 rounded-full border-2"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-base-content/70">Created by:</p>
                  <div className="flex flex-row items-center gap-2">
                    {course.instructors.map(
                      (instructor: Instructor, index: number) => (
                        <div
                          key={instructor.id}
                          className="flex flex-row items-center gap-2"
                        >
                          {index > 0 && (
                            <div className="bg-base-content h-1 w-1 rounded-full" />
                          )}
                          {instructor.name}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-row items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon
                      icon="ph:star-fill"
                      width={20}
                      height={20}
                      className="text-primary"
                      key={star}
                    />
                  ))}
                </div>
                <p className="font-bold">{course.rating}</p>
                <p className="text-base-content/70 text-sm">(123,456 Rating)</p>
              </div>
            </div>
            <div className="border-base-300 flex flex-col items-center justify-between gap-4 border-t pt-4 md:flex-row">
              <div className="flex flex-row items-center gap-4">
                <span className="border-base-300 border-r-2 pr-4">
                  <p className="text-lg">${course.price}</p>
                  <p className="text-base-content/70 text-sm">Course prices</p>
                </span>
                <span>
                  <p className="text-lg">
                    ${revenue.totalRevenue.toLocaleString("en-US")}
                  </p>
                  <p className="text-base-content/70 text-sm">
                    USD dollar revenue
                  </p>
                </span>
              </div>
              <div className="flex flex-row items-center gap-4">
                <Link
                  href="/instructor/dashboard/earning"
                  className="btn btn-primary"
                >
                  Withdrew Money
                </Link>
                <button className="btn btn-soft">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Icon icon="ph:dots-three" width="24" height="24" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
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
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <CourseInformation courseId={id} />
          <CourseRating />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="col-span-1 md:col-span-5">
            <RevenueView
              stroke="#23BD33"
              fill="#E1F7E3"
              height={400}
              courseId={String(course._id)}
              initialChartData={courseDailyIncome}
            />
          </div>
          <div className="col-span-1 md:col-span-7">
            <CourseOverview
              chartData={dailyComments}
              courseId={course._id.toString()}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetailPage;
