import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import WishlistCourseRow from "@/components/Student/student-wishlist/WishlistCoursesRow";

import { authOptions } from "@/lib/auth/authOptions";
import { connectDB } from "@/lib/db/db";
import studentModel from "@/lib/db/models/studentModel";

interface CourseData {
  _id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  price?: string;
  originalPrice?: string;
  rating?: number;
  reviews?: number;
  author: string[];
}

interface Student {
  _id: string;
  user: string;
  wishlist: CourseData[];
}

const WishlistPage = async () => {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return redirect("/auth/signin");
  }

  const student = await studentModel
    .findOne({ user: session.user.id })
    .populate<{ courses: CourseData[] }>("wishlist")
    .lean<Student | null>();
  if (!student) {
    return redirect("/auth/signin");
  }

  const wishlistCourses: CourseData[] = student.wishlist || [];

  const courses = wishlistCourses.map((course) => ({
    id: course._id.toString(), // Ensure id is a string
    title: course.title,
    image: course.thumbnail,
    instructors: Array.isArray(course.author)
      ? course.author.join(" • ")
      : "Unknown",
    price: course.price || "$22.00",
    originalPrice: course.originalPrice || "18.00",
    rating: course.rating || 545,
    reviews: course.reviews || 667,
  }));

  return (
    <>
      <div className="mb-8">
        <div className="text-base-content/80 mb-8 text-3xl font-bold">
          Wishlist
          <span className="text-base-content/60">({courses.length})</span>
        </div>
      </div>

      {courses.length === 0 ? (
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
            {courses.map((course, index) => (
              <WishlistCourseRow
                key={course.id || `course-${index}`}
                {...course}
                id={Number.isNaN(Number(course.id)) ? index : Number(course.id)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default WishlistPage;
