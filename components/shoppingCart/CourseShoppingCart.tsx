"use client";

import Image from "next/image";

import Icon from "@/components/ui/Icon";
import { useActionState, useEffect, useState } from "react";
import { actionDeleteCourse } from "@/lib/actions/courses/actionDeleteCourse";
import Form from "next/form";
import CoursesLoading from "@/app/courses/loading";
import { actionAddToWishlist } from "@/lib/actions/courses/addToWishlist";

type Props = {
  id?: string;
  title?: string;
  image: string;
  rating?: number;
  reviews?: number;
  instructor?: string;
  price?: number;
  originalPrice?: number;
};

interface ToastState {
  message: string;
  errors?: string[];
}

const CourseShoppingCart = ({
  title,
  image,
  rating,
  reviews = 0,
  instructor,
  price,
  originalPrice,
  id: courseId,
}: Props) => {
  const [deleteCourseState, deleteCourseAction, deleteCoursePending] =
    useActionState(actionDeleteCourse, { message: "", errors: [] as string[] });

  const [moveWishlistState, moveWishlistAction, moveWishlistPending] =
    useActionState(actionAddToWishlist, {
      message: "",
      errors: [] as string[],
    });

  const [showDeleteCourseToast, setShowDeleteCourseToast] = useState(false);
  const [showMoveWishlistToast, setShowMoveWishlistToast] = useState(false);

  useEffect(() => {
    if (deleteCourseState.message) {
      setShowDeleteCourseToast(true);
      const timer = setTimeout(() => setShowDeleteCourseToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [deleteCourseState.message]);

  useEffect(() => {
    if (moveWishlistState.message) {
      setShowMoveWishlistToast(true);
      const timer = setTimeout(() => setShowMoveWishlistToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [moveWishlistState.message]);

  const renderToast = (show: boolean, state: ToastState) => (
    <div className="toast toast-top toast-end">
      {show && state.message && (
        <div
          role="alert"
          className={`alert ${
            state.errors?.length ? "alert-error" : "alert-success"
          }`}
        >
          <Icon
            icon={state.errors?.length ? "ph:x-circle" : "ph:check-circle"}
            className="text-lg"
          />
          <span className="text-xs">{state.message}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="hover:bg-base-200/30 flex flex-col gap-4 p-4 transition-colors md:flex-row md:items-center">
      <Form
        action={deleteCourseAction}
        className="self-start md:mr-4 md:self-center"
      >
        <input type="hidden" name="courseId" value={courseId} />
        <button
          type="submit"
          className="hover:bg-base-200/40 rounded-full p-1 transition-colors"
          disabled={deleteCoursePending}
        >
          {deleteCoursePending ? (
            <CoursesLoading />
          ) : (
            <Icon
              icon="ph:x-circle"
              className="text-base-content/70 hover:text-error text-xl"
            />
          )}
        </button>
      </Form>

      <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center md:gap-6">
        <div className="mx-auto flex-shrink-0 md:mx-0">
          <Image
            src={image}
            alt={title || "course image"}
            width={160}
            height={100}
            className="h-36 w-48 object-cover transition-transform duration-300 hover:scale-105 md:h-28 md:w-40"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-1">
            <Icon icon="ph:star-fill" className="text-primary text-sm" />
            <span className="text-base-content/70 text-xs font-semibold">
              {rating} ({reviews.toLocaleString()} Review
              {reviews !== 1 && "s"})
            </span>
          </div>
          <h3 className="text-base-content/80 mb-2 line-clamp-2 text-sm font-medium">
            {title}
          </h3>
          <span className="text-base-content/70 text-xs">
            <span className="text-base-content/50">Course by: </span>
            {instructor}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 md:ml-auto md:flex-row md:items-center md:gap-4">
        <div className="flex items-center gap-2 md:justify-end">
          <span className="text-primary text-lg font-semibold">{price}$</span>
          {originalPrice && (
            <span className="text-base-content/40 text-sm line-through">
              {originalPrice}$
            </span>
          )}
        </div>

        <Form
          action={moveWishlistAction}
          className="self-start md:mr-4 md:self-center"
        >
          <input type="hidden" name="courseId" value={courseId} />
          <button
            type="submit"
            className="btn btn-soft btn-primary h-10 w-full text-xs md:w-36"
            disabled={deleteCoursePending}
          >
            {deleteCoursePending ? <CoursesLoading /> : "Move to Wishlist"}
          </button>
        </Form>
      </div>
      {renderToast(showDeleteCourseToast, deleteCourseState)}
      {renderToast(showMoveWishlistToast, moveWishlistState)}
    </div>
  );
};

export default CourseShoppingCart;
