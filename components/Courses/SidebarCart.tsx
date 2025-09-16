"use client";

import React, { useActionState } from "react";
import Form from "next/form";
import Link from "next/link";

import { actionAddToWishlist } from "@/lib/actions/courses/addToWishlist";
import { actionBuyNow } from "@/lib/actions/courses/buyNow";
import CoursesLoading from "@/app/courses/loading";

import AddToCartModal from "./AddToCartModal";
import Icon from "../ui/Icon";
import Toast from "../Toast";

interface SidebarCartProps {
  fakeSidebarCart: {
    includes: string[];
  };
  singleCourse: {
    id?: string;

    price: number;
    originalPrice: number;
    title: string;
    thumbnail: string;
    createdBy: string | undefined;
    discount: string;
    timeLeft: string;
    courseDetails: { label: string; value: string }[];
  };
  courseId: string;
}

const SidebarCart = ({
  fakeSidebarCart,
  courseId,
  singleCourse,
}: SidebarCartProps) => {
  const [wishlistState, wishlistAction, wishlistPending] = useActionState(
    actionAddToWishlist,
    { message: "", errors: [] as string[] }
  );
  const [buyNowState, buyNowAction, buyNowPending] = useActionState(
    actionBuyNow,
    { message: "", errors: [] as string[] }
  );

  const price = singleCourse?.price ?? 0;
  const originalPrice = singleCourse?.originalPrice ?? 0;
  const discount = (singleCourse?.discount ?? "").trim();
  const showDiscount = discount !== "" && originalPrice > price;
  const courseThumbnail = singleCourse?.thumbnail ?? "";
  const courseTitle = singleCourse?.title ?? "";
  const courseInstructor = singleCourse?.createdBy ?? "";

  // Helper function to get icon based on detail label
  const getDetailIcon = (label: string) => {
    const iconMap: Record<string, string> = {
      "Course Duration": "ph:clock-duotone",
      "Course Level": "ph:chart-bar-duotone",
      "Students Enrolled": "ph:users-duotone",
      Language: "ph:notebook-duotone",
    };
    return iconMap[label] || "ph:notepad-duotone";
  };

  return (
    <div className="md:col-span-1">
      <div className="bg-base-100 sticky top-8 flex flex-col gap-1 p-4 shadow">
        <div className="flex w-full flex-row items-center justify-between">
          <span className="text-base-content/80 mb-1 text-lg font-medium">
            ${price.toFixed(2)}
            {originalPrice > price && (
              <span className="text-base-content/50 ml-1 text-xs line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </span>
          {showDiscount && (
            <span className="bg-primary/10 text-primary px-2 py-1 text-xs font-semibold">
              {discount}
            </span>
          )}
        </div>

        {singleCourse?.timeLeft && (
          <span className="text-error ml-1 flex flex-row items-start gap-1 text-xs">
            <Icon icon="ph:alarm" className="text-sm" />
            {singleCourse.timeLeft}
          </span>
        )}

        <div className="divider divider-base-300 w-full" />

        <div className="flex w-full flex-col gap-1 text-xs text-nowrap">
          {singleCourse?.courseDetails?.map((detail, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-between gap-1"
            >
              <span className="flex items-center gap-1">
                <Icon
                  icon={getDetailIcon(detail.label)}
                  className="text-base-content/60 text-sm"
                />
                {detail.label}
              </span>
              <span className="text-base-content/60">{detail.value}</span>
            </div>
          ))}
        </div>

        <div className="divider divider-base-300 my-1 w-full" />

        <div className="flex flex-col items-center gap-1">
          {/* FIXME */}
          <AddToCartModal
            courseTitle={courseTitle}
            courseThumbnail={courseThumbnail}
            courseInstructor={courseInstructor}
            courseId={courseId}
          />

          <Form action={buyNowAction} className="w-full">
            <input type="hidden" name="courseId" value={courseId} />
            <button
              type="submit"
              className="btn btn-soft btn-primary w-full"
              disabled={buyNowPending}
            >
              {buyNowPending ? <CoursesLoading /> : "Buy Now"}
            </button>
          </Form>

          {wishlistState.message && (
            <Toast
              message={wishlistState.message}
              isError={!!wishlistState.errors?.length}
            />
          )}

          <div className="flex w-full flex-row items-center justify-between gap-1">
            <Form action={wishlistAction} className="w-1/2">
              <input type="hidden" name="courseId" value={courseId} />
              <button
                type="submit"
                className="btn btn-ghost border-base-300 w-full border text-xs"
                disabled={wishlistPending}
              >
                {wishlistPending ? <CoursesLoading /> : "Add to Wishlist"}
              </button>
            </Form>

            <Link
              href="/courses/gift"
              className="btn btn-ghost border-base-300 w-1/2 border text-xs"
            >
              Gift Course
            </Link>
          </div>

          {buyNowState.message && (
            <Toast
              message={buyNowState.message}
              isError={!!buyNowState.errors?.length}
            />
          )}

          <span className="text-base-content/60 text-xs">
            Note: All courses have 30-day money-back guarantee
          </span>
        </div>

        <div className="divider divider-base-300 my-1 w-full" />

        <div>
          <span className="text-base-content/80 text-md font-medium">
            This course includes:
          </span>
          <ul className="text-base-content/60 mt-2 space-y-2 text-xs">
            {fakeSidebarCart.includes.map((item, index) => (
              <li key={index} className="flex items-center gap-1">
                <Icon
                  icon="ph:check-circle-fill"
                  className="text-primary text-sm"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="divider divider-base-300 my-1 w-full" />
        {/* TODO : add share buttons */}
      </div>
    </div>
  );
};

export default SidebarCart;
