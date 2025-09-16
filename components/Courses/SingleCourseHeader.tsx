import Image from "next/image";

import Icon from "@/components/ui/Icon";
import React from "react";

type Instructor = {
  name: string;
  avatar: string;
};

type SingleCourseHeaderProps = {
  title?: string;
  description?: string;
  breadcrumb?: string[];
  instructors?: Instructor[];
  createdBy?: string;
  rating?: number;
  reviews?: number;
};

const SingleCourseHeader = ({
  title,
  description,
  breadcrumb,
  instructors,
  createdBy,
  rating,
  reviews,
}: SingleCourseHeaderProps) => {
  return (
    <div className="bg-base-200 w-full">
      <div className="flex max-w-7xl items-center justify-center">
        <div className="mt-12 mb-6 w-full px-2">
          <span className="text-base-content/70 mb-4 flex items-center gap-2 text-sm">
            {breadcrumb?.join(" > ")}
          </span>
          <h1 className="mb-4 text-3xl font-semibold">{title}</h1>
          <p className="text-base-content/70 text-md mb-6 font-medium">
            {description}
          </p>
          <div className="mb-6 flex items-center gap-4">
            <div className="flex w-full flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-2">
                <div className="flex -space-x-2">
                  {instructors?.map((instructor, index) =>
                    instructor.avatar ? (
                      <Image
                        key={index}
                        src={instructor.avatar}
                        alt={instructor.name}
                        width={40}
                        height={40}
                        className="border-base-100 rounded-full border-2 object-cover"
                      />
                    ) : (
                      <Icon
                        key={index}
                        icon="ph:user"
                        className="border-base-300 rounded-full border p-2 text-3xl"
                      />
                    )
                  )}
                </div>
                <p className="text-base-content/60 flex flex-col text-sm">
                  Created by:
                  <span className="text-base-content/80 font-semibold">
                    {createdBy}
                  </span>
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <span className="text-md flex items-center justify-center gap-2">
                  <Icon icon="ph:star-fill" className="text-primary" />
                  {rating}({reviews?.toLocaleString()} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCourseHeader;
