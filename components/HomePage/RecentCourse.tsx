import Image from "next/image";
import Link from "next/link";
import React from "react";

import CourseCard from "../Student/CourseCard";
import Icon from "../ui/Icon";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const RecentCourse = () => {
  const courses = [
    {
      id: 1,
      thumbnail: "/images/course-images-1.png",
      name: "The Python Mega Course: Build 10 Real Applications",
      category: "Design",
      price: 46,
      offer: 26,
      rating: 4.5,
      students: 375.7,
    },
    {
      id: 2,
      thumbnail: "/images/course-images-2.png",
      name: "Facebook Ads & Facebook Marketing MASTERY 2021...",
      category: "IT & Software",
      price: 57,
      offer: 26,
      rating: 5,
      students: 465.7,
    },
    {
      id: 3,
      thumbnail: "/images/course-images-3.png",
      name: "2021 Python Bootcamp From Zero to Hero in Python",
      category: "Developments",
      price: 57,
      offer: 26,
      rating: 4.9,
      students: 265,
    },
    {
      id: 4,
      thumbnail: "/images/course-images-3.png",
      name: "2021 Python Bootcamp From Zero to Hero in Python",
      category: "Developments",
      price: 23,
      offer: 26,
      rating: 4.8,
      students: 265.7,
    },
  ];

  return (
    <section className="container mx-auto px-8 py-16 md:px-0">
      <h3 className="text-center text-2xl font-bold md:text-3xl">
        Recently added courses
      </h3>
      <div>
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-4">
          {courses.map((course) => (
            <HoverCard key={course.id}>
              <HoverCardTrigger>
                <CourseCard {...course} />
              </HoverCardTrigger>
              <HoverCardContent className="w-full p-0" side="right">
                <div className="border-base-300 h-auto max-w-sm border shadow-lg">
                  <div className="border-base-300 space-y-4 border-b p-4">
                    <div>
                      <p className="text-secondary bg-secondary/20 inline p-1 text-xs">
                        {course.category.toUpperCase()}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">{course.name}</p>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-row items-center gap-2">
                        <div>
                          <Image
                            src="/images/profile-img.png"
                            alt="profile"
                            width={50}
                            height={50}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-base-content/70 text-xs">
                            Course by
                          </p>
                          <p className="text-sm font-semibold">Kevin Gilbert</p>
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
                          ({course.students})
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
                        265.7K
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
                        Beginner
                      </div>
                      <div className="flex flex-row items-center gap-1">
                        <Icon
                          icon="ph:clock"
                          width="20"
                          height="20"
                          className="text-success"
                        />
                        6 hour
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-row items-center gap-2">
                        <p className="text-2xl font-light">
                          ${course.price}.00
                        </p>
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
