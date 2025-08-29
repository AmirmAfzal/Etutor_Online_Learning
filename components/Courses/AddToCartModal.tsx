"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Icon from "../ui/Icon";
import Image from "next/image";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { actionAddToCart } from "@/lib/actions/courses/addToCart";
import CoursesLoading from "@/app/courses/loading";
import Form from "next/form";

interface Props {
  courseTitle: string;
  courseThumbnail: string;
  courseInstructor: string;
  courseId: string;
}

interface ToastState {
  message: string;
  errors?: string[];
}

const AddToCartModal = ({
  courseTitle,
  courseThumbnail,
  courseInstructor,
  courseId,
}: Props) => {
  const [courseCartState, courseCartAction, courseCartPending] = useActionState(
    actionAddToCart,
    { message: "", errors: [] as string[] }
  );

  const [showCourseCartToast, setShowCourseCartToast] = useState(false);

  useEffect(() => {
    if (courseCartState.message) {
      setShowCourseCartToast(true);
      const timer = setTimeout(() => setShowCourseCartToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [courseCartState.message]);

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
    <Dialog>
      <DialogTrigger className="btn btn-primary w-full">
        <Form action={courseCartAction}>
          <input type="hidden" name="courseId" value={courseId} />
          <button type="submit" disabled={courseCartPending}>
            {courseCartPending ? <CoursesLoading /> : "Add to Cart"}
          </button>
        </Form>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Added to cart</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="border-base-300 flex flex-col items-start justify-between gap-2 border-2">
                <Image
                  src={courseThumbnail}
                  width={600}
                  height={400}
                  alt="Course Thumbnail"
                />

                <div className="flex flex-row items-center gap-4 p-2">
                  <Icon
                    icon="ph:check-circle"
                    className="text-success text-3xl"
                  />
                  <div className="flex w-full flex-col items-center gap-2">
                    <span className="text-base-content/80 text-2xl font-semibold">
                      {courseTitle}
                    </span>
                    <span className="text-base-content/70 p-4 pt-0 text-sm">
                      {courseInstructor}
                    </span>
                  </div>
                </div>
              </div>
              <Link href="/shopping-cart" className="btn btn-primary w-full">
                Go to Cart
              </Link>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
      {renderToast(showCourseCartToast, courseCartState)}
    </Dialog>
  );
};

export default AddToCartModal;
