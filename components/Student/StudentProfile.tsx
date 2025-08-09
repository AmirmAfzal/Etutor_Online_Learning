"use server";
import Image from "next/image";
import React from "react";
import { Icon } from "@iconify/react";
import studentModel from "@/lib/db/models/studentModel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { connectDB } from "@/lib/db/db";
import { redirect } from "next/navigation";

interface Student {
  user: string;
  _id: string;
  bio: string;
  avatar: string;
  firstname: string;
  lastname: string;
}

interface StudentProfileProp {
  name: string;
  job: string;
  image: string;
  _id: string;
}

const StudentProfile = async () => {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return redirect("/auth/signin");
  }
  const student = await studentModel
    .findOne({ user: session.user.id })
    .lean<Student | null>();
  if (!student) {
    return redirect("/auth/signin");
  }

  const studentProfile: StudentProfileProp = {
    name: `${student.firstname} ${student.lastname}`,
    job: student.bio,
    image: student.avatar || "/images/student-dashboard/profile-student.jpg",
    _id: student._id,
  };

  return (
    <div className="bg-base-100 border-primary/20 items- center relative mt-8 mb-0 flex w-full flex-col gap-4 border-2 p-4 sm:gap-6 sm:p-6 md:flex-row md:items-center">
      <Image
        src={studentProfile.image}
        alt="Profile"
        width={112}
        height={112}
        className="h-auto w-auto rounded-full object-cover sm:h-28 sm:w-28"
        priority={true}
      />
      <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
        <h2 className="text-base-content text-lg font-bold sm:text-2xl">
          {studentProfile.name}
        </h2>
        <p className="text-base-content/50 mt-2 text-xs sm:mt-4 sm:text-base">
          {studentProfile.job}
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
