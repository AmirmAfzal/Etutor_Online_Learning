import Link from "next/link";

import Icon from "@/components/ui/Icon";
import WriteReview from "@/components/Courses/watchCourses/WriteReview";

interface WatchHeaderProps {
  title: string;
  sectionsCount: number;
  lecturesCount: number;
  totalDuration: string;
}

const WatchHeader = ({
  title,
  sectionsCount,
  lecturesCount,
  totalDuration,
}: WatchHeaderProps) => {
  return (
    <div className="bg-base-200 flex w-full flex-col items-start justify-between gap-4 p-4 lg:flex-row lg:items-center">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <Link
          href="#"
          className="bg-base-100 flex h-10 w-10 items-center justify-center rounded-full"
          aria-label="Back to previous page"
        >
          <Icon icon="ph:arrow-left" className="text-base-content/80 text-lg" />
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-base-content/80 text-md font-semibold lg:text-xl">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 text-xs md:text-sm">
              <Icon icon="ph:folder-open" className="text-primary text-lg" />
              {sectionsCount} section
            </span>
            <span className="flex items-center gap-1 text-xs md:text-sm">
              <Icon icon="ph:play-circle" className="text-secondary text-lg" />
              {lecturesCount} lectures
            </span>
            <span className="flex items-center gap-1 text-xs md:text-sm">
              <Icon icon="ph:clock" className="text-primary text-lg" />
              {totalDuration}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex w-full flex-row items-center justify-end gap-2 md:w-auto">
        <WriteReview />
        <button className="btn btn-primary text-xs whitespace-nowrap md:text-base">
          Next Lecture
        </button>
      </div>
    </div>
  );
};

export default WatchHeader;
