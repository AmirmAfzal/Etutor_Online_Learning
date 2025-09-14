import React from "react";

import Icon from "@/components/ui/Icon";
import { connectDB } from "@/lib/db/db";
import feedbackModel from "@/lib/db/models/feedbackModel";

type CourseRatingProps = {
  courseId: string;
};

const CourseRating: React.FC<CourseRatingProps> = async ({ courseId }) => {
  await connectDB();

  const feedbacks = await feedbackModel.find({ course: courseId }).lean();

  const avgRating =
    feedbacks.length > 0
      ? feedbacks.reduce((sum, f) => sum + (f.star || 0), 0) / feedbacks.length
      : 0;

  const total = feedbacks.length || 1;
  const distribution = [5, 4, 3, 2, 1].map(
    (star) =>
      (feedbacks.filter((f) => f.star === star).length / total) * 100
  );

  return (
    <div className="mt-12 w-full">
      <span className="text-base-content/80 mb-4 block text-xl font-semibold sm:text-2xl">
        Course Rating
      </span>

      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="border-base-300 flex flex-col items-center justify-center gap-2 border p-6 sm:w-1/3">
          <span className="text-4xl font-bold">{avgRating.toFixed(1)}</span>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <Icon
                key={index}
                icon={
                  index < Math.round(avgRating)
                    ? "ph:star-fill"
                    : "ph:star-duotone"
                }
                className="text-primary text-lg"
              />
            ))}
          </div>
          <span className="text-base-content/80 text-sm">Course rating</span>
        </div>

        <div className="flex flex-col gap-2 sm:w-2/3">
          {[5, 4, 3, 2, 1].map((star, index) => (
            <div key={index} className="flex w-full items-center gap-3 text-sm">
              <span className="flex shrink-0 items-center gap-1">
                {[...Array(star)].map((_, idx) => (
                  <Icon
                    key={idx}
                    icon="ph:star-fill"
                    className="text-primary text-sm"
                  />
                ))}
              </span>

              <span className="text-base-content/60 w-14 text-nowrap">
                {star} Stars
              </span>

              <div className="bg-base-300 h-2 flex-1 overflow-hidden rounded-full">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${distribution[index]}%` }}
                ></div>
              </div>

              <span className="text-base-content/60 w-10 text-right text-xs sm:text-sm">
                {distribution[index].toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseRating;
