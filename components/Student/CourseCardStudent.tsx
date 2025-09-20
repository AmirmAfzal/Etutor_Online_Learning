import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CourseCardProps {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  progress?: string | null;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  subtitle,
  image,
  progress,
  id,
}) => {
  return (
    <div
      className="bg-base-100 border-base-content/10 flex h-full min-w-[220px] flex-col border-1 transition-all duration-300 hover:translate-y-[-2px] sm:min-w-0"
    >
      {image ? (
        <Image
          src={image}
          alt={title || "Course image"}
          width={400}
          height={160}
          className="mb-2 h-auto w-full object-cover sm:mb-3 sm:h-36 md:h-40"
        />
      ) : (
        <div className="bg-base-200 mb-2 flex h-auto w-full items-center justify-center sm:mb-3 sm:h-36 md:h-40">
          <span className="text-base-content/50">No Image Available</span>
        </div>
      )}
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
          <Link href={`/courses/${id}/watch`} className="btn btn-soft btn-primary btn-xs w-full">
            Watch Lecture
          </Link>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
