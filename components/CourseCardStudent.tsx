import Image from "next/image";
import React from "react";

interface CourseCardProps {
  title: string;
  subtitle: string;
  image: string;
  progress?: string | null;
  status?: string | null;
  priority?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  subtitle,
  image,
  progress,
  status,
  priority = false,
}) => {
  return (
    <div className="bg-base-100 border-base-content/20 flex h-full min-w-[220px] flex-col border-1 transition-all duration-300 hover:translate-y-[-2px] sm:min-w-0">
      <Image
        src={image}
        alt={title}
        width={400}
        height={160}
        className="mb-2 h-32 w-full object-cover sm:mb-3 sm:h-36 md:h-40"
        style={{ width: "100%", height: "auto" }}
        priority={priority}
      />
      <div className="flex-1 p-2 sm:p-3 md:p-4">
        <div className="text-base-content/50 mb-1 truncate text-xs font-medium sm:text-sm">
          {title}
        </div>
        <div className="text-base-content/70 mb-2 truncate text-xs font-semibold sm:text-xs">
          {subtitle}
        </div>
      </div>
      <div className="border-base-content/20 mt-auto border-t-1 p-2 sm:p-3 md:p-4">
        {progress ? (
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <button className="btn btn-soft btn-primary btn-xs w-full sm:w-auto">
              Watch Lecture
            </button>
            <span
              className={`text-success text-[10px] font-semibold sm:text-xs`}
            >
              {progress}
            </span>
          </div>
        ) : (
          <button className="btn btn-soft btn-primary btn-xs w-full">
            Watch Lecture
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
