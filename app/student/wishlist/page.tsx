import React from "react";
import { Icon } from "@iconify/react";

import Link from "next/link";
import WishlistCourseRow from "@/components/Student/student-wishlist/WishlistCoursesRow";
// Fake wishlist data for demonstration
const fakeWishlistCourses = [
  {
    id: 1,
    title: "The Ultimate Drawing Course - Beginner to Advanced",
    image: "/images/student-dashboard/course-1.jpg",
    instructors: "Harry Potter • John Wick",
    price: "$37.00",
    originalPrice: "$49.00",
    rating: 4.6,
    reviews: 451444,
  },
  {
    id: 2,
    title: "Digital Marketing Masterclass - 23 Courses in 1",
    image: "/images/student-dashboard/course-2.jpg",
    instructors: "Nobody",
    price: "$24.00",
    originalPrice: null,
    rating: 4.8,
    reviews: 451444,
  },
  {
    id: 3,
    title: "Angular - The Complete Guide (2021 Edition)",
    image: "/images/student-dashboard/course-3.jpg",
    instructors: "Kevin Gilbert",
    price: "$13.00",
    originalPrice: null,
    rating: 4.7,
    reviews: 451444,
  },
];

export default function WishlistPage() {
  return (
    <>
      <div className="mb-8">
        <div className="text-base-content/80 mb-8 text-3xl font-bold">
          Wishlist
          <span className="text-base-content/60">
            ({fakeWishlistCourses.length})
          </span>
        </div>
      </div>

      {fakeWishlistCourses.length === 0 ? (
        <div className="text-base-content/60 flex h-64 w-full flex-col items-center justify-center gap-4 text-center">
          <Icon icon="ph:heart" className="text-6xl" />
          <div className="text-xl font-semibold">Your wishlist is empty</div>
          <div className="text-base-content/50 text-sm">
            Start adding courses to your wishlist to save them for later
          </div>
          <Link href="/student/courses" className="btn btn-primary btn-sm">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="bg-base-100 border-base-content/10 border">
          <div className="border-base-content/10 bg-base-100 border-b px-8 py-5">
            <div className="text-base-content/70 grid grid-cols-12 gap-4 text-base font-medium">
              <div className="col-span-6">COURSE</div>
              <div className="col-span-1 text-center">PRICES</div>
              <div className="col-span-4 text-center">ACTION</div>
            </div>
          </div>

          <div className="divide-base-content/10 divide-y">
            {fakeWishlistCourses.map((course) => (
              <WishlistCourseRow key={course.id} {...course} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// Custom Wishlist Course Row Component
