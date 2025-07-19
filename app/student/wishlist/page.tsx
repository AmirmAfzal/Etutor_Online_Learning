import React from "react";
import { Icon } from "@iconify/react";

import Link from "next/link";

// Fake wishlist data for demonstration
const fakeWishlistCourses = [
  {
    id: 1,
    title: "The Ultimate Drawing Course - Beginner to Advanced",
    image: "/images/course-1.jpg",
    instructors: "Harry Potter • John Wick",
    price: "$37.00",
    originalPrice: "$49.00",
    rating: 4.6,
    reviews: 451444,
  },
  {
    id: 2,
    title: "Digital Marketing Masterclass - 23 Courses in 1",
    image: "/images/course-2.jpg",
    instructors: "Nobody",
    price: "$24.00",
    originalPrice: null,
    rating: 4.8,
    reviews: 451444,
  },
  {
    id: 3,
    title: "Angular - The Complete Guide (2021 Edition)",
    image: "/images/course-3.jpg",
    instructors: "Kevin Gilbert",
    price: "$13.00",
    originalPrice: null,
    rating: 4.7,
    reviews: 451444,
  },
];

export default function WishlistPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      <div className="mb-8">
        {/* title */}
        <div className="text-base-content/80 mb-8 text-3xl font-bold">
          Wishlist{" "}
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
          {/* Table Header */}
          <div className="border-base-content/10 bg-base-100 border-b px-8 py-5">
            <div className="text-base-content/70 grid grid-cols-12 gap-4 text-base font-semibold">
              <div className="col-span-6">COURSE</div>
              <div className="col-span-3 text-center">PRICES</div>
              <div className="col-span-3 text-center">ACTION</div>
            </div>
          </div>

          {/* Table Body */}
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
interface WishlistCourseRowProps {
  id: number;
  title: string;
  image: string;
  instructors: string;
  price: string;
  originalPrice: string | null;
  rating: number;
  reviews: number;
}

const WishlistCourseRow: React.FC<WishlistCourseRowProps> = ({
  id,
  title,
  image,
  instructors,
  price,
  originalPrice,
  rating,
  reviews,
}) => {
  return (
    <div className="hover:bg-base-200/30 px-8 py-6 transition-colors">
      <div className="grid grid-cols-12 items-center gap-6">
        {/* Course Column */}
        <div className="col-span-6">
          <div className="flex items-center gap-5">
            {/* Course Image */}
            <div className="flex-shrink-0">
              <img src={image} alt={title} className="h-16 w-24 object-cover" />
            </div>

            {/* Course Info */}
            <div className="min-w-0 flex-1">
              {/* Rating */}
              <div className="mb-2 flex items-center gap-1">
                <Icon icon="ph:star-fill" className="text-sm text-yellow-500" />
                <span className="text-base-content/70 text-xs font-medium">
                  {rating} ({reviews.toLocaleString()} Review)
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base-content/90 mb-2 line-clamp-2 text-lg font-semibold">
                {title}
              </h3>

              {/* Instructors */}
              <p className="text-base-content/60 text-xs">
                Course by: {instructors}
              </p>
            </div>
          </div>
        </div>

        {/* Prices Column */}
        <div className="col-span-3 text-center">
          <div className="flex flex-col items-center">
            <span className="text-primary text-xl font-bold">{price}</span>
            {originalPrice && (
              <span className="text-base-content/40 text-xs line-through">
                {originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Action Column */}
        <div className="col-span-3 text-center">
          <div className="flex items-center justify-center gap-3">
            <form method="POST" action="/api/cart/buy-now">
              <input type="hidden" name="courseId" value={id} />
              <button
                type="submit"
                className="btn btn-soft btn-base-content h-10 w-28 text-sm"
              >
                Buy Now
              </button>
            </form>

            <form method="POST" action="/api/cart/add">
              <input type="hidden" name="courseId" value={id} />
              <button
                type="submit"
                className="btn btn-primary h-10 w-28 text-sm"
              >
                Add To Cart
              </button>
            </form>

            <form method="POST" action="/api/wishlist/remove">
              <input type="hidden" name="courseId" value={id} />
              <button
                type="submit"
                className="btn btn-soft btn-primary h-8 w-8 p-0"
                title="Remove from wishlist"
              >
                <Icon icon="ph:heart-fill" className="text-sm" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
