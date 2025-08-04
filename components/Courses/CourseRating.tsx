import React from "react";

import Icon from "@/components/ui/Icon";

type CourseRatingProps = {
  rating: number;
};

const CourseRating: React.FC<CourseRatingProps> = ({ rating }) => {
  return (
    <div className="mt-12 w-full">
      <span className="text-base-content/80 mb-4 block text-2xl font-semibold">
        Course Rating
      </span>
      <div className="flex flex-row gap-4">
        <div className="border-base-300 flex w-1/3 flex-col items-center justify-center gap-2 border p-4">
          <span className="text-4xl font-bold">{rating}</span>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <Icon
                key={index}
                icon={
                  index < Math.round(rating)
                    ? "ph:star-fill"
                    : "ph:star-duotone"
                }
                className="text-primary text-lg"
              />
            ))}
          </div>
          <span className="text-base-content/80 text-sm">Course rating</span>
        </div>
        <div className="flex w-2/3 flex-col gap-2">
          {[5, 4, 3, 2, 1].map((star, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                {[...Array(star)].map((_, idx) => (
                  <Icon
                    key={idx}
                    icon="ph:star-fill"
                    className="text-primary text-sm"
                  />
                ))}
              </span>
              <span className="text-base-content/60 text-sm text-nowrap">
                {/* FIXME : fix course rating */}
                {[5, 4, 3, 2, 1][index]} Stars
              </span>
              <div className="bg-base-300 h-2 w-full rounded-full">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${[75, 21, 3, 1, 0.5][index]}%` }}
                ></div>
              </div>
              <span className="text-base-content/60 text-sm">
                {[75, 21, 3, 1, 0.5][index]}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseRating;
