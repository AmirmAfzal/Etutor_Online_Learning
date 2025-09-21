import React from "react";
import Image from "next/image";

import Icon from "@/components/ui/Icon";

import { connectDB } from "@/lib/db/db";
import feedbackModel from "@/lib/db/models/feedbackModel";
import StarSelect from "@/components/Courses/StarSelect";

interface Props {
  searchParams: Promise<{
    sort: string;
  }>;
}

const Comments = async (props: Props) => {
  await connectDB();

  const searchParams = await props.searchParams;
  const sortRating = searchParams?.sort || "5";

  let filterQuery = {};

  switch (sortRating) {
    case "5":
      filterQuery = { star: { $lte: 5 } };
      break;
    case "4":
      filterQuery = { star: { $lte: 4 } };
      break;
    case "3":
      filterQuery = { star: { $lte: 3 } };
      break;
    case "2":
      filterQuery = { star: { $lte: 2 } };
      break;
    case "1":
      filterQuery = { star: { $lte: 1 } };
      break;
    default:
      filterQuery = {};
  }

  const feedbacks = await feedbackModel
    .find(filterQuery)
    .lean()
    .sort({ star: -1 });

  const getFeedbacks = feedbacks.map((feedback) => ({
    id: feedback._id?.toString() || "",
    name: feedback.title,
    avatar: feedback.avatar,
    time: feedback.createdAt?.toDateString() || "Some time ago",
    star: feedback.star,
    comment: feedback.feedback,
  }));

  return (
    <div className="mt-12 w-full space-y-6">
      <StarSelect />

      {getFeedbacks.map((comment) => (
        <div
          key={comment.id}
          className="border-base-300 flex items-start gap-4 border-b pb-4"
        >
          {comment.avatar ? (
            <Image
              width={48}
              height={48}
              src={comment.avatar}
              alt={comment.name}
              className="h-10 w-10 shrink-0 rounded-full object-cover sm:h-12 sm:w-12"
            />
          ) : (
            <Icon
              icon="ph:user"
              className="border-base-300 rounded-full border p-3 text-3xl"
            />
          )}

          <div className="flex flex-1 flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold">{comment.name}</span>
              <span className="text-base-content/60 text-xs sm:text-sm">
                {comment.time}
              </span>
            </div>

            <div className="flex items-center gap-1">
              {[...Array(comment.star)].map((_, index) => (
                <Icon
                  key={index}
                  icon="ph:star-fill"
                  className="text-primary text-sm"
                />
              ))}
            </div>

            <p className="text-base-content/70 text-sm leading-relaxed">
              {comment.comment}
            </p>
          </div>
        </div>
      ))}

      <div className="flex justify-center">
        <button className="btn btn-soft btn-primary mt-4">Load more..</button>
      </div>
    </div>
  );
};

export default Comments;
