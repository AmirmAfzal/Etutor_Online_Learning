import React from "react";
import Image from "next/image";
import { Types } from "mongoose";

import Icon from "@/components/ui/Icon";

interface Lecture {
  _id: Types.ObjectId;
  title: string;
  description: string;
  video: string;
  duration: number;
  files: string | string[];
  notes: string;
  caption: string;
}

interface WatchDetailsProps {
  currentLecture: Lecture;
  sectionNumber: number;
  sectionTitle: string;
  watchingStudents: number;
}

const WatchDetails = ({
  currentLecture,
  sectionNumber,
  sectionTitle,
  watchingStudents,
}: WatchDetailsProps) => {
  // FIXME : get students from course enrolled students
  const courseStudents = [
    { avatar: "/images/profile-img.png" },
    { avatar: "" },
  ];

  if (!currentLecture) {
    return <div>No lecture details available.</div>;
  }

  return (
    <div className="mt-12 w-full md:mt-8 lg:w-2/3">
      <h2 className="text-base-content/80 text-lg font-semibold md:text-xl">
        {/* FIXME : fix the section || lecture number */}
        {sectionNumber} . {sectionTitle}
      </h2>

      <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {courseStudents.map((instructor, index) =>
              instructor.avatar ? (
                <Image
                  key={index}
                  src={instructor.avatar}
                  alt={`Student ${index + 1}`}
                  width={35}
                  height={35}
                  className="border-base-100 rounded-full border object-cover"
                />
              ) : (
                <Icon
                  key={index}
                  icon="ph:user"
                  className="border-base-300 rounded-full border p-2 text-2xl"
                />
              )
            )}
          </div>
          <div className="flex flex-col items-start">
            <span className="text-md font-medium md:text-lg">
              {watchingStudents}
            </span>
            <span className="text-base-content/60 text-sm md:text-base">
              students Watching
            </span>
          </div>
        </div>
        <div className="text-base-content/70 flex flex-wrap items-center gap-4 text-sm md:text-base">
          {/* FIXME */}
          <span>Last updated: 3 days ago</span>
          <span>Comments: 0</span>
        </div>
      </div>
    </div>
  );
};

export default WatchDetails;
