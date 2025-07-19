import Image from "next/image";
import React from "react";
import { Icon } from "@iconify/react";

interface StudentProfileProps {
  name: string;
  job: string;
  image: string;
}

const StudentProfile: React.FC<StudentProfileProps> = ({
  name,
  job,
  image,
}) => {
  return (
    <div className="bg-base-100 border-primary/20 relative mt-8 mb-0 flex flex-col items-center gap-4 border-2 p-4 sm:gap-6 sm:p-6 md:flex-row md:items-center">
      <Image
        src={image}
        alt="Profile"
        width={112}
        height={112}
        className="h-auto w-auto rounded-full object-cover sm:h-28 sm:w-28"
        priority={true}
      />
      <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
        <h2 className="text-base-content text-lg font-bold sm:text-2xl">
          {name}
        </h2>
        <p className="text-base-content/50 mt-2 text-xs sm:mt-4 sm:text-base">
          {job}
        </p>
      </div>
      <button className="btn btn-soft btn-primary mt-2 w-full gap-2 font-bold md:static md:top-6 md:right-6 md:mt-0 md:ml-auto md:w-auto">
        Become Instructor
        <Icon icon="ph:arrow-right" className="text-xl sm:text-2xl" />
      </button>
    </div>
  );
};

export default StudentProfile;
