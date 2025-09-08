import Image from "next/image";
import Link from "next/link";
import React from "react";

import { CourseTypes } from "@/app/page";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import CourseCard from "../CourseCard";
import Icon from "../ui/Icon";

interface Props {
  courses: CourseTypes[];
}

const RecentCourse = ({ courses }: Props) => {
  return (
    <section className="container mx-auto px-8 py-16 md:px-0">
      <h3 className="text-center text-2xl font-bold md:text-3xl">
        Recently added courses
      </h3>
      <div>
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-4">
          {courses && courses.map((course: CourseTypes) => (
            <HoverCard key={course.title}>
              <HoverCardTrigger asChild>
                <CourseCard course={course} />
              </HoverCardTrigger>
              <HoverCardContent className="w-full p-0" side="right">
                <div className="border-base-300 h-auto max-w-sm border shadow-lg">
                  <div className="border-base-300 space-y-4 border-b p-4">
                    <div>
                      <p className="text-secondary bg-secondary/20 inline p-1 text-xs">
                        {course.category.name.toUpperCase()}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">{course.title}</p>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-row items-center gap-2">
                        <div>
                          <div className="flex flex-row items-center -space-x-4">
                            {course.instructors?.map((instructor) => (
                              <Image
                                key={instructor.id}
                                src={instructor.profile}
                                alt={instructor.name}
                                className="border-base-100 rounded-full border-2"
                                width={40}
                                height={40}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-base-content/70 text-xs">
                            Course by
                          </p>
                          <div className="flex flex-col">
                            {course.instructors?.map((instructor) => (
                              <p key={instructor.id} className="text-sm">
                                {instructor.name}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row items-center gap-1 text-xs">
                        <Icon
                          width="20"
                          height="20"
                          className="text-primary"
                          icon="ph:star-fill"
                        />
                        {course.rating}5
                        <span className="text-base-content/70 ml-1">
                          (365,654)
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-between text-xs">
                      <div className="flex flex-row items-center gap-1">
                        <Icon
                          icon="ph:user"
                          width="20"
                          height="20"
                          className="text-secondary"
                        />
                        {course.studentsCount}K
                        <span className="text-base-content/70 ml-1">
                          student
                        </span>
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
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-row items-center gap-2">
                        <p className="text-2xl font-light">${course.price}</p>
                        <p className="text-base-content/50 line-through">
                          ${course.offer}.00
                        </p>
                        <p className="text-primary bg-primary/20 p-1 text-sm">
                          56% OFF
                        </p>
                      </div>
                      <div className="bg-primary/20 flex items-center justify-center p-1">
                        <Icon
                          icon="ph:heart"
                          className="text-primary"
                          width="24"
                          height="24"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-base-300 space-y-4 border-b p-4">
                    <p className="text-sm">WHAT YOU&apos;LL LEARN</p>
                    <p className="text-base-content/70 text-sm">
                      ✔ Learn to use Python professionally, learning both
                      Python 2 and Python 3!
                    </p>
                    <p className="text-base-content/70 text-sm">
                      ✔ Create games with Python, like Tic Tac Toe and
                      Blackjack!
                    </p>
                    <p className="text-base-content/70 text-sm">
                      ✔ Create games with Python, like Tic Tac Toe and
                      Blackjack!
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 p-4">
                    <Link href="" className="btn btn-primary">
                      <Icon
                        icon="ph:shopping-cart-simple"
                        width="24"
                        height="24"
                        className="text-white"
                      />
                      Add To Cart
                    </Link>
                    <Link href="" className="btn btn-primary btn-soft">
                      Course Details
                    </Link>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Link href="" className="btn btn-primary btn-soft mt-8">
          Browse all Course
          <Icon icon="ph:arrow-right" width="24" height="24" />
        </Link>
      </div>
    </section>
  );
};

export default RecentCourse;
