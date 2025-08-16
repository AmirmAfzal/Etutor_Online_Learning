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
    <div className="mt-12 w-full space-y-3">
      <span className="text-base-content/80 mb-4 block text-2xl font-semibold">
        Course instructors{` (${instructors.length})`}
      </span>
      {instructors.map((instructor, index) => (
        <div key={index} className="border-base-300 w-full border p-4">
          <div className="flex flex-row items-center gap-4">
            <Image
              width={64}
              height={64}
              src={instructor.avatar}
              alt={instructor.name}
              className="border-base-300 mb-6 w-2/5 rounded-full border"
            />
            <div className="flex flex-col gap-2">
              <span className="text-base-content/80 font-semibold">
                {instructor.name}
              </span>
              <span className="text-base-content/60 text-sm">
                {instructor.bio}
              </span>

              <div className="text-base-content/80 flex flex-row items-center justify-between gap-4 text-sm font-semibold">
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
              <div className="mt-4">
                <TruncatedText text={instructor.description} maxLength={150} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseInstructors;
