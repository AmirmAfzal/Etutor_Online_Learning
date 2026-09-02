import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Types } from "mongoose";

import WishlistCourseRow from "@/components/Student/student-wishlist/WishlistCoursesRow";
import { authOptions } from "@/lib/auth/authOptions";
import { connectDB } from "@/lib/db/db";
import studentModel from "@/lib/db/models/studentModel";

export const dynamic = "force-dynamic";
interface CourseData {
  _id: Types.ObjectId;
  title: string;
  subtitle: string;
  thumbnail: string;
  price?: string;
  originalPrice?: string;
  rating?: number;
  reviews?: number;
  authors?: InstructorDocument[];
}

interface Student {
  _id: string;
  user: string;
  wishlist: CourseData[];
}

interface InstructorDocument {
  firstname?: string;
  lastname?: string;
  bio?: string;
  avatar?: string;
  rating?: number;
  students?: number;
  name?: string;
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

  const courses = wishlistCourses.map((course) => {
    const instructors = (course.authors || []).map((instructor) => {
      const fullName =
        `${instructor.firstname || ""} ${instructor.lastname || ""}`.trim();
      return fullName || "Unknown Instructor";
    });

    return {
      id: course._id.toString(),
      title: course.title,
      image: course.thumbnail,
      instructors, // Pass the array of instructor names
      price: course.price || "00.00",
      originalPrice: course.originalPrice || "00.00",
      rating: course.rating || 545,
      reviews: course.reviews || 667,
    };
  });

  return (
    <>
      <div className="mb-6 sm:mb-8">
        <div className="text-base-content/80 mb-3 flex flex-wrap gap-2 text-xl font-bold sm:mb-4 sm:text-3xl">
          Wishlist
          <span className="text-base-content/60 text-base sm:text-xl">
            ({courses.length})
          </span>
        </div>
      </div>

      {courses.length === 0 ? (
        <div className="text-base-content/60 flex h-64 w-full flex-col items-center justify-center gap-4 p-4 text-center">
          <Icon icon="ph:heart" className="text-5xl sm:text-6xl" />
          <div className="text-lg font-semibold sm:text-xl">
            Your wishlist is empty
          </div>
          <div className="text-base-content/50 max-w-sm text-sm leading-relaxed sm:text-base">
            Start adding courses to your wishlist to save them for later
          </div>
          <Link href="/courses" className="btn btn-primary btn-sm sm:btn-md">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="bg-base-100 border-base-content/10 overflow-hidden border">
          <div className="border-base-content/10 bg-base-100 hidden border-b px-4 py-3 sm:block sm:px-8 sm:py-4">
            <div className="text-base-content/70 grid grid-cols-12 gap-2 text-sm font-medium sm:gap-4 sm:text-base">
              <div className="col-span-12 sm:col-span-6">COURSE</div>
              <div className="hidden text-center sm:col-span-1 sm:block">
                PRICE
              </div>
              <div className="hidden text-center sm:col-span-4 sm:block">
                ACTION
              </div>
            </div>
          </div>

          <div className="divide-base-content/10 divide-y">
            {courses.map((course, index) => (
              <WishlistCourseRow
                key={course.id || `course-${index}`}
                {...course}
                id={course.id}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default WishlistPage;
