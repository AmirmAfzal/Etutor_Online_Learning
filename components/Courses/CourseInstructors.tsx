import React from "react";
import Image from "next/image";

import Icon from "../ui/Icon";
import TruncatedText from "./TruncatedText";

interface Instructor {
  avatar: string;
  name: string;
  bio: string;
  rating: number;
  students: number;
  courses: number;
  description: string;
}

interface CourseInstructorsProps {
  instructors: Instructor[];
}

const CourseInstructors: React.FC<CourseInstructorsProps> = ({
  instructors,
}) => {
  return (
    <div className="mt-12 w-full space-y-4">
      <span className="text-base-content/80 mb-4 block text-xl font-semibold sm:text-2xl">
        Course instructors{` (${instructors.length})`}
      </span>

      {instructors.map((instructor, index) => (
        <div key={index} className="border-base-300 bg-base-100 border p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            {instructor.avatar ? (
              <Image
                width={64}
                height={64}
                src={instructor.avatar}
                alt={instructor.name}
                className="border-base-300 mx-auto h-26 w-26 rounded-full border object-cover shadow sm:mx-0 sm:h-16 sm:w-16 sm:shadow-none"
              />
            ) : (
              <Icon
                icon="ph:user"
                className="border-base-300 rounded-full border p-4 text-5xl"
              />
            )}
            <div className="flex flex-1 flex-col gap-2">
              <span className="text-base-content/80 text-base font-semibold sm:text-lg">
                {instructor.name}
              </span>
              <span className="text-base-content/60 text-sm">
                {instructor.bio}
              </span>

              <div className="text-base-content/80 mt-2 flex flex-col gap-3 text-sm font-semibold sm:flex-row sm:items-center sm:justify-between">
                <span className="flex items-center gap-1">
                  <Icon icon="ph:star-fill" className="text-primary" />
                  {instructor.rating}
                  <span className="text-base-content/60 ml-1">
                    Course rating
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <Icon icon="ph:users-duotone" className="text-secondary" />
                  {instructor.students.toLocaleString()}
                  <span className="text-base-content/60 ml-1">Students</span>
                </span>
                <span className="flex items-center gap-1">
                  <Icon icon="ph:play-circle-fill" className="text-primary" />
                  {instructor.courses}
                  <span className="text-base-content/60 ml-1">Courses</span>
                </span>
              </div>

              <div className="mt-3">
                <TruncatedText text={instructor.description} maxLength={80} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseInstructors;
