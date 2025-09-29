"use client";

import React, { useActionState } from "react";
import Image from "next/image";
import Link from "next/link";
import Form from "next/form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { actionAddToCart } from "@/lib/actions/courses/addToCart";
import CoursesLoading from "@/app/courses/loading";

import Icon from "../ui/Icon";
import Toast from "../Toast";
import { redirect } from "next/navigation";

interface Props {
  courseTitle: string;
  courseThumbnail: string;
  courseInstructor: string[] | string;
  courseId: string;
  className?: string;
}

const AddToCartModal = ({
  courseTitle,
  courseThumbnail,
  courseInstructor,
  courseId,
  className,
}: Props) => {
  const [courseCartState, courseCartAction, courseCartPending] = useActionState(
    actionAddToCart,
    { message: "", messageDetail: "", errors: [] as string[] }
  );

  if (courseCartState.errors?.includes("User not authenticated")) {
    redirect("/auth/signin");
  }

  return (
    <Form action={courseCartAction} className="w-full">
      <input type="hidden" name="courseId" value={courseId} />
      <Dialog>
        <DialogTrigger
          type="submit"
          className={`btn btn-primary w-full ${className}`}
          disabled={courseCartPending}
        >
          {courseCartPending ? <CoursesLoading /> : "Add to Cart"}
        </DialogTrigger>

        <DialogContent className="rounded-none">
          <DialogHeader>
            <DialogTitle>Added to cart</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-start justify-between gap-2">
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
                <div className="border-base-300 flex w-full flex-col items-center gap-2 border-l-2 pl-4">
                  <span className="text-base-content/80 text-2xl font-semibold">
                    {courseTitle}
                  </span>
                  <span className="text-base-content/70 p-4 pt-0 text-sm">
                    {/*ّFIXME : fix this join */}
                    {courseInstructor
                      ? `${courseInstructor.join(",")}`
                      : "nobody"}
                  </span>
                </div>
              </div>
            </div>
            <Link href="/shopping-cart" className="btn btn-primary w-full">
              Go to Cart
            </Link>
          </div>
        </DialogContent>

        {courseCartState.message && (
          <Toast
            message={courseCartState.message}
            isError={!!courseCartState.errors?.length}
            errors={courseCartState.errors}
            messageDetail={courseCartState.messageDetail}
          />
        )}
      </Dialog>
    </Form>
  );
};

export default AddToCartModal;
