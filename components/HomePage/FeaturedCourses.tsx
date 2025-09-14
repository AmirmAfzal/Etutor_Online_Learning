import Link from "next/link";
import Image from "next/image";

import { CourseTypes } from "@/app/page";

import Icon from "../ui/Icon";

interface Props {
  courses: CourseTypes[];
}

const FeaturedCourses = ({ courses }: Props) => {
  return (
    <section className="bg-base-100 border-base-300 container mx-auto -mt-32 border">
      <div className="p-8 md:p-16">
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
          <h3 className="text-2xl font-bold md:text-2xl">
            Our feature courses
          </h3>
          <p className="text-base-content/80 max-w-sm text-center text-sm">
            Vestibulum sed dolor sed diam mollis maximus vel nec dolor. Donec
            varius purus et eleifend porta.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {courses &&
            courses?.map((course: CourseTypes) => (
              <Link
                href={`/courses/${course._id}`}
                key={course.title}
                className="border-base-300 flex flex-col border text-sm transition-all duration-300 hover:shadow-lg md:flex-row"
              >
                <Image
                  src={course.thumbnail}
                  alt="course image"
                  className="h-50 w-full lg:h-45 lg:w-45"
                  width={600}
                  height={400}
                />
                <div className="flex w-full flex-col">
                  <div className="space-y-2 p-4">
                    <div className="flex flex-row items-center justify-between">
                      <p className="bg-base-300 text-secondary p-1 text-xs">
                        {course.category.name.toUpperCase()}
                      </p>
                      <div className="flex flex-row items-center gap-2">
                        <p>${course.price}</p>
                        <p className="text-base-content/50 line-through">
                          ${course.offer}
                        </p>
                      </div>
                    </div>
                    <p className="font-bold"> {course.title} </p>
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-row items-center gap-2">
                        <div className="flex flex-row items-center -space-x-4">
                          {course.instructors.map((instructor) => (
                            <Image
                              key={instructor.id}
                              src={instructor.profile}
                              alt="instructor"
                              width={30}
                              height={30}
                              className="border-base-100 rounded-full border-2"
                            />
                          ))}
                        </div>
                        <div className="text-base-content/70 flex flex-row items-center gap-2">
                          {course.instructors.map((instructor, index) => (
                            <div
                              key={instructor.id}
                              className="flex flex-row items-center gap-2"
                            >
                              {index > 0 && (
                                <div className="bg-base-content h-1 w-1 rounded-full" />
                              )}
                              {instructor.name}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-row items-center gap-1 text-xs">
                        <Icon
                          width="20"
                          height="20"
                          className="text-primary"
                          icon="ph:star-fill"
                        />
                        {course.rating}
                        <span className="text-base-content/70 ml-1">
                          (357,914)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="border-base-300 flex flex-row items-center justify-between border-t p-4 text-xs">
                    <div className="flex flex-row items-center gap-1">
                      <Icon
                        icon="ph:user"
                        width="20"
                        height="20"
                        className="text-secondary"
                      />
                      {course.studentsCount}K
                      <span className="text-base-content/70 ml-1">student</span>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <Icon
                        icon="ph:chart-bar"
                        width="20"
                        height="20"
                        className="text-error"
                      />
                      {course.level}
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <Icon
                        icon="ph:clock"
                        width="20"
                        height="20"
                        className="text-success"
                      />
                      {course.duration} {course.durationUnit}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
